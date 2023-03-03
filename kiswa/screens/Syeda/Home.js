import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, View, Animated, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import { Block, theme, Text, Button } from 'galio-framework';

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


const Home = ({ route, navigation }) => {

const [itemsArray, setItemsArray] = useState([])
const [ItemsDic, setItemsDic] = useState([])
itemsArray.map((item) => ItemsDic.push({type: item.data.type, quantity: item.data.quantity}))
//console.log('itemDic : ', ItemsDic)

let shortList = ItemsDic.slice(0, 6); 
console.log('shortlsit: ', shortList)

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

//console.log('outside itemarray = ', itemsArray)

// ********************************************************************************************************

  //clothes type data
  const ClothTypeData = [
    { label: "Abaya", value: "Abaya", uri: 'https://i.pinimg.com/550x/dc/31/24/dc31248fa6e537002acb7ad4be14e08c.jpg' },
    { label: "Blouse", value: "Blouse", uri: 'https://cdn-icons-png.flaticon.com/512/8323/8323136.png' },
    { label: "Caftan", value: "Caftan", uri: 'https://cdn-icons-png.flaticon.com/512/5238/5238311.png' },
    { label: "Cardigan", value: "Cardigan", uri: 'https://cdn-icons-png.flaticon.com/128/3345/3345635.png' },
    { label: "Coat", value: "Coat", uri: 'https://cdn-icons-png.flaticon.com/128/7157/7157441.png' },
    { label: "Dress", value: "Dress", uri: 'https://cdn-icons-png.flaticon.com/128/9833/9833994.png' },
    { label: "Dungarees", value: "Dungarees", uri: 'https://cdn-icons-png.flaticon.com/128/2161/2161057.png' },
    { label: "Jacket", value: "Jacket", uri: 'https://cdn-icons-png.flaticon.com/128/2806/2806051.png' },
    { label: "Jeans", value: "Jeans", uri: 'https://cdn-icons-png.flaticon.com/128/599/599388.png' },
    { label: "Jumper", value: "Jumper", uri: 'https://cdn-icons-png.flaticon.com/128/9774/9774105.png' },
    { label: "Jumpsuit", value: "Jumpsuit", uri: 'https://cdn-icons-png.flaticon.com/128/2290/2290478.png' },
    { label: "Leggings", value: "Leggings", uri: 'https://cdn-icons-png.flaticon.com/128/9381/9381563.png' },
    { label: "Legwarmers", value: "Legwarmers", uri: 'https://cdn-icons-png.flaticon.com/128/8853/8853176.png' },
    { label: "Pants / Trousers", value: "Pants / Trousers", uri: 'https://cdn-icons-png.flaticon.com/128/2390/2390116.png' },
    { label: "Playsuit", value: "Playsuit", uri: 'https://cdn-icons-png.flaticon.com/128/122/122709.png' },
    { label: "Pajamas", value: "Pajamas", uri: 'https://cdn-icons-png.flaticon.com/128/4446/4446182.png' },
    { label: "Shawl", value: "Shawl", uri: 'https://cdn-icons-png.flaticon.com/128/2947/2947449.png' },
    { label: "Shirt", value: "Shirt", uri: 'https://www.shutterstock.com/image-photo/rack-clothes-after-drycleaning-near-260nw-1421481467.jpg' },
    { label: "Shoes", value: "Shoes", uri: 'https://cdn-icons-png.flaticon.com/128/5479/5479005.png' },
    { label: "Shorts", value: "Shorts", uri: 'https://cdn-icons-png.flaticon.com/128/2237/2237015.png' },
    { label: "Skirt", value: "Skirt", uri: 'https://cdn-icons-png.flaticon.com/512/4507/4507761.png' },
    { label: "Sock", value: "Sock", uri: 'https://cdn-icons-png.flaticon.com/128/843/843877.png' },
    { label: "Sweater", value: "Sweater", uri: 'https://cdn-icons-png.flaticon.com/128/9385/9385884.png' },
    { label: "Hoodie", value: "Hoodie", uri: 'https://cdn-icons-png.flaticon.com/128/9431/9431181.png' },
    { label: "Thawb", value: "Thawb", uri: 'https://globalsymbols.com/uploads/production/image/imagefile/7701/15_7701_8b682d28-a326-4b6a-a85f-67edf995d2d0.png' },
    { label: "Tights", value: "Tights", uri: 'https://cdn-icons-png.flaticon.com/128/3343/3343878.png' },
    { label: "Tops", value: "Tops", uri: 'https://cdn-icons-png.flaticon.com/128/3258/3258170.png' },
    { label: "Tracksuit", value: "Tracksuit", uri: 'https://cdn-icons-png.flaticon.com/128/5783/5783203.png' },
    { label: "T-Shirt", value: "T-Shirt", uri: 'https://ae01.alicdn.com/kf/S8aecf0dfd4164c178cc47be230db45ccc.jpg_640x640q90.jpg' },
    { label: "Waistcoat", value: "Waistcoat", uri: 'https://cdn-icons-png.flaticon.com/128/4343/4343628.png' },
];

//https://images.pexels.com/photos/5016610/pexels-photo-5016610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2

  //clothTypeURI
  const [ItemURI, setItemURI] = useState('')

  // animated button
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
  };

  //animated text
  const animatedValue = useRef(new Animated.Value(-100)).current;

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
          {/* <Block style={{ flexDirection: 'row' }}> */}
            <Block center>
              <Image
                style={styles.avatar}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1173/1173817.png' }}>
              </Image>
            </Block>
            <Block center style={{}}>
              <Text style={{ fontSize: 15, alignSelf: 'center' }}>Hello, Guest!</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Let's share goodness!</Text>
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

        {/* requests */}
        {
        shortList.map((item, index) => {
            return (
              <View key={index} style={{ textAlign: "center" }}>
                <Text>
                  {item.type}
                </Text>
                <Text>
                  {item.quantity}
                </Text>
              </View>
            );
          })
          }

        {/* <Image
          style={styles.Image}
          source={{ uri: ItemURI }}
        ></Image> */}

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
    height: 160,
    backgroundColor: '#F1ECFF'
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
