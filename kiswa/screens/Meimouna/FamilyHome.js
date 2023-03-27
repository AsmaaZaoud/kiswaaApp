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
  EvilIcons,
  Ionicons,
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
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config";
import * as Notifications from "expo-notifications";

const { width } = Dimensions.get("screen");

const FamilyHome = ({ route, navigation }) => {
  const id = route.params;
  //------------------------------------------------------------
  async function schedulePushNotification(noti) {
    await Notifications.scheduleNotificationAsync(noti);
  }
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    const collectionRef = collection(db, "families", id, "notifications");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      querySnapshot.docs.map((doc) =>
        doc.data().seen == "false"
          ? schedulePushNotification({
              content: {
                title: doc.data().title,
                body: doc.data().body,
                data: { data: "goes here" },
              },
              trigger: { seconds: 1 },
            })
          : doc.data()
      );
      setNotifications(querySnapshot.docs.map((doc) => doc.id));
    });

    notifications.map((x) => update(x));

    return () => unsubscribe();
  };
  const update = async (id) => {
    await setDoc(
      doc(db, "families", id, "notifications"),
      {
        seen: "true",
      },
      { merge: true }
    )
      .then(() => {
        console.log("data updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //------------------------------------------------------------
  // console.log(id);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getFamily();
    getNotifications();
  }, [id]);

  useEffect(() => {
    getCart();
  }, [id]);

  const getFamily = async () => {
    console.log(id);
    const docRef = doc(db, "families", id);
    const docSnap = await getDoc(docRef);
    // let temp = [];

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
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
    console.log("in cartt..");
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
      console.log("carttID..", temp[0].id);
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

    console.log("NewCart add with ID: ", docRef.id, "for user ", id);
    setCartId(docRef.id);
  };

  console.log(cartId);
  const renderArticles = () => {
    return (
      <View style={{ backgroundColor: "white", width: "100%", height: "90%" }}>
        <NavBar
          title="Home"
          style={{
            height: "10%",
            marginBottom: "8%",
            backgroundColor: "#FFFAFA",
            borderColor: "lightgray",
            borderWidth: 1,
            // marginTop: "8%",
          }}
          titleStyle={{ color: "#4C4AAB", fontSize: 22, fontWeight: "bold" }}
        />
        {/* welcome user */}
        <Block style={styles.header1}>
          <Block>
            <Text style={styles.text}>Welcome,</Text>
            <Text style={styles.textt}>{userName}</Text>
          </Block>
          <Block>
            <Image
              style={{
                width: 90,
                height: 90,
              }}
              source={require("../../assets/Fatima/donation.png")}
            ></Image>
          </Block>
        </Block>
        {/* about rahma */}
        <Block style={styles.header2}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Rahma
          </Text>
          <Text style={{ width: "66%", color: "white", fontSize: 15 }}>
            We connect with clothing donators to fulfill your requests while
            protecting your privacy and security.
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
          height: "8%",
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
          <Ionicons name="home-outline" color={"#f8a069"} size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%", marginRight: "7%", marginLeft: "7%" }}
          onPress={() => navigation.navigate("FamilyCart", { cartId, id })}
        >
          <Ionicons name="cart-outline" color="#1a1f87" size={45} />
        </Pressable>

        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("FamilyProfile", id)}
        >
          <EvilIcons name="user" color="#1a1f87" size={50} />
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
    marginBottom: "7%",
    width: "85%",
  },
  header2: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "6%",
    height: "15%",
    backgroundColor: "#1a1f87",
    borderRadius: 10,
    width: "86%",
    marginBottom: "8%",
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
    fontSize: 24,
    margin: 5,
  },
  textt: {
    fontSize: 27,
    margin: 5,
    fontWeight: "bold",
    color: "#B21807",
  },
  box1: {
    width: 160,
    height: 150,
    backgroundColor: "#E6EBFD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  box2: {
    width: 160,
    height: 150,
    backgroundColor: "#FFF8E5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  box3: {
    width: 160,
    height: 150,
    marginLeft: "7%",
    marginTop: "7%",
    backgroundColor: "#EDFDF9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 2,
  },
});
