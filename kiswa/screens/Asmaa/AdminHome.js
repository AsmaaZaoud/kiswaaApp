import { StyleSheet, View, Dimensions, Image, Pressable , TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper';
import {  theme } from "galio-framework";

import { Tab, TabView } from "@rneui/themed";

//FireBase
import { auth } from "../../config";
import { doc, query, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db } from "../../config";
import { signOut } from "firebase/auth";

//argon
import { Images, argonTheme, articles } from "../../constants/";
import {  Card, Header } from "../../components"
import {AntDesign,FontAwesome,MaterialCommunityIcons} from "react-native-vector-icons"
import ArButton from "../../components/Button";
import { Dropdown } from 'react-native-element-dropdown';

import { Button, Block, Checkbox, Text, NavBar, Icon } from "galio-framework";

//Pages 
import Drivers from './Drivers';
import Families from './Families';
import Clerks from "./Clerks";
import Inventory from "./Inventory";
import Donors from "./Donors";


const { width,height } = Dimensions.get('screen');


const  AdminHome = ({navigation}) => {
  const [deviceType, setDeviceType] =useState("")

  

    useEffect(() => {
    readAllWhere();
     width < 500 ? setDeviceType("mobile") : setDeviceType("ipad")
    //  alert(deviceType)
  }, [drivers]);
    const navbar = [
       { name:"Dashboard", color:"#e1ddf0", icon: require('../../assets/imgs/Dashboard.png') }, 
       {name: "Drivers",color:"#e1ddf0", icon:require('../../assets/imgs/Drivers.png')}, 
       {name: "Inventory",color:"#e1ddf0", icon:require('../../assets/imgs/Inventory.png')}, 
        {name:"Donors", color:"#e1ddf0", icon:require('../../assets/imgs/Donors.png')},
        {name: "Families",color:"#e1ddf0", icon:require('../../assets/imgs/Families.png')},
        {name:"Clerk",color:"#e1ddf0", icon:require('../../assets/imgs/Clerk.png')}
    ]
    const [color, setColor ] = useState("#e1ddf0")
    const [page, setPage ] = useState("Dashboard")
    const slect = (col,name) =>{
        setColor(col)
        setPage(name)

    }
  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };
    
   const [index, setIndex] = React.useState(0);
  const groups = { 0: "Men", 1: "Women", 2: "Boys", 3: "Girls" };


    const [drivers, setDrivers] = useState([]);
    const [allDrivers, setAllDrivers] = useState([]);
    
    const readAllWhere = async () => {
        let temp = [];
        const q = query(collection(db, "drivers"));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
            temp.push(doc.data());
        });
        setDrivers(temp);
        setAllDrivers(temp)
  };
    
   const [zone, setZone] = useState("Assign");
   const zones = [
    { label: " All Zones", value: "0" },
    { label: "Doha", value: "1" },
    { label: "Al Rayyan", value: "2" },
    { label: "Rumeilah", value: "3" },
    { label: "Wadi Al Sail", value: "4" },
    { label: "Al Daayen", value: "5" },
    { label: "Umm Salal", value: "6" },
    { label: "Al Wakra", value: "7" },
    { label: "Al Khor", value: "8" },
    { label: "Al Shamal", value: "9" },
    { label: "Al Shahaniya", value: "10" },
  ];

  const data = [
    { key: "T-shirt" },
    { key: "Sweater" },
    { key: "Jacket" },
    { key: "Coat" },
    { key: "Jeans" },
    { key: "socks" },
    { key: "shorts" },
    { key: "Tracksuit" },
    { key: "Vest" },
    { key: "Pajamas" },
    { key: "shoes" },
    { key: "suit" },
  ];

    const WType = [
    { key: "T-shirt" },
    { key: "Sweater" },
    { key: "Jacket" },
    { key: "Coat" },
    { key: "Jeans" },
    { key: "socks" },
    { key: "shorts" },
    { key: "Tracksuit" },
    { key: "Vest" },
    { key: "Pajamas" },
    { key: "shoes" },
    { key: "dress" },
    { key: "heels" },
    { key: "scarf" },
    { key: "blouse" },
    { key: "suit" },
  ];


  const colors = [
    { label: "Black", value: "1" },
    { label: "White", value: "2" },
    { label: "Red", value: "3" },
    { label: "Green", value: "4" },
    { label: "Yellow", value: "5" },
    { label: "Blue", value: "6" },
    { label: "Pink", value: "7" },
    { label: "Gray", value: "8" },
    { label: "Brown", value: "9" },
    { label: "Orange", value: "10" },
    { label: "Purple", value: "11" },
  ];

  const [ageGroup, setAgeGroup] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [color, setColor] = useState(colors[0].label);
  const [size, setSize] = useState("S");

  console.log(ageGroup, type, quantity, color, size);
  return (
    <View style={{backgroundColor:"#8C02FE"}}>
        <View style={styles.top}>
            <Image source={require('../../assets/imgs/kiswaLogo.png')} style={{width:150, height:50}} width={width*0.27} height={height*0.05} />
            <Pressable onPress={onSignOut}>
              <MaterialCommunityIcons name="logout" size={ deviceType=="mobile" ?30: 45} color="white" style={{margin:5}}/>
            </Pressable>
            

        </View>
       
       <NavBar
        //title="Reques Clothes"
        style={{ height: 0, borderWidth: 0, marginTop: 0, marginBottom: 0 }}
      />
      
      <Block style={{backgroundColor:"white", flexDirection:"colum"}}>
        <Tab
          value={index}
          onChange={setIndex}
          indicatorStyle={{
            backgroundColor: "#8411CE",
            height: 3,
            
          }}
        >
          <Tab.Item title="Men" titleStyle={{ fontSize: 12, color:"red" }}>
            <FontAwesome  name="home" size={ deviceType=="mobile" ?30: 45} color="#8411CE"/>
            <Text style={{ fontSize: deviceType=="mobile" ?12: 18 }}>Home</Text>
          </Tab.Item>
          <Tab.Item title="Women" titleStyle={{ fontSize: 12 }}>
              <FontAwesome  name="car" size={ deviceType=="mobile" ?30: 45}/>
            <Text style={{ fontSize: deviceType=="mobile" ?12: 18 }}>Drivers</Text>
          </Tab.Item>
          <Tab.Item title="Boys" titleStyle={{ fontSize: 12 }}>
             <FontAwesome  name="user" size={ deviceType=="mobile" ?30: 45}/>
            <Text style={{ fontSize: deviceType=="mobile" ?12: 18 }}>Families</Text>
          </Tab.Item>
          <Tab.Item title="Girls" titleStyle={{ fontSize: 12 }}>
              <FontAwesome  name="gift" size={ deviceType=="mobile" ?30: 45}/>
            <Text style={{ fontSize: deviceType=="mobile" ?12: 18 }}>Donors</Text>
          </Tab.Item>
            <Tab.Item title="Girls" titleStyle={{ fontSize: 12 }}>
              <FontAwesome  name="users" size={ deviceType=="mobile" ?30: 45}/>
            <Text style={{ fontSize: deviceType=="mobile" ?12: 18 }}>Clerk</Text>
          </Tab.Item>
           <Tab.Item title="Girls" titleStyle={{ fontSize: 12 }}>
              <FontAwesome  name="database" size={ deviceType=="mobile" ?30: 45}/>
            <Text style={{ fontSize: deviceType=="mobile" ?11: 18 }}>Inventory</Text>
          </Tab.Item>
        </Tab>
        {/* </Block> */}

        <TabView value={index} onChange={setIndex} animationType="spring">

  {/*--------- Dashboard -------------*/}
          <TabView.Item style={styles.comp}>
            <View>
              <Text>hhh</Text>

            </View>
          </TabView.Item>

  {/*--------- Drivers -------------*/}
            <TabView.Item style={styles.comp}>
           
              <View style={styles.board}>
                <Drivers navigation={navigation}/>
              </View>
           
          </TabView.Item>

  {/*--------- Families -------------*/}
           <TabView.Item style={styles.comp}>
           
              <View style={styles.board}>
                <Families navigation={navigation}/>
              </View>
           
          </TabView.Item>

  {/*--------- Donors -------------*/}
          <TabView.Item style={styles.comp}>
           
              <View style={styles.board}>
                <Donors navigation={navigation}/>
              </View>
           
          </TabView.Item>

  {/*--------- clerks -------------*/}
         <TabView.Item style={styles.comp}>
           
              <View style={styles.board}>
                <Clerks navigation={navigation}/>
              </View>
           
          </TabView.Item>

  {/*--------- Inventory -------------*/}
         <TabView.Item style={styles.comp}>
           
              <View style={styles.board}>
                <Inventory navigation={navigation}/>
              </View>
           
          </TabView.Item>
        
        </TabView>
        </Block>
   
    </View>
  )
}


const styles = StyleSheet.create({
  top:{
    marginTop:"1%",
    //borderBottomWidth:0.5,
    padding:"3%",
    flexDirection:'row',
    justifyContent:"space-between"
  },
    nav: {
    width: width *0.25, 
    height: height, 
    backgroundColor:"white" 
  },
  n:{
    flexDirection:'row',
    height: "8%",
    padding:"5%",
    alignItems:"center"
  },
  name:{
    fontSize:"20%",
  },
  head:{
    flexDirection:"row",
    padding:"1%",
    marginTop:"3%",
    width:"90%",
    marginLeft:"3%",
    alignItems:"center",
    // borderWidth:2,
    justifyContent:"space-between"
  },
  comp :{ width: width,
              height: height,
              backgroundColor:"white"},
  title:{
    fontSize:"30%",
    marginLeft:"4%",
    //paddingTop:"1%",
    //textAlign:"left"
  },

  
  //Search --------------------
  icon: {
    width: 0,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    //flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  //------------------------
  
  
  dropdown: {
    margin: "2%",
    height: "5%",
    backgroundColor: "white",
    borderRadius: "5%",
    padding: "1.2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: "15%",
  },
  selectedTextStyle: {
        fontSize: "15%",

  },

  rowTitle:{
    fontSize:"20%", color:"purple"
  },
  rowData:
  {color:"black", fontSize:"21%"}
})

export default AdminHome
