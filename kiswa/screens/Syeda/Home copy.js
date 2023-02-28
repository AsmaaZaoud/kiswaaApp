import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Block, theme, Text, Button } from 'galio-framework';

const { width } = Dimensions.get('screen');

const Home = ({ navigation }) => {
 const  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          <Text style={{alignSelf: 'center', fontSize: 20}}>Ready to Donate ?</Text>
        <Button
          style={{ width: '80%', alignSelf: 'center', borderRadius: 20 }}
          onPress={() => navigation.navigate("Donate")}
        >
          <Text style={{fontSize: 25, color: 'white'}}>DONATE  NOW</Text>
        </Button>

        <Block style={{margin: 20}}></Block>

        <Block flex>
            <Block flex row style={styles.request}>
            
            <Image
              style={{width: 70, height: 70, alignSelf: 'center', margin: 15}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2503/2503380.png',
              }}
            />
            
            <Text style={{alignSelf: 'center'}}>Help this user get 3 Medium Shirts</Text>
            
            
            </Block>

            <Block flex row style={styles.request}>
            
            <Image
              style={{width: 70, height: 70, alignSelf: 'center', margin: 15}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/776/776586.png',
              }}
            />
            
            <Text style={{alignSelf: 'center'}}>Help this user get 2 Large Pants</Text>
            
            </Block>

            <Block flex row style={styles.request}>
            
            <Image
              style={{width: 70, height: 70, alignSelf: 'center', margin: 15}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/892/892395.png',
              }}
            />
            
            <Text style={{alignSelf: 'center'}}>Help this user get 3 Xtra-Large T-Shirts</Text>
            
            </Block>
        </Block>
      </ScrollView>
    )
  }

  
    // const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        {renderArticles()}
        <Button
          style={{ width: '100%' }}
          onPress={() => navigation.navigate("Onboarding")}>
          GO BACK
        </Button>
      </Block>
    );
  
}

const styles = StyleSheet.create({
  home: {
    width: width,
    // backgroundColor: '#490066'
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  request: {
    backgroundColor: '#DCD0FF',
    borderRadius: 20,
    height: 100,
    marginVertical: 5
  }
});

export default Home;
