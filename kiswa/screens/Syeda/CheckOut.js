import React, { useState } from "react";

import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    TextInput,
    View,
    Platform,
    PixelRatio,
    Image
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config";

import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../config";

import * as Location from "expo-location";
import { Alert } from "react-native";

const { width, height } = Dimensions.get("screen");
const scale = width / 834;

export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const CheckOut = ({ route, navigation }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState("");

    const [signedIn, setSignedIn] = useState(false);
    const [flag, setflag] = useState(0);

    const [stat, setStat] = useState("denied");

    let user = auth?.currentUser?.email;

    console.log('user logged in: ', user)

    //store values in database in done function
    const done = () => {
        navigation.navigate("Thankyou")
    };


    const getLocation = () => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setStat(status);
            console.log("stat... ", stat);
            console.log(status);
            if (status !== "granted") {
                console.log("Please grant location permissions");
                Alert.alert("Please grant location permissions.")
                return;
            }
            else {

                console.log('permitted')
                Alert.alert("Your location has been recorded.")
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            console.log(currentLocation)
            setLocation(currentLocation);
        };
        getPermissions();
    };


    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };


    const validation = () => {

        if (!phone) {
            setPhoneError('Please enter a valid phone number that is 8 digits long')
            return;
        }
        else {
            setPhoneError('');
        }

        if (!email) {
            setEmailError('Please enter an email address');
            return;
        }
        else {
            setEmailError('');
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        else {
            setEmailError('');
        }

        if (stat !== "granted") {
            setLocationError("Please Allow Location");
        } else {
            setLocationError('');
        }

        if (
            phone &&
            email &&
            validateEmail &&
            stat === 'granted'
        ) {
            done()
        }
    };




    return (
        <Block flex middle>
            <ImageBackground
                source={Images.RegisterBackground}
                style={{ width, height, zIndex: 1 }}
            >

                <Block safe flex middle>
                    <Block style={styles.registerContainer}>
                        <ImageBackground
                            source={{ uri: 'https://img.freepik.com/free-photo/violet-watercolor-texture-background_1083-172.jpg' }}
                            resizeMode="cover"
                            style={{ flex: 1, justifyContent: 'center', }}
                        >
                            <Text style={{ padding: 20, color: 'blue' }} onPress={() => navigation.goBack()}>Go Back</Text>
                            <Text style={{ justifyContent: 'flex-start', alignSelf: 'center', fontSize: normalize(60), marginTop: 20 }}>Guest Checkout</Text>

                            <Block style={{ marginTop: '10%' }}></Block>

                            <Block style={{ marginLeft: '5%' }}>
                                <Text style={{ fontSize: normalize(40) }}>Donation Summary:</Text>
                                <Block row style={{marginTop: 20}}>
                                    <Block left>
                                        <Image
                                            style={{ width: 50, height: 50 }}
                                            source={{ uri: route.params.uri }}
                                        ></Image>
                                    </Block>
                                    <Block right>
                                        <Text>{route.params.type}</Text>
                                        <Text>X {route.params.amount}</Text>
                                    </Block>
                                </Block>
                            </Block>

                            <View style={styles.container}>

                                <Text style={styles.error}>{phoneError}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="numeric"
                                    maxLength={8}
                                />
                                <Text style={styles.error}>{emailError}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />


                                <Text
                                    style={styles.error}
                                >
                                    {locationError}
                                </Text>
                                <Block width={width * 0.35}>
                                    <Button
                                        color={stat !== "granted" ? "default" : "primary"}
                                        style={styles.createButton}
                                        onPress={getLocation}
                                    >
                                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                            Get Location
                                        </Text>
                                    </Button>

                                </Block>


                                <Block width={width * 0.35}>
                                    <Button
                                        style={styles.createButton}
                                        onPress={validation}
                                    >
                                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                            DONE
                                        </Text>
                                    </Button>
                                </Block>

                            </View>
                        </ImageBackground>
                    </Block>
                </Block>
            </ImageBackground>
        </Block>
    );
};



const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.875,
        backgroundColor: "#F4F5F7",
        borderRadius: 10,
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
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    input: {
        width: '80%',
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    error: {
        color: 'red',
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },
});

export default CheckOut;
