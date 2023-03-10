import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  View,
  Platform,
  PixelRatio,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteField,
  onSnapshot,
  getDocs,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config";

import * as Location from "expo-location";

const { width, height } = Dimensions.get("screen");
const scale = width / 834;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

import { useIsFocused } from "@react-navigation/native";

const CheckOut = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  let confirm = route.params.itemsArray;
  console.log("confirmCheckout: ", confirm);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [locationError, setLocationError] = useState("");

  const [signedIn, setSignedIn] = useState(false);
  const [flag, setflag] = useState(0);

  const [stat, setStat] = useState("denied");

  let user = auth?.currentUser?.email;

  console.log("user logged in: ", user);

  const readName = async () => {
    let user = auth?.currentUser?.email;
    console.log("readName");
    const q = query(collection(db, "donors"), where("email", "==", user));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log("just phone", doc.data().phone);
      setPhone(doc.data().phone);
      console.log("phone: ", phone);
      setEmail(doc.data().email);
      console.log("email : ", email);
      setLocation(doc.data().location);
      console.log("location: ", location);
    });
  };

  useEffect(() => {
    if (isFocused) {
      if (user !== undefined) {
        readName();
      }
    }
  }, [isFocused]);

  const donate = async () => {
    let trackId = Math.floor(Math.random() * 10000);
    //Alert.alert("working")
    const docRef = await addDoc(collection(db, "donorDonation"), {
      phone: phone,
      email: email,
      location: location,
      // type: route.params.type,
      // amount: route.params.amount,
      timeSlot: route.params.time,
      dateSlot: route.params.date,
      trackId: trackId,
      donatedItems: confirm,
    });
    console.log("Document written with ID: ", docRef.id);

    //Asma: I added this
    const docRefDriver = await addDoc(
      collection(db, "drivers", "sim@mail.com", "orders"),
      {
        phone: phone,
        userId: email,
        location: "khor",
        timeSlot: route.params.time,
        dateSlot: route.params.date,
        trackId: trackId,
        time: route.params.time,
        date: route.params.date,
        trackId: trackId,
        status: "pending",
        type: "pickup",
      }
    );
    console.log("driver orders add ID: ", docRefDriver.id);

    // confirm.map(async (item) => {
    //     console.log(docRef.id)
    //     const docRef2 = await addDoc(collection(db, "donorDonation", docRef.id, "Items"), {
    //         type: item.cloth,
    //         quantity: item.amount,
    //         trackId: trackId
    //     });
    //     console.log("Document written with ID: ", docRef2.id);
    // })

    navigation.navigate("Feedback");
  };

  const done = async () => {
    let trackId = Math.floor(Math.random() * 10000);
    const docRef = await addDoc(collection(db, "guestDonor"), {
      phone: phone,
      email: email,
      location: location,
      // type: route.params.type,
      // amount: route.params.amount,
      timeSlot: route.params.time,
      dateSlot: route.params.date,
      trackId: trackId,
      donatedItems: confirm,
    });
    console.log("Document written with ID: ", docRef.id);

    // confirm.map(async (item) => {
    //     const docRef2 = await addDoc(collection(db, "guestDonor", docRef.id, "Items"), {
    //         type: item.cloth,
    //         quantity: item.amount,
    //         trackId: trackId
    //     });
    //     console.log("Document written with ID: ", docRef2.id);
    // })

    navigation.navigate("Feedback");
  };

  const getLocation = () => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStat(status);
      console.log("stat... ", stat);
      console.log(status);
      if (status !== "granted") {
        console.log("Please grant location permissions");
        Alert.alert("Please grant location permissions.");
        return;
      } else {
        console.log("permitted");
        Alert.alert("Your location has been recorded.");
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("currentLocation", currentLocation);
      setLocation(currentLocation);
    };
    getPermissions();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validation = () => {
    if (!phone) {
      setPhoneError("Please enter a valid phone number that is 8 digits long");
      return;
    } else {
      setPhoneError("");
    }

    if (!email) {
      setEmailError("Please enter an email address");
      return;
    } else {
      setEmailError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (stat !== "granted") {
      setLocationError("Please Allow Location");
    } else {
      setLocationError("");
    }

    if (phone && email && validateEmail && stat === "granted") {
      done();
    }
  };

  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <SafeAreaView style={styles.registerContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}
            >
              <Block row>
                <TouchableOpacity onPress={() => navigation.navigate("Donate")}>
                  <Image
                    style={styles.backButton}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/54/54623.png",
                    }}
                  ></Image>
                </TouchableOpacity>
              </Block>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                Checkout
              </Text>

              <Block style={{ marginTop: "10%" }}></Block>

              <Block style={{ marginLeft: "5%" }}>
                <Text
                  style={{
                    fontSize: 30,
                    alignSelf: "center",
                    marginBottom: 20,
                    textDecorationLine: "underline",
                  }}
                >
                  Donation Summary
                </Text>
                <Text style={{ fontSize: 20 }}>
                  Pick Up Time Interval: {route.params.time}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  Pick Up Date Interval: {route.params.date}
                </Text>
                <Block style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {route.params.itemsArray.map((item, index) => (
                    <View key={index} style={styles.smallContainer}>
                      <View style={styles.smallSquare}>
                        <Image
                          style={styles.smallImage}
                          source={{ uri: item.icon }}
                        />
                        <Text style={styles.smallText}>{item.cloth}</Text>
                        <Text style={styles.smallText}>x{item.amount}</Text>
                      </View>
                    </View>
                  ))}
                </Block>
              </Block>

              {user !== undefined ? (
                <View style={styles.container}>
                  <Block width={width * 0.8}>
                    <TouchableOpacity
                      style={styles.donateButton}
                      onPress={() => donate()}
                    >
                      <Text style={styles.donateButtonText}>Donate</Text>
                    </TouchableOpacity>
                    {/* <Button
                                                style={styles.createButton}
                                                onPress={validation}
                                            >
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                    DONE
                                                </Text>
                                            </Button> */}
                  </Block>
                </View>
              ) : (
                <View style={styles.container}>
                  <Text style={styles.error}>{phoneError}</Text>
                  <Block width={width * 0.8}>
                    <Input
                      borderless
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="numeric"
                      maxLength={8}
                      placeholder="Phone Number"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="phone"
                          family="Entypo"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>

                  <Text style={styles.error}>{emailError}</Text>
                  <Block width={width * 0.8}>
                    <Input
                      borderless
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="email"
                          family="Entypo"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>

                  <Text style={styles.error}>{locationError}</Text>
                  <Block width={width * 0.35}>
                    <Button
                      color={stat !== "granted" ? "default" : "primary"}
                      style={styles.createButton}
                      onPress={getLocation}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Get Location
                      </Text>
                    </Button>
                  </Block>

                  <Block width={width * 0.8}>
                    {/* <Button
                                                style={styles.createButton}
                                                onPress={validation}
                                            >
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                    DONE
                                                </Text>
                                            </Button> */}

                    <TouchableOpacity
                      style={styles.donateButton}
                      onPress={validation}
                    >
                      <Text style={styles.donateButtonText}>Donate</Text>
                    </TouchableOpacity>
                  </Block>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: '#F5FCFF',
  },
  input: {
    width: "80%",
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    color: "red",
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    margin: 20,
  },
  smallContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  smallSquare: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 110,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderColor: "purple",
    borderWidth: 1,
  },
  smallImage: {
    width: 60,
    height: 60,
    //borderRadius: 10,
  },
  smallText: {
    //marginTop: 5,
    fontSize: 14,
    //fontWeight: 'bold',
  },
  inputIcons: {
    marginRight: 12,
  },
  donateButton: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#b19cd9",
    position: "relative",
    overflow: "hidden",
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  donateButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default CheckOut;
