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
const scale = width / 830;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const FamiliesCards = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setFlag(false);
    readAllWhere();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  const [families, setFamilies] = useState([{ name: "asma" }]);
  const readAllWhere = async () => {
    let temp = [];
    const q = query(collection(db, "families"));
    const docs = await getDocs(q);
    console.log(docs);
    docs.forEach((doc) => {
      // temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setFamilies(temp);
    // setAllDrivers(temp);
    //console.log(drivers);
  };
  const [flag, setFlag] = useState(false);

  const [requests, setRequests] = useState([]);
  const readOne = async (user) => {
    setHover(user);
    let temp = [];
    const q = query(
      collection(db, "familyRequests"),
      where("familyID", "==", user)
    );
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      let t = doc.data();
      temp.push(t);
      console.log(doc.id, " => ", t);
    });
    setRequests(temp);
    setFlag(true);
  };
  return (
    <Block flex middle style={{ backgroundColor: "white", flex: 1 }}>
      <Block style={styles.registerContainer}>
        <Block flex>
          <Text style={styles.title}>Families</Text>
          <Text>hello</Text>

          <View>
            {families.map((item) => (
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
            ))}
          </View>
        </Block>
      </Block>
    </Block>
  );
};

export default FamiliesCards;

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
