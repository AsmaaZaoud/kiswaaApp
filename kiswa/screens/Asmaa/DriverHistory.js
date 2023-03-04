import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, MaterialIcons } from "react-native-vector-icons";
import { signOut } from "firebase/auth";
import { db } from "../../config";
import { normalize } from "./DriverHome";
import { collection, getDocs, query } from "firebase/firestore";
import { Block } from "galio-framework";
const { width, height } = Dimensions.get("screen");

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
      let hour = doc.data().dateTime.toDate().getHours();
      let t = doc.data();
      t.time = hour + ":00";
      t.date = doc.data().dateTime.toDate().toLocaleDateString();
      doc.data().status == "done" ? temp.push(t) : null;
      // temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
      //   doc.data().type == "pickup" ? pick.push(t) : deliv.push(t);
    });
    setOrders(temp);
    // setArr(temp);
    console.log(orders);
  };

  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
    readOrders();
  }, []);

  const data = [
    {
      id: 1,
      description: "Loconsectetur adipiscing elit",
    },
    {
      id: 2,
      description: "Loconsectetur adipiscing elit",
    },
    {
      id: 3,
      description: "Loconsectetur adipiscing elit",
    },
    {
      id: 4,
      description: "Loconsectetur adipiscing elit",
    },
    {
      id: 5,
      description: "Loconsectetur adipiscing elit",
    },
    {
      id: 6,
      description: "Loconsectetur adipiscing elit",
    },
  ];
  return (
    <Block flex middle style={{ backgroundColor: "white", flex: 1 }}>
      <Block style={styles.registerContainer}>
        <Block flex>
          <Text style={styles.title}>Orders History</Text>

          <FlatList
            style={styles.notificationList}
            enableEmptySections={true}
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.notificationBox} key={item.type}>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/Asmaa/driv.png")}
                  />
                  <View
                    style={{
                      width: "67%",
                    }}
                  >
                    <Text style={styles.description}>
                      <MaterialIcons name="location-pin" size={20} />

                      {item.location}
                    </Text>
                    <Text style={styles.description}>
                      <MaterialIcons name="date-range" size={20} />
                      {item.date} -{item.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignContent: "flex-end",
                      marginLeft: "10%",
                    }}
                  >
                    <MaterialIcons name="done" size={40} color="green" />
                  </View>
                </View>
              );
            }}
          />
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
    // fontSize: normalize(25),
    // marginTop: "5%",
    // marginLeft: "5%",
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
    padding: "5.5%",
    marginTop: "2%",
    marginBottom: "3%",
    backgroundColor: "#F1EEFF",
    flexDirection: "row",
    borderRadius: "15%",
    borderWidth: 0.3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  description: {
    fontSize: 18,
    // color: "#3498db",
    marginLeft: 10,
  },
});
