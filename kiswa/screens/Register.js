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

import validator from "validator";
<<<<<<< HEAD

import * as Location from "expo-location";
=======
import * as Location from "expo-location";
import { ScrollView } from "react-native-gesture-handler";
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38

const Register = ({ navigation }) => {


  const [email, setEmail] = useState();
<<<<<<< HEAD
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState();
  const [passError, setPassError] = useState("");

  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
=======
  const [emailError, setEmailError] = useState()

  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState()

  const [name, setName] = useState();
  const [nameError, setNameError] = useState()
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38

  const [signedIn, setSignedIn] = useState(false);
  const [flag, setflag] = useState(0);

<<<<<<< HEAD
  const [location, setLocation] = useState();
  const [locationError, setLocationError] = useState("");

  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState("");

  const [registerError, setRegisteerError] = useState("");

  const [stat, setStat] = useState("denid");
=======
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");

  const [stat, setStat] = useState("denied");
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38

  let user = auth?.currentUser?.email;
  console.log('user logged in: ', user)

  const handleRegister = () => {
    setflag(0);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        console.log("registered"),
<<<<<<< HEAD
        navigation.navigate("Login")
=======
        navigation.replace("App")
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
      )
      .catch((error) => {
        console.log(error.message)
        setRegisteerError("Email is already in use");
      }
      );
  };

  const validation = async () => {
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Email is not vaild");
    }

    if (password.length >= 6) {
      setPassError("");
    } else {
      setPassError("Password Must Be At least 6 Characters");
    }

    if (name.length != 0) {
      setNameError("");
    } else {
      setNameError("Enter Your Name");
    }

    if (phone.length === 8) {
      setPhoneError("");
    } else {
      setPhoneError("Number is not valid");
    }

    if (
      validator.isEmail(email) &&
      password.length >= 6 &&
      name.length != 0 &&
      phone.length === 8 &&
      stat == "granted"
    ) {
      console.log(stat);
      console.log("okay");
      handleRegister();
    }
  }

  const getLocation = () => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStat(status);
      console.log("stat... ", stat);
      console.log(status);
      if (status !== "granted") {
        console.log("Please grant location permissions");
        //console.log('location', location)
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      //console.log('location', location)
    };
    getPermissions();
  };

  const add = async () => {
    const docRef = doc(db, "donors", email);
    await setDoc(docRef, {
      name: name,
      phone: phone,
      location: location,
      email: email,
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const validation = () => {

    if(email != undefined){
      if (validator.isEmail(email)) {
        setEmailError("");
      } else {
        setEmailError("Email is not vaild");
      }
    }
    else {
      setEmailError("Email is not vaild");
    }


    if(password != undefined){
      if (password.length >= 6) {
        setPasswordError("");
      } else {
        setPasswordError("Password must be at least 6 characters");
      }
    }
    else {
      setPasswordError("Password must be at least 6 characters");
    }


    console.log("name", name)
    //console.log("name value", name.value)

    if (name != undefined) {
      setNameError("");
    } else {
      setNameError("Enter Your first Name");
    }

    if (phone.length === 8) {
      setPhoneError("");
    } else {
      setPhoneError("Phone number should be valid and 8 digits");
    }
    if (stat === "granted") {
      setLocationError("");
    } else {
      setLocationError("Allow Location");
    }

    if (
      validator.isEmail(email) && 
      password != undefined &&
      name != undefined &&
      phone.length === 8 &&
      stat == "granted"
    ) {
      console.log(stat);
      console.log("okay");
      handleRegister();
    }
  };

  const getLocation = () => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStat(status);
      console.log("stat... ", stat);
      console.log(status);
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  };


  // render() {
  return (
<<<<<<< HEAD
    <Block flex middle>
=======
    
    <Block flex middle>
      
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
<<<<<<< HEAD
=======
        
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
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

<<<<<<< HEAD
            <Block style={{ alignSelf: 'center' }}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require('../Images/donate.png')} />
            </Block>
            <Text size={20} style={{ alignSelf: 'center', padding: 20 }}>
              SIGN UP AS A DONOR
            </Text>
=======
            {/* <Block style={{ alignSelf: 'center' }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require('../Images/donate.png')} />
            </Block>
            <Text size={12} style={{ alignSelf: 'center', padding: 20 }}>
              SIGN UP AS A DONOR
            </Text> */}
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38

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
<<<<<<< HEAD
                  </Block>
                  <Block width={width * 0.35} style={{ marginBottom: 10 }}>
                    <Button
                      color={stat !== "granted" ? "default" : "primary"}
                      style={styles.createButton}
                      onPress={getLocation}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Location
                      </Text>
                    </Button>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      {locationError}
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

=======
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


                  <Block width={width * 0.35} style={{ marginBottom: 10 }}>
                      <Button
                        color={stat !== "granted" ? "default" : "primary"}
                        style={styles.createButton}
                        onPress={getLocation}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Location
                        </Text>
                      </Button>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontSize: 12,
                        }}
                      >
                        {locationError}
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


>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
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
<<<<<<< HEAD
                      {passError}
                    </Text>
                    <Block row style={styles.passwordCheck}>
                      {/* <Text size={12} color={argonTheme.COLORS.MUTED}>
=======
                      {passwordError}
                    </Text>
                    {/* <Block row style={styles.passwordCheck}> */}
                    {/* <Text size={12} color={argonTheme.COLORS.MUTED}>
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text> */}
<<<<<<< HEAD
                    </Block>
=======
                    {/* </Block> */}
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
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
<<<<<<< HEAD
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 12,
                      }}
                    >
                      {registerError}
                    </Text>
=======
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
<<<<<<< HEAD
        </Block>
      </ImageBackground>
=======
   
        </Block>
        
      </ImageBackground>
      
>>>>>>> f5d4fdb89dea078ff02e7aa85cf287ed52683e38
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
