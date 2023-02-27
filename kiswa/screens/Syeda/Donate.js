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
    ScrollView
} from "react-native";
import { Block, Checkbox, Text, theme, Button } from "galio-framework";
import { Dropdown } from "react-native-element-dropdown";

const Donate = ({ navigation }) => {

    const [ItemURI, setItemURI] = useState('')

    const changeCloth = (itemValue) => {
        console.log(itemValue)
        setCloth(itemValue)
        console.log('cloth: ', cloth)

        const selectedData = ClothTypeData.find((item) => item.value === itemValue);
        console.log('selectedData: ', selectedData)
        console.log('selectedDataURI: ', selectedData.uri)
        setItemURI(selectedData.uri)
    }



    useEffect(() => {
        console.log(cloth)
        console.log(amount)
    })

    //dropdown

    const [cloth, setCloth] = useState('');

    const ClothTypeData = [
        { label: "Blouse", value: "Blouse", uri: 'https://cdn-icons-png.flaticon.com/512/8323/8323136.png' },
        { label: "Bodysuit", value: "Bodysuit", uri: 'https://cdn-icons-png.flaticon.com/128/2160/2160788.png' },
        { label: "Caftan", value: "Caftan", uri: 'https://cdn-icons-png.flaticon.com/512/5238/5238311.png' },
        { label: "Cardigan", value: "Cardigan", uri: 'https://cdn-icons-png.flaticon.com/128/3345/3345635.png' },
        { label: "Cloak", value: "Cloak", uri: 'https://cdn-icons-png.flaticon.com/128/3244/3244511.png' },
        { label: "Coat", value: "Coat", uri: 'https://cdn-icons-png.flaticon.com/128/7157/7157441.png' },
        { label: "Dress", value: "Dress", uri: 'https://cdn-icons-png.flaticon.com/128/9833/9833994.png' },
        { label: "Dungarees", value: "Dungarees", uri: 'https://cdn-icons-png.flaticon.com/128/2161/2161057.png' },
        { label: "Jacket", value: "Jacket", uri: 'https://cdn-icons-png.flaticon.com/128/2806/2806051.png' },
        { label: "Jeans", value: "Jeans", uri: 'https://cdn-icons-png.flaticon.com/128/599/599388.png' },
        { label: "Jumper", value: "Jumper", uri: 'https://cdn-icons-png.flaticon.com/128/9774/9774105.png' },
        { label: "Jumpsuit", value: "Jumpsuit", uri: 'https://cdn-icons-png.flaticon.com/128/2290/2290478.png' },
        { label: "Leggings", value: "Leggings", uri: 'https://cdn-icons-png.flaticon.com/128/9381/9381563.png' },
        { label: "Legwarmers", value: "Legwarmers", uri: 'https://cdn-icons-png.flaticon.com/128/8853/8853176.png' },
        { label: "Leotard", value: "Leotard", uri: 'https://cdn-icons-png.flaticon.com/128/5267/5267222.png' },
        { label: "Pants / Trousers", value: "Pants / Trousers", uri: 'https://cdn-icons-png.flaticon.com/128/2390/2390116.png' },
        { label: "Playsuit", value: "Playsuit", uri: 'https://cdn-icons-png.flaticon.com/128/122/122709.png' },
        { label: "Poncho", value: "Poncho", uri: 'https://cdn-icons-png.flaticon.com/128/3983/3983281.png' },
        { label: "Pajamas", value: "Pajamas", uri: 'https://cdn-icons-png.flaticon.com/128/4446/4446182.png' },
        { label: "Sarong", value: "Sarong", uri: 'https://cdn-icons-png.flaticon.com/512/3055/3055273.png' },
        { label: "Shawl", value: "Shawl", uri: 'https://cdn-icons-png.flaticon.com/128/2947/2947449.png' },
        { label: "Shirt", value: "Shirt", uri: 'https://cdn-icons-png.flaticon.com/128/2503/2503380.png' },
        { label: "Shoes", value: "Shoes", uri: 'https://cdn-icons-png.flaticon.com/128/5479/5479005.png' },
        { label: "Shorts", value: "Shorts", uri: 'https://cdn-icons-png.flaticon.com/128/2237/2237015.png' },
        { label: "Skirt", value: "Skirt", uri: 'https://cdn-icons-png.flaticon.com/512/4507/4507761.png' },
        { label: "Sock", value: "Sock", uri: 'https://cdn-icons-png.flaticon.com/128/843/843877.png' },
        { label: "Sweater", value: "Sweater", uri: 'https://cdn-icons-png.flaticon.com/128/9385/9385884.png' },
        { label: "Hoodie", value: "Hoodie", uri: 'https://cdn-icons-png.flaticon.com/128/9431/9431181.png' },
        { label: "Tie", value: "Tie", uri: 'https://cdn-icons-png.flaticon.com/128/1950/1950558.png' },
        { label: "Tights", value: "Tights", uri: 'https://cdn-icons-png.flaticon.com/128/3343/3343878.png' },
        { label: "Tops", value: "Tops", uri: 'https://cdn-icons-png.flaticon.com/128/3258/3258170.png' },
        { label: "Tracksuit", value: "Tracksuit", uri: 'https://cdn-icons-png.flaticon.com/128/5783/5783203.png' },
        { label: "T-Shirt", value: "T-Shirt", uri: 'https://cdn-icons-png.flaticon.com/128/892/892458.png' },
        { label: "Waistcoat", value: "Waistcoat", uri: 'https://cdn-icons-png.flaticon.com/128/4343/4343628.png' },
    ];

    //amount numeric text box

    const [amount, setAmount] = useState('');

    const handleNumberChange = (text) => {
        if (/^\d+$/.test(text) || text === '') {
            setAmount(text);
        }
    };

    //time intervals

    const [time, setTime] = useState('')

    const [flag1, setFlag1] = useState(0)
    const [flag2, setFlag2] = useState(0)
    const [flag3, setFlag3] = useState(0)

    const changeColor1 = () => {
        setFlag1(1)
        setFlag2(0)
        setFlag3(0)
        setTime('8AM - 12PM')
    }

    const changeColor2 = () => {
        setFlag1(0)
        setFlag2(1)
        setFlag3(0)
        setTime('12PM - 6PM')
    }

    const changeColor3 = () => {
        setFlag1(0)
        setFlag2(0)
        setFlag3(1)
        setTime('6PM - 10PM')
    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
            <Block style={styles.container}>

                <Block style={{ marginTop: '15%' }}>
                </Block>
                <Text onPress={() => navigation.navigate("Home")} style={{ alignSelf: 'flex-start', marginLeft: '5%', fontSize: 20, color: 'purple' }}>Go Back</Text>

                <Block style={{ marginTop: '15%' }}>

                </Block>


                <Block row style={{ width: '100%' }}>
                    <Block left style={{ width: '30%' }}>
                        <Image
                            style={styles.Image}
                            source={{ uri: ItemURI == '' ? 'https://cdn-icons-png.flaticon.com/128/6834/6834320.png' : ItemURI }}
                        ></Image>
                    </Block>

                    <Block right style={{ width: '65%', alignItems: 'flex-start' }}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={ClothTypeData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Clothing Item"
                            searchPlaceholder="Search..."
                            value={cloth}
                            onChange={(item) => {
                                changeCloth(item.value);
                            }}
                        />

                        <Text style={{ fontSize: 15 }}>Enter Amount: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            value={amount}
                            onChangeText={handleNumberChange}
                            keyboardType="numeric"
                        />
                    </Block>
                </Block>

                <Block style={{ borderWidth: 0.5, borderColor: 'black', margin: 10, width: '100%' }}></Block>

                {/* <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3161/3161837.png' }}
                ></Image> */}

            </Block>

            <Block style={{ margin: 20 }}></Block>

            <Text style={{ fontSize: 20, margin: 15 }}>Select which time interval for pick-up of donation:</Text>

            <Block style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
                <Button onPress={changeColor1} style={{ backgroundColor: flag1 === 0 ? 'purple' : 'green' }}>8AM - 12PM</Button>
                <Button onPress={changeColor2} style={{ backgroundColor: flag2 === 0 ? 'purple' : 'green' }}>12PM - 6PM</Button>
                <Button onPress={changeColor3} style={{ backgroundColor: flag3 === 0 ? 'purple' : 'green' }}>6PM - 10PM</Button>
            </Block>

            <Block style={{ alignItems: 'center', marginTop: 80 }}>
                <Button style={{width: '80%'}} onPress={() => navigation.navigate("CheckOut")}>DONATE</Button>
            </Block>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        width: "100%",
        alignSelf: "center",
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    Image: {
        width: 100,
        height: 100
    }
})

export default Donate;

// we dont inlcude size, condition, etc here
// just quantity and type