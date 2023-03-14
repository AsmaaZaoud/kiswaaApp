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
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

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

import { Dropdown } from "react-native-element-dropdown";
import * as Location from "expo-location";
import { Alert } from "react-native";

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

const Register = ({ navigation }) => {
  const zones = [
    { label: " All Zones", value: "0" },
    { label: "Doha", value: "1" },
    { label: "Al Rayyan", value: "2" },
    { label: "Rumeilah", value: "3" },
    { label: "Wadi Al Sail", value: "4" },
    { label: "Al Daayen", value: "5" },
    { label: "Umm Salal", value: "6" },
    { label: "Al Wakra", value: "7" },
    { label: "Al Khor", value: "8" },
    { label: "Al Shamal", value: "9" },
    { label: "Al Shahaniya", value: "10" },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [ZoneError, setZoneError] = useState("");
  const [zone, setZone] = useState(zones[0].label);

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const [signedIn, setSignedIn] = useState(false);
  const [flag, setflag] = useState(0);

  const [stat, setStat] = useState("denied");

  let user = auth?.currentUser?.email;

  console.log("user logged in: ", user);

  const handleRegister = () => {
    setflag(0);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("registered");
        add();
        navigation.replace("App");
      })
      .catch((error) => console.log(error.message));
  };

  const add = async () => {
    const docRef = doc(db, "donors", email);

    await setDoc(docRef, {
      userName: name,
      phone: phone,
      location: location,
      email: email,
      zone: zone,
      image: "",
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
    //console.log("Document written with ID: ", docRef.id);
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
      console.log(currentLocation);
      setLocation(currentLocation);
    };
    getPermissions();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validation = () => {
    if (!name) {
      setNameError("Please enter your nickname");
      return;
    } else {
      setNameError("");
    }

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

    if (!password) {
      setPassError("Please enter a password");
      return;
    } else {
      setPassError("");
    }

    if (!validatePassword(password)) {
      setPassError(
        "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
      );
      return;
    } else {
      setPassError("");
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    } else {
      setConfirmError("");
    }

    if (stat !== "granted") {
      setLocationError("Please Allow Location");
      return;
    } else {
      setLocationError("");
    }

    if (zone !== " All Zones") {
      setZoneError("");
    } else {
      setZoneError("Select Zone");
      return;
    }

    if (
      name &&
      phone &&
      email &&
      validateEmail &&
      password &&
      validatePassword &&
      stat === "granted" &&
      zone !== " All Zones"
    ) {
      handleRegister();
    }
  };

  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginDonor")}
              >
                <Image
                  style={styles.backButton}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/54/54623.png",
                  }}
                ></Image>
              </TouchableOpacity>
              {/* <View style={{marginBottom: 50}}></View> */}
              <Image
                source={require("../../Images/purple_transparent.png")}
                style={{
                  width: 250,
                  height: 200,
                  justifyContent: "flex-start",
                  alignSelf: "center",
                }}
              />
              {/* <Text style={{ justifyContent: 'flex-start', alignSelf: 'center', fontSize: 25 }}>Register as Donor</Text> */}
              <View style={styles.container}>
                <Text style={styles.error}>{nameError}</Text>

                <Block width={width * 0.8}>
                  <Input
                    borderless
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    placeholder="Nickname"
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>

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

                <Text style={styles.error}>{passError}</Text>
                <Block width={width * 0.8}>
                  <Input
                    borderless
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="lock-open"
                        family="Entypo"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>

                <Text style={styles.error}>{confirmError}</Text>
                <Block width={width * 0.8}>
                  <Input
                    borderless
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="lock"
                        family="Entypo"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>

                <Text
                  style={{
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  {locationError}
                </Text>
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

                <Block width={width * 0.5} style={{ marginBottom: 0 }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={zones}
                    maxHeight={160}
                    labelField="label"
                    valueField="value"
                    placeholder={zone}
                    value={zone}
                    onChange={(item) => {
                      setZone(item.label);
                    }}
                  ></Dropdown>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    {ZoneError}
                  </Text>
                </Block>

                <Block width={width * 0.35}>
                  <Button style={styles.createButton} onPress={validation}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Register
                    </Text>
                  </Button>
                </Block>
              </View>
            </ScrollView>
          </Block>
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
  inputIcons: {
    marginRight: 12,
  },
  dropdown: {
    marginBottom: 10,
    padding: 7,
    borderRadius: 4,
    borderColor: argonTheme.COLORS.INPUT_ERROR,
    height: 44,
    backgroundColor: "#FFFFFF",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 14,
    color: argonTheme.COLORS.HEADER,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    margin: 20,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Register;
