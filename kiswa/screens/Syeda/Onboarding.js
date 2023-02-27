import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../../constants/Theme";
import Images from "../../constants/Images";

const Onboarding = ({ navigation }) => {
  return (
    <Block flex style={styles.container}>
      <Block center>
        <Image source={require("../../assets/imgs/kiswaLogo.jpg")} />
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text
            style={{ marginTop: "17%", marginLeft: "85%", color: "#C5C5C5" }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <Block center style={{ marginTop: "20%" }}>
          <Image
            source={require("../../assets/Fatima/Logo.png")}
            style={styles.logo}
          />
        </Block>

        {/* <Block center style={{ width: "90%", marginTop: "30%" }}>
        <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
          Kiswa is a free platform on which you can either choose to become a
          donor and donate clothes or a receiver and receive clothes.
        </Text>

        <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
          We accept clothes of all quality types. The good quality ones go to
          people who requested them and the worn out ones go to recycling
          organizations.
        </Text>
      </Block> */}
        <Block center style={{ width: "90%", marginTop: "5%" }}>
          <Text style={{ color: "white", fontSize: 19, textAlign: "center" }}>
            "The Upper hand is better than the lower hand"
          </Text>
          <Text style={{ color: "white", fontSize: 19, textAlign: "center" }}>
            "اليد العليا خير من اليد السفلى"ﷺ
          </Text>
        </Block>

        {/* <Block
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Block>
          <TouchableOpacity onPress={() => navigation.replace("App")}>
            <Image
              style={{
                width: 150,
                height: 150,
                tintColor: "white",
                borderWidth: 3,
                borderColor: "white",
                margin: 20,
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/812/812319.png",
              }}
            ></Image>
          </TouchableOpacity>
          <Text style={{ color: "white", textAlign: "center" }}>DONOR</Text>
        </Block>
        <Block>
      > */}

        <Block
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Block style={{ marginLeft: "3%" }}>
            <TouchableOpacity onPress={() => navigation.replace("App")}>
              <Image
                style={styles.images}
                source={require("../../assets/Fatima/heart.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.lable}>DONATE</Text>
          </Block>
          <Block style={{ marginLeft: "17%" }}>
            <TouchableOpacity
              onPress={() => navigation.replace("RegisterFamily")}
            >
              <Image
                style={styles.images}
                source={require("../../assets/Fatima/donation.png")}
              ></Image>

              <Text style={styles.lable}>RECEIVE</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4B0095",
  },
  logo: {
    width: width - theme.SIZES.BASE,
    height: theme.SIZES.BASE * 15,
    position: "relative",
    marginTop: "10%",
    resizeMode: "contain",
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
  lable: {
    color: "#C5C5C5",
    textAlign: "center",
    fontFamily: "Cochin",
    // justifyContent: "center",
  },
  images: {
    width: width - theme.SIZES.BASE * 18,
    height: theme.SIZES.BASE * 18,
    resizeMode: "contain",
  },
});

export default Onboarding;
