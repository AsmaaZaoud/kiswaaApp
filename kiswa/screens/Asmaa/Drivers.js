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

//FireBase
import { auth } from "../../config";

import { doc, query, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db } from "../../config";
//argon
import { Images, argonTheme, articles } from "../../constants/";

import { Button, Card, Header } from "../../components"

import {Icon,AntDesign,FontAwesome} from "react-native-vector-icons"
import ArButton from "../../components/Button";

const { width } = Dimensions.get("screen");

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

  useEffect(() => {
    readAllWhere();
  }, []);

  const [drivers, setDrivers] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
 

   const readAllWhere = async () => {
    let temp = [];
    const q = query(collection(db, "drivers"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setDrivers(temp);
    setAllDrivers(temp)
    console.log(drivers);
  };

    return (
      <Block flex >
            <View style={styles.container}> 
      
    {/* <Block right>
            <Button color="success"  style={styles.button}>PRIMARY</Button>
          </Block> */}


 <DataTable>
  <Block style={styles.head}>
    <View style={{flexDirection:"row"}}> 
      <FontAwesome name="user" size={40}/>
          <Text style={styles.title}>Drivers</Text>
          </View>
         
           <View style={styles.inputContainer}>
         
          <TextInput
            style={styles.inputs}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            //onChangeText={q => setQuery({ q })}
          />
        </View>
        </Block>

    <Block style={styles.head}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}> 
          <Button color="success"  style={{width:"30%"}} onPress={()=>navigation.navigate("AddDriver")}>Add </Button>    
           <Button color="info" style={{width:"30%"}}>Assign </Button>    
            <Button color="warning" style={{width:"30%"}}>Delete </Button>    
      </View>
        </Block>

        
          <DataTable.Header style={{borderBottomWidth:1, borderBottomColor:"black"}}>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title >Email</DataTable.Title>
          <DataTable.Title numeric>Phone</DataTable.Title>

        </DataTable.Header>
 {drivers && drivers.map((x)=>
   <DataTable.Row key={x.email}>
             
          <DataTable.Cell>{x.fname}</DataTable.Cell>
          <DataTable.Cell>{x.email}</DataTable.Cell>
          <DataTable.Cell numeric>{x.phone}</DataTable.Cell>

     
       </DataTable.Row>
          
        )}

      </DataTable>
     
      {/* <FlatList
        style={styles.notificationList}
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={showAlert} style={styles.notificationBox}>
              <Image style={styles.image} source={{ uri: item.icon }} />
              <Text style={styles.name}>{item.description}</Text>
            </TouchableOpacity>
          )
        }}
      /> */}
    </View>
      </Block>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  head:{
    flexDirection:"row",
   // borderWidth:1,
    padding:5,
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
})

export default Drivers;
