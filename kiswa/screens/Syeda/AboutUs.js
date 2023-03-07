import React, { useEffect, useState } from "react";

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
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Block, Checkbox, Text, theme, Button } from "galio-framework";
import { Dropdown } from "react-native-element-dropdown";

const { width, height } = Dimensions.get('screen');
const scale = width / 428;
export function normalize(size) {

    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}


const AboutUs = ({ route, navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
            <Block style={styles.container}>
            <Text bold size={40} color="#32325D">Welcome to Kiswa!</Text>
            <Text style={{marginBottom: 20}}></Text>
                <Image
                style={styles.image}
                source={{uri: 'https://www.maxpixel.net/static/photo/2x/Green-Enormous-Aesthetic-Tree-Log-Leaves-4557948.jpg'}}
                ></Image>
                <Text bold size={30} color="#32325D">You help the environment!</Text>
                <Text size={15} style={{alignSelf: 'center', margin: 15}}>
                We collect clothes in any state of condition. Whether they be brand new or worn out, we accept them! 
                We send them to recycling and upcycling projects in Qatar, 
                that helps give new life to old clothes.
                The environmental consequences of this waste are devastating: Artificial fibres such as polyester take anywhere from 20 to 200 years to break down, which is extremely harmful to our environment.
                We at Kiswa, want to take an initiative towards reducing the carbon footprint and help save the environment, but, we can't do this without you!
                </Text>

                <Image
                style={styles.image}
                source={{uri: 'https://borgenproject.org/wp-content/uploads/Qatar-migrant-labour.jpg'}}
                ></Image>
                <Text bold size={30} color="#32325D">You help the people!</Text>
                <Text size={15} style={{alignSelf: 'center', margin: 15}}>
                    Whether it may be being able to give clothes to children, an outfit to a person, or even warm clothes during the chilly weather, 
                    you are helping so many people in Qatar that are deprived of necessary resources. We at Kiswa, want to take an initiative and help change the lives of people, but, we can't do this without you!
                </Text>
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
    image: {
        width: width * 0.9,
        height: height * 0.2,
        borderRadius: 20,
    }
})

export default AboutUs;