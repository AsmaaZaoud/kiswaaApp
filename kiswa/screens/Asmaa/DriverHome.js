import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  PixelRatio,
  ScrollView,
  Text,
  View,
  Pressable,
  Linking,
} from "react-native";
import { Block, theme } from "galio-framework";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
//Firebase
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
import { signOut } from "firebase/auth";
import { Tab, TabView } from "@rneui/themed";
import DriverHistory from "./DriverHistory";
import DriverProfile from "./DriverProfile";

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

const DriverHome = (props) => {
  const id = props.email;
  const navigation = props.navigation;
  // alert(id);
  const [deviceType, setDeviceType] = useState("");
  const [type, setType] = useState("pick");
  const [arr, setArr] = useState([]);
  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
    readOrders();
    readOrders();

    // setArr(pickup);
  }, []);
  const [index, setIndex] = useState(0);

  const change = (type) => {
    if (type == "deliv") {
      setType("deliv");
      setArr(deliver);
    } else {
      setType("pick");
      setArr(pickup);
    }
  };

  const [orders, setOrders] = useState([]);
  const [pickup, setPickup] = useState([]);
  const [deliver, setDeliver] = useState([]);
  const [data, setData] = useState();
  let user = auth?.currentUser?.email;

  const readOrders = async () => {
    let temp = [];
    let pick = [];
    let deliv = [];
    console.log(id.toLowerCase());

    const q = query(collection(db, "drivers", user, "orders"));
    // console.log("qqqq", q);

    const docs = await getDocs(q);
    // console.log("docs", docs);
    docs.forEach(async (doc) => {
      var num = doc.id[7];
      let hour = doc.data().dateTime.toDate().getHours();
      let t = doc.data();
      t.time = hour + ":00";
      t.date = doc.data().dateTime.toDate().toLocaleDateString();
      let a;

      doc.data().type == "pickup"
        ? (a = await readUser(doc.data().userId, "donors"))
        : (a = await readUser(doc.data().userId, "families"));
      t.userName = a.userName;
      t.phone = a.phone;
      t.id = doc.id;
      t.num = doc.id.split(num)[0];
      if (t.status == "pending") {
        temp.push(t);
        doc.data().type == "pickup" ? pick.push(t) : deliv.push(t);
      }

      // console.log(t);
      // setArr(pick);
    });
    setOrders(temp);
    setPickup(pick);
    setDeliver(deliv);

    setArr(pickup);

    console.log(arr);
  };
  let lat = 25.2709954;
  let long = 51.5324509;

  const readUser = async (id, table) => {
    const docRef = doc(db, table, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  return (
    <View>
      <Block style={styles.nav}>
        <Pressable onPress={() => change("pick")}>
          <Text style={type == "pick" ? styles.selected : styles.unselected}>
            Pickup
          </Text>
        </Pressable>

        <Text style={styles.unselected}>|</Text>
        <Pressable onPress={() => change("deliv")}>
          <Text style={type == "deliv" ? styles.selected : styles.unselected}>
            Deliver
          </Text>
        </Pressable>
      </Block>
      <ScrollView>
        <View style={styles.home}>
          {arr.length != 0 ? (
            arr.map((x) => (
              <View key={x.user} style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.cardTitle}>Order No</Text>

                  <Text style={styles.cardTitle}>#{x.num}</Text>
                </View>
                <View style={styles.userCard}>
                  <FontAwesome name="user-circle-o" size={50} />
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{ fontSize: normalize(15), fontWeight: "bold" }}
                    >
                      Name
                    </Text>
                    <Text
                      style={{ fontSize: normalize(15), fontWeight: "bold" }}
                    >
                      Phone
                    </Text>
                    <Text
                      style={{ fontSize: normalize(15), fontWeight: "bold" }}
                    >
                      Email
                    </Text>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: normalize(15) }}>
                      {x.userName}
                    </Text>
                    <Text style={{ fontSize: normalize(15) }}>{x.phone}</Text>
                    <Text style={{ fontSize: normalize(15) }}>{x.userId}</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <View style={[styles.dataView, { flexDirection: "row" }]}>
                    <Ionicons name="md-today-sharp" size={30} color="#5e1e7f" />
                    <Text style={styles.dataTitles}>{x.date}</Text>
                  </View>
                  <View style={[styles.dataView, { flexDirection: "row" }]}>
                    <Ionicons name="time-outline" size={30} color="#5e1e7f" />
                    <Text style={styles.dataTitles}>{x.time} PM</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <View style={[styles.dataView, { flexDirection: "row" }]}>
                    <Ionicons
                      name="location-outline"
                      size={30}
                      color="#5e1e7f"
                    />
                    <Text style={styles.dataTitles}>{x.location}</Text>
                  </View>
                  <View style={[styles.dataView, { flexDirection: "row" }]}>
                    <Ionicons name="map-outline" size={30} color="#5e1e7f" />
                    <Text
                      style={styles.dataTitles}
                      onPress={() =>
                        Linking.openURL(
                          `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
                        )
                      }
                    >
                      Open Map
                    </Text>
                  </View>
                </View>

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Pressable
                    onPress={() => navigation.navigate("OrderDetails", x.id)}
                    style={styles.pickupButtonContainer}
                  >
                    {type == "pick" ? (
                      <Text style={styles.pickupButton}>Pick up</Text>
                    ) : (
                      <Text style={styles.pickupButton}>Deliver</Text>
                    )}
                  </Pressable>
                  {/* <Pressable style={styles.cancelButtonContainer}>
            <Text style={styles.cancelButton}>c</Text>
          </Pressable> */}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noOrder}> No Orders yet</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    marginVertical: "7%",
    marginHorizontal: "19%",
    width: width * 0.6,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  noOrder: {
    fontSize: normalize(25),
    marginTop: "50%",
    marginLeft: "25%",
  },
  unselected: {
    fontSize: normalize(19),
  },
  selected: {
    color: "#5e1e7f",
    fontSize: normalize(19),
    fontWeight: "bold",
  },
  home: {
    marginHorizontal: "10%",
    height: height,
  },
  card: {
    marginVertical: "2%",
    padding: "7%",
    borderWidth: 1,
    borderColor: "#cbc",
    borderRadius: "10%",
  },
  cardTitle: {
    fontSize: normalize(20),
    marginBottom: "6%",
    // color:"#5e1e7f"
  },
  userCard: {
    borderWidth: 1,
    borderColor: "lightgrey",
    margin: "2%",
    borderRadius: "7%",
    flexDirection: "row",
    padding: "3%",
    shadowColor: "#666",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.49,
    elevation: 2,
  },

  dataView: {
    marginBottom: "6%",
  },
  dataTitles: {
    fontSize: normalize(19),
    // color: '#999',
    marginTop: "2%",
    marginLeft: "5%",
  },
  pickupButtonContainer: {
    backgroundColor: "#5e1e7f",
    borderRadius: "7%",
    width: width * 0.4,
    margin: "6%",
  },
  pickupButton: {
    textAlign: "center",
    fontSize: normalize(15),
    color: "#fff",
    padding: "7%",
  },

  cancelButtonContainer: {
    backgroundColor: "lightgrey",
    color: "black",
    textAlign: "center",
  },

  cancelButton: {
    color: "black",
    textAlign: "center",
    fontSize: normalize(15),
    padding: "7%",
  },
});

export default DriverHome;
