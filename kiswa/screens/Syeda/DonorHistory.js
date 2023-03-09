import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  ScrollView,
  Dimensions
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
    ;

  let counter = 0;

  // donationArray.map((item, index) => {
  //   console.log("*****************")
  //   console.log("dateslot", item.dateSlot)
  //   console.log("timeslot", item.timeSlot)
  //   console.log("trackid", item.trackId)
  //   console.log("donateditems", item.donatedItems)
  //   // item.donatedItems.map(())
  //   console.log("quantity", item.donatedItems.map(obj => obj.amount))
  //   console.log("*****************")
  // })

  console.log('counter => ', counter)

  useEffect(() => {
    if (isFocused) {
      readAllWhere();
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

      {/* <Text variant="headlineLarge" style={{ marginTop: 100, marginBottom: 30 }}>
        View Past Donations
      </Text> */}

      {/* <View style={{ width: "90%" }}> */}
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
      {/* </View> */}
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
