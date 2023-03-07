import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Block, Checkbox, theme, NavBar, Icon } from "galio-framework";
import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  Entypo,
} from "react-native-vector-icons";
import NumericInput from "react-native-numeric-input";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../../config";
const { width } = Dimensions.get("screen");

const ConfirmFamilyCart = ({ route, navigation }) => {
  // const [userinforr, setUserinforr] = useState([]);
  const { cartId, id } = route.params;

  //........dates............................

  //todays date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // add 1 to get the correct month (0-indexed)
  const year = currentDate.getFullYear();

  // Format the date as a string
  const dateString = `${day}/${month}/${year}`;
  console.log("date string: ", dateString);

  const first2 = new Date();
  first2.setDate(currentDate.getDate() + 3);
  console.log("first2", first2);
  const first2day = first2.getDate();
  const first2month = first2.getMonth() + 1; // add 1 to get the correct month (0-indexed)
  const first2year = first2.getFullYear();
  const first2date = `${first2day}/${first2month}/${first2year}`;
  console.log("first2date: ", first2date);

  console.log("currentdate: ", currentDate);

  const sec1 = new Date();
  sec1.setDate(currentDate.getDate() + 4);
  const sec1day = sec1.getDate();
  const sec1month = sec1.getMonth() + 1;
  const sec1year = sec1.getFullYear();
  const sec1date = `${sec1day}/${sec1month}/${sec1year}`;
  console.log("sec1date: ", sec1date);

  const sec2 = new Date();
  sec2.setDate(currentDate.getDate() + 6);
  const sec2day = sec2.getDate();
  const sec2month = sec2.getMonth() + 1;
  const sec2year = sec2.getFullYear();
  const sec2date = `${sec2day}/${sec2month}/${sec2year}`;
  console.log("sec2date: ", sec2date);

  const third1 = new Date();
  third1.setDate(currentDate.getDate() + 7);
  const third1day = third1.getDate();
  const third1month = third1.getMonth() + 1;
  const third1year = third1.getFullYear();
  const third1date = `${third1day}/${third1month}/${third1year}`;
  console.log("third1date: ", third1date);

  const third2 = new Date();
  third2.setDate(currentDate.getDate() + 9);
  const third2day = third2.getDate();
  const third2month = third2.getMonth() + 1;
  const third2year = third2.getFullYear();
  const third2date = `${third2day}/${third2month}/${third2year}`;
  console.log("third2date: ", third2date);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");

  // const [theUser, setTheUser] = useState([]);
  const [zone, setZone] = useState("");
  const [phone, setPhone] = useState("");
  const [theUser, setTheUser] = useState("");
  useEffect(() => {
    getFamily();
  }, [id]);

  const getFamily = async () => {
    console.log(id);
    const docRef = doc(db, "families", id);
    const docSnap = await getDoc(docRef);
    let temp = [];
    if (docSnap.exists()) {
      setTheUser(docSnap.data().email);
      setPhone(docSnap.data().phone);
      setZone(docSnap.data().zone);
    } else {
      console.log("No such document!");
    }
  };

  // useEffect(() => {
  //   userinfo();
  // }, [id]);
  // const [userinforr, setUserinforr] = useState([]);

  // const userinfo = async () => {
  //   const collectionRef = collection(db, "families");
  //   const q = query(collectionRef);
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     setUserinforr(
  //       querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         // data: doc.data(),
  //         zone: doc.data().zone,
  //         phone: doc.data().phone,
  //       }))
  //     );
  //     // console.log(userinforr);
  //   });
  //   return () => unsubscribe();
  // };
  // setTheUser(userinforr.find((elem) => elem.id === id));
  // console.log(theUser.phone);

  const validation = async () => {
    if (date == "") {
      setDateError("please select date!");
    } else {
      setDateError("");
    }
    if (time == "") {
      setTimeError("please select time!");
    } else {
      setTimeError("");
    }
    if (time.length != 0 && date.length != 0) {
      closeRequest();
    } else {
      console.log("not validated");
    }
  };

  const closeRequest = async () => {
    const docRef = doc(db, "familyRequests", cartId);

    await setDoc(
      docRef,
      {
        cart: "closed",
        dateSlot: date,
        timeSlot: time,
      },
      { merge: true }
    )
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigation.navigate("FamilyHome", id);
  };
  const renderArticles = () => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "90%",
          flex: 1,
        }}
      >
        <NavBar
          title="Check Out"
          style={{
            height: "9%",
            marginBottom: "5%",
            backgroundColor: "#FFFAFA",
            borderColor: "lightgray",
            borderWidth: 1,
            marginTop: "1%",
          }}
          titleStyle={{ color: "#4C4AAB", fontSize: 22, fontWeight: "bold" }}
        />
        <View style={styles.main}>
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          {/* <View style={styles.main}> */}
          <Block style={styles.hed1}>
            <Text style={styles.text1}>Contact Information</Text>
            <Text></Text>

            <View
              style={{
                width: "80%",
                // backgroundColor: "red",
                height: "20%",
                marginLeft: "9%",
                // justifyContent: "center",
                // alignItems: "center",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "70%",
                  flexDirection: "row",
                  // backgroundColor: "gray",
                  height: "30%",
                }}
              >
                <Entypo name="location" color="#842DCE" size={34} />
                <Text style={{ marginLeft: "5%", fontSize: 19 }}>{zone}</Text>
              </View>
              {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{zone}</Text> */}

              <View
                style={{
                  width: "70%",
                  flexDirection: "row",
                  // backgroundColor: "pink",
                  height: "30%",
                }}
              >
                <Entypo name="phone" color="#842DCE" size={32} />
                <Text style={{ marginLeft: "5%", fontSize: 19 }}>
                  +974 {phone}
                </Text>
              </View>

              {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{phone}</Text> */}

              <View
                style={{
                  width: "70%",
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  height: "30%",
                }}
              >
                <Entypo name="email" color="#842DCE" size={29} />
                <Text style={{ marginLeft: "5%", fontSize: 19 }}>{id}</Text>
              </View>
              {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{theUser}</Text> */}
            </View>
            {/* <Text></Text> */}

            <View
              style={{
                width: "90%",
                height: "50%",
                // borderWidth: 1,
                marginLeft: "5%",
                marginTop: "5%",
                // backgroundColor: "yellow",
                padding: "1%",
              }}
            >
              <Text style={{ fontSize: 20, marginLeft: 15 }}>
                Select delivary time:
              </Text>
              {timeError !== "" ? (
                <Text style={{ fontSize: 15, color: "red", marginLeft: 20 }}>
                  {timeError}
                </Text>
              ) : null}

              <Block
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  height: "15%",
                  marginBottom: "5%",
                  marginTop: "3%",
                  marginLeft: 15,
                  width: "100%",
                }}
              >
                <Pressable
                  onPress={() => setTime("8AM - 12PM")}
                  style={{
                    backgroundColor:
                      time == "8AM - 12PM" ? "#4C4AAB" : "purple",
                    margin: "2%",
                    height: "85%",
                    width: "29%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    8AM - 12PM
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setTime("12PM - 6PM")}
                  style={{
                    backgroundColor:
                      time == "12PM - 6PM" ? "#4C4AAB" : "purple",
                    margin: "2%",
                    height: "85%",
                    width: "29%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    12PM - 6PM
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setTime("6PM - 10PM")}
                  style={{
                    backgroundColor:
                      time == "6PM - 10PM" ? "#4C4AAB" : "purple",
                    margin: "2%",
                    height: "85%",
                    width: "30%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    6PM - 10PM
                  </Text>
                </Pressable>
              </Block>

              <Text style={{ fontSize: 20, marginLeft: 15 }}>
                Select delivary date:
              </Text>
              {timeError !== "" ? (
                <Text style={{ fontSize: 15, color: "red", marginLeft: 20 }}>
                  {dateError}
                </Text>
              ) : null}
              <Block
                style={{
                  width: "70%",
                  marginLeft: "15%",
                  height: "55%",
                  marginTop: "2%",
                }}
              >
                <Pressable
                  onPress={() => setDate(`${dateString} - ${first2date}`)}
                  style={{
                    backgroundColor:
                      date == `${dateString} - ${first2date}`
                        ? "#4C4AAB"
                        : "purple",
                    margin: "2%",
                    height: "25%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {dateString} - {first2date}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setDate(`${sec1date} - ${sec2date}`)}
                  style={{
                    backgroundColor:
                      date == `${sec1date} - ${sec2date}`
                        ? "#4C4AAB"
                        : "purple",
                    margin: "2%",
                    height: "25%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {sec1date} - {sec2date}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setDate(`${third1date} - ${third2date}`)}
                  style={{
                    backgroundColor:
                      date == `${third1date} - ${third2date}`
                        ? "#4C4AAB"
                        : "purple",
                    margin: "2%",
                    height: "25%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {third1date} - {third2date}
                  </Text>
                </Pressable>
              </Block>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Pressable
                onPress={() => validation()}
                style={{
                  marginBottom: "5%",
                  marginTop: "8%",
                  backgroundColor: "#4C4AAB",
                  height: 50,
                  width: "75%",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  //marginLeft: "10%",
                  borderRadius: 8,
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                >
                  Confirm
                </Text>
              </Pressable>
            </View>
          </Block>

          <Text></Text>
          <Text></Text>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
      <Block
        style={{
          height: "9%",
          backgroundColor: "#FFFAFA",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderColor: "lightgray",
          borderWidth: 1,
          marginBottom: "1%",
          alignItems: "center",
          // paddingLeft: "1%",
        }}
      >
        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("FamilyHome", id)}
        >
          <FontAwesome5 name="house-user" color="#4C4AAB" size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%", marginRight: "7%", marginLeft: "7%" }}
          onPress={() => navigation.navigate("FamilyCart", { cartId, id })}
        >
          <FontAwesome5 name="shopping-cart" color="#4C4AAB" size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("FamilyProfile", id)}
        >
          <FontAwesome5 name="user-alt" color="#4C4AAB" size={40} />
        </Pressable>
      </Block>
    </Block>
  );
};

export default ConfirmFamilyCart;

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: "#490066",
    height: "100%",
  },
  main: {
    // backgroundColor: "#F3E8EA",
    backgroundColor: "#fbe5ff",
    width: "90%",
    marginLeft: "5%",
    // marginTop: "5%",
    // borderColor: "#842DCE",
    // borderWidth: 3,
    borderRadius: 10,
    height: "86%",
  },
  text1: {
    color: "#842DCE",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "7%",
  },
});

{
  /* <FlatList
                    style={{ marginLeft: 8 }}
                    // horizontal
                    data={WType}
                    keyExtractor={(item) => {
                      return item.id;
                    }}
                    renderItem={(item) => {
                      return (
                        <Pressable
                          style={[styles.circle]}
                          onPress={() => {
                            setModalVisible(true);
                            setType(item.key);
                            setAgeGroup(groups[index]);
                          }}
                        >
                          <Text style={styles.ct}>{item.key}</Text>
                        </Pressable>
                      );
                    }}
                  /> */
}
