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
  StatusBar,
} from "react-native";
import { DataTable } from "react-native-paper";

import { Card, Divider } from "@rneui/themed";

// Dropdown
import { Dropdown } from "react-native-element-dropdown";
const { width } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

// //////// DB ///////////
import { db } from "../../config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  setDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { Button, Header } from "@rneui/base";
import { Touchable } from "react-native";
import Theme from "../../constants/Theme";

const InventoryClerkHomePage = () => {
  // const
  const [IDs, setIDs] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [quality, setQuality] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  // ////////////////////////////////////////// //
  // DB
  const reformat = (doc) => {
    for (let i = 1; i <= items.length; i++) {
      IDs.includes(i) ? null : IDs.push(i);
    }
    return { id: doc.id, ...doc.data() };
  };

  useEffect(() => {
    const listenAll = () => {
      onSnapshot(collection(db, "inventory"), (snap) =>
        setItems(snap.docs.map(reformat))
      );
    };
    listenAll();
    console.log(IDs);
  }, []);

  const set = async () => {
    await addDoc(collection(db, "inventory"), {
      type: type,
      size: size,
      quality: quality,
      color: color,
      gender: gender,
      available: true,
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
    setType("");
    setSize("");
    setQuality("");
    setColor("");
    setGender("");
    setAddModalVisible(!addModalVisible);
  };

  // Update -- edit
  const update = async (item) => {
    const { id, ...rest } = item;
    await setDoc(
      doc(db, "inventory", id),
      {
        type: type,
        size: size,
        quality: quality,
        color: color,
        gender: gender,
        available: true,
      },
      { merge: true }
    )
      .then(() => {
        console.log("data updated");
        setEditModalVisible(!editModalVisible);
        setSelectedItem(null);
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
    { label: "Shoes", value: "Shoes" },
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
  const SizeData = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
    { label: "3XL", value: "3XL" },
    { label: "4XL", value: "4XL" },
    { label: "5XL", value: "5XL" },
  ];
  const ColorData = [
    { label: "Beige", value: "Beige" },
    { label: "Black", value: "Black" },
    { label: "Blue", value: "Blue" },
    { label: "Brown", value: "Brown" },
    { label: "Burgundy", value: "Burgundy" },
    { label: "Checks", value: "Checks" },
    { label: "Gold", value: "Gold" },
    { label: "Green", value: "Green" },
    { label: "Grey", value: "Grey" },
    { label: "Khaki", value: "Khaki" },
    { label: "Multicolor", value: "Multicolor" },
    { label: "Navy", value: "Navy" },
    { label: "Orange", value: "Orange" },
    { label: "Pink", value: "Pink" },
    { label: "Prints", value: "Prints" },
    { label: "Purple", value: "Purple" },
    { label: "Red", value: "Red" },
    { label: "Stripes", value: "Stripes" },
    { label: "White", value: "White" },
    { label: "Yellow", value: "Yellow" },
  ];
  const GenderData = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
  ];
  const QualityData = [
    { label: "New", value: "New" },
    { label: "Good", value: "Good" },
    { label: "Bad", value: "Bad" },
  ];
  // edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  // validations
  const [error, setError] = useState({ satus: false, key: null, msg: "" });
  const submit = () => {
    type == null || type == ""
      ? setError({ satus: true, key: "type", msg: "Chose type!" })
      : size == null || size == ""
      ? setError({ satus: true, key: "size", msg: "Chose size!" })
      : color == null || color == ""
      ? setError({
          satus: true,
          key: "color",
          msg: "Chose color!",
        })
      : gender == null || gender == ""
      ? setError({
          satus: true,
          key: "gender",
          msg: "Chose gender!",
        })
      : quality == null || quality == ""
      ? setError({
          satus: true,
          key: "quality",
          msg: "Chose quality!",
        })
      : (set(), setError({ satus: false, key: null, msg: "" }));
  };

  return (
    <SafeAreaView
      style={{
        // flex: 1,
        overflow: "scroll",
      }}
    >
      <Header
        search
        options
        title="Title"
        optionLeft="Option 1"
        optionRight="Option 2"
        // navigation={this.props.navigation}
      />
      <Card>
        <Button
          shadowless
          color={Theme.COLORS.SUCCESS}
          onPress={() => setAddModalVisible(!addModalVisible)}
          style={{ alignSelf: "right", marginLeft: "1%", marginBottom: "2%" }}
        >
          Add Item
        </Button>

        <Card.Divider />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title>Size</DataTable.Title>
            <DataTable.Title>Color</DataTable.Title>
            <DataTable.Title>Gender</DataTable.Title>
            <DataTable.Title>Quality</DataTable.Title>
            <DataTable.Title>Availability</DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {items.map((i, x) => (
              <DataTable.Row style={{ height: "1%" }}>
                <DataTable.Cell id={i.id}>{IDs[x]}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.type}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.size}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.color}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.gender}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.quality}</DataTable.Cell>
                {/* hide not availabe items */}
                {/* {i.available == true ? <DataTable.Cell>Available</DataTable.Cell> : null} */}
                <DataTable.Cell>
                  {i.available == true ? "Available" : "Not-Available"}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {" "}
                  <Button
                    shadowless
                    color={Theme.COLORS.ERROR}
                    onPress={() => {
                      setEditModalVisible(!editModalVisible),
                        console.log(i),
                        setSelectedItem(i);
                      console.log(selectedItem);
                    }}
                    style={{
                      alignSelf: "center",
                      marginTop: "9%",
                    }}
                  >
                    Edit
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </Card>
      {/* Add Data Modal */}
      <Modal animationType="slide" transparent={true} visible={addModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={ClothTypeData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={type}
              placeholder={"Type"}
              onChange={(item) => {
                setType(item.value);
              }}
            />

            {error.key == "type" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={SizeData}
              labelField="label"
              valueField="value"
              maxHeight={200}
              id="value"
              search
              searchPlaceholder="Search..."
              animated={false}
              value={size}
              placeholder={"Size"}
              onChange={(item) => {
                setSize(item.value);
              }}
            />
            {error.key == "size" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={ColorData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={color}
              placeholder={"Color"}
              onChange={(item) => {
                setColor(item.value);
              }}
            />
            {error.key == "color" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={GenderData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={gender}
              placeholder={"Gender"}
              onChange={(item) => {
                setGender(item.value);
              }}
            />
            {error.key == "gender" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={QualityData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={quality}
              placeholder={"Quality"}
              onChange={(item) => {
                setQuality(item.value);
              }}
            />
            {error.key == "quality" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Pressable
              color={Theme.COLORS.PRIMARY}
              style={[styles.button]}
              onPress={() => {
                submit();
              }}
            >
              <Text style={{ color: "white", alignSelf: "center" }}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Update Data Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={ClothTypeData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={type}
              placeholder={selectedItem.type}
              onChange={(item) => {
                setType(item.value);
              }}
            />
            {error.key == "type" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={SizeData}
              labelField="label"
              valueField="value"
              maxHeight={200}
              id="value"
              search
              searchPlaceholder="Search..."
              animated={false}
              value={size}
              placeholder={selectedItem.size}
              onChange={(item) => {
                setSize(item.value);
              }}
            />
            {error.key == "size" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={ColorData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={color}
              placeholder={selectedItem.color}
              onChange={(item) => {
                setColor(item.value);
              }}
            />
            {error.key == "color" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={GenderData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={selectedItem.gender}
              placeholder={selectedItem.gender}
              onChange={(item) => {
                setGender(item.value);
              }}
            />
            {error.key == "gender" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={QualityData}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={quality}
              placeholder={selectedItem.quality}
              onChange={(item) => {
                setQuality(item.value);
              }}
            />
            {error.key == "quality" && error.satus && (
              <Text style={styles.errorMessage}>{error.msg}</Text>
            )}
            <Pressable
              color={Theme.COLORS.PRIMARY}
              style={[styles.button]}
              onPress={() => {
                // update(selectedItem.id),
                // console.log(selectedItem.type);
                // setEditModalVisible(!editModalVisible);
                update(selectedItem);
                // setSelectedItem();
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 170,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 2,
    width: 100,
    padding: 10,
    backgroundColor: "#5E72E4",

    alignSelf: "center",
  },
  dropdown: {
    margin: "2%",
    height: "10%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: "1.2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    // height: "30%",
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    paddingLeft: "3%",
    fontSize: 16,
    fontWeight: "bold",
  },
});
