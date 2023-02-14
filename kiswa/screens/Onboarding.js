import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const Onboarding = ({ navigation }) => {

  return (
    <Block flex style={styles.container}>
      <Block center>
        {/* <Image source={require('../Images/kiswalogo.png')} style={styles.logo} /> */}
      </Block>
      <Block center style={{width: '90%'}}>
        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
          Kiswa is a free platform on which you can either choose to become a donor and donate clothes
          or a receiver and receive clothes. 
        </Text>
        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
          We accept clothes of all quality types. The good quality ones go to people who requested them 
          and the worn out ones go to recycling organizations.
        </Text>
      </Block>
    </Block>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8c01fe'
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 300,
    height: 200,
    zIndex: 2,
    position: 'relative',
    marginTop: '5%'
  },
  title: {
    marginTop: '-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
