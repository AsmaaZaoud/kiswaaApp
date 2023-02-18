import { StyleSheet, View, Text, Dimensions, Image, Pressable , TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper';
import { Block, theme } from "galio-framework";


//FireBase
import { auth } from "../../config";
import { doc, query, getDocs, getDoc,addDoc ,collection} from "firebase/firestore";
import { db } from "../../config";

//argon
import { Images, argonTheme, articles } from "../../constants/";
import { Button, Card, Header } from "../../components"
import {Icon,AntDesign,FontAwesome,MaterialCommunityIcons} from "react-native-vector-icons"
import ArButton from "../../components/Button";
import { Dropdown } from 'react-native-element-dropdown';

const { width,height } = Dimensions.get('screen');

const  AdminHome = ({navigation}) => {

    useEffect(() => {
    readAllWhere();
  }, []);
    const navbar = [
       { name:"Dashboard", color:"#b1d8f0", icon: require('../../assets/imgs/Dashboard.png') }, 
       {name: "Drivers",color:"#e0fadc", icon:require('../../assets/imgs/Drivers.png')}, 
       {name: "Inventory",color:"#f9dbf3", icon:require('../../assets/imgs/Inventory.png')}, 
        {name:"Donors", color:"#e1ddf0", icon:require('../../assets/imgs/Donors.png')},
        {name: "Families",color:"#faf5dc", icon:require('../../assets/imgs/Families.png')},
        {name:"Clerk",color:"#f7e2c6", icon:require('../../assets/imgs/Clerk.png')}
    ]
    const [color, setColor ] = useState("#b1d8f0")
    const [page, setPage ] = useState("Dashboard")
    const slect = (col,name) =>{
        setColor(col)
        setPage(name)

    }

    const [drivers, setDrivers] = useState([]);
    const [allDrivers, setAllDrivers] = useState([]);
    
    const readAllWhere = async () => {
        let temp = [];
        const q = query(collection(db, "drivers"));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
            temp.push(doc.data());
        });
        setDrivers(temp);
        setAllDrivers(temp)
  };
    
   const [zone, setZone] = useState("Assign");
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
  return (
    <View >
        <View style={styles.top}>
            <Text>Logo</Text>
            <MaterialCommunityIcons name="logout" size={40} />

        </View>
    <View style={{flexDirection:"row"}}>
        <View style={styles.nav}>
              {navbar.map((x)=>
                    <Pressable key={x.name} style={[styles.n, {backgroundColor:x.color == color? color:"white"}]} onPress={()=>slect(x.color,x.name)}>
                       <Image source={x.icon} style={{width:40,height:40}}/>
                        <View style={{marginLeft:15}}>
                             <Text style={styles.name}>{x.name}</Text>
                        </View>
                    </Pressable>
              )}
        </View>


        <View style={{backgroundColor:color, width:width*0.75}}>
            {/* <Text style={{fontSize:30, padding:10}}>{page}</Text> */}



        <DataTable>
            <Block style={styles.head}>
                <View style={{flexDirection:"row"}}> 
                    <FontAwesome name="user" size={40}/> 
                    <Text style={styles.title}>Drivers</Text>
                </View>
            

                        <Button color="success"  style={{width:"20%"}} onPress={()=>navigation.navigate("AddClerk")}>Add </Button>    

            </Block>

                <DataTable.Header style={{borderWidth:1, borderColor:"black", width:"90%",marginLeft:15, backgroundColor:"white"}}>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title >Phone</DataTable.Title>
                <DataTable.Title >Zone</DataTable.Title>
                <DataTable.Title >Delete</DataTable.Title>



                </DataTable.Header>
                {drivers && drivers.map((x)=>
                    <DataTable.Row key={x.email} style={{width:"90%",borderWidth:1, marginLeft:15, backgroundColor:"white"}}>
                        <DataTable.Cell>{x.fname}</DataTable.Cell>
                        <DataTable.Cell >{x.phone}</DataTable.Cell>
                        <DataTable.Cell >
                              <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={zones}
                                labelField="label"
                                valueField="value"
                                ///maxHeight={200}
                                id="value"
                                search
                                searchPlaceholder="Search..."
                                animated={false}
                                value={zone}
                                placeholder={"Zone"}
                                onChange={(item) => {
                                    setZone(item.value);
                                }}
                                />
                            </DataTable.Cell>
                        <DataTable.Cell ><Button color="warning" style={{width:"120%"}}>Delete </Button> </DataTable.Cell>

                    </DataTable.Row>
                )}

        </DataTable>
       
        </View>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  top:{
    borderWidth:1,
    padding:10,
    flexDirection:'row',
    justifyContent:"space-between"
  },
    nav: {
    width: width *0.25, 
    height: height, 
    backgroundColor:"white" 
  },
  n:{
    flexDirection:'row',
    height: 70,
    padding:5,
    alignItems:"center"
  },
  name:{
    fontSize:20,
  },
  head:{
    flexDirection:"row",
    padding:5,
    marginTop:30,
    width:"90%",
    marginLeft:20,
    alignItems:"center",
    // borderWidth:2,
    justifyContent:"space-between"
  },
  title:{
    fontSize:28,
    marginLeft:10,
    paddingTop:5
    //textAlign:"left"
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
    width:'45%',

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
  dropdown: {
    margin: "2%",
    height: "10%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: "1.2%",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
})

export default AdminHome
