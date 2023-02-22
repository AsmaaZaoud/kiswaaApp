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
   Modal
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select } from "../../components";
import { Images, argonTheme } from "../../constants";

import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';

import validator from "validator";

import {Feather,AntDesign,Ionicons,MaterialCommunityIcons} from "react-native-vector-icons"


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
  
    const data = {fname:"Joe", lname:"Grek", phone:"66996699", qId:"30100000203", email:"joe@gmail.com"}
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

 const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };
  
    return (
      <Block flex middle style={{ backgroundColor:"white", flex:1}}>
          <View style={{backgroundColor:"#8C02FE", width:width}}>
          <View style={styles.topl}>
            <Pressable onPress={()=>navigation.goBack()} style={{flexDirection:"row"}}>
              <Ionicons name="arrow-back" size={ deviceType=="mobile" ?30: 45} color="white" />
              <Text style={{fontSize:normalize(18), marginTop:"3%", color:"white"}}>Back</Text>
            </Pressable>
            {/* <Image source={require('../../assets/imgs/kiswaLogo.png')} style={{width:150, height:50}} width={width*0.27} height={height*0.05} /> */}
            <Pressable onPress={onSignOut}>
              <MaterialCommunityIcons name="logout" size={ deviceType=="mobile" ?30: 45} color="white" />
            </Pressable>
        </View>
        </View>
          <Block safe flex style={{marginTop:50, backgroundColor:"white", flex:1}}>
             {/* <Text style={{fontSize:30}}>Edit</Text> */}


            <Block style={styles.registerContainer}>
              <Block flex>
        
              
              <Block center width={width*0.4} style={styles.box}>
                <Pressable 
               onPress={pickImage}
               
                > 
            <Image
                   style={styles.profileImage}
                     source={{ uri: image? image : "https://1.bp.blogspot.com/-kWt2PZi-rC0/VbXLK5Eg0sI/AAAAAAAAx6M/V40UYN78YVs/s1600/passport2015-201507251917.jpg" }}
                  />
                  
                  {/* {image?<Text style={styles.name}>Change</Text>:<Text style={styles.name}>Add photo</Text>} */}

                  </Pressable>
                     
              </Block>
               <View>
            {msg ?
              <Text style={{color:"red",textAlign:"center", marginTop:15, fontSize:18}}>Please Fill al feilds and select image!</Text>
              :null}
        </View>
               
   {/*------- Form ---------*/}
                <Block flex  center >
                  <ScrollView>
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
                      value={data.fname}
                      onChangeText={setFname}
                      onBlur =  {()=>validOne(1)}
                      />
          </View>

          <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Last Name</Text>
                     < TextInput
                     autoCorrect = {false}

                      style={[styles.smallInput, {borderColor: LnameError?"red":"black"}]}
                      placeholder="Grek"
                      value={data.lname}
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
                      keyboardType="number-pad"
                      inputMode="numeric"
                      style={[styles.smallInput, {borderColor: qIdError?"red":"black"}]}
                      placeholder="30101200033"
                      value={data.qId}
                      onChangeText={(value) => cheack(value,"id")}
                      onBlur = {()=>validOne(3)}
                      maxLength={11}
                      editable={false}

                      />
          </View>

         <View style={{width: width >500 ?"50%":"100%", marginLeft:width >500 ?15:0}}>
                    <Text style={styles.text}>Phone</Text>
                     < TextInput
                     autoCorrect = {false}
                      keyboardType="number-pad"
                       style={[styles.smallInput, {borderColor: phoneError?"red":"black"}]}
                      placeholder="66005500"
                      value={data.phone}
                      onChangeText={(value) => cheack(value,"phone")}
                      onBlur = {()=>validOne(4)}
                      maxLength={8}

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
                      value={data.email}
                      onChangeText={(value) => cheack(value,"email")}
                      onBlur = {()=>validOne(5)}

                      />
          </View>



        <View style={styles.con}>
              {/* Display the selected date */}
                <Text style={styles.text}>Date of Birth</Text>
                <Pressable style={styles.pickedDateContainer} onPress={showPicker}>
                  <Text style={styles.pickedDate}>{date.toDateString()}</Text>

                </Pressable>

           

             {/* The date picker */}
              {isPickerShow && (
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                    maximumDate={max}
                  />
                )}
                 {isPickerShow && (
                <View style={{ flexDirection:"row",justifyContent:"space-between", width:"70%",padding:5}}>  
                  <Pressable onPress={hidePicker}>
                    <Text style={{fontSize:18}}>Cancel</Text>
                  </Pressable>
                   <Pressable onPress={hidePicker}>
                    <Text style={{fontSize:18}}>Confirm</Text>
                  </Pressable>
                </View>
                 )}
          </View>

      </Block>
      
      {/*--------- Buttons ----------*/}

          
      <Block right width={width*0.84} style={{flexDirection:"row",borderWidth:0}} >
        
                <Button 
                      color="success" 
                      style={styles.createButton} 
                      onPress={()=>setEditModalVisible(true)}
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
              </ScrollView>
                </Block>

    <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
             <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>First Name</Text>
                     < TextInput
                      autoCorrect = {false}
                      style={[styles.smallInput, {borderColor: FnameError?"red":"black"}]}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      onBlur =  {()=>validOne(1)}
                      />
          </View>
             <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>First Name</Text>
                     < TextInput
                      autoCorrect = {false}
                      style={[styles.smallInput, {borderColor: FnameError?"red":"black"}]}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      onBlur =  {()=>validOne(1)}
                      />
          </View>
             <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>First Name</Text>
                     < TextInput
                      autoCorrect = {false}
                      style={[styles.smallInput, {borderColor: FnameError?"red":"black"}]}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      onBlur =  {()=>validOne(1)}
                      />
          </View>
             <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>First Name</Text>
                     < TextInput
                      autoCorrect = {false}
                      style={[styles.smallInput, {borderColor: FnameError?"red":"black"}]}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      onBlur =  {()=>validOne(1)}
                      />
          </View>
             <View style={{width: width >500 ?"50%":"100%", marginRight: width >500 ?5:0}}>
                    <Text style={styles.text}>First Name</Text>
                     < TextInput
                      autoCorrect = {false}
                      style={[styles.smallInput, {borderColor: FnameError?"red":"black"}]}
                      placeholder="Joe"
                      value={Fname}
                      onChangeText={setFname}
                      onBlur =  {()=>validOne(1)}
                      />
          </View>
            <Pressable
              color={theme.COLORS.PRIMARY}
              style={[styles.button]}
              onPress={()=>setEditModalVisible(false)}
            >
              <Text style={{ color: "white", alignSelf: "center" }}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
              </Block>
            </Block>
          </Block>
      </Block>
    );
  
}

const styles = StyleSheet.create({


   topl:{
    width:width*.97,
    padding:"2%",
    flexDirection:'row',
    justifyContent:"space-between",
    backgroundColor:"#8C02FE",
    marginTop:"3%"
  },
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
    //backgroundColor: "#F4F5F7",
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
    marginBottom: 20,

  },
   cancelButton: {
    width: width * 0.2,
    marginBottom: 20,
  backgroundColor: theme.COLORS.MUTED    
  },
 
    imageContainer:{
      width:"100%",
      height:"20%",
      //borderWidth:2
    },
    box: {
    marginTop: 10,
    //backgroundColor: 'white',
    // alignItems: 'center',
    // shadowColor: 'black',
    // shadowOpacity: 0.3,
    // shadowOffset: {
    //   height: 1,
    //   width: -2,
    // },
    // elevation: 2,
    // paddingTop: 10,
    // paddingBottom:0
  },
  profileImage: {
    width: width*0.4,
    height: width*0.4,
    marginBottom: 0,
    borderRadius:"85%",
    borderWidth:0.3,
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   height: 2,
    //   width: -2,
    // },
    //elevation: 2,
  },
  profileImageEdit:{
    width: width*0.3,
    height: width*0.3,
    borderRadius:"85%",

  },
  
  name: {
    fontSize: 35,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#1E90FF',
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
    elevation: 2,
  },

    con: {
      // borderWidth:1,
      //height:"30%",
      width:"70%",
      borderRadius:10,
      paddingHorizontal:13,
      fontSize:20,
  },
  pickedDateContainer: {
    width:"76%",
    padding: 17,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth:0.3
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
   display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 170,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 2,
    width: 100,
    padding: 10,
    backgroundColor: "#5E72E4",

    alignSelf: "center",
  },
});

export default DriverProfile;
