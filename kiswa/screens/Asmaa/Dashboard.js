import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  PixelRatio,
  SafeAreaView,
} from "react-native";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  PieChart,
  StackedBarChart,
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
import CircularProgress from "react-native-circular-progress-indicator";
//FireBase
import { auth } from "../../config";

import {
  doc,
  query,
  getDocs,
  getDoc,
  addDoc,
  collection,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config";
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
const Dashboard = () => {
  const [deviceType, setDeviceType] = useState("");
  const [khor, setKhor] = useState([]);
  const [value, setValue] = useState(0);

  const zones = [];
  const z = [
    { name: "Doha", count: 0 },
    { name: "Al Rayyan", count: 0 },
    { name: "Rumeilah", count: 0 },
    { name: "Wadi Al Sail", count: 0 },
    { name: "Al Daayen", count: 0 },
    { name: "Umm Salal", count: 0 },
    { name: "Al Wakra", count: 0 },
    { name: "Al Khor", count: 0 },
    { name: "Al Shamal", count: 0 },
    { name: "Al Shahaniya", count: 0 },
  ];

  const stat = [
    {
      title: "Donations",
      data: "donations",
      img: require("../../assets/imgs/donations.png"),
    },
    {
      title: "Requests",
      data: "requests",
      img: require("../../assets/imgs/requests.png"),
    },
    {
      title: "Items",
      data: "items",
      img: require("../../assets/imgs/Items.png"),
    },

    {
      title: "Feedback",
      data: "feedback",
      img: require("../../assets/imgs/feedbacks.png"),
    },
  ];
  const userStat = [
    {
      title: "Donors",
      data: "donors",
      img: require("../../assets/Asmaa/donor2.png"),
    },
    {
      title: "Drivers",
      data: "drivers",
      img: require("../../assets/Asmaa/driver.png"),
    },
    {
      title: "Families",
      data: "families",
      img: require("../../assets/Asmaa/family(6).png"),
    },
    {
      title: "Workers",
      data: "workers",
      img: require("../../assets/Asmaa/worker.png"),
    },
  ];
  useEffect(() => {
    readDonors();
    readDonations();
    readFamilies();
    readRequests();
    readItems();
    readWorkers();
    readFeedback();
    readDrivers();
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

  const zonesData = () => {
    for (x in families) {
      var loc = x.zone;
      z.forEach((y) => {
        y.name == loc ? (y.count += 1) : null;
      });
    }
  };

  //Users---------
  const [families, setFamilies] = useState([]);
  const readFamilies = async () => {
    const collectionRef = collection(db, "families");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setFamilies(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };

  const [donors, setDonors] = useState([]);
  const readDonors = async () => {
    const collectionRef = collection(db, "donors");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setDonors(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };

  const [drivers, setDrivers] = useState([]);
  const readDrivers = async () => {
    const collectionRef = collection(db, "drivers");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setDrivers(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };
  const [workers, setWorkers] = useState([]);
  const readWorkers = async () => {
    const collectionRef = collection(db, "inventoryWorkers");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setWorkers(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };

  const [requests, setRequests] = useState([]);
  const readRequests = async () => {
    const collectionRef = collection(db, "familyRequests");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setRequests(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };
  const [donations, setDonations] = useState([]);
  const readDonations = async () => {
    const collectionRef = collection(db, "donorDonation");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setDonations(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };
  const [feedback, setFeedback] = useState([]);
  const readFeedback = async () => {
    const collectionRef = collection(db, "feedback");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setFeedback(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };
  const [items, setItems] = useState([]);
  const readItems = async () => {
    const collectionRef = collection(db, "inventory");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setItems(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };
  const data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"],
    datasets: [
      {
        data: [12, 10, 10, 20, 30, 18],

        color: (opacity = 3) => `rgba(233, 162, 134, ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
      {
        data: [10, 5, 11, 7, 9, 4],

        color: (opacity = 3) => `rgba(181, 136, 237, ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
    ],
    legend: ["Donations", "Requests"], // optional
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: deviceType == "mobile" ? 800 : 1000,
      }}
    >
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View
            style={{
              width: width,
              height: height * 0.033,
              backgroundColor: "#F5BD9A",
            }}
          >
            <Text style={styles.title}>Dashboard</Text>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <View
              style={{
                flexDirection: "row",
                width: width * 2,
                height: deviceType == "mobile" ? height * 0.24 : height * 0.32,
              }}
            >
              <View
                style={[
                  styles.statistics,
                  {
                    height:
                      deviceType == "mobile" ? height * 0.2 : height * 0.27,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: normalize(30),
                    marginLeft: "7%",
                    borderBottomWidth: 2,
                    borderBottomColor: "black",
                  }}
                >
                  Statistics
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                  }}
                ></View>
                <View style={styles.blockss}>
                  {stat.map((x) => (
                    <View key={x.title} style={styles.block}>
                      <View style={styles.imgBlock}>
                        <Image
                          source={x.img}
                          style={{ width: 150, height: 50 }}
                          width={"90%"}
                          height={"90%"}
                        />
                      </View>
                      <View style={styles.text}>
                        <Text style={{ fontSize: normalize(20) }}>
                          {x.title}
                        </Text>
                        <Text></Text>

                        <Text style={{ fontSize: normalize(25) }}>
                          {x.data == "requests"
                            ? requests.length
                            : x.data == "donations"
                            ? donations.length
                            : x.data == "items"
                            ? items.length
                            : feedback.length}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={[
                  styles.statistics,
                  {
                    height:
                      deviceType == "mobile" ? height * 0.2 : height * 0.27,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: normalize(30),
                    marginLeft: "7%",
                    borderBottomWidth: 2,
                    borderBottomColor: "black",
                  }}
                >
                  Users
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                  }}
                ></View>
                <View style={styles.blockss}>
                  {userStat.map((x) => (
                    <View style={styles.block} key={x.title}>
                      <View style={styles.imgBlock}>
                        <Image
                          source={x.img}
                          style={{ width: 150, height: 50 }}
                          width={"90%"}
                          height={"90%"}
                        />
                      </View>
                      <View style={styles.text}>
                        <Text style={{ fontSize: normalize(20) }}>
                          {x.title}
                        </Text>
                        <Text></Text>

                        <Text style={{ fontSize: normalize(25) }}>
                          {x.data == "workers"
                            ? workers.length
                            : x.data == "drivers"
                            ? drivers.length
                            : x.data == "donors"
                            ? donors.length
                            : families.length}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <LineChart
            data={data}
            width={width * 1.1}
            height={height * 0.25}
            verticalLabelRotation={0}
            chartConfig={{
              backgroundColor: "#ccc",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 0) => `rgba(100, 102,101 , ${opacity})`,
              style: {
                // borderRadius: 16,
                // margin: "1%",
              },
            }}
            bezier
          />

          <View
            style={{
              width: width,
              height: 40,
              backgroundColor: "#F5BD9A",
            }}
          >
            <Text style={styles.title}>Orders</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={1}
            // width="100%"
          >
            <Block
              style={{
                flexDirection: "row",
                width: width * 1.5,
                height: height * 0.4,
              }}
            >
              {/* <View
                style={[
                  styles.status,
                  { width: deviceType == "mobile" ? width * 0.8 : width * 0.5 },
                ]}
              >
                <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
                  Todays Orders
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "100%",
                  }}
                ></View>
                <View style={{ padding: "6%", flexDirection: "row" }}>
                  <CircularProgress
                    radius={deviceType == "mobile" ? 80 : 100}
                    value={(4 / 6) * 100}
                    textColor="222"
                    fontSize={30}
                    valueSuffix={"%"}
                    inActiveStrokeColor={"#2ecc71"}
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeWidth={6}
                    duration={1000}
                    onAnimationComplete={() => setValue(50)}
                  />

                  <Text>3/6</Text>
                </View>
              </View> */}
              <View
                style={[
                  styles.status,
                  { width: deviceType == "mobile" ? width * 0.8 : width * 0.5 },
                ]}
              >
                <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
                  Orders
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "100%",
                  }}
                ></View>
                <PieChart
                  data={[
                    {
                      name: "Pending",
                      population: requests.filter(
                        (item) => item.status === "pending"
                      ).length,
                      color: "#F5717F",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Fullfied",
                      population: requests.filter(
                        (item) => item.status === "fullfied"
                      ).length,
                      color: "#abcdFF",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                  ]}
                  width={deviceType == "mobile" ? width * 0.8 : width * 0.5}
                  height={height * 0.2}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={
                    {
                      // marginVertical: 8,
                      // borderRadius: 20,
                    }
                  }
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="30"
                  absolute //for the absolute number remove if you want percentage
                />
              </View>
              <View
                style={[
                  styles.status,
                  { width: deviceType == "mobile" ? width * 0.8 : width * 0.5 },
                ]}
              >
                <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
                  Top Zones
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "100%",
                  }}
                ></View>
                <PieChart
                  data={[
                    {
                      name: "Doha",
                      population: families.filter(
                        (item) => item.zone === "Doha"
                      ).length,
                      color: "#AFC3E7",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Al Rayyan",
                      population: families.filter(
                        (item) => item.zone === "Al Rayyan"
                      ).length,
                      color: "#ECEC91",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                    {
                      name: "Al Wakra",
                      population: families.filter(
                        (item) => item.zone === "Al Wakra"
                      ).length,
                      color: "#FCB077",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                  ]}
                  width={deviceType == "mobile" ? width * 0.8 : width * 0.5}
                  height={height * 0.2}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={
                    {
                      // marginVertical: 8,
                      // borderRadius: 20,
                    }
                  }
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="30"
                  absolute //for the absolute number remove if you want percentage
                />
              </View>
            </Block>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    // height: height * 1.2,
  },
  scrollView: {
    marginTop: 7,
    paddingHorizontal: 7,
    borderWidth: 3,
  },
  title: {
    fontSize: normalize(30),
    marginLeft: "3%",
    textAlign: "left",
  },
  statistics: {
    borderWidth: 1,
    width: width * 0.7,
    height: height * 0.27,
    margin: "1%",
    borderRadius: "10%",
    paddingBottom: 0,
  },
  blockss: {
    // padding: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "1%",
  },
  block: {
    width: "46%",
    borderWidth: 1,
    height: "55%",
    margin: "2%",
    justifyContent: "space-between",
    flexDirection: "row",
    // borderBottomEndRadius: "15%",
    // borderTopEndRadius: "15%",
  },
  imgBlock: {
    width: "40%",
    padding: "3%",
    flexDirection: "row",
    // borderWidth: 1,
    // backgroundColor: "#E4E9EC",
  },
  text: {
    width: "55%",
  },

  status: {
    // width: width * 0.5,
    height: height * 0.25,
    borderWidth: 1,
    borderRadius: "20%",
    // padding: "1%",
    // flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: "1%",
    margin: "1%",
  },
});
