import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  PixelRatio,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, MaterialIcons } from "react-native-vector-icons";
import { signOut } from "firebase/auth";
import { db } from "../../config";
import { collection, getDocs, query } from "firebase/firestore";
import { Block } from "galio-framework";
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

const DriverHistory = (props, { navigation }) => {
  const id = props.email;
  console.log(id);
  const [deviceType, setDeviceType] = useState("");

  // const [arr, setArr] = useState([]);
  const [orders, setOrders] = useState([]);

  const readOrders = async () => {
    let temp = [];
    const q = query(collection(db, "drivers", id.toLowerCase(), "orders"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      let hour = doc.data()?.dateTime.toDate().getHours();
      let t = doc.data();
      t.time = hour + ":00";
      t.date = doc.data()?.dateTime.toDate().toLocaleDateString();
      doc.data().status == "fullfied" ? temp.push(t) : null;
      // temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
      //   doc.data().type == "pickup" ? pick.push(t) : deliv.push(t);
    });
    setOrders(temp);
    setOrders(temp);

    // setArr(temp);
    console.log(orders);
  };

  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
    // readOrders();
  }, []);

  return (
    <Block
      flex
      middle
      style={{ backgroundColor: "white", flex: 1, width: width }}
    >
      <Block style={styles.registerContainer}>
        <Block flex>
          <Text style={styles.title}>Orders History</Text>
          {orders.length > 0 ? (
            <FlatList
              style={styles.notificationList}
              enableEmptySections={true}
              data={orders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.notificationBox} key={item.type}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: "2%",
                        paddingVertical: "1%",
                      }}
                    >
                      <Text style={styles.description}>Order# </Text>
                      <Text style={styles.description}>2FE5DF3</Text>
                    </View>

                    <View
                      style={{
                        borderWidth: 0.6,
                        width: width * 0.9,
                        marginBottom: "4%",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        margin: "5%",
                        marginTop: "1%",
                      }}
                    >
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

                      <View
                        style={{
                          width: "67%",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "50%",
                            // borderWidth: 1,
                            padding: "1%",
                            justifyContent: "space-between",
                          }}
                        >
                          <MaterialIcons name="location-pin" size={25} />
                          <Text style={styles.description}>
                            {item.location}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            width: "75%",
                            // borderWidth: 1,
                            justifyContent: "space-between",
                          }}
                        >
                          <MaterialIcons name="date-range" size={25} />
                          <Text style={styles.description}>
                            {item.date} -{item.time}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignContent: "flex-end",
                          marginLeft: "7%",
                        }}
                      >
                        <MaterialIcons name="done" size={45} color="green" />
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.noOrder}>No orders yet</Text>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default DriverHistory;

const styles = StyleSheet.create({
  topl: {
    width: width * 0.97,
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5e1e7f",
    marginTop: "3%",
  },
  title: {
    fontSize: normalize(25),
    marginTop: "5%",
    marginLeft: "5%",
  },
  noOrder: {
    fontSize: normalize(25),
    marginTop: "50%",
    marginLeft: "5%",
  },
  container: {
    backgroundColor: "red",
  },
  notificationList: {
    marginTop: "1%",
    padding: "3%",
    // borderWidth: 1,
    backgroundColor: "white",
  },
  notificationBox: {
    width: width * 0.9,
    // padding: "5%",
    paddingTop: "1%",
    marginTop: "2%",
    marginBottom: "3%",
    backgroundColor: "#F1EEFF",
    // flexDirection: "row",
    borderRadius: "15%",
    borderWidth: 0.3,
  },
  icon: {
    width: 50,
    height: 50,
  },
  description: {
    fontSize: normalize(20),
    // color: "#3498db",
    marginLeft: "3%",
    // textAlign: "center",
  },
});
