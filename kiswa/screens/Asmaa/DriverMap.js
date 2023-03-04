import { Dimensions, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { Block } from "galio-framework";
const { width, height } = Dimensions.get("screen");

const DriverMap = () => {
  let lat = 25.2709954;
  let long = 51.5324509;
  return (
    <View style={{ width: width, margin: "20%" }}>
      <Text>Map</Text>
      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
          )
        }
      >
        Open Map
      </Text>
    </View>
  );
};

export default DriverMap;

const styles = StyleSheet.create({});
