import { Alert, StatusBar, Image } from "react-native";
import React from "react";

import { Button, Icon } from "react-native-elements";
import Onboarding from "react-native-onboarding-swiper";
import MaterialIcons from "react-native-vector-icons";

//onboarding page to welcome first time users and give them a introduction of what the app is for
const AppOnboard = ({ route, navigation }) => {
  return (
    <Onboarding
      showDone={false}
      onSkip={() => navigation.navigate("Onboarding")}
      //stores the data in pages array, and each object is for a different page
      //the properties are title, subtitile, background color, and an image
      pages={[
        {
          title: "Welcome to Rahma!",
          subtitle:
            "Rahma is a free platform on which you can either choose to become a donor and donate clothes or a receiver and receive clothes.",
          backgroundColor: "#4B0095",

          image: (
            <Image
              style={{ width: "90%", height: 140 }}
              source={{
                uri: "../../assets/Fatima/Whitelogo-noBackground.png",
              }}
            />
          ),
        },
        {
          title: "Environment Friendly",
          subtitle:
            "We accept clothes of all quality types. The good quality ones go to people who requested them, and the worn out ones go to recycling organizations.",
          backgroundColor: "#4B0095",
          image: (
            <Image
              style={{ width: 300, height: 200 }}
              source={require("../../Images/eco-friendly.gif")}
            />
          ),
        },
        {
          title: "Secured Privacy",
          subtitle:
            "We do not ask for any personal information other than the necessary contact information. All of your personal details are private and will never be shared with anyone.",
          backgroundColor: "#4B0095",
          image: (
            <Image
              style={{ width: 300, height: 200 }}
              source={require("../../Images/privacy.gif")}
            />
          ),
        },
        {
          title: "Door-to-door service",
          subtitle:
            "We will come to your house to pick-up/deliver the donation.",
          backgroundColor: "#4B0095",
          image: (
            <Image
              style={{ width: 300, height: 200 }}
              source={require("../../Images/home.gif")}
            />
          ),
        },
        {
          //this button takes you to the login page
          title: "Are You Ready?",
          subtitle: (
            <Button
              title={"Get Started"}
              containerViewStyle={{ marginTop: 20 }}
              backgroundColor={"white"}
              borderRadius={5}
              textStyle={{ color: "#003c8f" }}
              onPress={() => {
                navigation.navigate("Onboarding"); //can put Home here instead of onboard //basically whatever page you want the user to go to after they press 'get started'
                StatusBar.setBarStyle("default");
              }}
            />
          ),
          backgroundColor: "#4B0095",
          image: (
            <Image
              style={{ width: "90%", height: 140 }}
              source={{
                uri: "https://raw.githubusercontent.com/AsmaaZaoud/rahmaaApp/Fatima/rahma/assets/Fatima/Whitelogo-noBackground.png",
              }}
            />
          ),
        },
      ]}
    />
  );
};

export default AppOnboard;

//https://blog.openreplay.com/setting-up-onboarding-screens-in-react-native/
//to clear up data on android emulator
//npx react-native run-android
//after runnning this command you should (or maybe not idk) be able to see the onboarding screens againn
//whitelogo url
//https://raw.githubusercontent.com/AsmaaZaoud/rahmaaApp/Fatima/rahma/assets/Fatima/Whitelogo-noBackground.png
