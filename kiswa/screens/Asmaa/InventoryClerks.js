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
import React, { useState, useEffect } from 'react'
import {   View, Alert, TextInput, FlatList, TouchableOpacity , Table} from 'react-native'
import { DataTable } from 'react-native-paper';

import { auth } from "../../config";

import { doc, query, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db } from "../../config";
//argon
import { Images, argonTheme, articles } from "../../constants/";

import { Button, Card, Header } from "../../components"

import {Icon,AntDesign, FontAwesome} from "react-native-vector-icons"

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;


const InventoryClerks = ({navigation}) => {
  const data = [
   
    {
      id: 2,
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      name: 'Komar',
    },
    {
      id: 3,
      image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      name: 'Sanji',
    },
    {
      id: 4,
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      name: 'Anas',
    },
    {
      id: 5,
      image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      name: 'Amina',
    },
    {
      id: 6,
      image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      name: 'Anood',
    },
    {
      id: 7,
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Arham',
    },
    
    
  ]
 useEffect(() => {
    readAllWhere();
  }, []);
   const [results, setResults] = useState(data)
  // const [query, setQuery] = useState()

  const [workers, setWorkers] = useState([]);
  const [allWorkers, setAllWorkers] = useState([]);
 
  
  const showAlert = () => {
    Alert.alert('Alert', 'Button pressed ')
  }

   const readAllWhere = async () => {
    let temp = [];
    const q = query(collection(db, "inventoryWorkers"));
    const docs = await getDocs(q);
    // console.log(docs)
    docs.forEach((doc) => {
      temp.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setWorkers(temp);
    setAllWorkers(temp)
    console.log(workers);
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
          <Text style={styles.title}>Clerks</Text>
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
          <Button color="success"  style={{width:"31%"}} onPress={()=>navigation.navigate("AddClerk")}>Add </Button>    
           <Button color="info" style={{width:"31%"}}>Assign </Button>    
            <Button color="warning" style={{width:"31%"}}>Delete </Button>    
      </View>
        </Block>

       
        <DataTable.Header style={{borderBottomWidth:1, borderBottomColor:"black"}}>
          <DataTable.Title style={{fontSize:20}}>Id</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Image</DataTable.Title>
                 <DataTable.Title numeric>Age</DataTable.Title>

        </DataTable.Header>
 {workers && workers.map((x)=>
   <DataTable.Row key={x.email}>
              {/* <DataTable.Cell > */}
                {/* <Image source={{ uri: x.image }} style={{width:50,height:50, borderRadius:25}}/></DataTable.Cell> */}

          <DataTable.Cell>{x.email}</DataTable.Cell>
          <DataTable.Cell>{x.fname}</DataTable.Cell>
          <DataTable.Cell>{x.phone}</DataTable.Cell>

     
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
    //borderWidth:2,
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

export default InventoryClerks;
