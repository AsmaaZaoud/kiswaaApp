import React, { useState, useEffect } from "react";

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
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config";

import {
    doc,
    setDoc,
    addDoc,
    collection,

    query,
    where,
    deleteDoc,
    updateDoc,
    deleteField,
    onSnapshot,
    getDocs,
    getDoc,
    Timestamp,


} from "firebase/firestore";
import { db } from "../../config";

import * as Location from "expo-location";

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

import { useIsFocused } from "@react-navigation/native";

const CheckOut = ({ route, navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
            <Block style={styles.container}>
            </Block>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})