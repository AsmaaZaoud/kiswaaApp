import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteField,
  onSnapshot,
  getDocs,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config";

const { width, height } = Dimensions.get("screen");

const LoginDonor = ({ navigation }) => {
  const [error, setError] = useState();

  const [email, setEmail] = useState();
  //const [emailError, setEmailError] = useState()

  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();

  const [signedIn, setSignedIn] = useState(false);

  // const reformat = (doc) => {
  //   console.log({ id: doc.id, ...doc.data() });

  //   return { id: doc.id, ...doc.data() };
  // };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in");
        setSignedIn(true);
        // navigation.navigate("Home");
        navigation.replace("App");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/missing-email).") {
          setError("Please enter your email id.");
          setPasswordError("");
        }
        if (error.message === "Firebase: Error (auth/internal-error).") {
          setError("Incorrect email or no password.");
          setPasswordError("");
        }
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setError("");
          setPasswordError("Wrong password.");
        }
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setError("This email is not registered. Sign up first.");
          setPasswordError("");
        }
        console.log(error.message);
        setSignedIn(false);
      });
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              {/* <Pressable onPress={() => navigation.navigate("Onboarding")}>
                <Image
                  style={styles.backButton}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/54/54623.png",
                  }}
                ></Image>
              </Pressable> */}
              <Text
                style={{ padding: 20, color: "blue" }}
                onPress={() => navigation.goBack()}
              >
                Go Back
              </Text>
              <Block flex={0.17} middle>
                <Image
                  source={require("../../Images/purple_transparent.png")}
                  style={{ width: 250, height: 200 }}
                />
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Text style={{ color: "red" }}>{error}</Text>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
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
                  </Block>

                  <Text style={{ color: "red" }}>{passwordError}</Text>
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
                  </Block>

                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={handleLogin}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Log In
                      </Text>
                    </Button>
                    {/* <Text style={{marginTop: 10}}>Don't have an Account ?</Text> */}
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => navigation.navigate("Register")}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Sign Up
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
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    margin: 20,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default LoginDonor;
