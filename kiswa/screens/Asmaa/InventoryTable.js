//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  Table,
  Platform,
  PixelRatio,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ClothTypeData as ClothTypeData,
  SizeData as SizeData,
  ColorData as ColorData,
  GenderData as GenderData,
  QualityData as QualityData,
  AgeCategory as AgeCategory,
} from "../../components/Fatima/Data";
import {
  BarChart,
  PieChart,
  StackedBarChart,
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
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
} from "firebase/firestore";
import { db } from "../../config";
//argon
import { Images, argonTheme, articles } from "../../constants";

import { Card, Header } from "../../components";

import { Icon, Feather, FontAwesome } from "react-native-vector-icons";
import ArButton from "../../components/Button";
// import { normalize } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";

const { width, height } = Dimensions.get("screen");
const scale = width / 830;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const InventoryTable = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    readAllWhere();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  // >>>>>>>>>>>>>> Search functions <<<<<<<<<<<<<<
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length === 0) {
      setInventory(allinventory);
    }

    const filteredData = allinventory.filter((item) =>
      item.type.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setInventory(allinventory);
    } else {
      setInventory(filteredData);
    }
  };

  const [inventory, setInventory] = useState([]);
  const [allinventory, setAllInventory] = useState([]);
  const [blouse, setBlouse] = useState([]);

  const readAllWhere = async () => {
    let temp = [];
    const q = query(collection(db, "inventory"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setInventory(temp);
    setAllInventory(temp);
    console.log(inventory);
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <Block flex>
      <View style={styles.container}>
        <DataTable>
          <Block
            style={[
              styles.head,
              { height: height * 0.08, justifyContent: "space-between" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width * 0.86,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Feather name="box" size={deviceType == "mobile" ? 30 : 45} />
                <Text
                  style={{
                    fontSize: deviceType == "mobile" ? 20 : 30,
                    marginLeft: "5%",
                  }}
                >
                  Inventory
                </Text>
              </View>
              <Searchbar
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
                style={{ width: width * 0.4, borderRadius: "19%" }}
                autoCorrect={false}
              />
            </View>
          </Block>
          <DataTable.Header
            style={{ borderWidth: 0.8, backgroundColor: "#4b0095" }}
          >
            <DataTable.Title textStyle={styles.title}>ID</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>
              <Dropdown
                autoScroll
                style={[
                  styles.smallInput,
                  // { padding: 0, width: open ? width * 0.6 : width * 0.2 },
                ]}
                placeholderStyle={{
                  fontSize: normalize(20),
                  textAlign: "left",
                  color: "white",
                  fontWeight: "bold",
                }}
                selectedTextStyle={styles.title}
                inputSearchStyle={styles.inputSearchStyle}
                data={ClothTypeData}
                labelField="label"
                valueField="value"
                id="value"
                maxHeight={400}
                search
                searchPlaceholder="Search..."
                animated={false}
                // value={type}
                placeholder={"Type"}
                onChange={(item) => {
                  // setType(item.value);
                  setOpen(true);
                }}
              />
            </DataTable.Title>
            <DataTable.Title textStyle={styles.title}>
              <Dropdown
                style={[
                  styles.smallInput,
                  // { padding: 0, width: open ? width * 0.6 : width * 0.2 },
                ]}
                placeholderStyle={{
                  fontSize: normalize(20),
                  textAlign: "left",
                  color: "white",
                  fontWeight: "bold",
                }}
                selectedTextStyle={{ fontSize: normalize(20) }}
                inputSearchStyle={styles.inputSearchStyle}
                data={SizeData}
                labelField="label"
                valueField="value"
                maxHeight={200}
                id="value"
                search
                searchPlaceholder="Search..."
                animated={false}
                // value={size}
                placeholder={"Size"}
                onChange={(item) => {
                  // setSize(item.value);
                }}
              />
            </DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Color</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Gender</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Age</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Quality</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>
              Available
            </DataTable.Title>
          </DataTable.Header>
          <View
            style={{
              height: height * 0.445,
              borderWidth: 0.4,
            }}
          >
            <ScrollView>
              {inventory.map((i, x) => (
                <DataTable.Row style={{ height: "1%", borderWidth: 0.5 }}>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {x + 1}
                  </DataTable.Cell>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {i.type}
                  </DataTable.Cell>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {i.size}
                  </DataTable.Cell>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {i.color}
                  </DataTable.Cell>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {i.gender}
                  </DataTable.Cell>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {i.age}
                  </DataTable.Cell>
                  <DataTable.Cell
                    id={i.id}
                    textStyle={{ fontSize: normalize(18) }}
                  >
                    {i.quality}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: normalize(18) }}>
                    {i.available == true ? "Available" : "Not-Available"}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </View>
        </DataTable>
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    //paddingTop: 50,
    paddingHorizontal: "5%",
  },
  head: {
    // flexDirection:"row",
    // borderWidth:1,
    // padding:"1%",
    // justifyContent:"space-between",
    // marginBottom:0

    flexDirection: "row",
    padding: "1%",
    marginTop: "3%",
    width: "90%",
    marginLeft: "3%",
    alignItems: "center",
    // borderWidth:2,
    justifyContent: "space-between",
  },
  title: {
    fontSize: normalize(20),
    color: "white",
    fontWeight: "bold",
  },
  smallInput: {
    width: width * 0.2,
    // borderWidth: 2,
    fontSize: normalize(30),
    // textAlign: "right",
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

export default InventoryTable;
