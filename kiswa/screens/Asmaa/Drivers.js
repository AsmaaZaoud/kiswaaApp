//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from 'react'
import {   View, Alert, TextInput, FlatList, TouchableOpacity , Table} from 'react-native'
import { DataTable } from 'react-native-paper';
import { Button} from "galio-framework";
import { Dropdown } from "react-native-element-dropdown";

//FireBase
import { auth } from "../../config";

import { doc, query, getDocs, getDoc,addDoc ,collection, setDoc} from "firebase/firestore";
import { db } from "../../config";
//argon
import { Images, argonTheme, articles } from "../../constants/";

import {  Card, Header } from "../../components"

import {Icon,AntDesign,FontAwesome} from "react-native-vector-icons"
import ArButton from "../../components/Button";
import { normalize } from "./AdminHome";
import DriverDetails from "./DriverDetails";

const { width , height} = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
  {
    title: "Music Album",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80",
    price: "$125",
  },
  {
    title: "Events",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80",
    price: "$35",
  },
];

const Drivers = ({navigation}) => {

  const [deviceType, setDeviceType] =useState("")

  const data = [
    {
      id: 1,
      icon: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      description: 'Rajo ',
    },
    {
      id: 2,
      icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      description: 'User 2',
    },
    {
      id: 3,
      icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      description: 'User 3',
    },
    {
      id: 4,
      icon: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      description: 'User 4',
    },
    {
      id: 5,
      icon: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      description: 'User 5',
    },
    {
      id: 6,
      icon: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      description: 'User 6',
    },
    {
      id: 7,
      icon: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      description: 'User 7',
    },
    {
      id: 8,
      icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      description: 'User 8',
    },
    {
      id: 9,
      icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      description: 'User 9',
    },
  ]
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
    const [zone, setZone] = useState("");
const [ZoneError, setZoneError] = useState(true);

  useEffect(() => {
    readAllWhere();
     width < 500 ? setDeviceType("mobile") : setDeviceType("ipad")

  }, []);

  const [drivers, setDrivers] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
 
  const [flag, setFlag] = useState(false)
   const readAllWhere = async () => {
    let temp = [];
    const q = query(collection(db, "drivers"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      temp.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    setDrivers(temp);
    setAllDrivers(temp)
    //console.log(drivers);
  };

  const [orders, setOrders] = useState([]);

  //  let user = "Wsd@ass.com"
   const readOne = async (user) => {
    let temp = [];
    const q = query(collection(db, "drivers",user,"orders"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      let hour = doc.data().dateTime.toDate().getHours() 
      let t = doc.data()
      t.time = hour + ":00"
      t.date = doc.data().dateTime.toDate().toLocaleDateString()
      temp.push(t);
      // console.log(doc.id, " => ", t);
      // console.log(t);

    });
    setOrders(temp);
  
    // setAllorderss(temp)
    //console.log(drivers);
    setFlag(true)
  };

  const renderCards = () => {
  return(
   
           <Block>
        <Block style={[styles.head,{height:height *0.08,justifyContent:"space-between"}]}>
                      <View style={{flexDirection:"row"}}> 
                    <Text style = {{ fontSize: deviceType=="mobile" ?20: 30, marginLeft:"5%"}}>{flag}</Text>
                      </View>
                   
                  </Block>
                   <DataTable.Header style={{borderWidth:1, borderColor:"black", width:"90%",marginLeft:"3%",backgroundColor:"#c37aed",}}>
                <DataTable.Title textStyle={{fontSize: normalize(25), fontWeight:"bold"}}>Type</DataTable.Title>
                <DataTable.Title textStyle={{fontSize: normalize(25), fontWeight:"bold"}}>Location</DataTable.Title>
                <DataTable.Title textStyle={{fontSize: normalize(25), fontWeight:"bold"}}>Date</DataTable.Title>

                <DataTable.Title numeric textStyle={{fontSize: normalize(25), fontWeight:"bold"}}>Time</DataTable.Title>

              </DataTable.Header>
      {orders && orders.map((x)=>
        <DataTable.Row key={x.user} 
                    style={{width:"90%", height:"12%", marginLeft:"3%", backgroundColor:"#ebdbf5", borderWidth:1}}

        
        >
                  
                <DataTable.Cell textStyle={{fontSize:normalize(25) }}>{x.type}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize:normalize(25) }}>{x.location}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize:normalize(25) }}>{x.date}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={{fontSize:normalize(25) }}>{x.time}</DataTable.Cell>

          
            </DataTable.Row>
                
              )}
              </Block>
  )
   
    }

    // const changeZone =(zone,i) =>{
    //     console.log(zone)
    //     console.log(i)
    //     const { email, ...rest } = i;
    //     console.log(email)
        
    // }
  const update = async (zone,obj) => {
    const { email, ...rest } = obj;
    await setDoc(
      doc(db, "drivers", email),
      {
        zone:zone
      },
      { merge: true }
    )
      .then(() => {
        console.log("data updated");
        readAllWhere()
        //setEditModalVisible(!editModalVisible);
        // setSelectedItem(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
    return (
      <Block flex >
          <View style={styles.container}> 
      
              <DataTable>
               
                  <Block style={[styles.head,{height:height *0.08,justifyContent:"space-between"}]}>
                      <View style={{flexDirection:"row"}}> 
                        <FontAwesome name="user" size={deviceType=="mobile" ?30: 45}/> 
                    <Text style = {{ fontSize: deviceType=="mobile" ?20: 30, marginLeft:"5%"}}>Driverss</Text>
                      </View>
                    <Button L color="primary"  style={{width:"25%", height:"50%"}} onPress={()=>navigation.navigate("AddDriver")}>
                      
                      <Text style={{fontSize:deviceType=="mobile" ?18: 26, color:"#FFF"}}>Add</Text> 
                      
                      </Button>    
                  </Block>
              
                <DataTable.Header style={{borderTopWidth:0,borderBottomWidth:2, borderColor:"black", width:"90%",marginLeft:"3%", backgroundColor:"white",}}>
                <DataTable.Title textStyle={{fontSize:normalize(25) }}>Name</DataTable.Title>
                <DataTable.Title textStyle={{fontSize:normalize(25) }}>Email</DataTable.Title>
                <DataTable.Title numeric textStyle={{fontSize:normalize(25) }}>Phone</DataTable.Title>
                <DataTable.Title numeric textStyle={{fontSize:normalize(25) }}>Zone</DataTable.Title>


              </DataTable.Header>
              {drivers && drivers.map((x,i)=>
                <DataTable.Row key={x.email} onPress={()=>readOne(x.email)}
                    style={{width:"90%", height:"12%", marginLeft:"3%", backgroundColor:"white"}}>
                  
                <DataTable.Cell textStyle={{fontSize:normalize(25) }}>{x.fname}</DataTable.Cell>
                <DataTable.Cell textStyle={{fontSize:normalize(25) }}>{x.email}</DataTable.Cell>
                <DataTable.Cell numeric textStyle={{fontSize:normalize(25) }}>{x.phone}</DataTable.Cell>
                <DataTable.Cell numeric >
                  <Dropdown
                        
                        style={[styles.smallInput, {padding:11}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={zones}
                        maxHeight={160}
                        
                        labelField="label"
                        valueField="value"
                        placeholder={x.zone? x.zone : "Select zone"}
                        value={x.zone}
                        onChange={(item) => {
                          update(item.label,x)
                          setZone(item.label);
                          setZoneError(false)
                        }}
                      ></Dropdown>
                   
            
              </DataTable.Cell>
                  </DataTable.Row>
                
                )}

              {flag?
                    renderCards()
              :null}
              
            </DataTable>
         
          
          
        
   
          </View>
             
     </Block>
    );
  
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // borderWidth:2,
    // borderColor:"red",
    backgroundColor: '#EBEBEB',
    //paddingTop: 50,
    paddingHorizontal: "5%",
  },
  head:{
    // flexDirection:"row",
    // borderWidth:1,
    // padding:"1%",
    // justifyContent:"space-between",
    // marginBottom:0

    flexDirection:"row",
    padding:"1%",
    marginTop:"3%",
    width:"90%",
    marginLeft:"3%",
    alignItems:"center",
    // borderWidth:2,
    justifyContent:"space-between"
  },
  title:{
    fontSize:30,
    marginLeft:20,
    textAlign:"left"


  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    height: 45,
    alignItems: 'right',
    width:'50%',

    margin: 5,
  },
  icon: {
    width: 30,
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
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },
  rowTitle:{
    fontSize:width*0.03, 
    //color:"purple",
    fontWeight:"bold",
  },
  rowData:
  {color:"black", fontSize:width*0.04},
   smallInput:{
    width:normalize(130),
    //height:10,
    // backgroundColor:"white",
      borderRadius:10,
      //padding:15,
      fontSize:20,
      //borderWidth:0.3
  }
})

export default Drivers;
