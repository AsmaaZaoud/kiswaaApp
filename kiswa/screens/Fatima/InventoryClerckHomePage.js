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
  Image,
} from "react-native";
import { DataTable } from "react-native-paper";

import { Card, Divider } from "@rneui/themed";

// Dropdown
import { Dropdown } from "react-native-element-dropdown";
const { width } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

// Icons
import Icon from "react-native-vector-icons/FontAwesome";
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
import {
  ClothTypeData as ClothTypeData,
  SizeData as SizeData,
  ColorData as ColorData,
  GenderData as GenderData,
  QualityData as QualityData,
  AgeCategory as AgeCategory,
} from "../../components/Fatima/Data";
import { signOut } from "firebase/auth";
import { auth } from "../../config";

import Test from "../../components/Fatima/Test";
import AddItemModal from "../../components/Fatima/AddItemModal";

const InventoryClerkHomePage = ({ navigation }) => {
  // const
  const [IDs, setIDs] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [quality, setQuality] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  //
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  //
  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };
  // ////////////////////////////////////////// //
  // DB
  const reformat = (doc) => {
    return { id: doc.id, ...doc.data() };
  };

  useEffect(() => {
    const listenAll = () => {
      onSnapshot(collection(db, "inventory"), (snap) =>
        setItems(snap.docs.map(reformat))
      );
    };
    listenAll();
  }, []);

  const set = async () => {
    await addDoc(collection(db, "inventory"), {
      type: type,
      size: size,
      quality: quality,
      color: color,
      gender: gender,
      available: true,
      age: age,
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
    setAge("");
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

  // edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);

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
          msg: "Choose Color!",
        })
      : gender == null || gender == ""
      ? setError({
          satus: true,
          key: "gender",
          msg: "Choose Gender!",
        })
      : age == null || age == ""
      ? setError({
          satus: true,
          key: "age",
          msg: "Choose Age Category!",
        })
      : quality == null || quality == ""
      ? setError({
          satus: true,
          key: "quality",
          msg: "Choose Quality!",
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
      <View
        style={{
          backgroundColor: "#525F7F",
          height: "10%",
          padding: "5%",
          flexDirection: "row",
        }}
      >
        <Block style={{ width: "5%" }}></Block>
        <Image source={require("../../components/Fatima/logo.png")} />
        <Block style={{ justifyContent: "center", marginLeft: "30%" }}>
          <Text style={{ color: "white", fontSize: "20%" }}>
            Inventory Clerk
          </Text>
        </Block>
        <Block style={{ alignSelf: "right", marginLeft: "30%", width: "5%" }}>
          <Icon name="sign-out" size={30} color="white" onPress={onSignOut} />
        </Block>
        <Block style={{ justifyContent: "right", width: "5%" }}>
          <Icon name="user" size={30} color="white" />
        </Block>
      </View>
      <Card>
        {/* <Button
          shadowless
          color={Theme.COLORS.SUCCESS}
          onPress={() => setTestVisible(!testVisible)}
          style={{ alignSelf: "right", marginLeft: "1%", marginBottom: "2%" }}
        >
          Add Item
        </Button> */}
        <Button
          shadowless
          color={Theme.COLORS.SUCCESS}
          onPress={() => setAddModalVisible(!addModalVisible)}
          style={{ alignSelf: "right", marginLeft: "1%", marginBottom: "2%" }}
        >
          Add Item
        </Button>
        {/* <View>
          <Test show={testVisible} />
        </View> */}
        <Card.Divider />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title>Size</DataTable.Title>
            <DataTable.Title>Color</DataTable.Title>
            <DataTable.Title>Gender</DataTable.Title>
            <DataTable.Title>Age</DataTable.Title>
            <DataTable.Title>Quality</DataTable.Title>
            <DataTable.Title>Availability</DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>
          <ScrollView vertical="true">
            {items.map((i, x) => (
              <DataTable.Row style={{ height: "1%" }}>
                <DataTable.Cell id={i.id}>{[x + 1]}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.type}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.size}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.color}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.gender}</DataTable.Cell>
                <DataTable.Cell id={i.id}>{i.age}</DataTable.Cell>
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
            {/* {console.log(ClothTypeData)} */}
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
              data={AgeCategory}
              labelField="label"
              valueField="value"
              id="value"
              maxHeight={200}
              search
              searchPlaceholder="Search..."
              animated={false}
              value={age}
              placeholder={"Age Category"}
              onChange={(item) => {
                setAge(item.value);
              }}
            />
            {error.key == "age" && error.satus && (
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
