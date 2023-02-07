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
import React, { useState } from 'react'
import {   View, Alert, TextInput, FlatList, TouchableOpacity , Table} from 'react-native'
import { DataTable } from 'react-native-paper';

//argon
import { Images, argonTheme, articles } from "../../constants/";

import { Button, Card, Header } from "../../components"

import {Icon,AntDesign} from "react-native-vector-icons"

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

   const [results, setResults] = useState(data)
  const [query, setQuery] = useState()

  const showAlert = () => {
    Alert.alert('Alert', 'Button pressed ')
  }

    return (
      <Block flex >
            <View style={styles.container}> 
      
    {/* <Block right>
            <Button color="success"  style={styles.button}>PRIMARY</Button>
          </Block> */}


 <DataTable>
  <Block style={styles.head}>
    <View style={{flexDirection:"row"}}> 
      <AntDesign name="user" size={40}/>
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
        <DataTable.Header >
          <DataTable.Title style={{fontSize:20}}>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>john@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>33</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell>test@test.com</DataTable.Cell>
          <DataTable.Cell numeric>105</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Mei</DataTable.Cell>
          <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>23</DataTable.Cell>
        </DataTable.Row>

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
    borderWidth:2,
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
