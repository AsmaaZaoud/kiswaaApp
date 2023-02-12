import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TextInput,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config";

import { doc, setDoc, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db } from "../../config";

const { width, height } = Dimensions.get("screen");


const AddDriver = ({navigation}) => {
  const [Fname, setFname] = useState();
  const [Lname, setLname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();



//  let user = auth?.currentUser?.email;
//   console.log('user logged in: ', user)

 const add = async () => {
    const docRef = doc(db, "drivers", email)
    await setDoc(docRef, { fname: Fname,
      email: email,
      lname: Lname,
      phone: phone,
      zone:"" })
    console.log("Document written with ID: ", docRef.id);
    navigation.goBack()
  };
   
  
    return (
      <Block flex middle>
        {/* <StatusBar hidden /> */}
       
          <Block safe flex style={{marginTop:50}}>
             <Text style={{fontSize:30}}>Add</Text>
            <Block style={styles.registerContainer}>
              <Block flex>
        
              
              <Block center width={width*0.4} style={styles.box}>
                   <Image
                   style={styles.profileImage}
                     source={{ uri: 'https://static.vecteezy.com/system/resources/previews/000/376/489/original/add-user-vector-icon.jpg' }}
                   />
                     <Text style={styles.name}>Add photo</Text>
              </Block>
               
   {/*------- Form ---------*/}
                <Block flex  center >
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
      <Block  width={width * 0.8} style={{marginTop:15, marginBottom: 5,flexDirection:width>500?"row":""}}>
                   
          <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>First Name</Text>
                     < TextInput
                      style={styles.smallInput}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      />
          </View>

          <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Last Name</Text>
                     < TextInput
                      style={styles.smallInput}
                      placeholder="Grek"
                      value={Lname}
                      onChangeText={setLname}
                      />
          </View>
      </Block>
                    
      <Block  width={width * 0.8} style={{ marginBottom: 15, flexDirection:width>500?"row":"colunm"}}>
                   
          <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>Email</Text>
                     < TextInput
                      style={styles.smallInput}
                      placeholder="abc@example"
                      value={email}
                      onChangeText={setEmail}
                      />
          </View>

         <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Phone</Text>
                     < TextInput
                      style={styles.smallInput}
                      placeholder="66005500"
                      value={phone}
                      onChangeText={setPhone}
                      />
          </View>
      </Block>
      
      {/*--------- Buttons ----------*/}
      <Block right width={width*0.8} style={{flexDirection:"row"}} >
                      <Button 
                      color="success" 
                      style={styles.createButton} 
                      onPress={add}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Add
                        </Text>
                      </Button>
                       <Button 
                      style={styles.cancelButton} 
                      onPress={()=>navigation.goBack()}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Cancel
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>


              </Block>
            </Block>
          </Block>
      </Block>
    );
  
}

const styles = StyleSheet.create({
  smallInput:{
    width:"100%",
     backgroundColor:"white",
      borderRadius:10,
      padding:15,
      fontSize:20,
      borderWidth:0.3
  },
 
    text:{
      fontSize:20
    },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.2,
    marginTop: 25,

  },
   cancelButton: {
    width: width * 0.2,
    marginTop: 25,
  backgroundColor: theme.COLORS.MUTED    
  },
 
    imageContainer:{
      width:"100%",
      height:"20%",
      borderWidth:2
    },
    box: {
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    paddingTop: 10,
    paddingBottom:0
  },
  profileImage: {
    width: width*0.3,
    height: width*0.3,
    marginBottom: 0,
  },
  name: {
    fontSize: 35,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
});

export default AddDriver;
