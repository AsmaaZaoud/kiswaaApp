import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Block, Checkbox, theme, NavBar } from "galio-framework";

import { Card, ListItem, Button, Icon } from "react-native-elements";
import { useState, useEffect } from "react";
import RequestHistoryComp from "./RequestHistoryComp";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  Entypo,
  Feather,
} from "react-native-vector-icons";
import { DataTable } from "react-native-paper";
import { db } from "../../config";
const { width } = Dimensions.get("screen");
export default function RequestHistory({ route, navigation }) {
  const id = route.params;
  console.log(id);

  const [request, setRequest] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "familyRequests"),
      where("familyID", "==", `${id}`),
      where("status", "==", "fullfied")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setRequest(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsubscribe();
  }, [id]);
  const [cart, setCart] = useState([]);

  console.log(request);
  const renderArticles = () => {
    return (
      <SafeAreaView
        style={{
          // backgroundColor: "gray",
          width: "100%",
          height: "90%",
        }}
      >
        <NavBar
          title="Request History"
          style={{
            height: "9%",
            // marginBottom: "2%",
            backgroundColor: "#FFFAFA",
            borderColor: "lightgray",
            borderWidth: 1,
            marginTop: "1%",
          }}
          titleStyle={{ color: "#4C4AAB", fontSize: 22, fontWeight: "bold" }}
        />

        {/* <Text
              style={{ color: "#842DCE", fontSize: 22, fontWeight: "bold" }}
            >
              Request History
            </Text> */}

        <View
          style={{
            width: "98%",
            paddingBottom: "5%",
            paddingTop: "5%",
            height: "100%",
            backgroundColor: "#fbe5ff",
            // marginBottom: "5%",
          }}
        >
          {request.length == 0 ? (
            <Text
              style={{
                color: "#842DCE",
                fontSize: 22,
                fontWeight: "bold",
                width: "70%",
                marginLeft: "10%",
              }}
            >
              There are no complete requests yet!
            </Text>
          ) : null}
          <ScrollView>
            {request.map((elem, i) => (
              <Card title="cart" key={i}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={{ marginBottom: 10 }}> {elem.familyID}</Text>
                  {/* elem.nameoftheattrbiteinDB.toDate().toDateString() */}
                  {/* <Text style={{ marginBottom: 10 }}>Mon Oct 31 2022</Text> */}
                  <Text style={{ marginBottom: 10 }}>{elem.dateSlot}</Text>
                </View>

                <DataTable>
                  <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title
                      textStyle={{ color: "white", fontSize: 15 }}
                    >
                      Qty
                    </DataTable.Title>
                    <DataTable.Title
                      textStyle={{ color: "white", fontSize: 15 }}
                    >
                      Size
                    </DataTable.Title>
                    <DataTable.Title
                      textStyle={{ color: "white", fontSize: 15 }}
                    >
                      Group
                    </DataTable.Title>
                    <DataTable.Title
                      textStyle={{ color: "white", fontSize: 15 }}
                    >
                      Color
                    </DataTable.Title>
                    <DataTable.Title
                      textStyle={{ color: "white", fontSize: 15 }}
                    >
                      Type
                    </DataTable.Title>
                  </DataTable.Header>
                  <RequestHistoryComp itemsid={elem.id} />
                </DataTable>
                <Text></Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",

                    width: "100%",
                  }}
                >
                  <Text style={{ marginBottom: 10 }}>Status {elem.status}</Text>
                </View>
              </Card>
            ))}
            <View></View>
          </ScrollView>
        </View>
        <View>
          <Text></Text>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
      <Block
        style={{
          height: "10%",
          backgroundColor: "#FFFAFA",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderColor: "lightgray",
          borderWidth: 1,
          marginBottom: "2%",
          alignItems: "center",
          // paddingLeft: "1%",
        }}
      >
        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("FamilyHome", id)}
        >
          <FontAwesome5 name="house-user" color="#4C4AAB" size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%", marginRight: "7%", marginLeft: "7%" }}
          onPress={() => navigation.navigate("FamilyRequest", id)}
        >
          <Feather name="plus-circle" color="#4C4AAB" size={50} />
        </Pressable>

        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("FamilyProfile", id)}
        >
          <FontAwesome5 name="user-alt" color="#4C4AAB" size={40} />
        </Pressable>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: "#490066",
    height: "100%",
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#842DCE",
    borderRadius: 10,
  },
});
