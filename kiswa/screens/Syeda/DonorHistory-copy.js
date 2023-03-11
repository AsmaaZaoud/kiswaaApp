import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";
import { Card, Header, Divider } from "@rneui/themed";
// import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

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

//this page is for tracking your order history
//the order numbers are displayed on the lsit
//when one list is clicked , it opens to reveal details of the order and also a track button for eack order
const DonorHistory = ({ route, navigation }) => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);


  const [donationArray, setDonationArray] = useState([]);
  console.log("donation:  ", donationArray);
  // const [docId, setDocId] = useState([])
  // console.log("docids: ", docId)
  const [itemsArray, setItemsArray] = useState([]);
  console.log("ItemsArray", itemsArray)

  let user = auth?.currentUser?.email;

  //this part isFocused is used to re-render the page each time it is opened
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readAllWhere();
    }
  }, [isFocused]);

  //old code
  // const readAllWhere = async () => {
  //   const q = query(collection(db, "donorDonation"), where("email", "==", user));
  //   const docs = await getDocs(q);

  //   let temp = [];

  //   docs.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     temp.push(doc.data());
  //     console.log("array inside readallwhere: ", array);
  //   });
  //   setArray(temp);
  // };

  //new code
  const readAllWhere = async () => {
    const q = query(collection(db, "donorDonation"), where("email", "==", user));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log('readAllWhere => ' , doc.id, " => ", doc.data());
    });

    let temp = [];
    let temp2 = [];

    docs.forEach((doc) => {
      temp2.push(doc.data())
    })

    docs.forEach((doc) => {
      temp.push({
        id: doc.id,
        data: doc.data(),
        items: getCartItems(doc.id)
      })
    })
    setDonationArray(temp2)
  }

  const getCartItems = async (cartId) => {
  const docRef = collection(db, "donorDonation", cartId, "Items");
  const docSnap = await getDocs(docRef);
  let temp = []
  docSnap.forEach((doc) => {
    temp.push({
      id: doc.id,
      data: doc.data()
    })
  })
  setItemsArray(temp)
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text variant="headlineLarge">
        Donation History
      </Text>


      <View style={{ width: "90%" }}>
        <ScrollView contentContainerStyle={{ height: 1500 }}>
          <List.Section>
            {donationArray.map((item, i) => {
              return (
                <View key={i} style={{ textAlign: "center" }}>
                  {/* the list accordian view displays all of the data */}
                  <List.Accordion title={<Text>Donation No. {item.trackId}</Text>}>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Pick-Up Date Interval
                    </Text>
                    <Text>{item.dateSlot}</Text>
                    <Divider></Divider>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Pick-Up Time Interval
                    </Text>
                    <Text>{item.timeSlot}</Text>
                    <Divider></Divider>
                    {/* <Text variant="titleMedium" style={{ margin: 20 }}>
                      Clothes Type
                    </Text>
                    <Text>{item.type}</Text>
                    <Divider></Divider>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Quantity
                    </Text>
                    <Text>{item.quantity}</Text>
                    <Divider></Divider> */}

                    {/* <Text variant="titleMedium" style={{ margin: 20 }}>
                        Country
                      </Text>
                      <Text>{item.country}</Text>
                      <Divider></Divider>
                      <Text variant="titleMedium" style={{ margin: 20 }}>
                        Charity
                      </Text>
                      <Text>{item.charity}</Text>
                      <Divider></Divider> */}
                    {/* <Pressable
                        style={styles.button}
                        onPress={() =>
                          navigation.navigate("Track", { trackID: item.trackID })
                        }
                      >
                        <Text style={styles.text}>Track</Text>
                      </Pressable> */}
                  </List.Accordion>
                </View>
              );
            })}
          </List.Section>
          {/* <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.text}>Back to Profile</Text>
        </Pressable> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DonorHistory;

const styles = StyleSheet.create({
  container: {
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
