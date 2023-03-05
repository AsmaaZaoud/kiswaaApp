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

const Donors = ({ navigation }) => {
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
    const q = query(collection(db, "donors"));
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
      <Block>
        <Block
          style={[
            styles.head,
            { height: height * 0.08, justifyContent: "space-between" },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: deviceType == "mobile" ? 20 : 30,
                marginLeft: "5%",
              }}
            >
              {flag}
            </Text>
          </View>
        </Block>
        <DataTable.Header
          key={1}
          style={{
            borderWidth: 1,
            borderColor: "black",
            width: "90%",
            marginLeft: "3%",
            backgroundColor: "#5e1e7f",
          }}
        >
          <DataTable.Title
            textStyle={[styles.tabletitle, { fontSize: normalize(25) }]}
          >
            Cart
          </DataTable.Title>
          <DataTable.Title
            textStyle={[styles.tabletitle, { fontSize: normalize(25) }]}
          >
            Status
          </DataTable.Title>
          <DataTable.Title
            textStyle={[styles.tabletitle, { fontSize: normalize(25) }]}
          >
            Email
          </DataTable.Title>

          {/* <DataTable.Title numeric textStyle={[styles.tabletitle ,{fontSize: normalize(25) }]}>Time</DataTable.Title> */}
        </DataTable.Header>
        <View height={height * 0.15}>
          <ScrollView>
            {requests &&
              requests.map((x) => (
                <DataTable.Row
                  key={x.user}
                  style={{
                    width: "90%",
                    height: "12%",
                    marginLeft: "3%",
                    backgroundColor: "#f3e5f5",
                    borderWidth: 1,
                  }}
                >
                  <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                    {x.cart}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                    {x.status}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: normalize(25) }}>
                    {x.familyID}
                  </DataTable.Cell>
                  {/* <DataTable.Cell numeric textStyle={{fontSize:normalize(25) }}>{x.time}</DataTable.Cell> */}
                </DataTable.Row>
              ))}
          </ScrollView>
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
            Donors
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
            height: height * 0.2,
            // borderWidth: 2,
            justifyContent: "center",
            margin: "25%",
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
            No Donations yet
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

export default Donors;
