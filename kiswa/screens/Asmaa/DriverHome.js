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
const DriverHome = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");
  const [type, setType] = useState("pick");
  const [arr, setArr] = useState([]);
  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
    // setArr(pick);
    readOrders();
    setArr(pickup);
  }, []);

  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };

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

  let user = "sam@mail.com";
  const readOrders = async () => {
    let temp = [];
    let pick = [];
    let deliv = [];
    const q = query(collection(db, "drivers", user, "orders"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      let hour = doc.data().dateTime.toDate().getHours();
      let t = doc.data();
      t.time = hour + ":00";
      t.date = doc.data().dateTime.toDate().toLocaleDateString();
      temp.push(t);
      // temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
      doc.data().type == "pickup" ? pick.push(t) : deliv.push(t);
    });
    setOrders(temp);
    setPickup(pick);
    setDeliver(deliv);
    setArr(pick);
    //console.log(drivers);
  };

  return (
    <Block flex>
      <View style={{ backgroundColor: "#5e1e7f", width: width }}>
        <View style={styles.topl}>
          <Image
            source={require("../../assets/imgs/kiswaLogo.jpg")}
            style={{ width: 150, height: 50 }}
            width={width * 0.27}
            height={height * 0.05}
          />
          <Pressable onPress={onSignOut}>
            <MaterialCommunityIcons
              name="logout"
              size={deviceType == "mobile" ? 30 : 45}
              color="white"
            />
          </Pressable>
        </View>
      </View>

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
          {arr.map((x) => (
            <View key={x.user} style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.cardTitle}>Order No</Text>

                <Text style={styles.cardTitle}>#{x.id}</Text>
              </View>
              <View style={styles.userCard}>
                <FontAwesome name="user-circle-o" size={50} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: normalize(15), fontWeight: "bold" }}>
                    Name{" "}
                  </Text>
                  <Text style={{ fontSize: normalize(15), fontWeight: "bold" }}>
                    Phone{" "}
                  </Text>
                  <Text style={{ fontSize: normalize(15), fontWeight: "bold" }}>
                    Email{" "}
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
                  <Ionicons name="location-outline" size={30} color="#5e1e7f" />
                  <Text style={styles.dataTitles}>{x.location}</Text>
                </View>
                <View style={[styles.dataView, { flexDirection: "row" }]}>
                  <Ionicons name="map-outline" size={30} color="#5e1e7f" />
                  <Text style={styles.dataTitles}>Open Map</Text>
                </View>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Pressable style={styles.pickupButtonContainer}>
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
          ))}
        </View>
      </ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  topl: {
    width: width * 0.97,
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5e1e7f",
    marginTop: "3%",
  },
  nav: {
    marginVertical: "7%",
    marginHorizontal: "19%",
    width: width * 0.6,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
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
