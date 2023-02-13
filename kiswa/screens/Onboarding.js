import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const Onboarding = ({ navigation }) => {



  const [selectDonor, setSelectDonor] = useState(false);
  const [selectReceiver, setSelectReceiver] = useState(false);
  const handleSelectDonor = () => {
    if (selectReceiver === true) {
      setSelectReceiver(false)
      setSelectDonor(true)
    }
    else {
      setSelectDonor(true)
    }

  };
  const handleSelectReceiver = () => {
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
  const [isDisabled, setIsDisabled] = useState(true);

  const checkDisable = () => {
    console.log(isDisabled)

    if (selectDonor || selectReceiver === true) {
      navigation.replace("App")
    }
  }

  return (
    <Block flex style={styles.container}>
      <StatusBar hidden />
      <Block flex center>
        <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, 
            //zIndex: 1 
          }}
        />
      </Block>
      <Block center style={{alignItems: 'flex-start'}}>
        <Image source={Images.LogoOnboarding} />
      </Block>

      <Block style={styles.subTitle}>
        <Text color="white" size={16}>
          Kiswa is a free application on which you can either donate your clothes as a donor or receive clothes as a receiver. We collect clothes in any state or condition.
        </Text>
      </Block>

      <Block style={{
        position: 'absolute', 
        top: 170, left: 0, 
        right: 0, bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
       
      }}>

        <Block style={{ flexDirection: 'row', justifyContent: 'center'  }}>

          <Block>
            <TouchableOpacity
              style={{ borderWidth: 1, margin: 10, borderColor: selectDonor === false ? "black" : "yellow" }}
              onPress={handleSelectDonor}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={require('../Images/donate.png')} />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>DONOR</Text>
          </Block>

          <Block>
            <TouchableOpacity
              style={{ borderWidth: 1, margin: 10, borderColor: selectReceiver === false ? "black" : "yellow" }}
              onPress={handleSelectReceiver}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={require('../Images/receive.png')} />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>RECEIVER</Text>
          </Block>
        </Block>
      </Block>


      {/* <Block flex space="between" style={styles.padded}>

        <Block flex space="around" style={{ zIndex: 2 }}> */}
          {/* <Block style={styles.title}> */}
          {/* <Block>
                  <Text color="white" size={60}>
                    Design
                  </Text>
                </Block> */}
          {/* <Block>
                  <Text color="white" size={60}>
                    System
                  </Text>
                </Block> */}

          {/* </Block> */}
          <Block center>
            <Button
              // style={styles.button}
              style={selectDonor || selectReceiver === true ? styles.button : styles.disabledButton}
              color={argonTheme.COLORS.SECONDARY}
              disabled={selectDonor || selectReceiver === true ? false : true}
              onPress={checkDisable}
              textStyle={{ color: argonTheme.COLORS.BLACK }}
            >
              Get Started
            </Button>
          </Block>

{/*           
        </Block>
      </Block> */}
    </Block>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
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
  disabledButton: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: 'grey',
    color: 'black'
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop: '-5%'
  },
  subTitle: {
    marginBottom: 300
  }
});

export default Onboarding;
