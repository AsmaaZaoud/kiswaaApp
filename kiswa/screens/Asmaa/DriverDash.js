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
import { Tab, TabView } from "@rneui/themed";
import DriverHistory from "./DriverHistory";
import DriverProfile from "./DriverProfile";
import DriverHome from "./DriverHome";
import Drivers from "./Drivers";
import DriverMap from "./DriverMap";

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
const DriverDash = ({ route, navigation }) => {
  const id = route.params;
  const [deviceType, setDeviceType] = useState("");
  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  const [index, setIndex] = useState(0);
  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <Block flex>
      <View
        style={{
          backgroundColor: "#5e1e7f",
          width: width,
          height: height * 0.1,
        }}
      >
        <View style={styles.topl}>
          <Image
            source={require("../../assets/Fatima/Whitelogo-noBackground.png")}
            style={{ width: 150, height: 50 }}
            width={width * 0.35}
            height={height * 0.05}
          />
          <Pressable onPress={onSignOut}>
            <Feather
              name="log-out"
              size={deviceType == "mobile" ? 35 : 45}
              color="white"
            />
          </Pressable>
        </View>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        {/*--------- Home -------------*/}
        <TabView.Item style={styles.comp}>
          {/* <View style={styles.board}> */}
          <DriverHome navigation={navigation} email={id} />
          {/* </View> */}
        </TabView.Item>
        {/*--------- Map -------------*/}
        <TabView.Item style={styles.comp}>
          <View style={styles.board}>
            {/* <Text>Map</Text> */}
            <DriverMap navigation={navigation} email={id} />
          </View>
        </TabView.Item>
        {/*--------- History -------------*/}
        <TabView.Item style={styles.comp}>
          <DriverHistory navigation={navigation} email={id} />
        </TabView.Item>
        {/*--------- Profile -------------*/}
        <TabView.Item style={styles.comp}>
          <DriverProfile navigation={navigation} email={id} />
          {/* <Drivers /> */}
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: "#fff",
          height: 0.1,
        }}
        style={{ height: height * 0.08, borderWidth: 0 }}
      >
        <Tab.Item
          onChange={setIndex}
          value={2}
          title="Boys"
          style={{
            borderBottomColor: index == 0 ? "#af9ec6" : "white",
            borderBottomWidth: 0,
            backgroundColor: "white",
          }}
        >
          <FontAwesome
            color={index == 0 ? "#5e1e7f" : "black"}
            name="home"
            size={deviceType == "mobile" ? 45 : 45}
          />
          {/* <Text style={{ fontSize: normalize(19) }}>Families</Text> */}
        </Tab.Item>
        <Tab.Item
          onChange={setIndex}
          value={3}
          title="Girls"
          style={{
            borderBottomColor: index == 1 ? "#5e1e7f" : "white",
            borderBottomWidth: 0,
            backgroundColor: "white",
          }}
        >
          <Feather
            color={index == 1 ? "#5e1e7f" : "black"}
            name="list"
            size={deviceType == "mobile" ? 40 : 45}
          />
          {/* <Text style={{ fontSize: normalize(19) }}>Donors</Text> */}
        </Tab.Item>
        <Tab.Item
          onChange={setIndex}
          value={4}
          title="Girls"
          style={{
            borderBottomColor: index == 2 ? "#af9ec6" : "white",
            borderBottomWidth: 0,
            backgroundColor: "white",
          }}
        >
          <FontAwesome
            color={index == 2 ? "#5e1e7f" : "black"}
            name="history"
            size={deviceType == "mobile" ? 45 : 45}
          />
          {/* <Text style={{ fontSize: normalize(19) }}>Clerk</Text> */}
        </Tab.Item>
        <Tab.Item
          onChange={setIndex}
          value={5}
          title="Girls"
          style={{
            borderBottomColor: index == 3 ? "#af9ec6" : "white",
            borderBottomWidth: 0,
            backgroundColor: "white",
          }}
        >
          <FontAwesome
            color={index == 3 ? "#5e1e7f" : "black"}
            name="user-circle"
            size={deviceType == "mobile" ? 40 : 45}
          />
          {/* <Text style={{ fontSize: normalize(19) }}>Inventory</Text> */}
        </Tab.Item>
      </Tab>
    </Block>
  );
};
const styles = StyleSheet.create({
  topl: {
    width: width * 0.97,
    padding: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5e1e7f",
    marginTop: "3%",
  },
  comp: {
    //width: width,
    // height: height * 0.2,
    backgroundColor: "white",
  },
});

export default DriverDash;
