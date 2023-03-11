import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Entypo,
  Feather,
} from "react-native-vector-icons";

import React from "react";
import { useState, useEffect } from "react";
import { Block, Checkbox, theme, NavBar, Icon } from "galio-framework";
import NumericInput from "react-native-numeric-input";
import { Dropdown } from "react-native-element-dropdown";
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
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../../config";
const { width } = Dimensions.get("screen");

const FamilyCart = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const colors = [
    { label: "Black", value: "1" },
    { label: "White", value: "2" },
    { label: "Red", value: "3" },
    { label: "Green", value: "4" },
    { label: "Yellow", value: "5" },
    { label: "Blue", value: "6" },
    { label: "Pink", value: "7" },
    { label: "Gray", value: "8" },
    { label: "Brown", value: "9" },
    { label: "Orange", value: "10" },
    { label: "Purple", value: "11" },
  ];
  const [ageGroup, setAgeGroup] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState(colors[0].label);
  const [size, setSize] = useState("");
  const [deleConfirm, setDeleConfirm] = useState("");

  const [itemId, setItemId] = useState("");
  const { cartId, id } = route.params;
  console.log(cartId);
  // console.log("idd..", id);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getCartItems();
  }, [cartId]);

  // const items = [];
  const [items, setItems] = useState([]);

  const getCartItems = async () => {
    console.log(cartId);
    const collectionRef = collection(db, "familyRequests", cartId, "Items");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setCart(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setItems(querySnapshot.docs.map((doc) => doc.data()));
      // console.log(cart);
    });
    return () => unsubscribe();
  };

  console.log(cart);
  console.log("it..", items);

  // .............ubpdate........
  const update = async (upId) => {
    console.log("---------------------");
    console.log(upId);
    const docRef = doc(db, "familyRequests", cartId, "Items", upId);
    await setDoc(
      docRef,
      {
        ageGroup: ageGroup,
        type: type,
        quantity: quantity,
        color: color,
        size: size,
      },
      { merge: true }
    )
      .then(() => {
        console.log("data updated");
        setAgeGroup("");
        setType("");
        setQuantity(0);
        setColor(colors[0].label);
        setSize("S");
        setModalVisible(!modalVisible);
        // navigation.navigate("FamilyCart", cartId, id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const [removeeidd, setremoveeidd] = useState("");

  const removee = async () => {
    const itemDoc = doc(db, "familyRequests", cartId, "Items", removeeidd); //delete
    await deleteDoc(itemDoc)
      .then(() => {
        console.log("data delted");
        setModalVisible2(!modalVisible2);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const itemcount = cart.reduce((total, item) => total + item.data.quantity, 0);
  const renderArticles = () => {
    return (
      <SafeAreaView style={{ height: "90%" }}>
        <View
          style={{ backgroundColor: "white", width: "100%", height: "100%" }}
        >
          <NavBar
            title="Request Cart"
            style={{
              height: "10%",
              marginBottom: "1%",
              backgroundColor: "#FFFAFA",
              borderColor: "lightgray",
              borderWidth: 1,
              marginTop: "1%",
              width: "100%",
            }}
            titleStyle={{ color: "#4C4AAB", fontSize: 22, fontWeight: "bold" }}
          />
          <View style={styles.main}>
            <Block style={styles.hed1}>
              <Text style={styles.text1}>Cart Items</Text>
              {/* <Text style={styles.text1}> </Text> */}
            </Block>
            <Text
              style={{
                fontSize: 19,
                fontWeight: "bold",
                margin: "2%",
                marginLeft: "5%",
                padding: "2%",
              }}
            >
              Total:{" "}
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "normal",
                }}
              >
                {itemcount} items
              </Text>
            </Text>
            {cart.length >= 1 ? (
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  {cart.map((x, i) => (
                    <View key={i}>
                      <View key={i} style={styles.board1}>
                        {/* <Text style={styles.ct}>{i + 1}</Text> */}
                        <Text style={styles.ct}>
                          {x.data.ageGroup} <Text> </Text>
                          {x.data.type}
                        </Text>
                        <Text style={styles.ct}></Text>
                      </View>
                      {/* <View key={i + 2} style={styles.board22}>
                  <Text style={styles.ctt}>Color</Text>
                  <Text style={styles.ctt}>Size</Text>
                  <Text style={styles.ctt}>Quantity</Text>
                </View> */}
                      <View key={i + 2} style={styles.board2}>
                        <Text style={styles.ctt}>{x.data.color}</Text>
                        <Text style={styles.ctt}>{x.data.size}</Text>
                        <Text style={styles.ctt}>{x.data.quantity}</Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>

                        <Feather
                          name="edit"
                          color="#5b03a7"
                          size={21}
                          style={{ margin: "1%" }}
                          onPress={() => {
                            setModalVisible(true);
                            setItemId(x.id);
                            console.log(x.id);
                            setAgeGroup(x.data.ageGroup);
                            setType(x.data.type);
                            setQuantity(x.data.quantity);
                            setColor(x.data.color);
                            setSize(x.data.size);
                          }}
                        />
                        <AntDesign
                          name="delete"
                          color="#d80f00"
                          size={21}
                          style={{ margin: "1%" }}
                          onPress={() => {
                            setModalVisible2(true);
                            setremoveeidd(x.id);
                          }}
                        />
                      </View>
                      {/* </View>
              </View> */}
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : null}

            {cart.length >= 1 ? null : (
              <View style={{ marginTop: "5%", marginLeft: "5%" }}>
                <Text style={styles.ct}> Your Cart is Empty! </Text>
                <Text style={styles.ct}> Please add Items </Text>
              </View>
            )}
            <Text></Text>
            <Text></Text>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Pressable
                onPress={() => navigation.navigate("FamilyRequest", id)}
                style={{
                  // marginBottom: "10%",
                  marginTop: "1%",
                  backgroundColor: "#4C4AAB",
                  height: 50,
                  width: "75%",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  //marginLeft: "10%",
                  borderRadius: 8,
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                >
                  {cart.length >= 1 ? "Add More Items" : "Add Items"}
                </Text>
              </Pressable>
            </View>
            <Text></Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Pressable
                // onPress={() => (cart.length >= 1 ? closeRequest() : null)}
                onPress={() =>
                  navigation.navigate("ConfirmFamilyCart", {
                    items,
                    cartId,
                    id,
                  })
                }
                style={{
                  // marginBottom: "10%",
                  backgroundColor: cart.length >= 1 ? "#842DCE" : "gray",
                  height: 50,
                  width: "75%",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  //marginLeft: "10%",
                  borderRadius: 8,
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                >
                  Submit Request
                </Text>
              </Pressable>
            </View>
            <Text></Text>
            <Text></Text>
            {/* THE edittttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View>
                <View style={styles.modalView}>
                  <Block style={styles.modalblock}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Entypo
                        name="chevron-with-circle-left"
                        color="#842DCE"
                        size={40}
                      />
                    </Pressable>
                    <View>
                      <Text style={{ color: "gray", textAlign: "right" }}>
                        Request Items,
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        Edit Item Details
                      </Text>
                    </View>
                  </Block>

                  <Block style={styles.modalblock2}>
                    <Text style={styles.modalText}>
                      {ageGroup}'s {type}
                    </Text>
                    <Block>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 15,
                          marginTop: 20,
                        }}
                      >
                        How Many {type}s?
                      </Text>
                      <NumericInput
                        iconStyle={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                        minValue={1}
                        value={quantity}
                        // initValue={null}
                        onChange={setQuantity}
                        rounded
                        rightButtonBackgroundColor="#DCD0FF"
                        leftButtonBackgroundColor="#DCD0FF"
                        totalWidth={280}
                        totalHeight={40}
                        iconSize={20}
                        // step={1.5}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 10,
                          marginTop: 20,
                        }}
                      >
                        What Color?
                      </Text>
                      <Dropdown
                        search
                        // selectedTextStyle={{ fontSize: 30 }}
                        searchPlaceholder="Search..."
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={colors}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={color}
                        value={color}
                        onChange={(item) => {
                          setColor(item.label);
                        }}
                      ></Dropdown>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 10,
                          marginTop: 20,
                        }}
                      >
                        What Size?
                      </Text>
                      <View style={styles.modalblock}>
                        <Pressable
                          style={[
                            styles.size,
                            {
                              backgroundColor:
                                size == "S" ? "#842DCE" : "#DCD0FF",
                            },
                          ]}
                          onPress={() => setSize("S")}
                        >
                          <Text>S</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.size,
                            {
                              backgroundColor:
                                size == "M" ? "#842DCE" : "#DCD0FF",
                            },
                          ]}
                          onPress={() => setSize("M")}
                        >
                          <Text>M</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.size,
                            {
                              backgroundColor:
                                size == "L" ? "#842DCE" : "#DCD0FF",
                            },
                          ]}
                          onPress={() => setSize("L")}
                        >
                          <Text>L</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.size,
                            {
                              backgroundColor:
                                size == "XL" ? "#842DCE" : "#DCD0FF",
                            },
                          ]}
                          onPress={() => setSize("XL")}
                        >
                          <Text>XL</Text>
                        </Pressable>
                      </View>
                    </Block>
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonClose,
                        { marginTop: 40 },
                      ]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        update(itemId);
                      }}
                    >
                      <Text style={styles.textStyle}>Update Item</Text>
                    </Pressable>
                  </Block>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible2}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible2(!modalVisible2);
              }}
            >
              <View>
                <View style={styles.modalView2}>
                  <Text style={styles.modalText}>Delete</Text>
                  <Text style={[styles.ct, { color: "black" }]}>
                    Are you sure you want to delete this item?
                  </Text>
                  <Text></Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "70%",
                    }}
                  >
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonClose,
                        { backgroundColor: "#808080" },
                      ]}
                      onPress={() => setModalVisible2(!modalVisible2)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonClose,
                        { backgroundColor: "red" },
                      ]}
                      onPress={() => removee()}
                    >
                      <Text style={styles.textStyle}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
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
          marginBottom: "1%",
          alignItems: "center",
          // paddingLeft: "1%",
        }}
      >
        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.replace("FamilyHome", id)}
        >
          <FontAwesome5 name="house-user" color="#4C4AAB" size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%", marginRight: "7%", marginLeft: "7%" }}
          onPress={() => navigation.replace("FamilyRequest", id)}
        >
          <Feather name="plus-circle" color="#4C4AAB" size={50} />
        </Pressable>

        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.replace("FamilyProfile", id)}
        >
          <FontAwesome5 name="user-alt" color="#4C4AAB" size={40} />
        </Pressable>
      </Block>
    </Block>
  );
};

export default FamilyCart;

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: "#490066",
    height: "100%",
  },
  main: {
    // backgroundColor: "#F3E8EA",
    backgroundColor: "#fbe5ff",
    margin: "5%",
    // borderColor: "#842DCE",
    // borderWidth: 3,
    // borderRadius: 10,
    height: "82%",
  },
  scrollView: {
    // backgroundColor: "#fbe5ff",
    backgroundColor: "#debee3",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  hed1: {
    // backgroundColor: "yellow",
    height: "10%",
    // padding: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: "#842DCE",
    fontSize: 24,
    fontWeight: "bold",
  },
  board1: {
    width: "50%",
    margin: "2%",
    borderColor: "black",
    // borderWidth: 5, #FDEEF4
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "lightpink",
    alignItems: "center",
    // borderBottomWidth: 1,
  },
  board2: {
    width: "90%",
    marginLeft: "6%",
    marginBottom: "5%",
    paddingBottom: "5%",
    borderColor: "black",
    paddingLeft: "5%",
    // borderWidth: 5, #FDEEF4
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "lightpink",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  board22: {
    width: "60%",
    marginLeft: "6%",
    // marginBottom: "5%",
    // paddingBottom: "5%",
    borderColor: "black",
    paddingLeft: "5%",
    // borderWidth: 5, #FDEEF4
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "lightpink",
    alignItems: "center",
  },
  ct: {
    color: "#842DCE",
    fontSize: 18,
    // fontWeight: "bold",
  },
  ctt: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  modalView: {
    margin: 15,
    marginTop: 50,
    height: 680,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#842DCE",
    // shadowOffset: {
    //   width: 5,
    //   height: 10,
    // },
    shadowOpacity: 3,
    shadowRadius: 10,
    elevation: 10,
    borderColor: "#842DCE",
    borderWidth: 2,
  },
  modalView2: {
    margin: 15,
    width: "80%",
    marginTop: 260,
    height: 240,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#842DCE",
    shadowOpacity: 3,
    shadowRadius: 10,
    elevation: 10,
    borderColor: "#842DCE",
    borderWidth: 2,
    marginLeft: "10%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#842DCE",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "2%",
  },
  modalText: {
    marginBottom: 18,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#842DCE",
  },
  modalText1: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalblock: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
    // backgroundColor: "lightgray",
  },
  modalblock2: {
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
    // backgroundColor: "lightgray",
    paddingTop: 20,
    padding: 10,
  },
  input: {
    borderColor: "lightgray",
    borderWidth: 1,
    height: 40,
    width: 200,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
  dropdown: {
    marginBottom: 20,
    padding: 7,
    // borderRadius: 4,
    // borderColor: argonTheme.COLORS.INPUT_ERROR,
    height: 44,
    backgroundColor: "#DCD0FF",
    // shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    // margin: 16,
    // height: 50,
    // backgroundColor: "white",
    // borderRadius: 12,
    // padding: 12,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  size: {
    backgroundColor: "#DCD0FF",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
