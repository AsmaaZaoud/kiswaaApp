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
  Ionicons,
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
  const groups = { 0: "Adults", 1: "Teenagers", 2: "Kids", 3: "Baby" };

  useEffect(() => {
    getCart();
    // console.log(index);
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
    { label: "Hoodie", value: "Hoodie" },
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
    { label: "Tie", value: "Tie" },
    { label: "Tights", value: "Tights" },
    { label: "Tops", value: "Tops" },
    { label: "Tracksuit", value: "Tracksuit" },
    { label: "T-Shirt", value: "T-Shirt" },
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
  const ClothTypeData = [
    {
      label: "Blouse",
      value: "Blouse",
      icon: "https://cdn-icons-png.flaticon.com/512/8323/8323136.png",
      uri: "https://i.pinimg.com/564x/d9/1b/87/d91b87a86b9924cdce26b631bd3a968e.jpg",
    },
    {
      label: "Caftan",
      value: "Caftan",
      icon: "https://cdn-icons-png.flaticon.com/512/5238/5238311.png",
      uri: "https://i.etsystatic.com/31945487/r/il/2aadec/3870275767/il_fullxfull.3870275767_od8t.jpg",
    },
    {
      label: "Cardigan",
      value: "Cardigan",
      icon: "https://cdn-icons-png.flaticon.com/128/3345/3345635.png",
      uri: "https://i.pinimg.com/564x/a5/84/9d/a5849d187e57e693c6d765436893030a.jpg",
    },
    {
      label: "Cloak",
      value: "Cloak",
      icon: "https://cdn-icons-png.flaticon.com/512/5102/5102093.png",
      uri: "https://i.pinimg.com/564x/67/db/97/67db97f356fc31a34f7cc01df7b8ea64.jpg",
    },
    {
      label: "Coat",
      value: "Coat",
      icon: "https://cdn-icons-png.flaticon.com/128/7157/7157441.png",
      uri: "https://i.pinimg.com/564x/f6/73/7d/f6737d49a2571e063cd811812c3a922c.jpg",
    },
    {
      label: "Dress",
      value: "Dress",
      icon: "https://cdn-icons-png.flaticon.com/128/9833/9833994.png",
      uri: "https://i.pinimg.com/564x/a9/1b/cb/a91bcb63b4c31333a9402f74200a36a3.jpg",
    },
    {
      label: "Dungarees",
      value: "Dungarees",
      icon: "https://cdn-icons-png.flaticon.com/128/2161/2161057.png",
      uri: "https://i.ytimg.com/vi/soPPAhMPHtY/maxresdefault.jpg",
    },
    {
      label: "Jacket",
      value: "Jacket",
      icon: "https://cdn-icons-png.flaticon.com/128/2806/2806051.png",
      uri: "https://i.etsystatic.com/11147089/c/2250/2250/342/0/il/adfdf1/3588743348/il_300x300.3588743348_2ol1.jpg",
    },
    {
      label: "Jeans",
      value: "Jeans",
      icon: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      uri: "https://i.pinimg.com/564x/a2/3c/13/a23c134ebdc47581fa854c248633a8f5.jpg",
    },
    {
      label: "Jumper",
      value: "Jumper",
      icon: "https://cdn-icons-png.flaticon.com/128/9774/9774105.png",
      uri: "https://i.pinimg.com/564x/65/70/13/65701369d99d39458f99e4d04f80ab4d.jpg",
    },
    {
      label: "Jumpsuit",
      value: "Jumpsuit",
      icon: "https://cdn-icons-png.flaticon.com/128/2290/2290478.png",
      uri: "https://i.pinimg.com/564x/04/00/83/040083896aaf020fa83aa12dbac805fe.jpg",
    },
    {
      label: "Leggings",
      value: "Leggings",
      icon: "https://cdn-icons-png.flaticon.com/128/9381/9381563.png",
      uri: "https://i.pinimg.com/564x/9c/51/11/9c5111b9a77206aa76698ae2c41884a1.jpg",
    },
    {
      label: "Hoodie",
      value: "Hoodie",
      icon: "https://cdn-icons-png.flaticon.com/512/9431/9431166.png",
      uri: "https://i.pinimg.com/474x/a6/52/44/a65244223c6112a7e9d7286729bd9434.jpg",
    },
    {
      label: "Pants",
      value: "Pants",
      icon: "https://cdn-icons-png.flaticon.com/128/2390/2390116.png",
      uri: "https://media.istockphoto.com/id/530930442/photo/row-of-black-pants-hangs-in-wardrobe-at-home.jpg?s=612x612&w=0&k=20&c=ZFM23HW4i3gKgfT5PplBTTajAq3L1qGG30MCjWqZliA=",
    },
    {
      label: "Playsuit",
      value: "Playsuit",
      icon: "https://cdn-icons-png.flaticon.com/128/122/122709.png",
      uri: "https://ae01.alicdn.com/kf/HTB1W34cPxnaK1RjSZFtq6zC2VXai/Korean-Style-2019-New-Fashion-Women-s-Playsuits-Chic-Double-Pocket-Skinny-Strap-Long-sleeved-Casual.jpg_Q90.jpg_.webp",
    },
    {
      label: "Poncho",
      value: "Poncho",
      icon: "https://cdn-icons-png.flaticon.com/512/1319/1319774.png",
      uri: "https://i.pinimg.com/564x/50/b3/70/50b37094d3839e4aede85fc1e2c359f9.jpg",
    },
    {
      label: "Pajamas",
      value: "Pajamas",
      icon: "https://cdn-icons-png.flaticon.com/128/4446/4446182.png",
      uri: "https://m.media-amazon.com/images/I/71K03lV+jIL._AC_UL1500_.jpg",
    },
    {
      label: "Shawl",
      value: "Shawl",
      icon: "https://cdn-icons-png.flaticon.com/512/2806/2806217.png",
      uri: "https://i.pinimg.com/564x/1d/3f/f2/1d3ff25944a6377fecdb049bdef2a77e.jpg",
    },
    {
      label: "Shirt",
      value: "Shirt",
      icon: "https://cdn-icons-png.flaticon.com/128/2503/2503380.png",
      uri: "https://i.pinimg.com/564x/5c/16/17/5c1617cc8f266adfd425e452773dddaf.jpg",
    },
    {
      label: "Shorts",
      value: "Shorts",
      icon: "https://cdn-icons-png.flaticon.com/128/2237/2237015.png",
      uri: "https://i.pinimg.com/474x/89/1b/c7/891bc76dfb42ae14d5fbda7b92f7247b.jpg",
    },
    {
      label: "Skirt",
      value: "Skirt",
      icon: "https://cdn-icons-png.flaticon.com/512/4507/4507761.png",
      uri: "https://i.pinimg.com/564x/29/c9/3f/29c93f07aeb7051935cc86ac74842964.jpg",
    },
    {
      label: "Sock",
      value: "Sock",
      icon: "https://cdn-icons-png.flaticon.com/128/843/843877.png",
      uri: "https://i.pinimg.com/564x/2b/ca/5f/2bca5f01f7fb038d12d5a6f9fa4127d4.jpg",
    },
    {
      label: "Sweater",
      value: "Sweater",
      icon: "https://cdn-icons-png.flaticon.com/128/9385/9385884.png",
      uri: "https://i.pinimg.com/564x/d3/b2/51/d3b2515feca557aff75d23077b2479e8.jpg",
    },
    {
      label: "Tie",
      value: "Tie",
      icon: "https://cdn-icons-png.flaticon.com/512/1950/1950558.png",
      uri: "https://i.pinimg.com/564x/a1/6e/be/a16ebe082cb7329391b8940c8ebd07bd.jpg",
    },
    {
      label: "Tights",
      value: "Tights",
      icon: "https://cdn-icons-png.flaticon.com/512/3343/3343878.png",
      uri: "https://i.pinimg.com/564x/c2/95/db/c295dba7990a244ab5e56eb52578ce92.jpg",
    },
    {
      label: "Tops",
      value: "Tops",
      icon: "https://cdn-icons-png.flaticon.com/128/3258/3258170.png",
      uri: "https://i.pinimg.com/564x/5c/ad/15/5cad15407e6c1e9b393337dc7d17c530.jpg",
    },
    {
      label: "Tracksuit",
      value: "Tracksuit",
      icon: "https://cdn-icons-png.flaticon.com/128/5783/5783203.png",
      uri: "https://i.pinimg.com/564x/bd/be/d1/bdbed16a24645a3ad9f42d2a528f6b3b.jpg",
    },
    {
      label: "T-Shirt",
      value: "T-Shirt",
      icon: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      uri: "https://i.pinimg.com/564x/d6/9c/5a/d69c5a1ba98ce97c40a16ff506233f7a.jpg",
    },
  ];

  const [ageGroup, setAgeGroup] = useState(groups[index]);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(colors[0].label);
  const [size, setSize] = useState("S");
  const [gender, setGender] = useState("Male");

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
        gender: gender,
        icon: ClothTypeData.find((object) => object.label === type).icon,
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
              // marginTop: "1%",
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
              style={{ width: "100%", height: "26%", marginBottom: "6%" }}
              value={index}
              onChange={(e) => {
                setIndex(e);
                setAgeGroup(groups[e]);
              }}
              // indicatorStyle={{
              //   backgroundColor: "#842DCE",
              //   height: 3,
              // }}
              // variant="defualt"

              scrollable={false}
              // iconPosition="top"
              dense={true}
              disableIndicator={true}
            >
              <Tab.Item title="Adults" titleStyle={{ fontSize: 14 }}>
                <Image
                  source={require("../../assets/imgs/teens.jpeg")}
                  style={{
                    width: 88,
                    height: 88,
                    borderColor: ageGroup == "Adults" ? "#F9966B" : "lightgray",
                    borderWidth: ageGroup == "Adults" ? 3 : 2,
                    borderRadius: 40,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Adults" ? "#F9966B" : "black",
                    fontWeight: ageGroup == "Adults" ? "bold" : "normal",
                    fontSize: 16,
                  }}
                >
                  Adults
                </Text>
              </Tab.Item>
              <Tab.Item title="Teenagers" titleStyle={{ fontSize: 12 }}>
                <Image
                  source={require("../../assets/imgs/adult.png")}
                  style={{
                    width: 88,
                    height: 90,
                    borderColor:
                      ageGroup == "Teenagers" ? "#F9966B" : "lightgray",
                    borderWidth: ageGroup == "Teenagers" ? 3 : 2,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Teenagers" ? "#F9966B" : "black",
                    fontWeight: ageGroup == "Teenagers" ? "bold" : "normal",
                    fontSize: 15,
                  }}
                >
                  Teenagers
                </Text>
              </Tab.Item>
              <Tab.Item title="Kids" titleStyle={{ fontSize: 12 }}>
                <Image
                  source={require("../../assets/imgs/kidss.jpeg")}
                  style={{
                    width: 90,
                    height: 90,
                    borderColor: ageGroup == "Kids" ? "#F9966B" : "lightgray",
                    borderWidth: ageGroup == "Kids" ? 3 : 2,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Kids" ? "#F9966B" : "black",
                    fontWeight: ageGroup == "Kids" ? "bold" : "normal",
                    fontSize: 16,
                  }}
                >
                  Kids
                </Text>
              </Tab.Item>
              <Tab.Item title="Baby" titleStyle={{ fontSize: 12 }}>
                <Image
                  source={require("../../assets/imgs/baby.png")}
                  style={{
                    width: 88,
                    height: 88,
                    borderColor: ageGroup == "Baby" ? "#F9966B" : "white",
                    borderWidth: 3,
                    borderRadius: 43,
                  }}
                />
                <Text
                  style={{
                    color: ageGroup == "Baby" ? "#F9966B" : "black",
                    fontWeight: ageGroup == "Baby" ? "bold" : "normal",
                    fontSize: 16,
                  }}
                >
                  Babys
                </Text>
              </Tab.Item>
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item
                style={{
                  width: "100%",
                  height: "96%",
                  // backgroundColor: "lightgray",
                }}
              >
                <View style={{ paddingBottom: "2%" }}>
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
              <TabView.Item style={{ width: "100%", height: "96%" }}>
                <View>
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
              <TabView.Item style={{ width: "100%", height: "96%" }}>
                <View>
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
              <TabView.Item style={{ width: "100%", height: "96%" }}>
                <View>
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
                        color="#F9966B"
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
                          marginBottom: "3%",
                          marginTop: "3%",
                        }}
                      >
                        What Gender?
                      </Text>
                      <View style={styles.modalblocksize1}>
                        <Pressable
                          style={[
                            styles.size,
                            {
                              backgroundColor:
                                gender == "Male" ? "#842DCE" : "#DCD0FF",
                            },
                          ]}
                          onPress={() => setGender("Male")}
                        >
                          <Text>M</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.size,
                            {
                              backgroundColor:
                                gender == "Female" ? "#842DCE" : "#DCD0FF",
                            },
                          ]}
                          onPress={() => setGender("Female")}
                        >
                          <Text>F</Text>
                        </Pressable>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: "3%",
                          marginTop: "3%",
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
                            marginBottom: "3%",
                            marginTop: "7%",
                          }}
                        >
                          What Color?
                        </Text>
                        <Dropdown
                          // search
                          // selectedTextStyle={{ fontSize: 30 }}
                          // searchPlaceholder="Search..."
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
                          marginBottom: "3%",
                          marginTop: "3%",
                        }}
                      >
                        What Size?
                      </Text>
                      <View style={styles.modalblocksize}>
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
                marginTop: "12%",
                marginBottom: "10%",
                backgroundColor: "#F9966B",
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
          height: "8%",
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
          onPress={() => navigation.navigate("FamilyHome", id)}
        >
          <Ionicons name="home-outline" color={"#f8a069"} size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%", marginRight: "7%", marginLeft: "7%" }}
          onPress={() => navigation.navigate("FamilyCart", { cartId, id })}
        >
          <Ionicons name="cart-outline" color="#1a1f87" size={45} />
        </Pressable>

        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("FamilyProfile", id)}
        >
          <EvilIcons name="user" color="#1a1f87" size={50} />
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
    height: "80%",
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
    marginTop: "15%",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: "5%",
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
    backgroundColor: "#FFA07A",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "2%",
  },
  modalText: {
    marginBottom: "3%",
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
    // marginTop: "1%",
    marginBottom: "4%",
    width: "100%",
    // backgroundColor: "lightgray",
  },
  modalblocksize: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: "1%",
    // marginBottom: "4%",
    width: "100%",
    // backgroundColor: "lightgray",
  },
  modalblocksize1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: "1%",
    marginBottom: "3%",
    width: "48%",
    // backgroundColor: "lightgray",
  },
  modalblock2: {
    // marginTop: "1%",
    marginBottom: "1%",
    width: "90%",
    // backgroundColor: "lightgray",
    // paddingTop: 20,
    // padding: 10,
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
