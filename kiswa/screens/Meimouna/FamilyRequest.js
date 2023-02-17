import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Tab, TabView } from "@rneui/themed";
import React from "react";
import { Block, Checkbox, Text, theme, NavBar, Icon } from "galio-framework";
import { Header } from "../../components";
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

const FamilyRequest = () => {
  const [index, setIndex] = React.useState(0);

  //   const data = ["shirt", "pants", "dress", "hat"];
  const [options, setOptions] = useState(data);
  const numColumns = 3;
  //   const renderItem = (item) => {
  //     <View style={[styles.item, { height: 50, width: 50 }]}>
  //       <Text style={styles.itemText}>{item}</Text>;
  //     </View>;
  //   };
  const data = [
    { key: "T-shirt" },
    { key: "Sweater" },
    { key: "Jacket" },
    { key: "Coat" },
    { key: "Jeans" },
    { key: "socks" },
    { key: "shorts" },
    { key: "Tracksuit" },
    { key: "Vest" },
    { key: "Pajamas" },
    { key: "shoes" },
    { key: "suit" },
  ];
  const WType = [
    { key: "T-shirt" },
    { key: "Sweater" },
    { key: "Jacket" },
    { key: "Coat" },
    { key: "Jeans" },
    { key: "socks" },
    { key: "shorts" },
    { key: "Tracksuit" },
    { key: "Vest" },
    { key: "Pajamas" },
    { key: "shoes" },
    { key: "dress" },
    { key: "heels" },
    { key: "scarf" },
    { key: "blouse" },
    { key: "suit" },
  ];

  return (
    <View style={{ backgroundColor: "white" }}>
      <NavBar
        title="Reques Clothes"
        style={{ height: 80, borderWidth: 1, marginTop: 20, marginBottom: 20 }}
      />
      <Block style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ color: "#842DCE", fontSize: 22, fontWeight: "bold" }}>
          Please choose Catagory
        </Text>
      </Block>

      <Block style={{ height: 300, marginTop: 20 }}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: "#842DCE",
            height: 3,
          }}
          //   variant="primary"
        >
          <Tab.Item title="Men" titleStyle={{ fontSize: 12 }}>
            <Image
              source={require("../../assets/imgs/men-icon.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Text>Men</Text>
          </Tab.Item>
          <Tab.Item title="Women" titleStyle={{ fontSize: 12 }}>
            <Image
              source={require("../../assets/imgs/women-icon.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Text>Women</Text>
          </Tab.Item>
          <Tab.Item title="Boys" titleStyle={{ fontSize: 12 }}>
            <Image
              source={require("../../assets/imgs/boy-icon.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Text>Boys</Text>
          </Tab.Item>
          <Tab.Item title="Girls" titleStyle={{ fontSize: 12 }}>
            <Image
              source={require("../../assets/imgs/girl-icon.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <Text>Girls</Text>
          </Tab.Item>
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item
            style={{
              width: "100%",
              height: 450,
            }}
          >
            <View>
              <Text></Text>
              <View style={styles.board}>
                {data.map((x, i) => (
                  <Pressable key={i} style={styles.circle} onPress={() => {}}>
                    <Text style={styles.ct}>{x.key}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: "100%", height: 450 }}>
            <View>
              <Text></Text>
              <View style={styles.board}>
                {WType.map((x, i) => (
                  <Pressable key={i} style={styles.circle} onPress={() => {}}>
                    <Text style={styles.ct}>{x.key}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: "100%", height: 450 }}>
            <View>
              <Text></Text>
              <View style={styles.board}>
                {data.map((x, i) => (
                  <Pressable key={i} style={styles.circle} onPress={() => {}}>
                    <Text style={styles.ct}>{x.key}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: "100%", height: 450 }}>
            <View style={{ alignItems: "center" }}>
              <Text></Text>
              <View style={styles.board}>
                {data.map((x, i) => (
                  <Pressable key={i} style={[styles.circle]} onPress={() => {}}>
                    <Text style={styles.ct}>{x.key}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TabView.Item>
        </TabView>
      </Block>
    </View>
  );
};

export default FamilyRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: "#6495ED",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  board: {
    width: "90%",
    margin: 18,
    // borderColor: "white",
    // borderWidth: 5, #FDEEF4
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    // backgroundColor: "lightpink",
    alignItems: "center",
  },

  circle: {
    width: 88,
    height: 80,
    justifyContent: "center",
    margin: 2,
    backgroundColor: "#842DCE",
    borderRadius: 8,
  },
  ct: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  scr: {
    borderColor: "blue",
    borderWidth: 2,
    width: 50,
    textAlign: "center",
  },
  txt: {
    fontSize: 20,
    color: "blue",
  },
});
