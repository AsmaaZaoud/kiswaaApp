import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
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

  const closeRequest = async () => {
    const docRef = doc(db, "familyRequests", cartId);

    await setDoc(
      docRef,
      {
        cart: "closed",
        dateTime: new Date(),
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
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "95%",
                  flexDirection: "row",
                  marginLeft: "11%",
                }}
              >
                <Entypo name="location" color="#842DCE" size={34} />
                <Text style={{ marginLeft: "5%", fontSize: 19 }}>{zone}</Text>
              </View>
              {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{zone}</Text> */}
              <Text></Text>
              <View
                style={{
                  width: "95%",
                  flexDirection: "row",
                  marginLeft: "11%",
                }}
              >
                <Entypo name="phone" color="#842DCE" size={32} />
                <Text style={{ marginLeft: "5%", fontSize: 19 }}>
                  +974 {phone}
                </Text>
              </View>

              {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{phone}</Text> */}
              <Text></Text>
              <View
                style={{
                  width: "95%",
                  flexDirection: "row",
                  marginLeft: "11%",
                }}
              >
                <Entypo name="email" color="#842DCE" size={29} />
                <Text style={{ marginLeft: "5%", fontSize: 19 }}>{id}</Text>
              </View>
              {/* <Text style={{ fontSize: 18, marginLeft: "20%" }}>{theUser}</Text> */}
            </View>
            <Text></Text>
            {/* <Text style={{ margin: "5%", fontSize: 19, marginTop: "1%" }}>
            <Entypo name="calendar" color="#842DCE" size={32} /> Select Which
            data and time interval for pick-up of donation:
          </Text> */}
            <View
              style={{
                width: "90%",
                height: "50%",
                borderWidth: 1,
                marginLeft: "5%",
              }}
            >
              <Text>Delivery Time</Text>
              <Text>Delivery Date</Text>
              {/* <Text>you need to inster it in the db</Text> */}
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Pressable
                onPress={() => closeRequest()}
                style={{
                  marginBottom: "5%",
                  marginTop: "5%",
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
          onPress={() => navigation.navigate("Onboarding.js")}
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
