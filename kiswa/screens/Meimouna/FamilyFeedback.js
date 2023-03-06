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
const FamilyFeedback = ({ route, navigation }) => {
  const [feedback, setfeedback] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [dateCreated, setDateCreated] = useState(new Date());
  const id = route.params;

  // const auth = getAuth();
  // const user = auth.currentUser;

  console.log(id);
  const [FeedbackErro, setFeedbackError] = useState("");
  // const [FeedbackTextErro, setFeedbackTextError] = useState("");

  const addvild = () => {
    if (feedback.length != 0) {
      setFeedbackError("");
    } else {
      setFeedbackError("Select From Above");
    }

    // if (feedbackText.length <= 150) {
    //   setFeedbackTextError("");
    // } else {
    //   setFeedbackTextError("Maximize is 150 characters");
    // }

    if (feedback.length != 0) {
      console.log("okay");
      add();
    }
  };
  const add = async () => {
    const docRef = await addDoc(collection(db, "feedback"), {
      rate: feedback,
      comment: feedbackText,
      dateTime: dateCreated.toLocaleDateString(),
      type: "family",
      user: id,
      dateTime: new Date(),
    })
      .then(() => {
        console.log("feedback added");
        navigation.navigate("FeedbackConf", { mood: feedback });

        setFeedbackText("");
        setfeedback(""); //not updateing the feied feedback
        setDateCreated(new Date());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            height: 399,
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#debee3",
          },
        ]}
      />
      <View style={{ height: "30%" }}>
        <Image
          source={require("../../assets/imgs/feedback2.png")}
          style={{
            width: "30%",
            height: "15%",
            // zIndex: 999,
            // marginBottom: "5%",
          }}
        ></Image>

        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Feedback
        </Text>
      </View>
      <BlurView
        // tint="light"
        intensity={100}
        style={{
          width: 350,
          height: 600,
          borderWidth: 2,
          borderColor: "#fff",
          padding: 20,
          borderRadius: 25,
          //zIndex: 999,
        }}
      >
        {/* <Text></Text>
        <Text></Text>
        <Text></Text> */}
        <Text style={{ fontSize: 18, marginBottom: "6%" }}>
          How satisfied are you with Kiswa?
        </Text>
        {/* <Text></Text> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            //justifyContent: "center",
            //backgroundColor: "red",
            height: 90,
          }}
        >
          <TouchableOpacity
            // style={{ width: "30%" }}
            style={{
              backgroundColor: "white",
              width: "31%",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderWidth: 2,
              borderColor: feedback == "Excellent" ? "#842DCE" : "lightgray",
              padding: "1%",
            }}
            onPress={() => setfeedback("Excellent")}
          >
            <Image
              source={require("../../assets/imgs/Excellent-removebg-preview.png")}
              style={{
                width: "82%",
                height: "100%",
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: "30%",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderWidth: 2,
              borderColor: feedback == "Mid" ? "#842DCE" : "lightgray",
              padding: "1%",
            }}
            onPress={() => setfeedback("Mid")}
          >
            <Image
              source={require("../../assets/imgs/medium-removebg-preview.png")}
              style={{
                width: "82%",
                height: "100%",
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: "31%",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderWidth: 2,
              borderColor: feedback == "Verybad" ? "#842DCE" : "lightgray",
              padding: "1%",
            }}
            onPress={() => setfeedback("Verybad")}
          >
            <Image
              source={require("../../assets/imgs/veryBad-removebg-preview.png")}
              style={{
                width: "77%",
                height: "100%",
                // backgroundColor: "red",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            //textAlign: "center",
            color: "red",
            fontWeight: "bold",
            fontSize: 15,
            //marginLeft: 20,
          }}
        >
          {FeedbackErro}
        </Text>
        <Text></Text>
        <Text style={{ fontSize: 18, marginBottom: "5%" }}>
          Do you have any thoughts you'd like to share?
        </Text>
        <TextInput
          value={feedbackText}
          placeholder="Write something here"
          onChangeText={setFeedbackText}
          multiline={true}
          textAlignVertical={"top"}
          style={{
            borderWidth: 2,
            borderRadius: 20,
            borderColor: "white",
            height: 200,
            paddingLeft: "3%",
            zIndex: -1,
            //paddingBottom: "10%",
            backgroundColor: "#e6e3e3",
            paddingTop: "20%",
            fontSize: 16,
          }}
        />
        {/* <Text style={{ fontSize: 15 }}>
          {feedbackText.length == 0 ? "" : feedbackText.length + " Characters"}
        </Text> */}
        {/* <Text
          style={{
            //textAlign: "center",
            color: "red",
            fontWeight: "bold",
            fontSize: 15,
            //marginLeft: 20,
          }}
        >
          {FeedbackTextErro}
        </Text> */}
        <Text></Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Pressable
            style={{
              // marginBottom: "10%",
              backgroundColor: "#808080",
              height: 50,
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              //marginLeft: "10%",
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate("FamilyHome", id)}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={{
              // marginBottom: "10%",
              backgroundColor: "#842DCE",
              height: 50,
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              //marginLeft: "10%",
              borderRadius: 8,
            }}
            onPress={() => addvild()}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Send
            </Text>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
};

export default FamilyFeedback;
