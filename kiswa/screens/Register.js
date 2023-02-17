import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  View,

} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const Register = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };


  const handleRegister = () => {
    if (!name) {
      setNameError('Please enter your nickname');
      return;
    }
    else {
      setNameError('');
    }

    if (!phone) {
      setPhoneError('Please enter a valid phone number that is 8 digits long')
      return;
    }
    else {
      setPhoneError('');
    }

    if (!email) {
      setEmailError('Please enter an email address');
      return;
    }
    else {
      setEmailError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    else {
      setEmailError('');
    }

    if (!password) {
      setPassError('Please enter a password');
      return;
    }
    else {
      setPassError('');
    }

    if (!validatePassword(password)) {
      setPassError('Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character');
      return;
    }
    else {
      setPassError('');
    }

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }
    else {
      setConfirmError('');
    }
  }




  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >

        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <ImageBackground
              source={{uri: 'https://img.freepik.com/free-photo/violet-watercolor-texture-background_1083-172.jpg'}}
              resizeMode="cover"
              style={{flex: 1, justifyContent: 'center',}}
            >
              <Text style={{ padding: 20, color: 'blue' }} onPress={() => navigation.goBack()}>Go Back</Text>
              <Text style={{ justifyContent: 'flex-start', alignSelf: 'center', fontSize: 25, marginTop: 20 }}>Register as Donor</Text>
              <View style={styles.container}>

                <Text style={styles.error}>{nameError}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nickname"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize='words'
                />
                <Text style={styles.error}>{phoneError}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="numeric"
                  maxLength={8}
                />
                <Text style={styles.error}>{emailError}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Text style={styles.error}>{passError}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Text style={styles.error}>{confirmError}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />

                <Button
                  // style={{width: '100%'}}
                  onPress={handleRegister}>
                  Register
                </Button>
              </View>
            </ImageBackground>
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
    borderRadius: 10,
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
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  error: {
    color: 'red',
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
});

export default Register;
