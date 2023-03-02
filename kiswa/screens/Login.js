import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config";

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
import { db } from "../config";
import { async } from "@firebase/util";
import { set } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userr, setUserr] = useState("");

  // reformat
  const reformat = (doc) => {
    return { id: doc.id, ...doc.data() };
  };

  const getUser = async () => {
    if (email == "Admin@admin.com") {
      navigation.navigate("AdminHome");
      return;
    }
    const driver = doc(db, "drivers", email.toLowerCase());
    const clerk = doc(db, "inventoryWorkers", email.toLowerCase());
    const family = doc(db, "families", email);
    const donor = doc(db, "donors", email.toLowerCase());

    const driverSnap = await getDoc(driver);
    const clerkSnap = await getDoc(clerk);
    const familySnap = await getDoc(family);
    const donorSnap = await getDoc(donor);

    console.log("11111", driverSnap.exists());
    console.log("2222", clerkSnap.exists());
    console.log("33333", familySnap.exists());
    console.log("4444", donorSnap.exists());

    if (driverSnap.exists()) {
      navigation.navigate("DriverHome");
    } else if (clerkSnap.exists()) {
      navigation.navigate("InventoryClerkHomePage");
    } else if (familySnap.exists()) {
      navigation.navigate("FamilyHome");
    } else if (donorSnap.exists()) {
      navigation.navigate("App");
    }
  };

  const [error, setError] = useState({ satus: false, key: null, msg: "" });
  const handleLogin = () => {
    if (email == null || email == "" || !email.includes("@"))
      setError({
        satus: true,
        key: "email",
        msg: "please Enter a valid email",
      });
    else if (password == null || password == "")
      setError({
        satus: true,
        key: "pass",
        msg: "please Enter a valid password",
      });
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          await getUser();
          setError({ satus: false, key: null, msg: "" });
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
          setError({ satus: true, key: "db", msg: error.message });
          error.code == "auth/user-not-found"
            ? setError({ satus: true, key: "db", msg: "Check your email" })
            : setError({ satus: true, key: "db", msg: error.message });
        });
    }
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={require("../assets/Fatima/background.png")}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex style={{ marginTop: "10%" }}>
              <Block flex={0.17} middle>
                <Image
                  source={require("../assets/Fatima/BlackLogo-noBackground.png")}
                  style={styles.logo}
                />
              </Block>
              <Block flex center style={{ marginTop: "40%" }}>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                      iconContent={
                        <Icon
                          size={16}
                          color={"#5A9DA0"}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    {error.key == "email" && error.satus && (
                      <Text style={{ paddingLeft: "13%" }} color="red">
                        {error.msg}
                      </Text>
                    )}
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
                          color={"#5A9DA0"}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    {error.key == "pass" && error.satus && (
                      <Text style={{ paddingLeft: "13%" }} color="red">
                        {error.msg}
                      </Text>
                    )}
                    {error.key == "db" && error.satus && (
                      <Text style={{ paddingLeft: "13%" }} color="red" bold>
                        {error.msg}
                      </Text>
                    )}
                  </Block>

                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.login}
                      onPress={handleLogin}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Log In
                      </Text>
                    </Button>
                    <Button
                      color={"#F0936F"}
                      style={styles.signUp}
                      onPress={() => navigation.navigate("RegisterFamily")}
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
  logo: {
    width: width - theme.SIZES.BASE * 25,
    height: theme.SIZES.BASE * 60,
    position: "relative",
    resizeMode: "contain",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 6,
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
  login: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor: "#E49D81",
  },
  signUp: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor: "#F0936F",
  },
});

export default Login;
