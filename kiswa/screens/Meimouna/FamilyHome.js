import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
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
  }, [id]);

  const getFamily = async () => {
    console.log(id);
    const docRef = doc(db, "families", id.toLowerCase());
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
  return (
    <View style={{ backgroundColor: "white" }}>
      <NavBar
        title="Home"
        style={{ height: 80, borderWidth: 1, marginTop: 20, marginBottom: 20 }}
      />
      <Block style={styles.header1}>
        <Block>
          <Text style={styles.text}>Welcom,</Text>
          <Text style={styles.textt}>{userName}</Text>
        </Block>
        <Block>
          <Image
            source={require("../../assets/imgs/FamilyUser.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </Block>
      </Block>

      <Block style={{ margin: 10 }}>
        <Block style={{ margin: 10 }}>
          <Text>Know more About Kiswa</Text>
        </Block>
        <Block style={styles.header2}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Kiswa</Text>
          <Text style={{ width: 180, color: "white" }}>
            Creative engineers and data scientists building a world where you
            can belong anywhere
          </Text>
        </Block>
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
        </Block>
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
    margin: 24,
    marginBottom: 10,
    width: "85%",
  },
  header2: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    height: 140,
    backgroundColor: "#4C4AAB",
    borderRadius: 10,
  },
  header3: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    height: 140,
    borderRadius: 10,
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
  },
  box2: {
    width: 160,
    height: 150,
    backgroundColor: "#FFF8E5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  box3: {
    width: 160,
    height: 150,
    margin: 32,
    backgroundColor: "#EDFDF9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
