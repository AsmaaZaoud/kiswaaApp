import {
  Dimensions,
  Image,
  Linking,
  PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Entypo } from "react-native-vector-icons";
import { auth, db } from "../../config";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
// import { Block } from "galio-framework";
const { width, height } = Dimensions.get("screen");
const scale = width / 428;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
const DriverMap = (props) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let id = auth?.currentUser?.email;
  let lat = 25.2709954;
  let long = 51.5324509;
  const data = [
    { id: 1, day: 1, type: "pickup", month: "Sep" },
    { id: 9, day: 9, type: "deliver", month: "May" },
    { id: 2, day: 2, type: "pickup", month: "Jan" },
    { id: 8, day: 8, type: "deliver", month: "Jan" },
    { id: 3, day: 3, type: "pickup", month: "Aug" },
  ];
  const [arr, setArr] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [today, setToday] = useState(new Date());
  const [todayFormat, setTodayFormat] = useState("");

  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
    makeDate();
    // makeDate(today);
    console.log(new Date(today));
    // readOrders();
  }, []);
  const [orders, setOrders] = useState([]);
  // const [orders2, setOrders2] = useState([]);

  const readOrders = async () => {
    let temp = [];

    const q = query(collection(db, "drivers", "sim@mail.com", "orders"));
    const docs = await getDocs(q);
    docs.forEach(async (doc) => {
      let hour = doc.data().dateTime.toDate().getHours();
      console.log(doc.data().dateTime.toDate());
      let t = doc.data();
      t.time = hour + ":00";
      t.dateTime = doc.data().dateTime.toDate();
      t.date = doc.data().dateTime.toDate().toLocaleDateString();
      let a;
      doc.data().type == "pickup"
        ? (a = await readUser(doc.data().userId, "donors"))
        : (a = await readUser(doc.data().userId, "families"));
      t.userName = a.userName;
      t.phone = a.phone;

      temp.push(t);
      console.log("each", temp);
      setOrders(temp);
    });
    sortTime();
  };

  const sortTime = () => {
    let temp = [...orders];
    console.log("sorttttt", temp);
    temp.sort((a, b) => {
      const timeA = a.time;
      const timeB = b.time;
      return timeA - timeB;
    });
    setOrders(temp);

    console.log("afterrr", orders);
  };

  const readUser = async (id, table) => {
    const docRef = doc(db, table, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      // setData(docSnap.data());
      // return data;
      // console.log(docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  const makeDate = () => {
    var newD = new Date();
    var day = newD.getDay();
    var month = monthNames[newD.getMonth()];
    var year = newD.getFullYear();
    var date = `${day}-${month}-${year}`;
    setToday(date);
    console.log(date);
  };

  return (
    <View style={{ width: width, height: height }}>
      <View style={styles.container}>
        <ScrollView>
          {/* <Text style={{ fontSize: 40, marginHorizontal: 20, marginTop: 10 }}>
          To do List
        </Text> */}
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 13,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            {today}
          </Text>
          {orders ? (
            <FlatList
              scrollEnabled={false}
              enableEmptySections={true}
              style={styles.eventList}
              data={orders}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                  // onPress={() => showAlert("row")}
                  >
                    <View style={styles.eventBox}>
                      <View style={styles.eventDate}>
                        <View>
                          <Entypo name="dot-single" size={30} />
                          <View
                            style={{
                              marginHorizontal: 15,
                              borderWidth: 1,
                              width: 2,
                              height: 60,
                            }}
                          ></View>
                        </View>
                        <Text style={styles.eventDay}>{item.time} PM</Text>

                        {/* <Text style={styles.eventMonth}>{item.month}</Text> */}
                      </View>
                      <View style={styles.eventContent}>
                        {item.type == "pickup" ? (
                          <Image
                            style={styles.icon}
                            source={require("../../assets/imgs/pick.png")}
                          />
                        ) : (
                          <Image
                            style={styles.icon}
                            source={require("../../assets/imgs/deliv.png")}
                          />
                        )}
                        {/* <Text style={styles.eventTime}>10:00 am - 10:45 am</Text> */}
                        <View style={{ marginLeft: "4%" }}>
                          <Text style={styles.userName}>{item.location}</Text>
                          <Text style={styles.description}>
                            {item.userName} 66006600
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 13,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            07-Mar-2023
          </Text>
          <FlatList
            enableEmptySections={true}
            style={styles.eventList}
            data={data}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                // onPress={() => showAlert("row")}
                >
                  <View style={styles.eventBox}>
                    <View style={styles.eventDate}>
                      <View>
                        <Entypo name="dot-single" size={30} />
                        <View
                          style={{
                            marginHorizontal: 15,
                            borderWidth: 1,
                            width: 2,
                            height: 60,
                          }}
                        ></View>
                      </View>
                      <Text style={styles.eventDay}>12:00 PM</Text>

                      {/* <Text style={styles.eventMonth}>{item.month}</Text> */}
                    </View>
                    <View style={styles.eventContent}>
                      {item.type == "pickup" ? (
                        <Image
                          style={styles.icon}
                          source={require("../../assets/imgs/pick.png")}
                        />
                      ) : (
                        <Image
                          style={styles.icon}
                          source={require("../../assets/imgs/deliv.png")}
                        />
                      )}
                      {/* <Text style={styles.eventTime}>10:00 am - 10:45 am</Text> */}
                      <View style={{ marginLeft: "4%" }}>
                        <Text style={styles.userName}>Alkhor</Text>
                        <Text style={styles.description}>Ahmad - street 9</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default DriverMap;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1EFFF",
    // height: height,
  },
  eventList: {
    // marginTop: 10,
    // height: "90%",
    // borderWidth: 1,
  },
  eventBox: {
    // padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    // borderWidth: 1,
    width: "95%",
  },
  eventDate: {
    flexDirection: "row",
    // borderWidth: 1,
    height: "30%",
    // marginTop: 20,
  },
  eventDay: {
    fontSize: normalize(15),
    color: "#0099FF",
    marginTop: 10,

    // fontWeight: "600",
  },
  eventMonth: {
    fontSize: normalize(16),
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: "2%",
    backgroundColor: "#FFFFFF",
    padding: "5%",
    paddingBottom: 0,
    paddingTop: "4%",
    borderRadius: "4%",
    // borderWidth: 1,
  },
  icon: {
    width: 50,
    height: 50,
  },
  description: {
    fontSize: normalize(15),
    color: "#646464",
  },
  eventTime: {
    fontSize: normalize(18),
    color: "#151515",
  },
  userName: {
    fontSize: normalize(16),
    color: "#151515",
  },
});
