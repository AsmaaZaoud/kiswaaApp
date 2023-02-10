import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config";

import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signedIn, setSignedIn] = useState(false);


  //let user = auth?.currentUser?.email;
  //console.log('user logged in: ', user)

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in");
        //  console.log('handle login user: ', user)
        setSignedIn(true);

        navigation.replace("App");

      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);

        setSignedIn(false);
      });
  };


  //select, unselect image
  const [selectDonor, setSelectDonor] = useState(false);
  const [selectReceiver, setSelectReceiver] = useState(false);
  const handleSelectDonor = () => {
    Alert.alert('border color donor')
    if (selectReceiver === true) {
      setSelectReceiver(false)
      setSelectDonor(true)
    }
    else {
      setSelectDonor(true)
    }

  };
  const handleSelectReceiver = () => {
    Alert.alert('border color receiver')
    if (selectDonor === true) {
      setSelectDonor(false)
      setSelectReceiver(true)
    }
    else {
      setSelectReceiver(true)
    }
  };
  //select, unselect image

  //disable, enable register button
  const [isDisabled, setIsDisabled] = useState(false);

  const disable = () => {
    Alert.alert('working')
    if (selectDonor || selectReceiver === true) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true);
    }
  }
  //disable, enable register button


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


                  <Block style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>What would you like to register as?</Text>

                    <Block style={{ flexDirection: 'row', }}>

                      <Block>
                        <TouchableOpacity
                          style={{ borderWidth: 1, margin: 10, borderColor: selectDonor === false ? "black" : "red" }}
                          onPress={handleSelectDonor}
                        //value={selected}
                        >
                          <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../Images/donate.png')} />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 20 }}>DONOR</Text>
                      </Block>

                      <Block>
                        <TouchableOpacity
                          style={{ borderWidth: 1, margin: 10, borderColor: selectReceiver === false ? "black" : "red" }}
                          onPress={handleSelectReceiver}
                        //value={selected}
                        >
                          <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../Images/receive.png')} />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 20 }}>RECEIVER</Text>
                      </Block>
                    </Block>
                  </Block>



                  {/* register button */}
                  <Block middle>
                    <Button
                      color="primary"
                      //style={styles.createButton}
                      style={isDisabled === true ? styles.createButton : styles.disabledButton}
                      //disabled={isDisabled}
                      onPress={() => disable()}
                    //onPress={handleLogin}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Register
                      </Text>
                    </Button>
                  </Block>
                  {/* register button */}



                  {/* log in button */}
                  <Text style={{ alignSelf: 'center' }}>Already have an account ? Log In instead</Text>
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
                  </Block>
                  {/* log in button */}

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
    marginTop: 25,
  },
  disabledButton: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor: 'grey',
    color: 'black'
  }
});

export default Login;
