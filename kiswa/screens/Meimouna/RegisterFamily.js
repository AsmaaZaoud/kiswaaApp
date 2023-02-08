import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useNavigation } from "@react-navigation/native";
// import validator from "validator";

import { auth } from "../../config";
import { db } from "../../config";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("screen");

export default function RegisterFamily() {
  const navigation = useNavigation();
  const imagePosition = useSharedValue(0);
  const male = ["male1.jpeg", "male2.jpeg", "male3.jpeg"];
  const female = ["female1.jpeg", "female2.jpeg", "female3.jpeg"];

  const [url, setUrl] = useState("");

  const [emailErro, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const [nameErro, setNameError] = useState("");
  const [name, setName] = useState("");

  const [passErro, setPassError] = useState("");
  const [password, setPassword] = useState();

  const [numberErro, setNumberError] = useState("");
  const [number, setNumber] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("registend done");
        // navigation.navigate("Home_Navg");
        add();
      })
      .catch((error) => console.log(error.message));
    //add();
  };
  const add = async () => {
    const docRef = doc(db, "Customer", email);
    await setDoc(docRef, {
      name: name,
      email: email,
      dob: new Date(),
      gender: "",
      image:
        "https://as2.ftcdn.net/v2/jpg/02/45/28/17/1000_F_245281721_2uYVgLSFnaH9AlZ1WWpkZavIcEEGBU84.jpg",
      location: "",
      phone: number,
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const register = async () => {
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("The email is not vaildate");
    }

    if (
      validator.isStrongPassword(pass, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPassError("");
    } else {
      setPassError(
        "Enter A Password A Strong Password Must Be 8 Chars Use A Mix Of Lowercase,Uppercase,Numbers and Symbols"
      );
    }

    if (name.length != 0) {
      setNameError("");
    } else {
      setNameError("Enter Your Name");
    }

    if (number.length === 8) {
      setNumberError("");
    } else {
      setNumberError("Enter Valid Number");
    }

    if (
      validator.isEmail(email) &&
      validator.isStrongPassword(pass, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }) &&
      name.length != 0 &&
      number.length === 8
    ) {
      console.log("okay");
      handleRegister();
    }
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
              <Block flex={0.17} middle>
                <Image source={Images.Logo} />
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
                  </Block>

                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      // onPress={navigation.navigate("RegisterFamily")}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Register
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
});
