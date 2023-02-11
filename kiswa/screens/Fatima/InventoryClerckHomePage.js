//galio
import { Block, GalioProvider, theme } from "galio-framework";

// React
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { DataTable } from "react-native-paper";

import { Card, Divider } from "@rneui/themed";
//argon

import { Images, argonTheme } from "../../constants";
// picker
import { Picker } from "@react-native-picker/picker";
// Dropdown
import { Dropdown } from "react-native-element-dropdown";
const { width } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

// //////// DB ///////////
import { db } from "../../config";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@rneui/base";
import { Touchable } from "react-native";
import Theme from "../../constants/Theme";

const reformat = (doc) => {
  return { id: doc.id, ...doc.data() };
};
// const [items, setItems] = useState([]);
const findAll = async () => {
  // const data = await db.collection(this.collection).get()
  const data = await getDocs(collection(db, "inventory"));
  // console.log(reformat);
  return data.docs.map(reformat);
};
// useEffect(() => {
//   const getItems = async () => {
//     let temp = await findAll();
//     setItems(temp);
//   };
//   getItems();
// }, []);

const InventoryClerkHomePage = () => {
  // const
  const [selectedItem, setSelectedItem] = useState([]);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [quality, setQuality] = useState("");
  const [color, setColor] = useState("");
  // ////////////////////////////////////////// //
  // DB
  // Read All
  const findAll = async () => {
    const data = await getDocs(collection(db, "inventory"));
    // console.log(reformat);
    return data.docs.map(reformat);
  };
  useEffect(() => {
    const getItems = async () => {
      let temp = await findAll();
      setItems(temp);
    };
    getItems();
  }, []);

  // Update
  const update = async () => {
    // const { id, ...rest } = itemID;
    console.log(selectedItem);
    await setDoc(docRef, (db, "inventory"), selectedItem[id], {
      merge: true,
    }).update({
      // id: itemID,
      type: type,
      size: size,
      quality: quality,
      color: color,
    });
    setModalVisible(!modalVisible);
  };

  const set = async () => {
    const docRef = doc(db, "users", name);

    await setDoc(docRef, { name: name, email: email })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Cloth Type Flat List
  const ClothTypeData = [
    { label: "Blouse", value: "Blouse" },
    { label: "Bodysuit", value: "Bodysuit" },
    { label: "Caftan", value: "Caftan" },
    { label: "Cardigan", value: "Cardigan" },
    { label: "Cloak", value: "Cloak" },
    { label: "Coat", value: "Coat" },
    { label: "Dress", value: "Dress" },
    { label: "Dungarees", value: "Dungarees" },
    { label: "Jacket", value: "Jacket" },
    { label: "Jeans", value: "Jeans" },
    { label: "Jumper", value: "Jumper" },
    { label: "Jumpsuit", value: "Jumpsuit" },
    { label: "Leggings", value: "Leggings" },
    { label: "Legwarmers", value: "Legwarmers" },
    { label: "Leotard", value: "Leotard" },
    { label: "Pants / Trousers", value: "Pants / Trousers" },
    { label: "Playsuit", value: "Playsuit" },
    { label: "Poncho", value: "Poncho" },
    { label: "Pajamas", value: "Pajamas" },
    { label: "Sarong", value: "Sarong" },
    { label: "Shawl", value: "Shawl" },
    { label: "Shirt", value: "Shirt" },
    { label: "Shorts", value: "Shorts" },
    { label: "Skirt", value: "Skirt" },
    { label: "Sock", value: "Sock" },
    { label: "Sweater", value: "Sweater" },
    { label: "Swimsuit", value: "Swimsuit" },
    { label: "Tie", value: "Tie" },
    { label: "Tights", value: "Tights" },
    { label: "Tops", value: "Tops" },
    { label: "Tracksuit", value: "Tracksuit" },
    { label: "T-Shirt", value: "T-Shirt" },
    { label: "Waistcoat", value: "Waistcoat" },
  ];
  // edit modal
  const [modalVisible, setModalVisible] = useState(false);

  // console.log(items);
  return (
    <SafeAreaView>
      <Card>
        <Button
          shadowless
          color={Theme.COLORS.SUCCESS}
          // onPress={() => navigation.navigate('CustomerOrders')}
          style={{ alignSelf: "right", marginLeft: "1%", marginBottom: "2%" }}
        >
          Add Item
        </Button>
        <Card.Divider />
        <DataTable style={{ marginBottom: 120 }}>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title>Size</DataTable.Title>
            <DataTable.Title>Color</DataTable.Title>
            <DataTable.Title>Quality</DataTable.Title>
            <DataTable.Title>Availability</DataTable.Title>
            <DataTable.Title>Edit</DataTable.Title>
          </DataTable.Header>
          {items.map((i) => (
            <DataTable.Row style={{ height: "1%" }}>
              <DataTable.Cell id={i.id}>{i.id}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.type}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.size}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.color}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.quality}</DataTable.Cell>
              {/* hide not availabe items */}
              {/* {i.available == true ? <DataTable.Cell>Available</DataTable.Cell> : null} */}
              <DataTable.Cell>
                {i.available == true ? "Available" : "Not-Available"}
              </DataTable.Cell>
              <DataTable.Cell>
                {" "}
                <Button
                  shadowless
                  color={Theme.COLORS.ERROR}
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      setSelectedItem({
                        id: i.id,
                        // type: i.type,
                        // size: i.size,
                        // color: i.color,
                        // quality: i.quality,
                      });
                    // console.log([i.id, i.type, i.size, i.color, i.quality]);
                  }}
                  style={{
                    alignSelf: "center",
                    // margin: "1%",
                    marginTop: "9%",
                  }}
                >
                  Edit
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card>
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Type</Text>
            <Dropdown
              style={{ alignSelf: "left", width: "100%" }}
              data={ClothTypeData}
              labelField="label"
              valueField="value"
              maxHeight={200}
              search
              // selectedTextStyle={{ fontSize: 30 }}
              searchPlaceholder="Search..."
              // placeholder={selectedItem.type}
              selectedItem={type}
              onChange={(item) => {
                setType(item.value),
                  items.map((i) =>
                    i.id == selectedItem ? (i.type = type) : null
                  );
                // ,setSelectedItem("type"[type]);
              }}
            />

            {/* <Picker
              selectedItem={selectedItem.type}
              onValueChange={(item) => setType(item)}
              numberOfLines={1}
            >
              <Picker.Item label="T-Shirt" value="T-Shirt" />
              <Picker.Item label="Pants" value="Pants" />
              <Picker.Item label="Blouse" value="Blouse" />
              <Picker.Item label="C#" value="C#" />
              <Picker.Item label="Java Script" value="Java Sript" />
            </Picker> */}
            {/* <Text>{selectedItem.id}</Text> */}
            <Pressable
              color={Theme.COLORS.PRIMARY}
              style={[styles.button]}
              onPress={() => {
                // update(selectedItem.id),
                setModalVisible(!modalVisible);
                items.map((i) =>
                  selectedItem.id == i.id ? update(selectedItem.id) : null
                );
              }}
            >
              <Text style={{ color: "white", alignSelf: "center" }}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default InventoryClerkHomePage;

const styles = StyleSheet.create({
  //   title: {
  //     paddingBottom: theme.SIZES.BASE,
  //     paddingHorizontal: theme.SIZES.BASE * 2,
  //     marginTop: 22,
  //     color: argonTheme.COLORS.HEADER,
  //   },
  //   group: {
  //     paddingTop: theme.SIZES.BASE,
  //   },
  //   albumThumb: {
  //     borderRadius: 4,
  //     marginVertical: 4,
  //     alignSelf: "center",
  //     width: thumbMeasure,
  //     height: thumbMeasure,
  //   },
  //   category: {
  //     backgroundColor: theme.COLORS.WHITE,
  //     marginVertical: theme.SIZES.BASE / 2,
  //     borderWidth: 0,
  //   },
  //   categoryTitle: {
  //     height: "100%",
  //     paddingHorizontal: theme.SIZES.BASE,
  //     backgroundColor: "rgba(0, 0, 0, 0.5)",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   imageBlock: {
  //     overflow: "hidden",
  //     borderRadius: 4,
  //   },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 170,
  },
  modalView: {
    margin: 20,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignSelf: "center",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 5,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
    color: "#666666",
  },
  modalInput: {
    color: "#663366",
    alignSelf: "left",
    fontSize: 18,
    margin: 5,
  },
  button: {
    borderRadius: 2,
    width: 100,
    padding: 10,
    // elevation: 2,
    backgroundColor: "#5E72E4",

    alignSelf: "center",
  },
  //   productImage: {
  //     width: cardWidth - theme.SIZES.BASE,
  //     height: cardWidth - theme.SIZES.BASE,
  //     borderRadius: 3,
  //   },
  //   productPrice: {
  //     paddingTop: theme.SIZES.BASE,
  //     paddingBottom: theme.SIZES.BASE / 2,
  //   },
  //   productDescription: {
  //     paddingTop: theme.SIZES.BASE,
  //     // paddingBottom: theme.SIZES.BASE * 2,
  //   },
});

// export default InventoryClerkHomePage;
