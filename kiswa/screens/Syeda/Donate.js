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

} from "react-native";
import { Block, Checkbox, Text, theme, Button } from "galio-framework";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Donate = ({ navigation }) => {

    let clothesArr = []

    useEffect(() => {
        console.log(cloth)
        console.log(amount)
    })

    //dropdown

    const [cloth, setCloth] = useState();

    const ClothTypeData = [
        { label: "Blouse", value: "Blouse", uri: 'https://cdn-icons-png.flaticon.com/512/8323/8323136.png' },
        { label: "Bodysuit", value: "Bodysuit", uri: 'https://cdn-icons-png.flaticon.com/128/2160/2160788.png'},
        { label: "Caftan", value: "Caftan", uri: 'https://cdn-icons-png.flaticon.com/512/5238/5238311.png' },
        { label: "Cardigan", value: "Cardigan", uri: 'https://cdn-icons-png.flaticon.com/128/3345/3345635.png' },
        { label: "Cloak", value: "Cloak", uri: 'https://cdn-icons-png.flaticon.com/128/3244/3244511.png'},
        { label: "Coat", value: "Coat", uri: 'https://cdn-icons-png.flaticon.com/128/7157/7157441.png' },
        { label: "Dress", value: "Dress", uri: 'https://cdn-icons-png.flaticon.com/128/9833/9833994.png'},
        { label: "Dungarees", value: "Dungarees", uri: 'https://cdn-icons-png.flaticon.com/128/2161/2161057.png'},
        { label: "Jacket", value: "Jacket", uri: 'https://cdn-icons-png.flaticon.com/128/2806/2806051.png' },
        { label: "Jeans", value: "Jeans", uri: 'https://cdn-icons-png.flaticon.com/128/599/599388.png' },
        { label: "Jumper", value: "Jumper", uri: 'https://cdn-icons-png.flaticon.com/128/9774/9774105.png' },
        { label: "Jumpsuit", value: "Jumpsuit", uri: 'https://cdn-icons-png.flaticon.com/128/2290/2290478.png'},
        { label: "Leggings", value: "Leggings", uri: 'https://cdn-icons-png.flaticon.com/128/9381/9381563.png'},
        { label: "Legwarmers", value: "Legwarmers", uri: 'https://cdn-icons-png.flaticon.com/128/8853/8853176.png' },
        { label: "Leotard", value: "Leotard", uri: 'https://cdn-icons-png.flaticon.com/128/5267/5267222.png' },
        { label: "Pants / Trousers", value: "Pants / Trousers", uri: 'https://cdn-icons-png.flaticon.com/128/2390/2390116.png' },
        { label: "Playsuit", value: "Playsuit", uri: 'https://cdn-icons-png.flaticon.com/128/122/122709.png' },
        { label: "Poncho", value: "Poncho", uri: 'https://cdn-icons-png.flaticon.com/128/3983/3983281.png' },
        { label: "Pajamas", value: "Pajamas", uri: 'https://cdn-icons-png.flaticon.com/128/4446/4446182.png'},
        { label: "Sarong", value: "Sarong", uri: 'https://cdn-icons-png.flaticon.com/512/3055/3055273.png' },
        { label: "Shawl", value: "Shawl", uri: 'https://cdn-icons-png.flaticon.com/128/2947/2947449.png'},
        { label: "Shirt", value: "Shirt", uri: 'https://cdn-icons-png.flaticon.com/128/2503/2503380.png' },
        { label: "Shoes", value: "Shoes", uri: 'https://cdn-icons-png.flaticon.com/128/5479/5479005.png' },
        { label: "Shorts", value: "Shorts", uri: 'https://cdn-icons-png.flaticon.com/128/2237/2237015.png' },
        { label: "Skirt", value: "Skirt", uri: 'https://cdn-icons-png.flaticon.com/512/4507/4507761.png' },
        { label: "Sock", value: "Sock", uri: 'https://cdn-icons-png.flaticon.com/128/843/843877.png'},
        { label: "Sweater", value: "Sweater", uri: 'https://cdn-icons-png.flaticon.com/128/9385/9385884.png'},
        { label: "Hoodie", value: "Hoodie", uri: 'https://cdn-icons-png.flaticon.com/128/9431/9431181.png' },
        { label: "Tie", value: "Tie", uri: 'https://cdn-icons-png.flaticon.com/128/1950/1950558.png'},
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

    return (
        <Block style={styles.container}>
            <Text>Donate page</Text>


            <Image
            style={styles.Image}
            // source={{uri: cloth}}
            ></Image>
       

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
                    setCloth(item.value);
                }}
            />

            <Text>Select Amount: </Text>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={handleNumberChange}
                keyboardType="numeric"
            />

            <Button
                style={{ width: '100%' }}
                onPress={() => navigation.navigate("Home")}>
                GO BACK
            </Button>
        </Block>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        width: "80%",
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





// import React, { useState } from 'react';
// import { View, Text, Picker } from 'react-native';

// const App = () => {
//   const [selectedValue, setSelectedValue] = useState('');
//   const data = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//     { id: 3, name: 'Bob' },
//   ];

//   const handleValueChange = (itemValue) => {
//     setSelectedValue(itemValue);
//   };

//   const selectedData = data.find((item) => item.name === selectedValue);

//   return (
//     <View>
//       <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
//         <Picker.Item label="Select a name" value="" />
//         {data.map((item) => (
//           <Picker.Item key={item.id} label={item.name} value={item.name} />
//         ))}
//       </Picker>
//       {selectedData ? (
//         <Text>{`Selected data: ${selectedData.id} - ${selectedData.name}`}</Text>
//       ) : (
//         <Text>Please select a name</Text>
//       )}
//     </View>
//   );
// };

// export default App;



// In this example, we use the Picker component to create a dropdown of names. We initialize the selectedValue state variable to an empty string, which represents the currently selected value in the dropdown. We also define an array of data objects, each with an id and a name property.

// We define a handleValueChange function that takes the selected value as an argument and updates the selectedValue state variable accordingly.

// We use the find array method to search for an object in the data array that has a name property equal to the currently selected value. We store the result in the selectedData variable.

// We then render a message that displays the id and name properties of the selected data, or a prompt to select a name if no data is currently selected.

// We pass the selectedValue state variable as the selectedValue prop of the Picker component, so it reflects the currently selected value. We also pass the handleValueChange function as the onValueChange prop, so it's called whenever the selected value changes.

// We use the map array method to render a Picker.Item component for each object in the data array, with the name property as the label and value.

// You can customize the data and rendering of the dropdown to suit your needs, and use different array methods to retrieve the corresponding value from the array.



