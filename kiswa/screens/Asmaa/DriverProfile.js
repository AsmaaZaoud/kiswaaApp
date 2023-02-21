import React, { useEffect, useState } from "react";
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
  Platform,
  ScrollView,
   PixelRatio,
   Modal, FlatList
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select } from "../../components";
import { Images, argonTheme } from "../../constants";

import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';

import validator from "validator";

import { Avatar } from "@rneui/themed";


import {Feather,AntDesign,Ionicons,MaterialIcons} from "react-native-vector-icons"


//Firebase
import { signOut } from "firebase/auth";
import { auth, db,storage} from "../../config";
import { doc, setDoc, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL } from "firebase/storage";


const { width, height } = Dimensions.get("screen");
const scale = width / 428;
export function normalize(size) {
 
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const DriverProfile = ({navigation}) => {
  const [deviceType, setDeviceType] =useState("")

  const [chosenDate, setChosenDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          
        });
       


      if (!result.cancelled) {
        setImage(result.uri);
         setMsg(false)
        //setFileName(result.uri.substring(result.uri.toString().lastIndexOf("/") +1));
        let c = result.uri.substring(result.uri.toString().lastIndexOf("/") +1)
        setFileName(c)
      }
  };

useEffect(() => {
     width < 500 ? setDeviceType("mobile") : setDeviceType("ipad")
    // setArr(pick);
  }, []);

    const storage = getStorage();
    const storageRef = ref(storage, 'some-child');
  
    const uploadImage = async () => {
        console.log("got in upload");
        const imgRef = ref(storage, fileName);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytesResumable(imgRef, bytes);
    };

     const icons = [
    {
      id: 1,
      icon: "heart-sharp",
      title: "Favorite",
      color: "#ff4f86",
      page: "Favorite",
    },
    {
      id: 2,
      icon: "notifications",
      title: "Notifications",
      color: "#fe909d",
      page: "AllNotifications",
    },
    {
      id: 3,
      icon: "chatbubbles",
      title: "Chats",
      color: "#ff6cb3",
      page: "Chat",
    },
    {
      id: 4,
      icon: "log-out",
      title: "Log Out",
      color: "#fb6b94",
      page: "StartScreen",
    },
  ];
    const max = new Date()
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qId, setQId] = useState("");
  const [dob, setDob] = useState(new Date());
  const [zone, setZone] = useState("");

  // const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  // const [image, setImage] = useState();
  const [url, setUrl] = useState();
  //const [fileName, setFileName] = useState();
  const [datePicker, setDatePicker] = useState(false);
 
 const [FnameError, setFnameError] = useState();
  const [LnameError, setLnameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState();
  const [qIdError, setQIdError] = useState();
  const [dobError, setDobError] = useState();
  const [msg, setMsg] = useState(false);
  const [flag, setFlag] = useState(true);

const [ZoneError, setZoneError] = useState(true);




const [isPickerShow, setIsPickerShow] = useState(false);
const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const hidePicker = () => {
    setIsPickerShow(false);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  

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
  const [editModalVisible, setEditModalVisible] = useState(false);


 const add = async () => {
  alert("add")
  uploadImage();
    const docRef = doc(db, "drivers", email)
    await setDoc(docRef, { fname: Fname,
      email: email,
      lname: Lname,
      phone: phone,
      qId: qId,
      dob:dob,
      zone:zone ,
      image:fileName
    })
    console.log("Document written with ID: ", docRef.id);
    navigation.goBack()
  };
   

  const validOne = (x) =>{
    setFlag(false)
    switch(x){
      
      case 1:
              Fname == "" ? setFnameError(true) : setFnameError(false)
              //setFname(value)
              break
      case 2:

              Lname == "" ? setLnameError(true) : setLnameError(false)
              // setLname(value)
              break
      case 3:
              qId.length != 11? setQIdError(true) :setQIdError(false)
              // setQId(value)
              break
      case 4:
              phone.length != 8? setPhoneError(true) :setPhoneError(false)
              // setPhone(value)
              break
      case 5:
              validator.isEmail(email) == false? setEmailError(true):setEmailError(false)
              
              break
      case 6:
              dob == "" ? setDobError(true) : setDobError(false)
              break
      case 7:
        //alert(zone)

    }
                  
  }

  const validCreate = () =>{
      
        !FnameError &&
          !LnameError &&
            !emailError &&
              !phoneError && 
                !qIdError &&
                  zone &&
                  image &&
                  !flag &&
                  !dobError ? add(): setMsg(true)

      
                  

  }

const cheack = (value, type)=>{
  if (type == "phone"){
    if (value.length == 8 ){
        setPhoneError(false) 
        //setPhone(value)
      }setPhone(value)
  }
  else if (type == "id"){
    if (value.length ==11 ){
        setQIdError(false) 
        //setPhone(value)
      }setQId(value)
  }

  else if (type == "email"){
    validator.isEmail(value) == true ? setEmailError(false) :setEmailError(true)
       
      setEmail(value)
  }
   
   
  
}
const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
 const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };
  const data = [{name:"asma", email:"sss"}]
  
   return (
    <View style={styles.container}>
    
    {data ?  
    <View>
      <View style={styles.header}>
              <ImageBackground source={require("../../assets/imgs/bg.png")}>

          
        <View style={styles.headerContent}>
           <Pressable onPress={pickImage}>
             <Image
            style={styles.avatar}
            source={{
              uri: data.image,
            }}
          /></Pressable>
         

          <TextInput style={styles.name} value={name} onChangeText={setName} autoFocus={true} placeholder="Name"/>
         
        </View>
        </ImageBackground>
      </View>


      <View style={styles.body}>
        <View style={styles.item}>
          <View style={styles.iconContent}>
            {/* <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/color/70/000000/cottage.png",
              }}
            /> */}
            <AntDesign style={styles.icon} name="mail" size={30} />
          </View>
          <View style={styles.infoContent}>
            <TextInput style={styles.info} editable={false} value={data.email} onChangeText={setEmail} placeholder="Email"/>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContent}>
            {/* <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/color/70/000000/administrator-male.png",
              }}
            /> */}
            <Ionicons style={styles.icon} name="location-outline" size={30} />

          </View>
          <View style={styles.infoContent}>
            <TextInput style={styles.info} value={location} onChangeText={setLocation} placeholder="Location"/>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContent}>
            {/* <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/color/70/000000/filled-like.png",
              }}
            /> */}
            <AntDesign style={styles.icon} name="phone" size={30} />

          </View>
          <View style={styles.infoContent}>
            <TextInput style={styles.info} keyboardType="phone-pad"  value={phone} onChangeText={setPhone} placeholder="Phone"/>
          </View>
        </View>

        
        <View style={styles.saveView}>
        <Pressable style={styles.save} ><Text style={{textAlign:"center",fontSize: 22,}}>Save</Text></Pressable>
        </View>
      </View>
      </View>
:null}

    </View> 
  );
  
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  headerContent: {
    paddingTop: 50,
    alignItems: "center",
     //borderColor:"red",
     //borderWidth:2
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 8,
    borderColor: "pink",
    marginBottom: 10,
  },
  name: {
    width:"100%",height:"10%",
    textAlign:"center",
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    width:"100%",
    textAlign:"center",
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
    borderWidth:2,
    borderColor:"red"
  },
  body: {
    backgroundColor: "#fff",
    height: 400,
    //alignItems: "flex-start",
    //justifyContent:"flex-start",
    //borderColor:"blue",
    //borderWidth:2,
    //borderRadius:50
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
     //alignItems: "flex-start",
     paddingLeft:25,
    //borderColor:"red",
     //borderWidth:2
    //  borderBottomWidth:1,
    // borderColor:"red"
  },
  iconContent: {
    //flex: 1,
    // alignItems: "flex-end",
    paddingLeft: 65,
    borderColor:"red",
    // borderWidth:2
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "black",
    borderBottomColor:"grey",
    borderBottomWidth:1,
    width:"80%"

  },
  saveView:{
    width:"100%",
    justifyContent:"center",
    alignItems: "center",
    //borderColor:"purple",
    //borderWidth:2,
    height:"15%",
  },
  save:{
    width:"40%",
    height:"80%",
    
    borderRadius:20,
    justifyContent:"center",
    textAlign:"center",
    backgroundColor:"white",
    borderColor:"purple",
    borderWidth:2,margin:50,
  }
});

export default DriverProfile;
