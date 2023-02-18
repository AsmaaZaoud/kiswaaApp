import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';
import {Icon,AntDesign,FontAwesome,MaterialCommunityIcons} from "react-native-vector-icons"

import { Ionicons} from "react-native-vector-icons"
const { width } = Dimensions.get('screen');

const DriverHome = ({navigation}) => {
    const arr = [
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

    return (
        
      <Block flex  style={styles.home}>
          <View style={styles.topl}>
            <Text>Logo</Text>
           
              <MaterialCommunityIcons name="logout" size={40} />
           
            

        </View>
        <Block style={styles.top}>
            <Text style={{color:"green", fontSize:19, fontWeight:"bold"}}>Pickup</Text>
            <Text style={{ fontSize:19}}>|</Text>
            <Text style={{fontSize:19}}>Deliver</Text>

        </Block>
         <ScrollView>
      <View >
        {
        arr.map((x)=>
            <View key={x.id} style={styles.pricingOption}>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.pricingOptionTitle}>order </Text>

          <Text style={styles.pricingOptionTitle}>#{x.id}</Text>

          </View>
          <Text style={styles.pricingOptionPrice}>User: {x.userName}</Text>
          <Text style={styles.pricingOptionDescription}>
            Location: {x.zone}
          </Text>
          <View style={{flexDirection:"row", justifyContent:"space-between", margin:5}}>
          <View style={[styles.pricingOptionFeatures,{flexDirection:"row"}]}>
           <Ionicons name="time-outline" size={20} />
            <Text style={styles.pricingOptionFeature}>12:00</Text>
          </View>
          <View style={[styles.pricingOptionFeatures,{flexDirection:"row"}]}>
           <Ionicons name="md-today-sharp" size={20} />
            <Text style={styles.pricingOptionFeature}>17-Feb-2023</Text>
          </View>
          </View>
          <View style={styles.pricingOptionButtonContainer}>
            <Text style={styles.pricingOptionButton}>Pick up</Text>
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
    width:width*.8,
    //borderWidth:1,
    //padding:10,
    flexDirection:'row',
    justifyContent:"space-between"
  },
   home: {
    //width: width, 
    margin:50   
  },
  title:{
    fontSize:30
  },
  top:{
    margin:"10%",
    width:"70%",
    flexDirection:"row",
    justifyContent:"space-between"
  },

  pricingOption: {
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  pricingOptionTitle: {
    fontSize: 18,
    //fontWeight: 'bold',
    marginBottom: 10,
  },
  pricingOptionPrice: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  pricingOptionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  pricingOptionFeatures: {
    marginBottom: 10,
  },
  pricingOptionFeature: {
    fontSize: 14,
    color: '#999',
  },
  pricingOptionButtonContainer: {
    backgroundColor: 'green',
    borderRadius: 5,
  },
  pricingOptionButton: {
    textAlign:"center",
    fontSize: 14,
    color: '#fff',
    padding: 10,
  },

  

});

export default DriverHome;
