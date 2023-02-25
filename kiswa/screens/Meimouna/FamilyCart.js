import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Block, Checkbox, theme, NavBar, Icon } from "galio-framework";

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
const FamilyCart = ({ route, navigation }) => {
  const { cartId, id } = route.params;

  console.log("idd..", id);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getCartItems();
  }, [cartId]);

  const getCartItems = async () => {
    console.log(cartId);
    const docRef = collection(db, "familyRequests", cartId, "Items");
    const docSnap = await getDocs(docRef);
    let temp = [];
    docSnap.forEach((doc) => {
      //   console.log("mm");
      temp.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log(temp);
    setCart(temp);
    console.log(cart);
  };

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

  return (
    <View style={styles.main}>
      <Block style={styles.hed1}>
        <Text style={styles.text1}>Cart Items</Text>
        {/* <Text style={styles.text1}> </Text> */}
      </Block>
      <View style={{ marginLeft: "8%" }}>
        {cart.map((x, i) => (
          <View>
            <View key={i} style={styles.board1}>
              {/* <Text style={styles.ct}>{i + 1}</Text> */}
              <Text style={styles.ct}>
                {x.data.ageGroup} <Text> </Text>
                {x.data.type}
              </Text>
              <Text style={styles.ct}></Text>
            </View>
            <View key={i + 2} style={styles.board2}>
              <Text style={styles.ctt}>{x.data.color}</Text>
              <Text style={styles.ctt}>{x.data.size}</Text>
              <Text style={styles.ctt}>{x.data.quantity}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.ctt}> Total items: {cart.length}</Text>
        {cart.length >= 1 ? null : (
          <View style={{ marginTop: "5%" }}>
            <Text style={styles.ct}> Your Cart is Empty! </Text>
            <Text style={styles.ct}> Please add Items </Text>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => navigation.navigate("FamilyRequest", id)}
        style={{
          marginTop: "60%",
          marginBottom: "10%",
          backgroundColor: "#842DCE",
          height: 50,
          width: "60%",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "20%",
          borderRadius: 8,
          padding: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Add More Items
        </Text>
      </Pressable>
      <Pressable
        onPress={() => (cart.length >= 1 ? closeRequest() : null)}
        style={{
          marginBottom: "10%",
          backgroundColor: cart.length >= 1 ? "#842DCE" : "gray",
          height: 50,
          width: "60%",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "20%",
          borderRadius: 8,
          padding: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Submit Request
        </Text>
      </Pressable>
    </View>
  );
};

export default FamilyCart;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#F3E8EA",
    margin: "5%",
    marginTop: "10%",
    borderColor: "#842DCE",
    borderWidth: 3,
    borderRadius: 10,
    height: "80%",
  },
  hed1: {
    // backgroundColor: "yellow",
    height: "10%",
    margin: "10%",
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: "#842DCE",
    fontSize: 26,
    fontWeight: "bold",
  },
  board1: {
    width: "50%",
    margin: "2%",
    borderColor: "black",
    // borderWidth: 5, #FDEEF4
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "lightpink",
    alignItems: "center",
    // borderBottomWidth: 1,
  },
  board2: {
    width: "60%",
    marginLeft: "5%",
    marginBottom: "5%",
    paddingBottom: "5%",
    borderColor: "black",
    paddingLeft: "5%",
    // borderWidth: 5, #FDEEF4
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "lightpink",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  ct: {
    color: "#842DCE",
    fontSize: 18,
    // fontWeight: "bold",
  },
  ctt: {
    fontSize: 16,
    // fontWeight: "bold",
  },
});
