import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Avatar } from "@rneui/themed";
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from "react-native-vector-icons";
import { Button } from "../../components";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const  DriveProfile = ({navigation}) => {

   const [data, setData] = useState({});
  const icons = [
    {
      id: 1,
      icon: "heart-sharp",
      title: "Favorite",
      color: "#deaaf7",
      page: "Favorite",
    },
    {
      id: 2,
      icon: "notifications",
      title: "Notifications",
      color: "#b442e9",
      page: "AllNotifications",
    },
    {
      id: 3,
      icon: "chatbubbles",
      title: "Chats",
      color: "#e6b8fc",
      page: "Chat",
    },
    {
      id: 4,
      icon: "log-out",
      title: "Log Out",
      color: "#9c27e0",
      page: "StartScreen",
    },
  ];
    return (
      <Block flex style={styles.profile}>
        <View style={styles.topl}>
            <Text>Logo</Text>
              <MaterialCommunityIcons name="logout" size={40} />
        </View>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
              
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      Jessica Jones, 27
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      San Francisco, USA
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>

                    <View style={styles.body}>
          {/* <Text style={styles.username}>{data.name}</Text> */}

        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={icons}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              // <View style={{backgroundColor:'green',marginTop:'13%'}}>
              <TouchableOpacity>
                <View style={styles.box}>
                  <Ionicons
                    style={styles.icon}
                    name={item.icon}
                    size={40}
                    color={item.color}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                  <Image
                    style={styles.btn}
                    source={{
                      uri: "https://img.icons8.com/customer/office/40",
                    }}
                  />
                  <MaterialIcons
                    style={styles.icon}
                    name="keyboard-arrow-right"
                    size={30}
                    color="grey"
                    //onPress={() => navigation.navigate(item.page)}
                  />
                </View>
              </TouchableOpacity>
              // </View>
            );
          }}
        />
      </View>
                 
                  
                 
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
        
            
          
          
            
                
              
      </Block>
                 
    )};



const styles = StyleSheet.create({
  topl:{
    width:width*.8,
    margin:30,
    //borderWidth:1,
    //padding:10,
    flexDirection:'row',
    justifyContent:"space-between"
  },
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
   body: {
    zIndex:1,
    elevation: 1,
    //position: "absolute",
    backgroundColor: "white",
    //marginTop: ,
    borderColor: "lightpink",
   // borderRadius: 50,
    //borderWidth: 3,
   // height: "80%",
    paddingTop: '2%',
    
  },
  box: {
    padding: 5,
    marginBottom: 2,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 1,
  },
  username: {
    color: "grey",
    fontSize: 22,
    alignSelf: "center",
    //marginLeft: 10,
  },
   badge:{
    width:38,
    height:38, 
    borderRadius:20, 
    justifyContent:"center",
     backgroundColor:"#FF6347", 
     padding:10
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 16,
    //color: "#EE82EE",
    marginLeft: 16,
    marginTop:5
  },
  btn: {
    marginLeft: "auto",
    width: 40,
    height: 40,
  },

});

export default DriveProfile;
