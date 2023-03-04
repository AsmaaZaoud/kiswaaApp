import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../config";
const FeedbackConf = ({ route, navigation }) => {
  const mood = route.params.mood;
  console.log(mood);
  const [feedback, setfeedback] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [dateCreated, setDateCreated] = useState(new Date());
  console.log(feedbackText);
  console.log(feedback);
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../Images/checked.png")}
        style={{
          width: "31%",
          height: "15%",
          zIndex: 999,
          marginBottom: "5%",
        }}
      ></Image>
      <Text></Text>
      {/* <Text></Text> */}
      <LinearGradient
        colors={[
          "rgba(222,190,299,1)",
          "rgba(222,190,299,1)",
          "rgba(222,190,299,1)",
          "rgba(222,190,299,1)",
          "rgba(222,190,299,1)",
          "rgba(222,190,299,1)",
          "transparent",
        ]}
        style={[
          StyleSheet.absoluteFill,
          {
            height: 390,
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#debee3",
          },
        ]}
      />
      <BlurView
        // tint="light"
        intensity={100}
        style={{
          width: 350,
          height: 390,
          borderWidth: 2,
          borderColor: "#fff",
          padding: 20,
          borderRadius: 25,
          //zIndex: 999,
        }}
      >
        <Text></Text>

        <Text style={{ fontSize: 25, textAlign: "center", marginBottom: "6%" }}>
          Thank you
        </Text>

        {mood === "Excellent" ? (
          <Text
            style={{ fontSize: 18, textAlign: "center", marginBottom: "6%" }}
          >
            We’re so happy to hear from you! Thank you for your valuable
            feedback.
          </Text>
        ) : mood === "Mid" ? (
          <Text
            style={{ fontSize: 18, textAlign: "center", marginBottom: "6%" }}
          >
            Thank you for reaching out and providing us with valuable feedback.
            We will try our best to satisfy you
          </Text>
        ) : mood === "Verybad" ? (
          <Text
            style={{ fontSize: 18, textAlign: "center", marginBottom: "6%" }}
          >
            We’re sorry to hear that you didn’t have a great experience with our
            service. we will try our best to improve
          </Text>
        ) : null}

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Pressable
            style={{
              // marginBottom: "10%",
              backgroundColor: "#842DCE",
              height: 50,
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              //marginLeft: "10%",
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate("Feedback")}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              More Feedback
            </Text>
          </Pressable>
        </View>
        <Text></Text>
        <Text></Text>
      </BlurView>
    </View>
  );
};

export default FeedbackConf;
