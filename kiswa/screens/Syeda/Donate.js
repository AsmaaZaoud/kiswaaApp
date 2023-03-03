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
        { label: "Abaya", value: "Abaya", uri: 'https://thumbs.dreamstime.com/b/%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-rgb-210879656.jpg' },
        { label: "Blouse", value: "Blouse", uri: 'https://cdn-icons-png.flaticon.com/512/8323/8323136.png' },
        { label: "Caftan", value: "Caftan", uri: 'https://cdn-icons-png.flaticon.com/512/5238/5238311.png' },
        { label: "Cardigan", value: "Cardigan", uri: 'https://cdn-icons-png.flaticon.com/128/3345/3345635.png' },
        { label: "Coat", value: "Coat", uri: 'https://cdn-icons-png.flaticon.com/128/7157/7157441.png' },
        { label: "Dress", value: "Dress", uri: 'https://cdn-icons-png.flaticon.com/128/9833/9833994.png' },
        { label: "Dungarees", value: "Dungarees", uri: 'https://cdn-icons-png.flaticon.com/128/2161/2161057.png' },
        { label: "Jacket", value: "Jacket", uri: 'https://cdn-icons-png.flaticon.com/128/2806/2806051.png' },
        { label: "Jeans", value: "Jeans", uri: 'https://cdn-icons-png.flaticon.com/128/599/599388.png' },
        { label: "Jumper", value: "Jumper", uri: 'https://cdn-icons-png.flaticon.com/128/9774/9774105.png' },
        { label: "Jumpsuit", value: "Jumpsuit", uri: 'https://cdn-icons-png.flaticon.com/128/2290/2290478.png' },
        { label: "Leggings", value: "Leggings", uri: 'https://cdn-icons-png.flaticon.com/128/9381/9381563.png' },
        { label: "Legwarmers", value: "Legwarmers", uri: 'https://cdn-icons-png.flaticon.com/128/8853/8853176.png' },
        { label: "Pants / Trousers", value: "Pants / Trousers", uri: 'https://cdn-icons-png.flaticon.com/128/2390/2390116.png' },
        { label: "Playsuit", value: "Playsuit", uri: 'https://cdn-icons-png.flaticon.com/128/122/122709.png' },
        { label: "Pajamas", value: "Pajamas", uri: 'https://cdn-icons-png.flaticon.com/128/4446/4446182.png' },
        { label: "Shawl", value: "Shawl", uri: 'https://cdn-icons-png.flaticon.com/128/2947/2947449.png' },
        { label: "Shirt", value: "Shirt", uri: 'https://cdn-icons-png.flaticon.com/128/2503/2503380.png' },
        { label: "Shoes", value: "Shoes", uri: 'https://cdn-icons-png.flaticon.com/128/5479/5479005.png' },
        { label: "Shorts", value: "Shorts", uri: 'https://cdn-icons-png.flaticon.com/128/2237/2237015.png' },
        { label: "Skirt", value: "Skirt", uri: 'https://cdn-icons-png.flaticon.com/512/4507/4507761.png' },
        { label: "Sock", value: "Sock", uri: 'https://cdn-icons-png.flaticon.com/128/843/843877.png' },
        { label: "Sweater", value: "Sweater", uri: 'https://cdn-icons-png.flaticon.com/128/9385/9385884.png' },
        { label: "Hoodie", value: "Hoodie", uri: 'https://cdn-icons-png.flaticon.com/128/9431/9431181.png' },
        { label: "Thawb", value: "Thawb", uri: 'https://globalsymbols.com/uploads/production/image/imagefile/7701/15_7701_8b682d28-a326-4b6a-a85f-67edf995d2d0.png' },
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

    // const [validDrop, setValidDrop] = useState('Select Clothing Item')
    const [dropError, setDropError] = useState('')

    const [amountError, setAmountError] = useState('')

    const [dateError, setDateError] = useState('')

    const [timeError, setTimeError] = useState('')

    const error = () => {
        if (cloth === '') {
            setDropError('Please select a clothing item')
            return
        }
        else {
            setDropError('')
        }
        if (amount === '') {
            setAmountError('Please enter amount')
            return
        }
        else {
            setAmountError('')
        }

        if (time === ''){
            setTimeError('Please select a time interval')
            return
        }
        else{
            setTimeError('')
        }
        if (date === ''){
            setDateError('Please select a date interval')
            return
        }
        else{
            setDateError('')
        }
        if (cloth !== '' && amount !== '' && time !== '' && date !== '' ) {
            navigation.navigate("CheckOut", { uri: ItemURI, type: cloth, amount: amount, time: time, date: date })
        }
    }

    //dates

    //todays date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // add 1 to get the correct month (0-indexed)
    const year = currentDate.getFullYear();

    // Format the date as a string
    const dateString = `${day}/${month}/${year}`;
    console.log('date string: ', dateString)

    const first2 = new Date();
    first2.setDate(currentDate.getDate() + 3);
    console.log('first2', first2)
    const first2day = first2.getDate();
    const first2month = first2.getMonth() + 1; // add 1 to get the correct month (0-indexed)
    const first2year = first2.getFullYear();
    const first2date = `${first2day}/${first2month}/${first2year}`;
    console.log('first2date: ', first2date)

    console.log('currentdate: ', currentDate)

    const sec1 = new Date();
    sec1.setDate(currentDate.getDate() + 4);
    const sec1day = sec1.getDate();
    const sec1month = sec1.getMonth() + 1;
    const sec1year = sec1.getFullYear();
    const sec1date = `${sec1day}/${sec1month}/${sec1year}`;
    console.log('sec1date: ', sec1date)

    const sec2 = new Date();
    sec2.setDate(currentDate.getDate() + 6);
    const sec2day = sec2.getDate();
    const sec2month = sec2.getMonth() + 1;
    const sec2year = sec2.getFullYear();
    const sec2date = `${sec2day}/${sec2month}/${sec2year}`;
    console.log('sec2date: ', sec2date)

    const third1 = new Date();
    third1.setDate(currentDate.getDate() + 7);
    const third1day = third1.getDate();
    const third1month = third1.getMonth() + 1;
    const third1year = third1.getFullYear();
    const third1date = `${third1day}/${third1month}/${third1year}`;
    console.log('third1date: ', third1date)

    const third2 = new Date();
    third2.setDate(currentDate.getDate() + 9);
    const third2day = third2.getDate();
    const third2month = third2.getMonth() + 1;
    const third2year = third2.getFullYear();
    const third2date = `${third2day}/${third2month}/${third2year}`;
    console.log('third2date: ', third2date)


    const [check1, setCheck1] = useState(0)
    const [check2, setCheck2] = useState(0)
    const [check3, setCheck3] = useState(0)

    const [date, setDate] = useState('')

    const checkColor1 = () => {
        setCheck1(1)
        setCheck2(0)
        setCheck3(0)
        setDate(`${dateString} - ${first2date}`)
    }

    const checkColor2 = () => {
        setCheck1(0)
        setCheck2(1)
        setCheck3(0)
        setDate(`${sec1date} - ${sec2date}`)
    }

    const checkColor3 = () => {
        setCheck1(0)
        setCheck2(0)
        setCheck3(1)
        setDate(`${third1date} - ${third2date}`)
    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
            <Block style={styles.container}>

                <Block style={{ marginTop: '15%' }}>
                </Block>
                <Text onPress={() => navigation.navigate("Home")} style={{ alignSelf: 'flex-start', marginLeft: '5%', fontSize: 20, color: 'purple' }}>Go Back</Text>

                <Block style={{ marginTop: '10%' }}>

                </Block>


                <Block row style={{ width: '100%' }}>
                    <Block left style={{ width: '30%' }}>
                        <Image
                            style={styles.Image}
                            source={{ uri: ItemURI == '' ? 'https://cdn-icons-png.flaticon.com/128/6834/6834320.png' : ItemURI }}
                        ></Image>
                    </Block>

                    <Block right style={{ width: '65%', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 15, color: 'red' }}>{dropError}</Text>
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

                        <Text style={{ fontSize: 15, color: 'red' }}>{amountError}</Text>
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

            <Text style={{ fontSize: 20, margin: 15 }}>Select which date and time interval for pick-up of donation:</Text>

            <Text style={{ fontSize: 15, color: 'red', marginLeft: 20 }}>{timeError}</Text>
            <Block style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
                <Button onPress={changeColor1} style={{ backgroundColor: flag1 === 0 ? 'purple' : 'green' }}>8AM - 12PM</Button>
                <Button onPress={changeColor2} style={{ backgroundColor: flag2 === 0 ? 'purple' : 'green' }}>12PM - 6PM</Button>
                <Button onPress={changeColor3} style={{ backgroundColor: flag3 === 0 ? 'purple' : 'green' }}>6PM - 10PM</Button>
            </Block>

            <Text style={{ fontSize: 15, color: 'red', marginLeft: 20 }}>{dateError}</Text>
            <Block style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
                <Button onPress={checkColor1} style={{ backgroundColor: check1 === 0 ? 'purple' : 'green' }}><Text style={{ color: 'white' }}>{dateString} - {first2date}</Text></Button>
                <Button onPress={checkColor2} style={{ backgroundColor: check2 === 0 ? 'purple' : 'green' }}><Text style={{ color: 'white' }}>{sec1date} - {sec2date}</Text></Button>
                <Button onPress={checkColor3} style={{ backgroundColor: check3 === 0 ? 'purple' : 'green' }}><Text style={{ color: 'white' }}>{third1date} - {third2date}</Text></Button>
            </Block>

            <Block style={{ alignItems: 'center', marginTop: 80 }}>
                <Button style={{ width: '80%' }} onPress={error}>DONATE</Button>
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