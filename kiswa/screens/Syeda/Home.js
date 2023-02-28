import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, View, ImageBackground, TouchableOpacity, Text  } from 'react-native';
import { Card } from 'react-native-elements';
import { Block, theme, Button } from 'galio-framework';

const { width, height } = Dimensions.get("screen");

import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {

  const [hovered, setHovered] = useState(false);

  const handlePressIn = () => {
    setHovered(true);
  };

  const handlePressOut = () => {
    setHovered(false);
  };
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}>
        {/*  */}
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
});

export default Home;
