import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, View, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { Block, theme, Text, Button } from 'galio-framework';

//firebase
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
import { db } from "../../config";

const { width } = Dimensions.get('screen');

//readAllWhere 
const readAllWhere = async () => {
  const q = query(collection(db, "familyRequests"), where("status", "==", 'pending'));
  const docs = await getDocs(q);
  docs.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });
  }



const Home = ({ route, navigation }) => {

  const id = route.params;

  // animated button
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
  };

  //animated text
  const animatedValue = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

    useEffect(() => {
    readAllWhere();
  }, []);

  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>

        {/* header */}

        <Block style={styles.header}>
          <Block style={{ flexDirection: 'row' }}>
            <Block left>
              <Image
                style={styles.avatar}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1173/1173817.png' }}>
              </Image>
            </Block>
            <Block right style={{ margin: 10, marginTop: 50 }}>
              <Text style={{ fontSize: 15, alignSelf: 'flex-start' }}>Hello, Guest!</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Let's share goodness</Text>
            </Block>
          </Block>
        </Block>

        {/* animated opening text */}
        {/* <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 10, alignSelf: 'center' }}>Creating a better world, one donation at a time.</Text> */}
        <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
      Creating a better world, one donation at a time.
      </Text>
    </Animated.View>


        {/* animated button */}
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>DONATE</Text>
          <View style={[styles.buttonOverlay, isActive && styles.buttonOverlayActive]}></View>
          <View style={[styles.buttonBackground, isActive && styles.buttonBackgroundActive]}></View>
        </TouchableOpacity>

      </ScrollView>
    )
  }


  // const { navigation } = this.props;
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
      <Button
        style={{ width: '100%' }}
        onPress={() => navigation.navigate("Onboarding")}>
        GO BACK
      </Button>
    </Block>
  );

}

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: '#490066'
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

  // animated button
  button: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#b19cd9',
    position: 'relative',
    overflow: 'hidden',
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30
  },
  buttonActive: {
    backgroundColor: '#7f58a8',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonOverlay: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ rotate: '45deg' }],
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.3s',
  },
  buttonOverlayActive: {
    opacity: 1,
    transform: [{ translateX: 50 }, { translateY: 50 }],
  },
  buttonBackground: {
    position: 'absolute',
    top: '-120%',
    left: '-120%',
    width: '300%',
    height: '300%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.3s',
  },
  buttonBackgroundActive: {
    opacity: 1,
    transform: [{ translateX: 25 }, { translateY: 25 }],
  },
});

export default Home;
