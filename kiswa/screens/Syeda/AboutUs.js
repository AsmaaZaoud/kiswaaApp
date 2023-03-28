import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import {
  Fontisto,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Ionicons,
  Entypo,
} from "react-native-vector-icons";
import Images from "../../constants/Images";
const { width, height } = Dimensions.get("screen");

const AboutUs = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;

    // Calculate the opacity based on the scroll position
    const opacity = Math.max(0, 1 - y / 100);

    // Update the opacity of the Animated.View
    Animated.timing(fadeAnim, {
      toValue: opacity,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Block flex>
      <ScrollView>
        <Animated.View style={{ opacity: fadeAnim }}>
          <ImageBackground
            source={Images.background}
            style={{ width: width * 1, height: height * 0.2 }}
          >
            <Block style={styles.textBG}>
              <Text bold size={50} color="#331054">
                About Rahma
              </Text>
            </Block>
          </ImageBackground>

          <Block style={styles.container}>
            <Text></Text>
          </Block>
        </Animated.View>

        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: "https://as1.ftcdn.net/v2/jpg/03/00/14/50/1000_F_300145014_WkM7fkKi1n8RbgkWajcNON69Y3pERv7n.jpg",
            }}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              marginHorizontal: 20,
              fontWeight: "300",
            }}
          >
            Rahma is a free platform on which you can either choose to become a
            donor and donate clothes or a receiver and receive clothes.
          </Text>
          <View style={{ margin: 30 }}></View>

          <Image
            style={styles.image}
            source={{
              uri: "https://harmony1.com/wp-content/uploads/2016/05/shutterstock_19259410.jpg",
            }}
          ></Image>
          <Text bold size={30} color="#32325D">
            You help the environment!
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 20,
            }}
          >
            Artificial fibres such as polyester take anywhere from 20 to 200
            years to break down, which is extremely harmful to our environment.
            We collect clothes in any state of condition. Whether they be brand
            new or worn out, we accept them! We send them to recycling and
            upcycling projects in Qatar, that helps give new life to old
            clothes. We at Rahma, want to take an initiative towards reducing
            the carbon footprint and help save the environment.
          </Text>
          <View style={{ margin: 30 }}></View>
          <Image
            style={styles.image}
            source={{
              uri: "https://as2.ftcdn.net/v2/jpg/03/07/48/99/1000_F_307489964_JQtPHVe3f7h6KYEZnKlYLrk11QZfho9r.jpg",

              // "https://harmony1.com/wp-content/uploads/2016/05/shutterstock_19259410.jpg",
            }}
          ></Image>
          <Text bold size={30} color="#32325D">
            You help the people!
          </Text>
          <Text style={{ fontSize: 18, marginHorizontal: 20 }}>
            Whether it may be being able to give clothes to children, an outfit
            to a person, or even warm clothes during the chilly weather, you are
            helping so many people in Qatar that are deprived of necessary
            resources. We at Rahma, want to take an initiative and help change
            the lives of people, but, we can't do this without you!
          </Text>
          <View style={{ margin: 30 }}></View>
        </View>
      </ScrollView>

      <Block
        style={{
          height: "8%",
          backgroundColor: "#F2F8FF",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderColor: "lightgray",
          borderWidth: 1,
          marginBottom: "2%",
          alignItems: "center",
          // paddingLeft: "1%",
        }}
      >
        <Pressable
          style={{ width: "14%" }}
          onPress={() => {
            navigation.navigate("Onboarding");
          }}
        >
          <Ionicons name="home-outline" size={40} />
        </Pressable>
        <Pressable
          style={{ width: "14%", marginRight: "7%", marginLeft: "7%" }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialCommunityIcons name="heart-plus-outline" size={40} />
        </Pressable>

        <Pressable
          style={{ width: "14%" }}
          onPress={() => navigation.navigate("AboutUs")}
        >
          <Feather name="info" size={40} color="#f8a069" />
        </Pressable>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
  textBG: {
    position: "absolute",
    bottom: -30, // adjust this value as needed to control the overlap
    height: 100,
    alignSelf: "center",
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 30,
    backgroundColor: "white",
    padding: 15,
  },
  image: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 20,
  },
});

export default AboutUs;
