//galio
import { Block, GalioProvider, theme } from "galio-framework";
// React
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
  Card,
  Text,
} from "react-native";
//argon
import { Images, argonTheme } from "../../constants";

// import { Card } from "../../components/";

const { width } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const InventoryClerkHomePage = () => {
  return <Text>Hello, I am your cat!</Text>;
};
export default InventoryClerkHomePage;

const styles = StyleSheet.create({
  //   title: {
  //     paddingBottom: theme.SIZES.BASE,
  //     paddingHorizontal: theme.SIZES.BASE * 2,
  //     marginTop: 22,
  //     color: argonTheme.COLORS.HEADER,
  //   },
  //   group: {
  //     paddingTop: theme.SIZES.BASE,
  //   },
  //   albumThumb: {
  //     borderRadius: 4,
  //     marginVertical: 4,
  //     alignSelf: "center",
  //     width: thumbMeasure,
  //     height: thumbMeasure,
  //   },
  //   category: {
  //     backgroundColor: theme.COLORS.WHITE,
  //     marginVertical: theme.SIZES.BASE / 2,
  //     borderWidth: 0,
  //   },
  //   categoryTitle: {
  //     height: "100%",
  //     paddingHorizontal: theme.SIZES.BASE,
  //     backgroundColor: "rgba(0, 0, 0, 0.5)",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   imageBlock: {
  //     overflow: "hidden",
  //     borderRadius: 4,
  //   },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  //   productImage: {
  //     width: cardWidth - theme.SIZES.BASE,
  //     height: cardWidth - theme.SIZES.BASE,
  //     borderRadius: 3,
  //   },
  //   productPrice: {
  //     paddingTop: theme.SIZES.BASE,
  //     paddingBottom: theme.SIZES.BASE / 2,
  //   },
  //   productDescription: {
  //     paddingTop: theme.SIZES.BASE,
  //     // paddingBottom: theme.SIZES.BASE * 2,
  //   },
});

// export default InventoryClerkHomePage;
