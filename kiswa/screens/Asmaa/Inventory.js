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
} from "react-native";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD

import {
  BarChart,
  PieChart,
  StackedBarChart,
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
=======
import {
  View,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  Table,
} from "react-native";
>>>>>>> main
import { DataTable } from "react-native-paper";
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
import { Images, argonTheme, articles } from "../../constants/";

import { Card, Header } from "../../components";

import { Icon, Feather, FontAwesome } from "react-native-vector-icons";
import ArButton from "../../components/Button";
import { normalize } from "@rneui/themed";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const Inventory = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    readAllWhere();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  const [inventory, setInventory] = useState([]);
  const [allinventory, setAllInventory] = useState([]);

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
<<<<<<< HEAD
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
=======
>>>>>>> main
  };

  return (
    <Block flex>
<<<<<<< HEAD
      {/* <View style={styles.container}>
=======
      <View style={styles.container}>
>>>>>>> main
        <DataTable>
          <Block
            style={[
              styles.head,
              { height: height * 0.08, justifyContent: "space-between" },
            ]}
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
          </Block>
          <DataTable.Header>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              ID
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Type
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Size
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Color
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Gender
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Age
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Quality
            </DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: normalize(15) }}>
              Available
            </DataTable.Title>
          </DataTable.Header>
<<<<<<< HEAD
=======
          {/* <ScrollView vertical="true"> */}
>>>>>>> main
          {inventory.map((i, x) => (
            <DataTable.Row style={{ height: "1%" }}>
              <DataTable.Cell id={i.id}>{x + 1}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.type}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.size}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.color}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.gender}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.age}</DataTable.Cell>
              <DataTable.Cell id={i.id}>{i.quality}</DataTable.Cell>
<<<<<<< HEAD
=======
              {/* hide not availabe items */}
              {/* {i.available == true ? <DataTable.Cell>Available</DataTable.Cell> : null} */}
>>>>>>> main
              <DataTable.Cell>
                {i.available == true ? "Available" : "Not-Available"}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
<<<<<<< HEAD
        </DataTable>
      </View> */}

      <View
        style={{
          width: width * 0.8,
          // borderWidth: 1,
          height: height * 0.4,
          marginTop: 20,
        }}
      >
        <BarChart
          // style={graphStyle}
          data={data}
          width={width * 0.8}
          height={height * 0.3}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          verticalLabelRotation={30}
        />
=======
          {/* </ScrollView> */}
        </DataTable>
>>>>>>> main
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

export default Inventory;
