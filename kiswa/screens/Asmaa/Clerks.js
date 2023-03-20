//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  Table,
} from "react-native";
import { DataTable, Searchbar } from "react-native-paper";
import { Button } from "galio-framework";

//FireBase
import { auth } from "../../config";

import {
  doc,
  query,
  getDocs,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config";
//argon
import { Images, argonTheme, articles } from "../../constants/";

import { Card, Header } from "../../components";

import { Icon, AntDesign, FontAwesome } from "react-native-vector-icons";
import ArButton from "../../components/Button";
import { normalize } from "./AdminHome";

const { width, height } = Dimensions.get("screen");

const Clerks = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    readAllWhere();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  const [clerk, setClerk] = useState([]);
  const [allClerk, setAllClerk] = useState([]);

  const readAllWhere = async () => {
    const collectionRef = collection(db, "inventoryWorkers");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setClerk(querySnapshot.docs.map((doc) => doc.data()));
      setAllClerk(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };

  // >>>>>>>>>>>>>> Search functions <<<<<<<<<<<<<<
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length === 0) {
      setClerk(allClerk);
    }

    const filteredData = allClerk.filter(
      (item) =>
        item.fname && item.fname.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setClerk([]);
    } else {
      setClerk(filteredData);
    }
  };

  const deletClerk = async (id) => {
    const driverDoc = doc(db, "inventoryWorkers", id); //remove clerk
    await deleteDoc(driverDoc)
      .then(() => {
        alert("data delted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Block flex>
      <View style={styles.container}>
        <DataTable>
          <Block
            style={[
              styles.head,
              {
                width: width,
                height: height * 0.08,
                justifyContent: "space-between",
                // borderWidth: 1,
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="user"
                size={deviceType == "mobile" ? 30 : 45}
              />
              <Text
                style={{
                  fontSize: deviceType == "mobile" ? 20 : 30,
                  marginLeft: "5%",
                }}
              >
                Workers
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Searchbar
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
                style={{
                  width: width * 0.33,
                  borderRadius: "10%",
                  height:
                    deviceType == "mobile" ? height * 0.039 : height * 0.043,
                  marginTop: "2%",
                }}
                autoCorrect={false}
              />
              <Button
                // color="#6a1b9a"
                color="#5AA15A"
                style={{ width: "20%", height: height * 0.033 }}
                onPress={() => navigation.navigate("AddClerk")}
              >
                <Text
                  style={{
                    fontSize: deviceType == "mobile" ? 15 : 24,
                    color: "#FFF",
                  }}
                >
                  Add
                </Text>
              </Button>
            </View>
          </Block>

          <DataTable.Header
            style={{
              borderTopWidth: 0,
              borderBottomWidth: 2,
              borderColor: "black",
              width: "100%",
              // marginLeft: "3%",
              backgroundColor: "white",
            }}
          >
            <DataTable.Title
              textStyle={{
                fontSize: deviceType == "mobile" ? width * 0.04 : width * 0.025,
                fontWeight: "bold",
              }}
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              textStyle={{
                fontSize: deviceType == "mobile" ? width * 0.04 : width * 0.025,
                fontWeight: "bold",
              }}
            >
              Email
            </DataTable.Title>
            <DataTable.Title
              numeric
              textStyle={{
                fontSize: deviceType == "mobile" ? width * 0.04 : width * 0.025,
                fontWeight: "bold",
              }}
            >
              Phone
            </DataTable.Title>
            <DataTable.Title
              numeric
              textStyle={{
                fontSize: deviceType == "mobile" ? width * 0.04 : width * 0.025,
                fontWeight: "bold",
              }}
            >
              Delete
            </DataTable.Title>
          </DataTable.Header>
          {clerk &&
            clerk.map((x) => (
              <DataTable.Row
                key={x.email}
                style={{
                  width: "100%",
                  height: "12%",
                  // marginLeft: "3%",
                  backgroundColor: "white",
                }}
              >
                <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                  {x.fname}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                  {x.email}
                </DataTable.Cell>
                <DataTable.Cell numeric textStyle={{ fontSize: normalize(25) }}>
                  {x.phone}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Pressable
                    onPress={() => deletClerk(x.email)}
                    style={{
                      paddingLeft: "70%",
                    }}
                  >
                    <AntDesign name="delete" size={normalize(37)} color="red" />
                  </Pressable>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    paddingHorizontal: "5%",
  },
  head: {
    flexDirection: "row",
    padding: "1%",
    marginTop: "3%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    marginLeft: 20,
    textAlign: "left",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomWidth: 1,
    height: 45,
    alignItems: "right",
    width: "50%",

    margin: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    //flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 10,
    alignSelf: "center",
  },
  rowTitle: {
    fontSize: width * 0.03,
    //color:"purple",
    fontWeight: "bold",
  },
  rowData: { color: "black", fontSize: width * 0.04 },
});

export default Clerks;
