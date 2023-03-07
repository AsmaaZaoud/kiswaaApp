import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Images, argonTheme } from "../../constants";

import NumericInput from "react-native-numeric-input";

import { useState, useEffect } from "react";
import { Tab, TabView } from "@rneui/themed";
import React from "react";
import { Block, Checkbox, Text, theme, NavBar, Icon } from "galio-framework";
// import { Header } from "../../components";
import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  Entypo,
} from "react-native-vector-icons";
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
import { color, set } from "react-native-reanimated";
const { width } = Dimensions.get("screen");

const FamilyRequest = ({ route, navigation }) => {
  const id = route.params;
  const [index, setIndex] = React.useState(0);
  const groups = { 0: "Men", 1: "Women", 2: "Boys", 3: "Girls" };

  useEffect(() => {
    getCart();
    console.log(index);
  }, [id]);

  const data = [
    { label: "Blouse", value: "Blouse" },
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
    { label: "Pants", value: "Pants" },
    { label: "Playsuit", value: "Playsuit" },
    { label: "Poncho", value: "Poncho" },
    { label: "Pajamas", value: "Pajamas" },
    { label: "Shawl", value: "Shawl" },
    { label: "Shirt", value: "Shirt" },
    { label: "Shorts", value: "Shorts" },
    { label: "Skirt", value: "Skirt" },
    { label: "Sock", value: "Sock" },
    { label: "Sweater", value: "Sweater" },
    { label: "Swimsuit", value: "Swimsuit" },
    { label: "Tie", value: "Tie" },
    { label: "Tights", value: "Tights" },
    { label: "Tracksuit", value: "Tracksuit" },
    { label: "T-Shirt", value: "T-Shirt" },
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

  // { label: " All Colors", value: "0" },

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

  const [ageGroup, setAgeGroup] = useState(groups[index]);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(colors[0].label);
  const [size, setSize] = useState("S");

  // console.log(ageGroup, type, quantity, color, size);

  const [modalVisible, setModalVisible] = useState(false);
  console.log(index);
  // const readAllWhere = async () => {
  //   const q = query(collection(db, "families"), where("email", "==", id));
  //   const docs = await getDocs(q);
  //   docs.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     setData(doc.data());
  //     setId(doc.id);
  //   });
  // };
  const [cartId, setCartId] = useState("");

  const getCart = async () => {
    console.log(id);
    console.log("cartt..");
    const q = query(
      collection(db, "familyRequests"),
      where("familyID", "==", id),
      where("cart", "==", "open")
    );
    console.log("gett.");
    const docs = await getDocs(q);
    // console.log(docs.forEach((doc) => doc.data()));
    let temp = [];
    docs.forEach((doc) => {
      console.log("mm");
      temp.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log(temp);
    if (temp.length > 0) {
      console.log(temp);
      setCartId(temp[0].id);
      console.log(cartId);
    } else {
      console.log("no open cart");
      NewCart();
    }
  };
  const NewCart = async () => {
    const docRef = await addDoc(collection(db, "familyRequests"), {
      familyID: id,
      cart: "open",
      status: "pending",
    });

    console.log("Request add with ID: ", docRef.id, "for user ", id);
    setCartId(docRef.id);
  };

  const Save = async () => {
    console.log(cartId);
    const docRef = await addDoc(
      collection(db, "familyRequests", cartId, "Items"),
      {
        ageGroup: ageGroup,
        type: type,
        quantity: quantity,
        color: color,
        size: size,
      }
    )
      .then(() => {
        console.log("Request add with ID: ", "for user ", id);
        // navigation.navigate("FamilyHome");
        setAgeGroup("");
        setType("");
        setQuantity(1);
        setColor(colors[0].label);
        setSize("");
      })
      .catch((error) => {
        console.log(error.message);
        // setRegisteerError("Email is already in use");
      });
    // alert("Thank You");
  };
  // console.log(ageGroup);
  const renderArticles = () => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: modalVisible ? "#F7EEF7" : "white",
          width: "100%",
          height: "90%",
        }}
      >
        <View>
          <NavBar
            title="Request Clothes"
            style={{
              height: "9%",
              marginBottom: "5%",
              backgroundColor: "#FFFAFA",
              borderColor: "lightgray",
              borderWidth: 1,
              marginTop: "1%",
            }}
            titleStyle={{ color: "#4C4AAB", fontSize: 22, fontWeight: "bold" }}
          />
          <Block style={{ alignItems: "center" }}>
            <Text style={{ color: "#842DCE", fontSize: 20 }}>
              Please Select Catagory
            </Text>
          </Block>

          <Block style={{ height: "60%", marginTop: "2%", width: "100%" }}>
            <Tab
              style={{ width: "100%", height: "26%" }}
              value={index}
              onChange={(e) => {
                setIndex(e);
                setAgeGroup(groups[e]);
              }}
              indicatorStyle={{
                backgroundColor: "#842DCE",
                height: 3,
              }}
              // variant="defualt"

              scrollable={false}
              // iconPosition="top"
              dense={true}
              disableIndicator={true}
            >
              <Tab.Item title="Men" titleStyle={{ fontSize: 14 }}>
                <Image
                  source={require("../../assets/imgs/men-icon.png")}
                  style={{
                    width: 88,
                    height: 88,
                    borderColor: ageGroup == "Men" ? "#842DCE" : "white",
                    borderWidth: 3,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Men" ? "#842DCE" : "black",
                    fontWeight: ageGroup == "Men" ? "bold" : "normal",
                  }}
                >
                  Men
                </Text>
              </Tab.Item>
              <Tab.Item title="Women" titleStyle={{ fontSize: 12 }}>
                <Image
                  source={require("../../assets/imgs/women-icon.png")}
                  style={{
                    width: 88,
                    height: 88,
                    borderColor: ageGroup == "Women" ? "#842DCE" : "white",
                    borderWidth: 3,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Women" ? "#842DCE" : "black",
                    fontWeight: ageGroup == "Women" ? "bold" : "normal",
                  }}
                >
                  Women
                </Text>
              </Tab.Item>
              <Tab.Item title="Boys" titleStyle={{ fontSize: 12 }}>
                <Image
                  source={require("../../assets/imgs/boy-icon.png")}
                  style={{
                    width: 88,
                    height: 88,
                    borderColor: ageGroup == "Boys" ? "#842DCE" : "white",
                    borderWidth: 3,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Boys" ? "#842DCE" : "black",
                    fontWeight: ageGroup == "Boys" ? "bold" : "normal",
                  }}
                >
                  Boys
                </Text>
              </Tab.Item>
              <Tab.Item title="Girls" titleStyle={{ fontSize: 12 }}>
                <Image
                  source={require("../../assets/imgs/girl-icon.png")}
                  style={{
                    width: 88,
                    height: 88,
                    borderColor: ageGroup == "Girls" ? "#842DCE" : "white",
                    borderWidth: 3,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Girls" ? "#842DCE" : "black",
                    fontWeight: ageGroup == "Girls" ? "bold" : "normal",
                  }}
                >
                  Girls
                </Text>
              </Tab.Item>
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item
                style={{
                  width: "100%",
                  height: "100%",
                  // backgroundColor: "lightgray",
                }}
              >
                <View style={{ paddingBottom: "2%" }}>
                  <Text></Text>
                  <ScrollView style={{}}>
                    <View style={styles.board}>
                      {data.map((x, i) => (
                        <Pressable
                          key={i}
                          style={[styles.circle]}
                          onPress={() => {
                            setModalVisible(true);
                            setType(x.value);
                            setAgeGroup(groups[index]);
                          }}
                        >
                          <Text style={styles.ct}>{x.value}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </TabView.Item>
              <TabView.Item style={{ width: "100%", height: "100%" }}>
                <View>
                  <Text></Text>
                  <ScrollView>
                    <View style={styles.board}>
                      {data.map((x, i) => (
                        <Pressable
                          key={i}
                          style={[styles.circle]}
                          onPress={() => {
                            setModalVisible(true);
                            setType(x.value);
                            setAgeGroup(groups[index]);
                          }}
                        >
                          <Text style={styles.ct}>{x.value}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </TabView.Item>
              <TabView.Item style={{ width: "100%", height: "100%" }}>
                <View>
                  <Text></Text>
                  <ScrollView>
                    <View style={styles.board}>
                      {data.map((x, i) => (
                        <Pressable
                          key={i}
                          style={[styles.circle]}
                          onPress={() => {
                            setModalVisible(true);
                            setType(x.value);
                            setAgeGroup(groups[index]);
                          }}
                        >
                          <Text style={styles.ct}>{x.value}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </TabView.Item>
              <TabView.Item style={{ width: "100%", height: "100%" }}>
                <View>
                  <Text></Text>
                  <ScrollView>
                    <View style={styles.board}>
                      {data.map((x, i) => (
                        <Pressable
                          key={i}
                          style={[styles.circle]}
                          onPress={() => {
                            setModalVisible(true);
                            setType(x.value);
                            setAgeGroup(groups[index]);
                          }}
                        >
                          <Text style={styles.ct}>{x.value}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </TabView.Item>
            </TabView>
            {/*............ add item modual................................................... */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
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
                        Add Item Details
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
                      <KeyboardAvoidingView>
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
                      </KeyboardAvoidingView>
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
                        Save();
                      }}
                    >
                      <Text style={styles.textStyle}>Add Item</Text>
                    </Pressable>
                  </Block>
                </View>
              </View>
            </Modal>
          </Block>
          <Block>
            <Pressable
              onPress={() => navigation.navigate("FamilyCart", { cartId, id })}
              style={{
                marginTop: "14%",
                marginBottom: "10%",
                backgroundColor: "#4C4AAB",
                height: "18%",
                width: "60%",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "20%",
                borderRadius: 8,
                // padding: 5,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                View Cart
              </Text>
            </Pressable>
          </Block>
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
          onPress={() => navigation.navigate("FamilyCart", { cartId, id })}
        >
          <FontAwesome5 name="shopping-cart" color="#4C4AAB" size={40} />
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
};

export default FamilyRequest;

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: "#490066",
    height: "100%",
  },
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
    marginLeft: "5%",
    height: "100%",
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
    fontWeight: "bold",
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
    borderRadius: 4,
    borderColor: argonTheme.COLORS.INPUT_ERROR,
    height: 44,
    backgroundColor: "#DCD0FF",
    shadowColor: argonTheme.COLORS.BLACK,
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
