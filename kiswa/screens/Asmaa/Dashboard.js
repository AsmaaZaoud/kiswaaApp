import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
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
const Dashboard = () => {
  const [deviceType, setDeviceType] = useState("");
  const stat = [
    {
      title: "Requests",
      data: "requests",
      img: require("../../assets/imgs/requests.png"),
    },
    {
      title: "Items",
      data: "items",
      img: require("../../assets/imgs/donation.png"),
    },
    {
      title: "Donations",
      data: "Donations",
      img: require("../../assets/imgs/Families.png"),
    },
    {
      title: "Feedback",
      data: "feedback",
      img: require("../../assets/imgs/feedback.png"),
    },
  ];
  const userStat = [
    {
      title: "Donors",
      data: "donors",
      img: require("../../assets/imgs/requests.png"),
    },
    {
      title: "Drivers",
      data: "drivers",
      img: require("../../assets/imgs/donation.png"),
    },
    {
      title: "Families",
      data: "families",
      img: require("../../assets/imgs/Families.png"),
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
      //console.log(doc.id, " => ", doc.data());
    });
    setFamilies(temp);
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
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <View style={{ flexDirection: "row" }}>
        {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          width="100%"
        > */}
        <View style={styles.statistics}>
          {stat.map((x) => (
            <View style={styles.block}>
              <View style={styles.imgBlock}>
                <Image
                  source={x.img}
                  style={{ width: 150, height: 50 }}
                  width={95}
                  height={95}
                />
                <View>
                  <Text>{x.title}</Text>
                  <Text></Text>

                  <Text>
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
            </View>
          ))}
        </View>
        <View style={styles.statistics}>
          {userStat.map((x) => (
            <View style={styles.block}>
              <View style={styles.imgBlock}>
                <Image
                  source={x.img}
                  style={{ width: 150, height: 50 }}
                  width={95}
                  height={95}
                />
                <View>
                  <Text>{x.title}</Text>
                  <Text></Text>

                  <Text>
                    {x.data == "donors"
                      ? donors.length
                      : x.data == "divers"
                      ? drivers.length
                      : x.data == "families"
                      ? families.length
                      : workers.length}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        {/* </ScrollView> */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.status}>
          <PieChart
            data={[
              {
                name: "Pending",
                population: requests.filter((item) => item.status === "pending")
                  .length,
                color: "#FDFDBD",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Fullfied",
                population: requests.filter(
                  (item) => item.status === "fullfied"
                ).length,
                color: "#C8FFD4",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={width * 0.5}
            height={220}
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
        </View>
        <View style={styles.status}>
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
            height={220}
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
        </View>
      </View>
    </View>
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
    width: width * 0.7,
    height: height * 0.25,
    borderWidth: 2,
    padding: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "2%",
  },
  block: {
    width: "46%",
    borderWidth: 1,
    height: "40%",
    margin: "2%",
  },
  imgBlock: {
    width: "40%",
    height: "100%",
    padding: "2%",
    flexDirection: "row",
  },

  status: {
    width: width * 0.48,
    height: height * 0.25,
    // borderWidth: 1,
    // padding: "1%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: "3%",
  },
});
