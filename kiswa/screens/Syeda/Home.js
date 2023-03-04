import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, View, Animated, SafeAreaView } from 'react-native';
import { Block, theme, Text, Button } from 'galio-framework';
import LilacCard from '../../components/Syeda/LilacCard';

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
} from "firebase/firestore";
import { db } from "../../config";

const { width } = Dimensions.get('screen');
import { auth } from '../../config';
import { object } from 'prop-types';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Home = ({ route, navigation }) => {

  let user = auth?.currentUser?.email;
  console.log("user: ", user)

  const [itemsArray, setItemsArray] = useState([])
  const [ItemsDic, setItemsDic] = useState([])
  itemsArray.map((item) => ItemsDic.push({ type: item.data.type, quantity: item.data.quantity }))

  // console.log('itemsArray: ', itemsArray)
  // console.log('itemDic : ', ItemsDic)

  let shortList2 = ItemsDic.slice(0, 8);
  let shortList = [
    { "quantity": 1, "type": "Jumper" },
    { "quantity": 1, "type": "Sweater" },
    { "quantity": 1, "type": "Sweatpants/Joggers" },
    { "quantity": 2, "type": "Hoodie" },
    { "quantity": 1, "type": "Thawb" },
    { "quantity": 1, "type": "Tops" }
  ]
  //console.log('shortList2: ', shortList2)

  let uniqueList = shortList2.filter((item, index, self) => index === self.findIndex(t => t.type === item.type))

  //console.log('uniquelist: ', uniqueList)

  //shortList2.map((item) => console.log(item.type))

  //read from database
  //readAllWhere 
  const readAllWhere = async () => {
    const q = query(collection(db, "familyRequests"), where("status", "==", 'pending'));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
    });

    let temp = [];

    docs.forEach((doc) => {
      temp.push({
        id: doc.id,
        data: doc.data(),
        items: getCartItems(doc.id)
      })
    })
  }

  const getCartItems = async (cartId) => {
    const docRef = collection(db, "familyRequests", cartId, "Items");
    const docSnap = await getDocs(docRef);
    let temp = []
    docSnap.forEach((doc) => {
      temp.push({
        id: doc.id,
        data: doc.data()
      })
    })
    //console.log('temp: ', temp)
    setItemsArray(temp)
    return temp
  }

  useEffect(() => {
    readName();
  }, [])

  const [nickname, setNickname] = useState('')

  const readName = async () => {
    const q = query(collection(db, "donors"), where("email", "==", user));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setNickname(doc.data().userName)
    });
  }

  //sign out

  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Onboarding"))
      .catch((error) => console.log("Error logging out: ", error));
  };

  //console.log('outside itemarray = ', itemsArray)

  // ********************************************************************************************************

  //clothes type data
  const ClothTypeData = [
    { label: "Abaya", value: "Abaya", uri: 'https://i.pinimg.com/550x/dc/31/24/dc31248fa6e537002acb7ad4be14e08c.jpg' },
    { label: "Blouse", value: "Blouse", uri: 'https://i.pinimg.com/564x/d9/1b/87/d91b87a86b9924cdce26b631bd3a968e.jpg' },
    { label: "Cardigan", value: "Cardigan", uri: 'https://i.pinimg.com/564x/a5/84/9d/a5849d187e57e693c6d765436893030a.jpg' },
    { label: "Coat", value: "Coat", uri: 'https://i.pinimg.com/564x/f6/73/7d/f6737d49a2571e063cd811812c3a922c.jpg' },
    { label: "Dress", value: "Dress", uri: 'https://i.pinimg.com/564x/a9/1b/cb/a91bcb63b4c31333a9402f74200a36a3.jpg' },
    { label: "Dungarees", value: "Dungarees", uri: 'https://i.ytimg.com/vi/soPPAhMPHtY/maxresdefault.jpg' },
    { label: "Jacket", value: "Jacket", uri: 'https://i.etsystatic.com/11147089/c/2250/2250/342/0/il/adfdf1/3588743348/il_300x300.3588743348_2ol1.jpg' },
    { label: "Jeans", value: "Jeans", uri: 'https://i.pinimg.com/564x/a2/3c/13/a23c134ebdc47581fa854c248633a8f5.jpg' },
    { label: "Jumper", value: "Jumper", uri: 'https://www.shutterstock.com/image-photo/colorful-warm-knitted-sweater-on-260nw-1602062266.jpg' },
    { label: "Jumpsuit", value: "Jumpsuit", uri: 'https://i.pinimg.com/564x/04/00/83/040083896aaf020fa83aa12dbac805fe.jpg' },
    { label: "Kaftan", value: "Kaftan", uri: 'https://i.etsystatic.com/31945487/r/il/2aadec/3870275767/il_fullxfull.3870275767_od8t.jpg' },
    { label: "Leggings", value: "Leggings", uri: 'https://i.pinimg.com/564x/9c/51/11/9c5111b9a77206aa76698ae2c41884a1.jpg' },
    { label: "Legwarmers", value: "Legwarmers", uri: 'https://i.pinimg.com/564x/a1/aa/38/a1aa3845e69b70935f9ed6d8c39b90fa.jpg' },
    { label: "Pants/Trousers", value: "Pants / Trousers", uri: 'https://media.istockphoto.com/id/530930442/photo/row-of-black-pants-hangs-in-wardrobe-at-home.jpg?s=612x612&w=0&k=20&c=ZFM23HW4i3gKgfT5PplBTTajAq3L1qGG30MCjWqZliA=' },
    { label: "Playsuit", value: "Playsuit", uri: 'https://ae01.alicdn.com/kf/HTB1W34cPxnaK1RjSZFtq6zC2VXai/Korean-Style-2019-New-Fashion-Women-s-Playsuits-Chic-Double-Pocket-Skinny-Strap-Long-sleeved-Casual.jpg_Q90.jpg_.webp' },
    { label: "Pajamas", value: "Pajamas", uri: 'https://m.media-amazon.com/images/I/71K03lV+jIL._AC_UL1500_.jpg' },
    { label: "Scarf", value: "Scarf", uri: 'https://i.pinimg.com/564x/f8/51/cf/f851cf13ae7a409e48236722980614f1.jpg' },
    { label: "Shawl", value: "Shawl", uri: 'https://i.pinimg.com/564x/1d/3f/f2/1d3ff25944a6377fecdb049bdef2a77e.jpg' },
    { label: "Shirt", value: "Shirt", uri: 'https://i.pinimg.com/564x/5c/16/17/5c1617cc8f266adfd425e452773dddaf.jpg' },
    { label: "Shorts", value: "Shorts", uri: 'https://i.pinimg.com/474x/89/1b/c7/891bc76dfb42ae14d5fbda7b92f7247b.jpg' },
    { label: "Skirt", value: "Skirt", uri: 'https://i.pinimg.com/564x/29/c9/3f/29c93f07aeb7051935cc86ac74842964.jpg' },
    { label: "Socks", value: "Socks", uri: 'https://i.pinimg.com/564x/2b/ca/5f/2bca5f01f7fb038d12d5a6f9fa4127d4.jpg' },
    { label: "Sweater", value: "Sweater", uri: 'https://i.pinimg.com/564x/d3/b2/51/d3b2515feca557aff75d23077b2479e8.jpg' },
    { label: "Sweatpants/Joggers", value: "Sweatpants/ Joggers", uri: 'https://i.pinimg.com/564x/f3/d2/a0/f3d2a0593f4224b0d01cbaf0be9e0815.jpg' },
    { label: "Hoodie", value: "Hoodie", uri: 'https://i.pinimg.com/564x/0d/8b/a8/0d8ba8f1e8cd55a6fe1b9f08a494dad2.jpg' },
    { label: "Thawb", value: "Thawb", uri: 'http://sc04.alicdn.com/kf/H5ec6274087e746629e20854d88f49c99R.jpg' },
    { label: "Tops", value: "Tops", uri: 'https://i.pinimg.com/564x/5c/ad/15/5cad15407e6c1e9b393337dc7d17c530.jpg' },
    { label: "Tracksuit", value: "Tracksuit", uri: 'https://i.pinimg.com/564x/bd/be/d1/bdbed16a24645a3ad9f42d2a528f6b3b.jpg' },
    { label: "T-Shirt", value: "T-Shirt", uri: 'https://i.pinimg.com/564x/d6/9c/5a/d69c5a1ba98ce97c40a16ff506233f7a.jpg' },
    { label: "Vest", value: "Vest", uri: 'https://i.pinimg.com/564x/59/21/ee/5921eee1e4634223a5df0da907613fb3.jpg' },
    { label: "Waistcoat", value: "Waistcoat", uri: 'https://content.moss.co.uk/images/extralarge/966689279_01.jpg' },
  ];

  // animated button
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
    navigation.navigate('Donate')
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

  useEffect(() => {
    readAllWhere();
  }, []);


  const renderArticles = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>

          <View>

            {/* header */}

            <Block style={styles.header}>
              {/* log in / sign up / sign out*/}

              {
                user === undefined ?
                
              <Block style={{ justifyContent: 'flex-end', marginRight: '-80%' }}>
              <TouchableOpacity onPress={() => navigation.navigate("LoginDonor")}>
                <Image
                  style={{ width: 30, height: 30, marginLeft: '45%' }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3033/3033143.png',
                  }}
                />
              <Text style={{ marginLeft: '35%' }}>Log In/ Sign Up</Text>
              </TouchableOpacity>
            </Block>
            :
            
            <Block style={{ justifyContent: 'flex-end', marginRight: '-80%' }}>
            <TouchableOpacity onPress={onSignOut}>
              <Image
                style={{ width: 30, height: 30, marginLeft: '45%' }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3033/3033143.png',
                }}
              />
            <Text style={{ marginLeft: '41%' }}>Sign Out</Text>
            </TouchableOpacity>
          </Block>
              }



              {/* header profile */}
              <Block center>
                <Image
                  style={styles.avatar}
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1173/1173817.png' }}>
                </Image>
              </Block>
              <Block center style={{}}>
                <Text style={{ fontSize: 25, alignSelf: 'center', fontWeight: 'bold' }}>Hello, {nickname === '' ? 'Guest!' : nickname + '!'}</Text>
                <Text style={{ fontSize: 15, alignSelf: 'center' }}>{user === undefined ? '' : user}</Text>
                <Text style={{ fontSize: 15, alignSelf: 'center', marginTop: 15 }}>0 Donations</Text>
                {/* <Text style={{  fontWeight: 'bold', alignSelf: 'center' }}>Let's share goodness!</Text> */}
              </Block>
              {/* </Block> */}
            </Block>

            {/* animated opening text */}
            {/* <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 10, alignSelf: 'center' }}>Creating a better world, one donation at a time.</Text> */}
            <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Creating a better world, one donation at a time.
              </Text>
            </Animated.View>


            {/* animated button */}
            <TouchableOpacity
              style={[styles.button, isActive && styles.buttonActive]}
              onPress={handlePress}
            >
              <Text style={styles.buttonText}>DONATE</Text>
              <View style={[styles.buttonOverlay, isActive && styles.buttonOverlayActive]}></View>
              <View style={[styles.buttonBackground, isActive && styles.buttonBackgroundActive]}></View>
            </TouchableOpacity>

            {/* text */}
            {/* <Text style={{fontSize: 15, margin: 20}}>Below is a list of pending requests</Text> */}

            {/* requests */}
            {
              uniqueList.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
                      {/* <TouchableOpacity onPress={() => navigation.navigate('Donate')}> */}
                      <LilacCard
                        imageUrl={ClothTypeData.find((object) => object.label === item.type).uri}
                        title={item.type}
                        subtitle={item.quantity}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            }

          </View>

        </ScrollView>
      </SafeAreaView>
    )
  }


  // const { navigation } = this.props;
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
      <Button
        style={{ width: '100%' }}
        onPress={() => navigation.navigate("Onboarding")}>
        GO BACK
      </Button>
    </Block>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: '#DCD0FF',
    borderRadius: 20,
    height: 100,
    marginVertical: 5
  },
  header: {
    width: width,
    height: 230,
    backgroundColor: '#F1ECFF',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 10,
  },

  // animated button
  button: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#b19cd9',
    position: 'relative',
    overflow: 'hidden',
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30
  },
  buttonActive: {
    backgroundColor: '#7f58a8',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonOverlay: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ rotate: '45deg' }],
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.3s',
  },
  buttonOverlayActive: {
    opacity: 1,
    transform: [{ translateX: 50 }, { translateY: 50 }],
  },
  buttonBackground: {
    position: 'absolute',
    top: '-120%',
    left: '-120%',
    width: '300%',
    height: '300%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.3s',
  },
  buttonBackgroundActive: {
    opacity: 1,
    transform: [{ translateX: 25 }, { translateY: 25 }],
  },
});

export default Home;
