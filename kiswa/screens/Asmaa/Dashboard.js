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
} from "firebase/firestore";
import { db } from "../../config";

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
      data: "Donations",
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
      img: require("../../assets/imgs/donor.png"),
    },
    {
      title: "Drivers",
      data: "drivers",
      img: require("../../assets/imgs/family.png"),
    },
    {
      title: "Families",
      data: "families",
      img: require("../../assets/imgs/family.png"),
    },
    {
      title: "Workers",
      data: "workers",
      img: require("../../assets/imgs/feedback.png"),
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

  //Users---------
  const [families, setFamilies] = useState([]);
  const readFamilies = async () => {
    let temp = [];
    const q = query(collection(db, "families"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      let loc = doc.data().zone;
      // z.doc.data().zone += 1;
      z.forEach((x) => {
        x.name == loc ? (x.count += 1) : null;
      });

      //console.log(doc.id, " => ", doc.data());
    });
    setFamilies(temp);
    setKhor(z);
    console.log("z", z);
    //console.log(drivers);
  };

  const [donors, setDonors] = useState([]);
  const readDonors = async () => {
    let temp = [];
    const q = query(collection(db, "donors"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setDonors(temp);
  };

  const [drivers, setDrivers] = useState([]);
  const readDrivers = async () => {
    let temp = [];
    const q = query(collection(db, "drivers"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setDrivers(temp);
  };
  const [workers, setWorkers] = useState([]);
  const readWorkers = async () => {
    let temp = [];
    const q = query(collection(db, "inventoryWorkers"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setWorkers(temp);
  };

  //
  const [requests, setRequests] = useState([]);
  const readRequests = async () => {
    let temp = [];
    const q = query(collection(db, "familyRequests"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setRequests(temp);
  };
  const [donations, setDonations] = useState([]);
  const readDonations = async () => {
    let temp = [];
    const q = query(collection(db, "donations"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setDonations(temp);
  };
  const [feedback, setFeedback] = useState([]);
  const readFeedback = async () => {
    let temp = [];
    const q = query(collection(db, "feedback"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setFeedback(temp);
  };
  const [items, setItems] = useState([]);
  const readItems = async () => {
    let temp = [];
    const q = query(collection(db, "inventory"));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setItems(temp);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Dashboard</Text> */}
        {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          width="100%"
        > */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.statistics}>
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
                    <Text style={{ fontSize: normalize(20) }}>{x.title}</Text>
                    <Text></Text>

                    <Text style={{ fontSize: normalize(19) }}>
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
          <View style={styles.statistics}>
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
                <View style={styles.block}>
                  <View style={styles.imgBlock}>
                    <Image
                      source={x.img}
                      style={{ width: 150, height: 50 }}
                      width={"90%"}
                      height={"90%"}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text style={{ fontSize: normalize(20) }}>{x.title}</Text>
                    <Text></Text>

                    <Text style={{ fontSize: normalize(19) }}>
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
        </View>
        {/* </ScrollView> */}

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.status}>
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
              width={width * 0.5}
              height={height * 0.19}
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
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          </View>
          {/* <View style={styles.status}>
            <Text style={{ fontSize: normalize(27), marginLeft: "7%" }}>
              Requests & Donors
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
                  name: "Requests",
                  population: requests.length,
                  color: "#673ab7",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Donations",
                  population: donations.length,
                  color: "#f3e5f5",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
              ]}
              width={width * 0.5}
              height={height * 0.19}
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
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          </View> */}
          <View style={styles.status}>
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
                  population: families.filter((item) => item.zone === "Doha")
                    .length,
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
              width={width * 0.5}
              height={height * 0.19}
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
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          </View>
        </View>

        {/* <BarChart
          data={{
            labels: ["Total In Come", "Profit"],
            datasets: [
              {
                data: [totalBooking, totalProfit],
              },
            ],
          }}
          width={Dimensions.get("window").width - 16} // from react-native
          height={220}
          //yAxisLabel={"QR"}
          chartConfig={{
            backgroundColor: "#ECA3F5",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: "3%",
  },
  scrollView: {
    marginTop: 7,
    paddingHorizontal: 7,
    borderWidth: 3,
  },
  statistics: {
    borderWidth: 1,
    width: width * 0.7,
    height: height * 0.28,
    margin: "2%",
    borderRadius: "10%",
    paddingBottom: "2%",
  },
  blockss: {
    padding: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "1%",
  },
  block: {
    width: "46%",
    borderWidth: 1,
    height: "60%",
    margin: "2%",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomEndRadius: "15%",
    borderTopEndRadius: "15%",
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
    width: width * 0.6,
    // height: height * 0.25,
    borderWidth: 1,
    borderRadius: "20%",
    // padding: "1%",
    // flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: "3%",
    margin: "2%",
  },
});
