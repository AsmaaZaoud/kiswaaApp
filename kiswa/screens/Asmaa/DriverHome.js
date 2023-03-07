import React, { useEffect, useState } from 'react';
import { StyleSheet,Image, Dimensions,Platform, PixelRatio, ScrollView, Text, View, Pressable } from 'react-native';
import { Block, theme } from 'galio-framework';
import {Feather,AntDesign,Ionicons,MaterialCommunityIcons} from "react-native-vector-icons"
//Firebase
import { auth } from "../../config";
import { doc, query, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db } from "../../config";
import { signOut } from "firebase/auth";


const { width , height} = Dimensions.get('screen');
 const scale = width / 428;
export function normalize(size) {
 
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
const DriverHome = ({navigation}) => {


  const [deviceType, setDeviceType] =useState("")
  const [type ,setType] = useState("pick")
  const [arr ,setArr] = useState([])
   useEffect(() => {
     width < 500 ? setDeviceType("mobile") : setDeviceType("ipad")
    setArr(pick);
  }, []);

  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };
    const pick = [
        {
            id:"0012red3",
            userName: "Asmaa",
            zone: "Gharafa"
        },
        {
            id:"0033948",
            userName: "Sara",
            zone: "Alkhor"

        },
        {
            id:"003754",
            userName: "Ahmad",
            zone: "Wakra"

        }

  ]
 const deliv = [
        {
            id:"0012red3",
            userName: "Ahmad",
            zone: "doha"
        },
        {
            id:"0033948",
            userName: "naser",
            zone: "Alkhor"

        },
        {
            id:"003754",
            userName: "sara",
            zone: "Wakra"

        }

  ]

  const change = (type) => {
    if (type == "deliv") {
      setType("deliv")
      setArr(deliv)
    }
    else {
      setType("pick")
      setArr(pick)

    }
  }
    return (
        
      <Block flex  >
         
        <View style={{backgroundColor:"#8C02FE", width:width}}>
          <View style={styles.topl}>
            <Image source={require('../../assets/imgs/kiswaLogo.png')} style={{width:150, height:50}} width={width*0.27} height={height*0.05} />
            <Pressable onPress={onSignOut}>
              <MaterialCommunityIcons name="logout" size={ deviceType=="mobile" ?30: 45} color="white" />
            </Pressable>
        </View>
        </View>
        
        <Block style={styles.nav}>
            <Pressable onPress={()=>change("pick")}> 
              <Text style={type == "pick"? styles.selected : styles.unselected}>Pickup</Text>
            </Pressable>
           
            <Text style={styles.unselected}>|</Text>
            <Pressable onPress={()=>change("deliv")}>
               <Text  style={type == "deliv"? styles.selected : styles.unselected}>Deliver</Text>
               </Pressable>
        </Block>
         <ScrollView>
 
    <View  style={styles.home}>
        {  
        arr.map((x)=>
            <View key={x.id} style={styles.card}>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.cardTitle}>Order No</Text>

          <Text style={styles.cardTitle}>#{x.id}</Text>

          </View>
          <View style={styles.userCard}>
               <Feather name="user" size={50} />
               <View style={{marginLeft:10}}>
                  <Text style={{fontSize:15, fontWeight:"bold"}}>Name </Text>
                  <Text style={{fontSize:15,fontWeight:"bold"}}>Phone </Text>
                  <Text style={{fontSize:15,fontWeight:"bold"}}>Email </Text>
               </View>
          </View>
         
          <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15}}>
          <View style={[styles.dataView,{flexDirection:"row"}]}>
           <Ionicons name="md-today-sharp" size={30} />
            <Text style={styles.dataTitles}>17-Feb-2023</Text>
          </View>
          <View style={[styles.dataView,{flexDirection:"row"}]}>
           <Ionicons name="time-outline" size={30} />
            <Text style={styles.dataTitles}>12:00 PM</Text>
          </View>
          </View>

          <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15}}>
          <View style={[styles.dataView,{flexDirection:"row"}]}>
           <Ionicons name="location-outline" size={30} />
            <Text style={styles.dataTitles}>Alkhor</Text>
          </View>
          <View style={[styles.dataView,{flexDirection:"row"}]}>
           <Ionicons name="map-outline" size={30} />
            <Text style={styles.dataTitles}>Open Map</Text>
          </View>
          </View>

          <View style={{justifyContent:"center", alignItems:"center"}}>
          <Pressable style={styles.pickupButtonContainer}>
           { type == "pick" ?
            <Text style={styles.pickupButton}>Pick up</Text>
            :
             <Text style={styles.pickupButton}>Deliver</Text>
             }
          </Pressable>
           {/* <Pressable style={styles.cancelButtonContainer}>
            <Text style={styles.cancelButton}>c</Text>
          </Pressable> */}
          </View>
        </View>
        )}

     
      </View>
      
    </ScrollView>
      </Block>
    );
  

}
const styles = StyleSheet.create({
 
  topl:{
    width:width*.97,
    padding:"2%",
    flexDirection:'row',
    justifyContent:"space-between",
    backgroundColor:"#8C02FE",
    marginTop:"3%"
  },
  nav:{
    marginVertical:"7%",
    marginHorizontal:"19%",
    width:width *0.6,
    flexDirection:"row",
    alignContent:"center",
    justifyContent:"space-between"
  },
  unselected:{
     fontSize:normalize(19), 
  },
  selected:{
    color: "#8C02FE",
     fontSize:normalize(19), 
     fontWeight:"bold"
  },
   home: {
    marginHorizontal:"10%" 
  },
   card: {
    marginVertical:"2%",
    padding: "7%",
    borderWidth: 1,
    borderColor: '#cbc',
    borderRadius: "10%",
  },
  cardTitle: {
    fontSize: normalize(17),
    marginBottom: "6%",
  },
  userCard:{
    borderWidth:1, 
    borderColor:"lightgrey",
    margin:"2%", 
    borderRadius:"7%", 
    flexDirection:"row", 
    padding:"3%",
    shadowColor: "#666",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.49,
    elevation: 2,
  },
  
 
  dataView: {
    marginBottom: "6%",

  },
  dataTitles: {
    fontSize: normalize(15) ,
    // color: '#999',
    marginTop:"5%",
    marginLeft:"5%"
  },
  pickupButtonContainer: {
    backgroundColor: '#8C02FE',
    borderRadius: "7%",
    width:width*0.4,
    margin:"6%"
  },
  pickupButton: {
    textAlign:"center",
    fontSize: normalize(15),
    color: '#fff',
    padding: "7%",
  },
  
 cancelButtonContainer: {
    backgroundColor: 'lightgrey',
    color:"black",
    textAlign:"center",
    
  },

   cancelButton: {
    color: 'black',
    textAlign:"center",
    fontSize: normalize(15),
    padding: "7%",
  },
  

});

export default DriverHome;
