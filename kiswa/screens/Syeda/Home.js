import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Animated,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import LilacCard from "../../components/Syeda/LilacCard";

//firebase
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteField,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config";

const { width, height } = Dimensions.get("screen");
const scale = width / 834;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
import * as Notifications from "expo-notifications";

import { auth } from "../../config";
import { object } from "prop-types";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useIsFocused } from "@react-navigation/native";

const Home = ({ route, navigation }) => {
  let Currentuser = auth?.currentUser?.email;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          // onPress={onSignOut}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  console.log("Currentuser: ", Currentuser);

  const [user, setUser] = useState(auth?.currentUser?.email);
  console.log("user: ", user);

  const isFocused = useIsFocused();

  const [number, setNumber] = useState();
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");

  const [finalArray, setFinalArray] = useState([]);
  //console.log('finalArray', finalArray)

  //clothes type data
  const ClothTypeData = [
    {
      label: "Blouse",
      value: "Blouse",
      uri: "https://i.pinimg.com/564x/d9/1b/87/d91b87a86b9924cdce26b631bd3a968e.jpg",
    },
    {
      label: "Caftan",
      value: "Caftan",
      uri: "https://i.etsystatic.com/31945487/r/il/2aadec/3870275767/il_fullxfull.3870275767_od8t.jpg",
    },
    {
      label: "Cardigan",
      value: "Cardigan",
      uri: "https://i.pinimg.com/564x/a5/84/9d/a5849d187e57e693c6d765436893030a.jpg",
    },
    {
      label: "Cloak",
      value: "Cloak",
      uri: "https://i.pinimg.com/564x/67/db/97/67db97f356fc31a34f7cc01df7b8ea64.jpg",
    },
    {
      label: "Coat",
      value: "Coat",
      uri: "https://i.pinimg.com/564x/f6/73/7d/f6737d49a2571e063cd811812c3a922c.jpg",
    },
    {
      label: "Dress",
      value: "Dress",
      uri: "https://i.pinimg.com/564x/a9/1b/cb/a91bcb63b4c31333a9402f74200a36a3.jpg",
    },
    {
      label: "Dungarees",
      value: "Dungarees",
      uri: "https://i.ytimg.com/vi/soPPAhMPHtY/maxresdefault.jpg",
    },
    {
      label: "Jacket",
      value: "Jacket",
      uri: "https://i.etsystatic.com/11147089/c/2250/2250/342/0/il/adfdf1/3588743348/il_300x300.3588743348_2ol1.jpg",
    },
    {
      label: "Jeans",
      value: "Jeans",
      uri: "https://i.pinimg.com/564x/a2/3c/13/a23c134ebdc47581fa854c248633a8f5.jpg",
    },
    {
      label: "Jumper",
      value: "Jumper",
      uri: "https://i.pinimg.com/564x/65/70/13/65701369d99d39458f99e4d04f80ab4d.jpg",
    },
    {
      label: "Jumpsuit",
      value: "Jumpsuit",
      uri: "https://i.pinimg.com/564x/04/00/83/040083896aaf020fa83aa12dbac805fe.jpg",
    },
    {
      label: "Leggings",
      value: "Leggings",
      uri: "https://i.pinimg.com/564x/9c/51/11/9c5111b9a77206aa76698ae2c41884a1.jpg",
    },
    {
      label: "Legwarmers",
      value: "Legwarmers",
      uri: "https://i.pinimg.com/564x/a1/aa/38/a1aa3845e69b70935f9ed6d8c39b90fa.jpg",
    },
    {
      label: "Pants",
      value: "Pants",
      uri: "https://media.istockphoto.com/id/530930442/photo/row-of-black-pants-hangs-in-wardrobe-at-home.jpg?s=612x612&w=0&k=20&c=ZFM23HW4i3gKgfT5PplBTTajAq3L1qGG30MCjWqZliA=",
    },
    {
      label: "Playsuit",
      value: "Playsuit",
      uri: "https://ae01.alicdn.com/kf/HTB1W34cPxnaK1RjSZFtq6zC2VXai/Korean-Style-2019-New-Fashion-Women-s-Playsuits-Chic-Double-Pocket-Skinny-Strap-Long-sleeved-Casual.jpg_Q90.jpg_.webp",
    },
    {
      label: "Poncho",
      value: "Poncho",
      uri: "https://i.pinimg.com/564x/50/b3/70/50b37094d3839e4aede85fc1e2c359f9.jpg",
    },
    {
      label: "Pajamas",
      value: "Pajamas",
      uri: "https://m.media-amazon.com/images/I/71K03lV+jIL._AC_UL1500_.jpg",
    },
    {
      label: "Shawl",
      value: "Shawl",
      uri: "https://i.pinimg.com/564x/1d/3f/f2/1d3ff25944a6377fecdb049bdef2a77e.jpg",
    },
    {
      label: "Shirt",
      value: "Shirt",
      uri: "https://i.pinimg.com/564x/5c/16/17/5c1617cc8f266adfd425e452773dddaf.jpg",
    },
    {
      label: "Shorts",
      value: "Shorts",
      uri: "https://i.pinimg.com/474x/89/1b/c7/891bc76dfb42ae14d5fbda7b92f7247b.jpg",
    },
    {
      label: "Skirt",
      value: "Skirt",
      uri: "https://i.pinimg.com/564x/29/c9/3f/29c93f07aeb7051935cc86ac74842964.jpg",
    },
    {
      label: "Sock",
      value: "Sock",
      uri: "https://i.pinimg.com/564x/2b/ca/5f/2bca5f01f7fb038d12d5a6f9fa4127d4.jpg",
    },
    {
      label: "Sweater",
      value: "Sweater",
      uri: "https://i.pinimg.com/564x/d3/b2/51/d3b2515feca557aff75d23077b2479e8.jpg",
    },
    {
      label: "Tie",
      value: "Tie",
      uri: "https://i.pinimg.com/564x/a1/6e/be/a16ebe082cb7329391b8940c8ebd07bd.jpg",
    },
    {
      label: "Tights",
      value: "Tights",
      uri: "https://i.pinimg.com/564x/c2/95/db/c295dba7990a244ab5e56eb52578ce92.jpg",
    },
    {
      label: "Tops",
      value: "Tops",
      uri: "https://i.pinimg.com/564x/5c/ad/15/5cad15407e6c1e9b393337dc7d17c530.jpg",
    },
    {
      label: "Tracksuit",
      value: "Tracksuit",
      uri: "https://i.pinimg.com/564x/bd/be/d1/bdbed16a24645a3ad9f42d2a528f6b3b.jpg",
    },
    {
      label: "T-Shirt",
      value: "T-Shirt",
      uri: "https://i.pinimg.com/564x/d6/9c/5a/d69c5a1ba98ce97c40a16ff506233f7a.jpg",
    },
  ];

  //get image from database
  const read = async () => {
    let user = auth?.currentUser?.email;
    const docRef = doc(db, "donors", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setImage(docSnap.data().image);
      //console.log("read image:", image)
      console.log("EXISTS document!");
    } else {
      console.log("No such document!");
      setUser(undefined);
    }
  };

  //------------------------------------------------------------
  async function schedulePushNotification(noti) {
    await Notifications.scheduleNotificationAsync(noti);
  }
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    const collectionRef = collection(db, "donors", user, "notifications");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      querySnapshot.docs.map((doc) =>
        doc.data().seen == "false"
          ? schedulePushNotification({
              content: {
                title: doc.data().title,
                body: doc.data().body,
                data: { data: "goes here" },
              },
              trigger: { seconds: 1 },
            })
          : doc.data()
      );
      setNotifications(querySnapshot.docs.map((doc) => doc.id));
    });

    notifications.map((x) => update(x));

    return () => unsubscribe();
  };
  const update = async (id) => {
    await setDoc(
      doc(db, "donors", user, "notifications", id),
      {
        seen: "true",
      },
      { merge: true }
    )
      .then(() => {
        console.log("data updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //------------------------------------------------------------
  //read from database

  useEffect(() => {
    //console.log("use...");
    readAllWhere();
  }, []);

  const readAllWhere = async () => {
    const q = query(
      collection(db, "familyRequests"),
      where("status", "==", "pending")
    );
    const docs = await getDocs(q);
    const promises = [];
    const itemsArray = [];

    docs.forEach((doc) => {
      //console.log('readAllWhere => ', doc.id, " => ", doc.data());
      const docRef = collection(db, "familyRequests", doc.id, "Items");
      const promise = getDocs(docRef).then((docs2) => {
        docs2.forEach((doc) => {
          // console.log('getCartItems => ', doc.id, " => ", doc.data());
          // console.log('quantity: => ', doc.data().quantity, 'type: => ', doc.data().type)
          // console.log({type: doc.data().type, quantity: doc.data().quantity})

          itemsArray.push({
            type: doc.data().type,
            quantity: doc.data().quantity,
          });
        });
      });
      promises.push(promise);
    });

    await Promise.all(promises);

    //console.log('itemsArray',itemsArray);

    setFinalArray(itemsArray);
  };

  useEffect(() => {
    if (isFocused) {
      if (user != undefined) {
        getNotifications();
        readDonations();
        readName();
        read();
      }
    }
  }, [isFocused]);

  let counter = 0;

  const readDonations = async () => {
    const q = query(
      collection(db, "donorDonation"),
      where("email", "==", user)
    );
    const docs = await getDocs(q);
    // let counter = 0
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      counter += 1;
      //setCounter(counter)
      // console.log("readDonations => ", doc.id, " => ", doc.data());
    });
    setNumber(counter);
    //console.log("counter: ", counter)
  };

  const readName = async () => {
    console.log(id);
    const docRef = doc(db, "donors", user);
    const docSnap = await getDoc(docRef);
    // let temp = [];
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setNickname(docSnap.data().userName);
      //   setNanny(temp);
      console.log(nickname);
    } else {
      console.log("No such document!");
    }
  };

  //sign out
  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Onboarding"))
      .catch((error) => console.log("Error logging out: ", error));
  };

  //animated text
  const animatedValue = useRef(new Animated.Value(-100)).current;

  //useEffect
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const renderArticles = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <View>
            {/* header */}

            <Block style={styles.header}>
              {/* header profile */}
              <Block right>
                <Image
                  style={styles.avatar}
                  source={{
                    uri:
                      image === ""
                        ? "https://vignette.wikia.nocookie.net/tumblr-survivor-athena/images/7/7a/Blank_Avatar.png/revision/latest/scale-to-width-down/477?cb=20161204161729"
                        : image,
                  }}
                ></Image>
                {user == undefined ? (
                  <Pressable onPress={() => navigation.navigate("LoginDonor")}>
                    <Text style={{ color: "blue" }}>Login/SigUp</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={onSignOut}>
                    <Text style={{ color: "blue" }}>Sign Out</Text>
                  </Pressable>
                )}
              </Block>
              <Block center style={{ borderWidth: 0 }}>
                <Text
                  style={{
                    fontSize: 25,
                    // alignSelf: "right",
                    fontWeight: "bold",
                    marginLeft: 40,
                  }}
                >
                  Hello, {nickname === "" ? "Guest!" : nickname + "!"}
                </Text>
                {/* {
                  user !== undefined ?
                  <Text style={{ fontSize: 15, alignSelf: 'center' }}>{user === undefined ? '' : user}</Text>
                  :
                  null
                } */}

                {user !== undefined ? (
                  <Block row>
                    {number === 1 ? (
                      <Text
                        style={{
                          fontSize: 15,
                          alignSelf: "center",
                          marginTop: 15,
                        }}
                      >
                        1 Donation
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 15,
                          alignSelf: "center",
                          marginTop: 15,
                        }}
                      >
                        {number} Donations
                      </Text>
                    )}
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft: 12,
                        marginTop: 10,
                      }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/9466/9466004.png",
                      }}
                    ></Image>
                  </Block>
                ) : (
                  <Text
                    style={{ fontSize: 15, alignSelf: "center", marginTop: 15 }}
                  >
                    0 Donations
                  </Text>
                )}
              </Block>

              {/* </Block> */}
            </Block>
            <Image
              style={{
                width: width * 0.99,
                height: height * 0.18,
                marginTop: "6%",
              }}
              source={{
                uri: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1800&h=900&url=https:%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2020%2F09%2F25%2Fwhere-to-donate-clothes-social.jpg",
              }}
            />
            <Block style={styles.box3}>
              <Pressable
                onPress={() => navigation.navigate("FamilyFeedback", id)}
                styles={{ backgroundColor: "gray" }}
              >
                <Text style={{ fontSize: 16 }}>
                  Rahma is a platform that simplifies the process of clothing
                  donation by allowing users to specify the items they wish to
                  donate and the preferred pickup time. After that, we will
                  collect and deliver the items to those in need within Qatar.
                </Text>
              </Pressable>
              <Animated.View
                style={{ transform: [{ translateY: animatedValue }] }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Donate")}
                >
                  <Text style={styles.buttonText}>DONATE</Text>
                </TouchableOpacity>
              </Animated.View>
            </Block>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // const { navigation } = this.props;
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "6%",
    marginBottom: "7%",
    width: "85%",
  },
  header3: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "3%",
    marginTop: "7%",
    height: "35%",
    borderRadius: 10,
    // backgroundColor: "gray",
    width: "94%",
  },
  box2: {
    width: 160,
    height: 150,
    backgroundColor: "#FFF8E5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  box1: {
    width: 160,
    height: 150,
    backgroundColor: "#E6EBFD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  box3: {
    width: width * 0.8,
    height: 150,
    marginLeft: "7%",
    marginTop: "15%",
    // backgroundColor: "#EDFDF9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    // borderColor: "lightgray",
    // borderWidth: 2,
  },
  home: {
    width: width,
    // backgroundColor: '#490066'
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  request: {
    backgroundColor: "#DCD0FF",
    borderRadius: 20,
    height: 100,
    marginVertical: 5,
  },
  header: {
    flex: 1,
    width: width * 0.95,
    height: height * 0.18,
    backgroundColor: "#F1ECFF",
    alignSelf: "center",
    // borderWidth: 1,
    flexDirection: "row",
    // borderColor: "red",
  },
  avatar: {
    width: 80,
    height: 80,
    margin: "4%",
    marginTop: "30%",
    borderRadius: 30,
    // borderWidth: 2,
  },

  // lilac button
  button: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "#842DCE",
    position: "relative",
    overflow: "hidden",
    width: width * 0.7,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    // marginLeft: "40%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  sign: {
    justifyContent: "flex-end",
    // borderColor: 'green',
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // borderWidth: 1,
    width: width * 0.3,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    margin: 20,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Home;
