import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config";

import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";

const { width, height } = Dimensions.get("screen");

const Register = ({ navigation }) => {


  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState()

  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState()

  const [name, setName] = useState();
  const [nameError, setNameError] = useState()

  const [signedIn, setSignedIn] = useState(false);
  const [flag, setflag] = useState(0);

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");

  let user = auth?.currentUser?.email;
  console.log('user logged in: ', user)

  const handleRegister = () => {
    setflag(0);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        console.log("registered"),
        navigation.navigate("Login")
      )
      .catch((error) => console.log(error.message));
  };


  const validation = async () => {
    if (password.length >= 6) {
      setPasswordError("");
    } else {
      setPasswordError("Password Must Be 6 Chars");
    }

    if (name.length != 0) {
      setNameError("");
    } else {
      setNameError("Enter Your first Name");
    }

    if (phone.length === 8) {
      setPhoneError("");
    } else {
      setPhoneError("Number is not valid");
    }
    // if (stat === "granted") {
    //   setLocationError("");
    // } else {
    //   setLocationError("Allow Location");
    // }

    if (
      //validator.isEmail(email) &&
      password.length >= 6 &&
      name.length != 0 &&
      phone.length === 8
      //&&
      //stat == "granted"
    ) {
      console.log(stat);
      console.log("okay");
      handleRegister();
    }
  };


  // render() {
  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            {/* <Block flex={0.25} middle style={styles.socialConnect}> */}
            {/* <Text color="#8898AA" size={12}>
                  Sign up with
                </Text> */}
            {/* <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block> */}
            {/* </Block> */}

            <Block style={{ alignSelf: 'center' }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require('../Images/donate.png')} />
            </Block>
            <Text size={12} style={{ alignSelf: 'center', padding: 20 }}>
              SIGN UP AS A DONOR
            </Text>

            <Block flex>
              <Block middle >
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Name"
                      value={name}
                      onChangeText={setName}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      {nameError}
                    </Text>
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Phone Number"
                      value={phone}
                      onChangeText={setPhone}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="phone"
                          family="AntDesign"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      {phoneError}
                    </Text>
                  </Block>

                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      {emailError}
                    </Text>
                  </Block>


                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      {passwordError}
                    </Text>
                    {/* <Block row style={styles.passwordCheck}> */}
                    {/* <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text> */}
                    {/* </Block> */}
                  </Block>
                  <Block row width={width * 0.75}>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3
                      }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="I agree with the"
                    />
                    <Button
                      style={{ width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={validation}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        CREATE ACCOUNT
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
  // }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
