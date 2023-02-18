import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View, Pressable } from 'react-native';
import { Block, theme } from 'galio-framework';
import {Feather,AntDesign,Ionicons,MaterialCommunityIcons} from "react-native-vector-icons"

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
          <Text style={styles.pricingOptionTitle}>Order No</Text>

          <Text style={styles.pricingOptionTitle}>#{x.id}</Text>

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
          <View style={[styles.pricingOptionFeatures,{flexDirection:"row"}]}>
           <Ionicons name="md-today-sharp" size={30} />
            <Text style={styles.pricingOptionFeature}>17-Feb-2023</Text>
          </View>
          <View style={[styles.pricingOptionFeatures,{flexDirection:"row"}]}>
           <Ionicons name="time-outline" size={30} />
            <Text style={styles.pricingOptionFeature}>12:00 PM</Text>
          </View>
          </View>

          <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15}}>
          <View style={[styles.pricingOptionFeatures,{flexDirection:"row"}]}>
           <Ionicons name="location-outline" size={30} />
            <Text style={styles.pricingOptionFeature}>Alkhor</Text>
          </View>
          <View style={[styles.pricingOptionFeatures,{flexDirection:"row"}]}>
           <Ionicons name="map-outline" size={30} />
            <Text style={styles.pricingOptionFeature}>Open Map</Text>
          </View>
          </View>

          <View style={{justifyContent:"center", alignItems:"center"}}>
          <Pressable style={styles.pickupButtonContainer}>
            <Text style={styles.pickupButton}>Pick up</Text>
          </Pressable>
           <Pressable style={styles.cancelButtonContainer}>
            <Text style={styles.cancelButton}>Pick up</Text>
          </Pressable>
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
  userCard:{
    borderWidth:1, 
    borderColor:"lightgrey",
    margin:5, 
    borderRadius:10, 
    flexDirection:"row", 
    padding:10,
    shadowColor: "#666",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.49,
    elevation: 2,
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
    fontSize: 17,
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
    fontSize: 15,
    //color: '#999',
    marginTop:5,
    marginLeft:5
  },
  pickupButtonContainer: {
    backgroundColor: 'green',
    borderRadius: 5,
    width:width*0.4,
    margin:10
  },
  pickupButton: {
    textAlign:"center",
    fontSize: 14,
    color: '#fff',
    padding: 10,
  },
 cancelButtonContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    width:width*0.4,
    color:"black"
  },

   cancelButton: {
    textAlign:"center",
    fontSize: 14,
    color: 'black',
    padding: 10,
  },
  

});

export default DriverHome;
