import { Animated, Dimensions, Easing } from "react-native";
// header for screens
import { Header, Icon } from "../components";
import { argonTheme, tabs } from "../constants";

import Articles from "../screens/Articles";
import { Block } from "galio-framework";
// drawer
import CustomDrawerContent from "./Menu";
import Elements from "../screens/Elements";
// screens
import Home from "../screens/Syeda/Home";
import Onboarding from "../screens/Syeda/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import React from "react";
import Register from "../screens/Syeda/Register";

import Login from "../screens/Login";

// Fatima
import InventoryClerkHomePage from "../screens/Fatima/InventoryClerckHomePage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterFamily from "../screens/Meimouna/RegisterFamily";
import FamilyHome from "../screens/Meimouna/FamilyHome";
import FamilyRequest from "../screens/Meimouna/FamilyRequest";
//drivers && Admin
import Drivers from "../screens/Asmaa/Drivers";
import AdminHome from "../screens/Asmaa/AdminHome";
import DriverHome from "../screens/Asmaa/DriverHome";
import AddDriver from "../screens/Asmaa/AddDriver";
import AdminHomeCopy from "../screens/Asmaa/AdminHomeCopy";
import DriveProfile from "../screens/Asmaa/DriverProfile";
import Deliver from "../screens/Asmaa/Deliver";
import Pickup from "../screens/Asmaa/Pickup";
import DriverHistory from "../screens/Asmaa/DriverHistory";
import DriverDash from "../screens/Asmaa/DriverDash";
import FamiliesCards from "../screens/Asmaa/FamiliesCards";
import InventoryTable from "../screens/Asmaa/InventoryTable";
import DriverMap from "../screens/Asmaa/DriverMap";
import Feedback from "../screens/Asmaa/Feedback";
//invent
import InventoryClerks from "../screens/Asmaa/InventoryClerks";
import AddClerk from "../screens/Asmaa/AddClerk";
import Clerks from "../screens/Asmaa/Clerks";
import Inventory from "../screens/Asmaa/Inventory";

//Donor
import Donors from "../screens/Asmaa/Donors";

//Families
import Families from "../screens/Asmaa/Families";
import Dashboard from "../screens/Asmaa/Dashboard";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

//Syeda****** For later
// function Donors(props) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         mode: "card",
//         headerShown: false,
//       }}
//     >

//     </Stack.Navigator>
//   );
// }

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

// Fatima
function InventoryStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="InventoryClerkHomePage"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="InventoryClerkHomePage"
        component={InventoryClerkHomePage}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home Page" navigation={navigation} scene={scene} />
          ),
          //   cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}
function AdminStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home Page" navigation={navigation} scene={scene} />
          ),
          //   cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}
//Asmaa
function DriverStack(props) {
  return (
    <Stack.Navigator initialRouteName="DriverHome">
      <Stack.Screen name="Drivers" component={Drivers} />
      <Stack.Screen name="DriverHome" component={DriverHome} />

      <Stack.Screen
        name="AddDriver"
        component={AddDriver}
        options={{ title: "AddDriver" }}
      />
      <Stack.Screen name="Pickup" component={Pickup} />
      <Stack.Screen name="Deliver" component={Deliver} />
      <Stack.Screen name="DriveProfile" component={DriveProfile} />
    </Stack.Navigator>
  );
}

//Asmaa
// function AdminStack(props) {
//   return (
//     <Stack.Navigator
//       initialRouteName="AdminHome"
//       screenOptions={{
//         mode: "card",
//         headerShown: "screen",
//       }}
//     >
//       <Stack.Screen
//         name="AdminHome"
//         component={AdminHome}
//         option={{
//           title: "AdminHome",
//           headerStyle: {
//             backgroundColor: "darkblue",
//           },
//           headerTintColor: "white",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//         }}
//       />

//       <Stack.Screen name="InventoryClerks" component={InventoryClerks} />

//       <Stack.Screen
//         name="AddClerk"
//         component={AddClerk}
//         options={{ title: "AddClerk" }}
//       />

//       <Stack.Screen name="AdminHomeCopy" component={AdminHomeCopy} />

//       <Stack.Screen name="Donors" component={Donors} />
//       <Stack.Screen name="Families" component={Families} />
//       <Stack.Screen name="Clerks" component={Clerks} />
//       <Stack.Screen name="Inventory" component={Inventory} />
//     </Stack.Navigator>
//   );
// }
function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      {/* /********* Syeda**********/}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{ headerTransparent: true }}
      />
      <Stack.Screen name="App" component={AppStack} />
      {/* /********* Syeda**********/}
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen */}
      {/* /********* Fatima - Clerk **********/}
      <Stack.Screen
        name="InventoryClerkHomePage"
        component={InventoryClerkHomePage}
      />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      {/* /********* Asmaa - Admin **********/}
      {/* <Stack.Screen name="AdminHome" component={AdminHome} /> */}
      <Stack.Screen name="AddClerk" component={AddClerk} />
      <Stack.Screen name="Clerks" component={Clerks} />
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen name="FamiliesCards" component={FamiliesCards} />
      <Stack.Screen name="InventoryTable" component={InventoryTable} />
      {/* /********* Asmaa - Driver **********/}
      <Stack.Screen name="DriverHome" component={DriverHome} />
      <Stack.Screen name="AddDriver" component={AddDriver} />
      <Stack.Screen name="DriveProfile" component={DriveProfile} />
      <Stack.Screen name="Donors" component={Donors} />
      <Stack.Screen name="Families" component={Families} />
      <Stack.Screen name="DriverHistory" component={DriverHistory} />
      <Stack.Screen name="DriverDash" component={DriverDash} />
      <Stack.Screen name="DriverMap" component={DriverMap} />
      <Stack.Screen name="Feedback" component={Feedback} />

      {/* /*********  LogIn **********/}
      <Stack.Screen name="Login" component={Login} />
      {/* /*********  Meimouna - Family **********/}
      <Stack.Screen name="RegisterFamily" component={RegisterFamily} />
      <Stack.Screen name="FamilyHome" component={FamilyHome} />
      <Stack.Screen name="FamilyRequest" component={FamilyRequest} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      {/* Fatima */}
      <Drawer.Screen
        name="InventoryClerkHomePage"
        component={InventoryStack}
        // options={{
        //   headerShown: true,
        // }}
      />
      <Drawer.Screen
        name="DriverHome"
        component={DriverStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="AdminHome"
        component={AdminStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Elements"
        component={ElementsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
