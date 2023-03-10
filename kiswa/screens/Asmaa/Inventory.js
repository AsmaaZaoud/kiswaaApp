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
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  PieChart,
  StackedBarChart,
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
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

import {
  Icon,
  Feather,
  FontAwesome,
  AntDesign,
} from "react-native-vector-icons";
import ArButton from "../../components/Button";
import { normalize } from "@rneui/themed";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const Inventory = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    readAllWhere();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

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
    setTotal(temp.length);
    setInventory(temp);
    setAllInventory(temp);
    console.log(inventory);
  };

  const data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"],
    datasets: [
      {
        data: [12, 14, 13, 17, 20, 14],
        color: (opacity = 1) => `rgba(121, 203, 128, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Donation Days"], // optional
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: deviceType == "mobile" ? 700 : 900,
      }}
    >
      <ScrollView>
        <Block>
          <View
            style={{
              width: width,
              height: height * 0.033,
              backgroundColor: "#F5BD9A",
              marginTop: "2%",
            }}
          >
            <Text style={styles.title}>Statistics</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // borderWidth: 1,
              padding: "1%",
              width: width * 0.99,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.icon}
                source={require("../../assets/Asmaa/totalItems.png")}
              />
              <Text
                style={{
                  fontSize: normalize(18),
                  marginLeft: "3%",
                  marginTop: "3.9%",
                }}
              >
                Total items ={inventory.length}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate("AdminHome", "table")}
            >
              <AntDesign
                name="table"
                size={normalize(40)}
                style={{ marginTop: "1%" }}
              />
            </Pressable>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <View
              style={{
                flexDirection: "row",
                // flex: 1,
                // borderWidth: 1,
                height: height * 0.3,
                width: width * 3,
              }}
            >
              <View
                style={[
                  styles.status,
                  { width: deviceType == "mobile" ? width * 0.8 : width * 0.5 },
                ]}
              >
                <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
                  Quality
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "100%",
                  }}
                ></View>
                <PieChart
                  data={[
                    {
                      name: "Good",
                      population: inventory.filter(
                        (item) => item.quality === "Good"
                      ).length,
                      color: "#90DF8C",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "New",
                      population: inventory.filter(
                        (item) => item.quality === "New"
                      ).length,
                      color: "#82C9CC",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Bad",
                      population: inventory.filter(
                        (item) => item.quality === "Bad"
                      ).length,
                      color: "#F7C3F0",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                  ]}
                  width={deviceType == "mobile" ? width * 0.8 : width * 0.5}
                  height={height * 0.2}
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
                  absolute //for the absolute number remove if you want percentage
                />
              </View>
              <View
                style={[
                  styles.status,
                  { width: deviceType == "mobile" ? width * 0.8 : width * 0.5 },
                ]}
              >
                <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
                  Ages
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "100%",
                  }}
                ></View>
                <PieChart
                  data={[
                    {
                      name: "Kids",
                      population: inventory.filter(
                        (item) => item.age === "Kids"
                      ).length,
                      color: "#F7A17F",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Men",
                      population: inventory.filter((item) => item.age === "men")
                        .length,
                      color: "#D7C3F0",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Women",
                      population: inventory.filter(
                        (item) => item.age === "women"
                      ).length,
                      color: "#F7C3F0",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                  ]}
                  width={deviceType == "mobile" ? width * 0.8 : width * 0.5}
                  height={height * 0.2}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    // decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      // borderRadius: 16,
                      color: "red",
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="30"
                  absolute //for the absolute number remove if you want percentage
                />
              </View>

              <View
                style={[
                  styles.status,
                  { width: deviceType == "mobile" ? width * 0.8 : width * 0.5 },
                ]}
              >
                <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
                  Type
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "100%",
                  }}
                ></View>
                <PieChart
                  data={[
                    {
                      name: "T-Shirt",
                      population: inventory.filter(
                        (item) => item.type === "T-Shirt"
                      ).length,
                      color: "#A8F7D8",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Blouse",
                      population: inventory.filter(
                        (item) => item.type === "Blouse"
                      ).length,
                      color: "#E6A8F7",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Pajamas",
                      population: inventory.filter(
                        (item) => item.type === "Pajamas"
                      ).length,
                      color: "#A7D4F7",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Abaya",
                      population: inventory.filter(
                        (item) => item.type === "Abaya"
                      ).length,
                      color: "#F7BDA8",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Jacket",
                      population: inventory.filter(
                        (item) => item.type === "Jacket"
                      ).length,
                      color: "#F3F7A8",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Leggings",
                      population: inventory.filter(
                        (item) => item.type === "Leggings"
                      ).length,
                      color: "#F56464",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Pants",
                      population: inventory.filter(
                        (item) => item.type === "Pants / Trousers"
                      ).length,
                      color: "#F7A8A8",
                      legendFontColor: "#727F7F",
                      legendFontSize: 15,
                    },
                  ]}
                  width={deviceType == "mobile" ? width * 0.8 : width * 0.5}
                  height={height * 0.2}
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
                    marginVertical: 5,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute //for the absolute number remove if you want percentage
                />
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              width: width,
              height: height * 0.033,
              backgroundColor: "#F5BD9A",
              marginTop: "2%",
            }}
          >
            <Text style={styles.title}>Analysis</Text>
          </View>
          <View
            style={{
              marginTop: "2%",
              marginHorizontal: "5%",
              borderWidth: 1,
              height: height * 0.36,
              borderRadius: "15%",
            }}
          >
            <Text style={{ fontSize: normalize(23), marginLeft: "3%" }}>
              Items
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: "100%",
              }}
            ></View>
            <BarChart
              data={{
                labels: ["Total In Come", "Profit", "dd"],
                datasets: [
                  {
                    data: [30, 20, 10],
                  },
                ],
              }}
              width={width * 0.7} // from react-native
              height={height * 0.3}
              //yAxisLabel={"QR"}
              chartConfig={{
                backgroundColor: "#ECA3F5",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    //paddingTop: 50,
    paddingHorizontal: "5%",
  },
  status: {
    height: height * 0.25,
    borderWidth: 1,
    borderRadius: "20%",
    marginVertical: "1%",
    margin: "1%",
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
    fontSize: normalize(25),
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
    width: normalize(40),
    height: normalize(40),
    marginLeft: "2%",
    marginTop: "2%",
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
