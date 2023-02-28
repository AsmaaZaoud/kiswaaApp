import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Block, theme, Button } from 'galio-framework';

const { width, height } = Dimensions.get("screen");

const Home = ({ navigation }) => {

  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}>

      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <View left>
            <ImageBackground
              style={styles.avatar}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1173/1173817.png' }}
            >
            </ImageBackground>
          </View>
          <View right style={{ margin: 10, marginTop: 50 }}>
            <Text style={{ fontSize: 15 }}>Hello, Guest!</Text>
            {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Let's share goodness</Text> */}
          </View>
        </View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 10, alignSelf: 'center' }}>Creating a better world, one donation at a time.</Text>
      </View>

      <View></View>

      {/* shiny button */}
      {/* <TouchableOpacity
      style={styles.button}
      onPress={() => console.log('Button Clicked!')}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Text>Click Me</Text>
      <View style={[styles.before, hover && styles.buttonHoverBefore]}></View>
      <View style={[styles.after, hover && styles.buttonHoverAfter]}></View>
    </TouchableOpacity> */}

    </ScrollView>
  )

}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  request: {
    backgroundColor: '#DCD0FF',
    borderRadius: 20,
    height: 100,
    marginVertical: 5
  },
  header: {
    width: width,
    height: 150,
    backgroundColor: '#F1ECFF'
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 10,
  },


  // shiny button
  // button: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 15,
  //   paddingHorizontal: 30,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   borderRadius: 30,
  //   borderWidth: 0,
  //   backgroundColor: '#b19cd9',
  //   color: 'white',
  //   position: 'relative',
  //   overflow: 'hidden',
  // },
  // before: {
  //   content: "",
  //   position: 'absolute',
  //   top: '-50%',
  //   left: '-50%',
  //   width: '200%',
  //   height: '200%',
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
  //   transform: [{ rotate: '45deg' }],
  //   opacity: 0,
  //   transitionProperty: 'opacity, transform',
  //   transitionDuration: '0.3s',
  // },
  // after: {
  //   content: "",
  //   position: 'absolute',
  //   top: '-120%',
  //   left: '-120%',
  //   width: '300%',
  //   height: '300%',
  //   backgroundColor: 'rgba(255, 255, 255, 0.4)',
  //   opacity: 0,
  //   filter: 'blur(50px)',
  //   transitionProperty: 'opacity, transform',
  //   transitionDuration: '0.3s',
  // },
  // buttonHoverBefore: {
  //   opacity: 1,
  //   transform: [{ translateX: '50%' }, { translateY: '50%' }, { rotate: '45deg' }],
  // },
  // buttonHoverAfter: {
  //   opacity: 1,
  //   transform: [{ translateX: '25%' }, { translateY: '25%' }],
  // },
});

export default Home;
