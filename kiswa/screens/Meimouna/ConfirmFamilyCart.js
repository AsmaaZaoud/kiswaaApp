import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Block, Checkbox, theme, NavBar, Icon } from "galio-framework";
import { Feather, AntDesign, Entypo } from "react-native-vector-icons";
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
const ConfirmFamilyCart = ({ route, navigation }) => {
  const colors = [
    { label: "Black", value: "1" },
    { label: "White", value: "2" },
    { label: "Red", value: "3" },
    { label: "Green", value: "4" },
    { label: "Yellow", value: "5" },
    { label: "Blue", value: "6" },
    { label: "Pink", value: "7" },
    { label: "Gray", value: "8" },
    { label: "Brown", value: "9" },
    { label: "Orange", value: "10" },
    { label: "Purple", value: "11" },
  ];

  // const [userinforr, setUserinforr] = useState([]);
  const { cartId, id } = route.params;

  const closeRequest = async () => {
    const docRef = doc(db, "familyRequests", cartId);

    await setDoc(
      docRef,
      {
        cart: "closed",
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

  const [theUser, setTheUser] = useState("");
  const [zone, setZone] = useState("");
  const [phone, setPhone] = useState("");
  // const [theUser, setTheUser] = useState("");
  useEffect(() => {
    getFamily();
  }, [id]);

  const getFamily = async () => {
    console.log(id);
    const docRef = doc(db, "families", id);
    const docSnap = await getDoc(docRef);
    let temp = [];
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      // temp.push({
      //   id: docSnap.id,
      //   // data: docSnap.data(),
      //   zone: docSnap.data().zone,
      //   phone: docSnap.data().phone,
      //   email: docSnap.data().email,
      // });
      setTheUser(docSnap.data().email);
      setPhone(docSnap.data().phone);
      setZone(docSnap.data().zone);
      //   setNanny(temp);
      // console.log(theUser);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.main}>
        <Block style={styles.hed1}>
          <Text style={styles.text1}>Conform request</Text>
          <Text></Text>

          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{ width: "95%", flexDirection: "row", marginLeft: "11%" }}
            >
              <Entypo name="location" color="#842DCE" size={34} />
              <Text style={{ marginLeft: "5%", fontSize: 19, marginTop: "1%" }}>
                {zone}
              </Text>
            </View>
            {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{zone}</Text> */}
            <Text></Text>
            <View
              style={{ width: "95%", flexDirection: "row", marginLeft: "11%" }}
            >
              <Entypo name="phone" color="#842DCE" size={32} />
              <Text style={{ marginLeft: "5%", fontSize: 19, marginTop: "1%" }}>
                +974 {phone}
              </Text>
            </View>

            {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{phone}</Text> */}
            <Text></Text>
            <View
              style={{ width: "95%", flexDirection: "row", marginLeft: "11%" }}
            >
              <Entypo name="email" color="#842DCE" size={29} />
              <Text style={{ marginLeft: "5%", fontSize: 19 }}>{theUser}</Text>
            </View>
            {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{theUser}</Text> */}
          </View>
          <Text></Text>
          {/* <Text style={{ margin: "5%", fontSize: 19, marginTop: "1%" }}>
            <Entypo name="calendar" color="#842DCE" size={32} /> Select Which
            data and time interval for pick-up of donation:
          </Text> */}
          <View
            style={{ width: "90%", height: 200, borderWidth: 1, margin: "5%" }}
          >
            <Text>Delivery Time</Text>
            <Text>Delivery Date</Text>
            {/* <Text>you need to inster it in the db</Text> */}
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable
              onPress={() => closeRequest()}
              style={{
                // marginBottom: "10%",
                backgroundColor: "#842DCE",
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

export default ConfirmFamilyCart;

const styles = StyleSheet.create({
  main: {
    // backgroundColor: "#F3E8EA",
    backgroundColor: "#fbe5ff",
    margin: "5%",
    marginTop: "10%",
    borderColor: "#842DCE",
    borderWidth: 3,
    borderRadius: 10,
    height: "83%",
  },
  text1: {
    color: "#842DCE",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "3%",
  },
});
