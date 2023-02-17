import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select } from "../../components";
import { Images, argonTheme } from "../../constants";

import { Dropdown } from "react-native-element-dropdown";

import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-date-picker'

import validator from "validator";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config";

import { doc, setDoc, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db, storage } from "../../config";

const { width, height } = Dimensions.get("screen");


const AddDriver = ({navigation}) => {

    const [chosenDate, setChosenDate] = useState(new Date());

  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qId, setQId] = useState("");
  const [dob, setDob] = useState(new Date);
  const [zone, setZone] = useState("");

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [fileName, setFileName] = useState();
  const [datePicker, setDatePicker] = useState(false);
 
 const [FnameError, setFnameError] = useState();
  const [LnameError, setLnameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState();
  const [qIdError, setQIdError] = useState();
  const [dobError, setDobError] = useState();
  const [msg, setMsg] = useState(false);
  const [flag, setFlag] = useState(true);

const [ZoneError, setZoneError] = useState();





  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     //allowsEditing: true,
  //     //aspect: [4, 3],
  //     //quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

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


//  let user = auth?.currentUser?.email;
//   console.log('user logged in: ', user)

 const add = async () => {
  alert("add")
    const docRef = doc(db, "drivers", email)
    await setDoc(docRef, { fname: Fname,
      email: email,
      lname: Lname,
      phone: phone,
      qId: qId,
      dob:dob,
      zone:"" })
    console.log("Document written with ID: ", docRef.id);
    navigation.goBack()
  };
   

  const validOne = (x) =>{
    setFlag(false)
    switch(x){
      
      case 1:
            setFname
              Fname == "" ? setFnameError(true) : setFnameError(false)
              break
      case 2:
              Lname == "" ? setLnameError(true) : setLnameError(false)
              break
      case 3:
              qId.length != 11? setQIdError(true) :setQIdError(false)
              break
      case 4:
              phone.length != 8? setPhoneError(true) :setPhoneError(false)
              break
      case 5:
              validator.isEmail(email) == false? setEmailError(true):setEmailError(false)
              break
      case 6:
              dob == "" ? setDobError(true) : setDobError(false)
              break

    }
                  
  }

  const validCreate = () =>{
      
        !FnameError &&
          !LnameError &&
            !emailError &&
              !phoneError && 
                !qIdError &&
                  !flag &&
                  !dobError ? add(): setMsg(true)

      
                  

  }
    return (
      <Block flex middle>
        {/* <StatusBar hidden /> */}
       
          <Block safe flex style={{marginTop:50}}>
             <Text style={{fontSize:30}}>Add</Text>
            <Block style={styles.registerContainer}>
              <Block flex>
        
              
              <Block center width={width*0.4} style={styles.box}>
                <Pressable 
               // onPressIn={() => pickImage()}
                > 
                  <Image
                   style={styles.profileImage}
                     source={{ uri: image? image : 'https://static.vecteezy.com/system/resources/previews/000/376/489/original/add-user-vector-icon.jpg' }}
                  

                  />

                  </Pressable>
                  
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
                     autoCorrect = {false}

                      style={[styles.smallInput, {borderColor: FnameError?"red":"black"}]}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      onEndEditing =  {()=>validOne(1)}
                      />
          </View>

          <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Last Name</Text>
                     < TextInput
                     autoCorrect = {false}

                       style={[styles.smallInput, {borderColor: LnameError?"red":"black"}]}
                      placeholder="Grek"
                      value={Lname}
                      onChangeText={setLname}
                        onBlur = {()=>validOne(2)}
                      />
          </View>
      </Block>
                    
      <Block  width={width * 0.8} style={{ marginBottom: 15, flexDirection:width>500?"row":"colunm"}}>
                   
          <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>Qatar ID</Text>
                     < TextInput
                     autoCorrect = {false}
                      keyboardType="numeric"
                      style={[styles.smallInput, {borderColor: qIdError?"red":"black"}]}
                      placeholder="30101200033"
                      value={qId}
                      onChangeText={setQId}
                      onBlur = {()=>validOne(3)}

                      />
          </View>

         <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Phone</Text>
                     < TextInput
                     autoCorrect = {false}

                       style={[styles.smallInput, {borderColor: phoneError?"red":"black"}]}
                      placeholder="66005500"
                      value={phone}
                      onChangeText={setPhone}
                      onBlur = {()=>validOne(4)}

                      />
          </View>

          
      </Block>
      
      
       <Block  width={width * 0.8} style={{ marginBottom: 15, flexDirection:width>500?"row":"colunm"}}>
                   
          <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>Email</Text>
                     < TextInput
                     autoCorrect = {false}

                       style={[styles.smallInput, {borderColor: emailError?"red":"black"}]}
                      placeholder="abc@example"
                      value={email}
                      onChangeText={setEmail}
                      onEndEditing = {()=>validOne(5)}

                      />
          </View>

         <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Date Of Birth</Text>
                     {/* < TextInput
                     autoCorrect = {false}

                     type="date"
                       style={[styles.smallInput, {borderColor: dobError?"red":"black"}]}
                      placeholder="2-2-1992"
                      value={dob}
                      onChangeText={setDob}
                      onBlur = {()=>validOne(6)}

                      /> */}

                       <Button style={{width:100,height:100, borderWidth:1}} title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={true}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
       

              
               
          </View>

          
      </Block>
      
      {/*--------- Buttons ----------*/}

          <View>
            {msg ?
              <Text style={{color:"red"}}>Please Fill al feilds!</Text>
              :null}
        </View>
      <Block right width={width*0.8} style={{flexDirection:"row"}} >
        <Block width={width * 0.4} style={{ marginBottom: 0 }}>
                              {/* <Text style={styles.text}>Zone</Text> */}

                      <Dropdown
                     
                        style={[styles.smallInput, {padding:11}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={zones}
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder={zone? zone : "Select zone"}
                        value={zone}
                        onChange={(item) => {
                          setZone(item.label);
                        }}
                      ></Dropdown>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontSize: 12,
                        }}
                      >
                        {ZoneError}
                      </Text>
                    </Block>
                      <Button 
                      color="success" 
                      style={styles.createButton} 
                      onPress={validCreate}
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
 input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
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
    width: width * 0.20,
    marginTop: 10,

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
   datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
    color: "pink",
  },
  dropdown: {
    //marginBottom: 10,
    padding: 7,
    borderRadius: 4,
    borderColor: argonTheme.COLORS.INPUT_ERROR,
    height: 44,
    backgroundColor: "#FFFFFF",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,}
});

export default AddDriver;
