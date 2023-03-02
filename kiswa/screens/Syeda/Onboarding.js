import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
  PixelRatio,
  Platform,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { width, height } = Dimensions.get("screen");
const scale = width / 450;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
import argonTheme from "../../constants/Theme";
import Images from "../../constants/Images";

const Onboarding = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");
  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);
  return (
    <Block flex style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/Fatima/background.png")}
        style={{ width, height, zIndex: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text
            style={{
              marginTop: "17%",
              marginLeft: "80%",
              color: "#FAF9F6",
              fontFamily: "Cochin",
              fontSize: normalize(18),
            }}
            bold
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
                style={
                  deviceType == "mobile" ? styles.images : styles.imagesIpad
                }
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
                style={
                  deviceType == "mobile" ? styles.images : styles.imagesIpad
                }
                source={require("../../assets/Fatima/donation.png")}
              ></Image>

              <Text style={styles.lable}>RECEIVE</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </ImageBackground>

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

      {/* <Block
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      > */}
    </Block>
    // </Block>
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
    // marginTop: "10%",
    resizeMode: "contain",
    // borderWidth: 1,
    marginTop: 0,
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
  lable: {
    color: "#FAF9F6",
    textAlign: "center",
    fontFamily: "Cochin",
    fontSize: normalize(19),
    // justifyContent: "center",
  },
  images: {
    width: width - theme.SIZES.BASE * 18,
    height: theme.SIZES.BASE * 18,
    resizeMode: "contain",
    marginTop: "30%",
  },
  imagesIpad: {
    width: width - theme.SIZES.BASE * 30,
    height: theme.SIZES.BASE * 18,
    resizeMode: "contain",
    marginTop: "40%",

    // borderWidth: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Onboarding;
