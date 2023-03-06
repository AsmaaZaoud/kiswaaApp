import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";

import React from "react";
import { Block, Checkbox, Text, theme, NavBar, Icon } from "galio-framework";
import { Header } from "../../components";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../../config";
const { width } = Dimensions.get("screen");

const FamilyHome = ({ route, navigation }) => {
  const id = route.params;

  // console.log(id);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getFamily();
    getCart();
  }, [id]);

  const getFamily = async () => {
    console.log(id);
    const docRef = doc(db, "families", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      //   let temp = [];
      setUserName(docSnap.data().userName);
      //   setNanny(temp);
      console.log(userName);
    } else {
      console.log("No such document!");
    }
  };
  const [cartId, setCartId] = useState("");

  const getCart = async () => {
    console.log(id);
    console.log("cartt..");
    const q = query(
      collection(db, "familyRequests"),
      where("familyID", "==", id),
      where("cart", "==", "open")
    );
    console.log("gett.");
    const docs = await getDocs(q);
    // console.log(docs.forEach((doc) => doc.data()));
    let temp = [];
    docs.forEach((doc) => {
      console.log("mm");
      temp.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log(temp);
    if (temp.length > 0) {
      console.log(temp);
      setCartId(temp[0].id);
      console.log(cartId);
    } else {
      console.log("no open cart");
      // console.log(cartId);
      NewCart();
    }
  };
  const NewCart = async () => {
    const docRef = await addDoc(collection(db, "familyRequests"), {
      familyID: id,
      cart: "open",
      status: "pending",
    });

    console.log("Request add with ID: ", docRef.id, "for user ", id);
    setCartId(docRef.id);
  };
  const renderArticles = () => {
    return (
      <View style={{ backgroundColor: "white", width: "100%", height: "90%" }}>
        <NavBar
          title="Home"
          style={{
            height: "10%",
            marginBottom: "9%",
            backgroundColor: "#FFFAFA",
            borderColor: "lightgray",
            borderWidth: 1,
            marginTop: "1%",
          }}
          titleStyle={{ color: "#4C4AAB", fontSize: 22, fontWeight: "bold" }}
        />
        {/* welcome user */}
        <Block style={styles.header1}>
          <Block>
            <Text style={styles.text}>Welcome</Text>
            <Text style={styles.textt}>{userName}</Text>
          </Block>
          <Block>
            {/* <Image
            source={require("../../assets/imgs/FamilyUser.png")}
            style={{
              width: 100,
              height: 100,
            }}
          /> */}
            <Pressable
              onPress={() => navigation.navigate("FamilyCart", { cartId, id })}
              // style={{
              //   marginTop: "20%",
              //   marginBottom: "10%",
              //   backgroundColor: "#842DCE",
              //   height: "18%",
              //   width: "60%",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   marginLeft: "20%",
              //   borderRadius: 8,
              //   padding: 5,
              // }}
            >
              <Image
                source={require("../../assets/imgs/cart.png")}
                style={{
                  width: 90,
                  height: 90,
                }}
              />
            </Pressable>
          </Block>
        </Block>
        {/* about kiswa */}
        <Block style={styles.header2}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Kiswa
          </Text>
          <Text style={{ width: "70%", color: "white", fontSize: 15 }}>
            Creative engineers and data scientists building a world where you
            can belong anywhere
          </Text>
        </Block>
        {/* request and history */}
        <Block>
          <Block style={styles.header3}>
            <TouchableOpacity
              onPress={() => navigation.navigate("FamilyRequest", id)}
            >
              <Block style={styles.box1}>
                <Image
                  source={require("../../assets/imgs/requstClothes.png")}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                ></Image>
                <Text>Request Clothes</Text>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("RequestHistory", id)}
            >
              <Block style={styles.box2}>
                <Image
                  source={require("../../assets/imgs/rqustHistory.png")}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                ></Image>
                <Text>Requests History</Text>
              </Block>
            </TouchableOpacity>
          </Block>
          {/* feedback */}

          <Block style={styles.box3}>
            <Pressable
              onPress={() => navigation.navigate("FamilyFeedback", id)}
              styles={{ backgroundColor: "gray" }}
            >
              <Image
                source={require("../../assets/imgs/feedback.png")}
                style={{
                  width: 100,
                  height: 100,
                }}
              ></Image>
              <Text>Give Feedback</Text>
            </Pressable>
          </Block>
        </Block>
      </View>
    );
  };
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
      <Block
        style={{
          height: "10%",
          backgroundColor: "#FFFAFA",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderColor: "lightgray",
          borderWidth: 1,
          marginBottom: "2%",
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

export default FamilyHome;

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: "#490066",
    height: "100%",
  },
  header1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "6%",
    marginBottom: 10,
    width: "88%",
  },
  header2: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "5%",
    height: "15%",
    backgroundColor: "#4C4AAB",
    borderRadius: 10,
    width: "90%",
    marginBottom: "5%",
  },
  header3: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "7%",
    height: "35%",
    borderRadius: 10,
    // backgroundColor: "gray",
    width: "84%",
  },
  text: {
    fontSize: 26,
    margin: 5,
  },
  textt: {
    fontSize: 26,
    margin: 5,
    fontWeight: "bold",
  },
  box1: {
    width: 160,
    height: 150,
    backgroundColor: "#E6EBFD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  box2: {
    width: 160,
    height: 150,
    backgroundColor: "#FFF8E5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  box3: {
    width: 160,
    height: 150,
    marginLeft: "6%",
    marginTop: "7%",
    backgroundColor: "#EDFDF9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
  },
});
