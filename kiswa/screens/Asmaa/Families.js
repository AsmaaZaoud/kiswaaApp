//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ImageBackground,
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
  where,
} from "firebase/firestore";
import { db } from "../../config";
//argon
import { Images, argonTheme, articles } from "../../constants/";

import { Card, Header } from "../../components";

import { Icon, AntDesign, FontAwesome } from "react-native-vector-icons";
import ArButton from "../../components/Button";
import { normalize } from "./AdminHome";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
  {
    title: "Music Album",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80",
    price: "$125",
  },
  {
    title: "Events",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80",
    price: "$35",
  },
];

const Families = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setFlag(false);
    readAllWhere();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  const [drivers, setDrivers] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);

  const readAllWhere = async () => {
    let temp = [];
    const q = query(collection(db, "families"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setDrivers(temp);
    setAllDrivers(temp);
    //console.log(drivers);
  };
  const [flag, setFlag] = useState(false);

  const [requests, setRequests] = useState([]);
  //  let user = "Wsd@ass.com"
  const readOne = async (user) => {
    setHover(user);
    let temp = [];
    const q = query(
      collection(db, "familyRequests"),
      where("familyID", "==", user)
    );
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      // let hour = doc.data().dateTime.toDate().getHours()
      let t = doc.data();
      // t.time = hour + ":00"
      // t.date = doc.data().dateTime.toDate().toLocaleDateString()
      temp.push(t);
      console.log(doc.id, " => ", t);
      // console.log(t);
    });
    setRequests(temp);

    // setAllorderss(temp)
    //console.log(drivers);
    setFlag(true);
  };

  const renderCards = () => {
    return (
      <Block height={height * 0.6}>
        {/* <ScrollView> */}
        <View style={{ flexDirection: "row" }}>
          {/* <ScrollView horizontal> */}
          {requests.map((item) => (
            <View style={styles.notificationBox} key={item.type}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: "2%",
                  paddingVertical: "1%",
                }}
              >
                <Text style={styles.description}>{item.status} </Text>
                {/* <Text style={styles.description}>{item.dateTime}</Text> */}
              </View>

              <View
                style={{
                  borderWidth: 0.6,
                  width: width * 0.4,
                  marginBottom: "1%",
                  // borderWidth: 1,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  margin: "5%",
                  marginTop: "2%",
                  // borderWidth: 1,
                  marginBottom: "1%",
                }}
              >
                {item.type == "donor" ? (
                  <Image
                    style={styles.icon}
                    source={require("../../assets/Asmaa/donorFeedback.png")}
                  />
                ) : (
                  <Image
                    style={styles.icon}
                    source={require("../../assets/Asmaa/familyFeedback.png")}
                  />
                )}

                <View
                  style={{
                    width: "67%",
                    // borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      //   width: "50%",
                      // borderWidth: 1,
                      padding: "1%",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <MaterialIcons name="location-pin" size={25} />
                        <Text style={styles.description}>{item.location}</Text>
                        <Text style={styles.description}>{item.location}</Text> */}
                    <Text style={styles.description}>{item.comment}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      // borderWidth: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <MaterialIcons name="date-range" size={25} /> */}
                    {/* <Text style={styles.description}>
                          {item.date} -{item.time}
                        </Text> */}
                  </View>
                </View>
              </View>
            </View>
          ))}
          {/* </ScrollView> */}
        </View>
      </Block>
    );
  };

  return (
    <DataTable style={{ height: 100 }}>
      <Block
        style={[
          styles.head,
          { height: height * 0.08, justifyContent: "space-between" },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="user" size={deviceType == "mobile" ? 30 : 45} />
          <Text
            style={{
              fontSize: deviceType == "mobile" ? 20 : 30,
              marginLeft: "5%",
            }}
          >
            Families
          </Text>
        </View>
        {/* <Button L color="primary"  style={{width:"25%", height:"50%"}} onPress={()=>navigation.navigate("AddDriver")}>
                      
                      <Text style={{fontSize:deviceType=="mobile" ?18: 26, color:"#FFF"}}>Add</Text> 
                      
                      </Button>     */}
      </Block>

      <DataTable.Header
        key={1}
        style={{
          borderTopWidth: 0,
          borderBottomWidth: 2,
          borderColor: "black",
          width: "90%",
          marginLeft: "3%",
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
      </DataTable.Header>
      <View height={flag ? height * 0.2 : height * 0.5}>
        <ScrollView>
          {drivers &&
            drivers.map((x) => (
              <DataTable.Row
                key={x.email}
                onPress={() => readOne(x.email)}
                style={{
                  width: "90%",
                  height: "12%",
                  marginLeft: "3%",
                  backgroundColor: hover == x.email ? "#f3e5f5" : "white",
                }}
              >
                <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                  {x.firstName}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                  {x.email}
                </DataTable.Cell>
                <DataTable.Cell numeric textStyle={{ fontSize: normalize(25) }}>
                  {x.phone}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </ScrollView>
      </View>

      {flag && requests.length == 0 ? (
        <View
          style={{
            width: width * 0.5,
            // height: height * 0.5,
            // borderWidth: 2,
            justifyContent: "center",
            // margin: "25%",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: normalize(50),
              color: "#5e1e7f",
            }}
          >
            No Requests Yet
          </Text>
        </View>
      ) : flag && requests.length != 0 ? (
        renderCards()
      ) : null}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EBEBEB',
    //paddingTop: 50,
    paddingHorizontal: "5%",
    height: 400,
  },

  tabletitle: {
    fontWeight: "bold",
    color: "white",
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
  notificationList: {
    marginTop: "1%",
    // padding: "3%",
    // borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  notificationBox: {
    width: width * 0.4,
    // padding: "5%",
    // paddingTop: "1%",
    marginTop: "2%",
    marginBottom: "3%",
    marginLeft: "8%",
    backgroundColor: "#F1EEFF",
    // flexDirection: "row",
    borderRadius: "15%",
    borderWidth: 0.3,
  },
  icon: {
    width: 70,
    height: 70,
  },
  description: {
    fontSize: normalize(20),
    // color: "#3498db",
    marginLeft: "3%",
    // textAlign: "center",
  },
});

export default Families;
