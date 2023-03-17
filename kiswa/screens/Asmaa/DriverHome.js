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
  SafeAreaView,
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
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config";
import { signOut } from "firebase/auth";
import { Tab, TabView } from "@rneui/themed";
import DriverHistory from "./DriverHistory";
import DriverProfile from "./DriverProfile";
import { useIsFocused } from "@react-navigation/native";
import { or } from "react-native-reanimated";
import { async } from "@firebase/util";

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
  const isFocused = useIsFocused();

  const [IDs, setIDs] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);
  const reformat = (doc) => {
    for (let i = 1; i <= itemsArray.length; i++) {
      IDs.includes(i) ? null : IDs.push(i);
    }

    return { id: doc.id, ...doc.data() };
  };

  const getOrders = async () => {
    // console.log(cartId);
    const collectionRef = collection(db, "drivers", user, "orders");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setArr(
        querySnapshot.docs.map((doc) =>
          doc.data().type == "pickup" && doc.data().status == "pending"
            ? doc.data()
            : undefined
        )
      );

      setOrders(querySnapshot.docs.map((doc) => doc.data()));
      // setArr(orders.filter((x) => x.type == "pickup" && x.status == "pending"));
      console.log(arr);
    });

    return () => unsubscribe();
  };
  const id = props.email;
  const navigation = props.navigation;
  const [deviceType, setDeviceType] = useState("");
  const [type, setType] = useState("pick");
  const [arr, setArr] = useState([]);
  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
    getOrders();
  }, []);
  const [index, setIndex] = useState(0);

  const change = (type) => {
    console.log("changeeee", orders);
    if (type == "deliv") {
      setType("deliv");

      setArr(
        orders.filter((x) => x.type == "deliver" && x.status == "pending")
      );
    } else {
      setType("pick");
      setArr(orders.filter((x) => x.type == "pickup" && x.status == "pending"));
    }
  };

  const [orders, setOrders] = useState([]);

  let user = auth?.currentUser?.email;

  let lat = 25.2709954;
  let long = 51.5324509;

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
      <SafeAreaView style={{ height: "85%", width: width }}>
        <ScrollView>
          <View style={styles.home}>
            {arr.length != 0 ? (
              arr.map((x) =>
                x != undefined ? (
                  <View key={x.id} style={styles.card}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.cardTitle}>Order No</Text>

                      {/* <Text style={styles.cardTitle}>#{x.num}</Text> */}
                    </View>
                    <View style={styles.userCard}>
                      <FontAwesome name="user-circle-o" size={50} />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: "bold",
                          }}
                        >
                          Name
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: "bold",
                          }}
                        >
                          Phone
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: "bold",
                          }}
                        >
                          Email
                        </Text>
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: normalize(15) }}>
                          {x.userName}
                        </Text>
                        <Text style={{ fontSize: normalize(15) }}>
                          {x.phone}
                        </Text>
                        <Text style={{ fontSize: normalize(15) }}>
                          {x.userId}
                        </Text>
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
                          name="md-today-sharp"
                          size={30}
                          color="#5e1e7f"
                        />
                        <Text style={styles.dataTitles}>{x.date}</Text>
                      </View>
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="time-outline"
                          size={30}
                          color="#5e1e7f"
                        />
                        <Text style={styles.dataTitles}>{x.timeSlot}</Text>
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
                        <Ionicons
                          name="map-outline"
                          size={30}
                          color="#5e1e7f"
                        />
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
                        onPress={() =>
                          navigation.navigate("OrderDetails", x.id)
                        }
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
                ) : null
              )
            ) : (
              <Text style={styles.noOrder}> No Orders yet</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
    // </SafeAreaView>
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
    marginBottom: "9%",
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
    marginBottom: "10%",
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
