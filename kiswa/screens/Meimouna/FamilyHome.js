import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

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
  return (
    <View style={{ backgroundColor: "white" }}>
      <NavBar
        title="Home"
        style={{
          height: "8%",
          borderWidth: 1,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
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

      <Block style={styles.header2}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Kiswa
        </Text>
        <Text style={{ width: "70%", color: "white", fontSize: 15 }}>
          Creative engineers and data scientists building a world where you can
          belong anywhere
        </Text>
      </Block>

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
        <TouchableOpacity
          onPress={() => navigation.navigate("FamilyFeedback", id)}
        >
          <Block style={styles.box3}>
            <Image
              source={require("../../assets/imgs/feedback.png")}
              style={{
                width: 100,
                height: 100,
              }}
            ></Image>
            <Text>Give Feedback</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </View>
  );
};

export default FamilyHome;

const styles = StyleSheet.create({
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
    marginLeft: "6%",
    height: "35%",
    borderRadius: 10,
    // backgroundColor: "gray",
    width: "88%",
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
    marginTop: "6%",
    backgroundColor: "#EDFDF9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
  },
});
