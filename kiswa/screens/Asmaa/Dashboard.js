import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
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
  const stat = [
    {
      title: "Requests",
      data: requests,
      img: require("../../assets/imgs/requests.png"),
    },
    {
      title: "Donations",
      data: "donations",
      img: require("../../assets/imgs/donation.png"),
    },
    {
      title: "Families",
      data: "families",
      img: require("../../assets/imgs/Families.png"),
    },
    // {
    //   title: "donors",
    //   data: "donors",
    //   img: require("../../assets/imgs/requests.png"),
    // },
  ];

  useEffect(() => {
    readDonations();
    readFamilies();
    readDonors();
    readRequests();
    // width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);

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
    //console.log(drivers);
  };

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
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
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
                {/* <Text>{x.data.length}</Text> */}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    //justifyContent: "flex-start",
    //alignContent: "flex-start",
    padding: "5%",
  },
  statistics: {
    width: width * 0.7,
    height: height * 0.25,
    borderWidth: 2,
    padding: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
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
});
