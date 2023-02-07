import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Ionicons} from "react-native-vector-icons"
const { width } = Dimensions.get('screen');

const DriverHome = ({navigation}) => {
    const arr = [
        {
            id:"6001",
            userName: "Asmaa",
            zone: "Gharafa"
        },
        {
            id:"6002",
            userName: "Sara",
            zone: "Alkhor"

        },
        {
            id:"6004",
            userName: "Ahmad",
            zone: "Wakra"

        }

]

    return (
        
      <Block flex  style={styles.home}>
        <Text style={styles.title}>All orders</Text>
        <Block style={styles.top}>
            <Text>Pickup</Text>
            <Text>|</Text>
            <Text>Deliver</Text>

        </Block>
         <ScrollView>
      <View >
        {
        arr.map((x)=>
            <View key={x.id} style={styles.pricingOption}>
          <Text style={styles.pricingOptionTitle}>{x.id}</Text>
          <Text style={styles.pricingOptionPrice}>User: {x.userName}</Text>
          <Text style={styles.pricingOptionDescription}>
            Location: {x.zone}
          </Text>
          <View style={styles.pricingOptionFeatures}>
            <Text style={styles.pricingOptionFeature}>1 user</Text>
           <Ionicons name="time-outline" size={20} />
            <Text style={styles.pricingOptionFeature}>10GB storage</Text>
            <Text style={styles.pricingOptionFeature}>Basic support</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#0011FF',
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
