import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  ScrollView,
  Dimensions,
  ImageBackground
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";
import { Card, Header, Divider } from "@rneui/themed";
import DonationCard from "../../components/Syeda/DonationCard";
import { Block, Text, theme } from "galio-framework";

import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db, auth } from "../../config";

import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen');

const DonorHistory = ({ route, navigation }) => {

  let user = auth?.currentUser?.email;

  //this part isFocused is used to re-render the page each time it is opened
  const isFocused = useIsFocused();

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [donationArray, setDonationArray] = useState([]);
  console.log("donation:  ", donationArray);

  const [smallArray, setSmallArray] = useState([])
  console.log("smallArray", smallArray)

  const [number, setNumber] = useState()
  console.log("number", number)

  let counter = 0;

  const readDonations = async () => {
    const q = query(collection(db, "donorDonation"), where("email", "==", user));
    const docs = await getDocs(q);
    // let counter = 0
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      counter += 1
      //setCounter(counter)
      console.log("readDonations => ", doc.id, " => ", doc.data());
    });
    setNumber(counter)
    //console.log("counter: ", counter)
  }

  console.log('counter => ', counter)

  useEffect(() => {
    if (isFocused) {
      readAllWhere();
      readDonations();
    }
  }, [isFocused]);

  const readAllWhere = async () => {
    const q = query(collection(db, "donorDonation"), where("email", "==", user));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      console.log('readAllWhere => ', doc.id, " => ", doc.data());
    });

    let temp = [];

    docs.forEach((doc) => {
      temp.push({
        // donation: doc.data()
        dateSlot: doc.data().dateSlot,
        timeSlot: doc.data().timeSlot,
        donatedItems: doc.data().donatedItems,
        trackId: doc.data().trackId
      })
    })
    setDonationArray(temp)
  }

  return (
    <SafeAreaView style={styles.container}>

      {
        number === 0 ? 
        <Block>
        <Text bold size={20} color="#32325D" style={{alignSelf: 'center', margin: 20}}>
          Uh oh! Looks like you haven't made any donations yet. {'\n'}
          Check this page again when you have!
        </Text>
        <ImageBackground
        style={{width: width * 0.9, height: height * 0.5, alignSelf: 'center'}}
        source={{uri: 'https://i.pinimg.com/564x/1b/44/87/1b448703bd3fca661cd7cafd6d6b90c1.jpg'}}
        ></ImageBackground> 
        </Block>
        :
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Text bold size={28} color="#32325D" style={{alignSelf: 'center', margin: 20}}>
          View Past Donations
        </Text>
        <View style={{width: width * 0.9}}>
          {donationArray.flat().map((donationItem) => (
            <DonationCard
              key={donationItem.trackId}
              trackId={donationItem.trackId}
              timeSlot={donationItem.timeSlot}
              dateSlot={donationItem.dateSlot}
              donatedItems={donationItem.donatedItems}
            />
          ))}
        </View>
      </ScrollView>
      }

    </SafeAreaView>
  );
};

export default DonorHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "green",
    marginVertical: 30,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
  },
});
