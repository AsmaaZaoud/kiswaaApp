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
        <Button
          style={{ width: '50%', alignSelf: 'center' }}
        // onPress={() => navigation.navigate("Onboarding")}
        >
          DONATE NOW
        </Button>
        <Block flex>
            <Block flex row style={styles.request}>
            
            <Image
              style={{width: 70, height: 70, alignSelf: 'center'}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3531/3531766.png',
              }}
            />
            
            <Text style={{alignSelf: 'center'}}>Help this user get 3 M shirts</Text>
            
            
            </Block>

            <Block flex row style={styles.request}>
            
            <Image
              style={{width: 70, height: 70, alignSelf: 'center'}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/664/664466.png',
              }}
            />
            
            <Text style={{alignSelf: 'center'}}>Help this user get 2 L pants</Text>
            
            </Block>

            <Block flex row style={styles.request}>
            
            <Image
              style={{width: 70, height: 70, alignSelf: 'center'}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2347/2347446.png',
              }}
            />
            
            <Text style={{alignSelf: 'center'}}>Help this user get 3 XL t-shirts</Text>
            
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
    backgroundColor: '#301934'
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  request: {
    backgroundColor: '#DCD0FF',
    borderRadius: 20,
    height: 100,
    marginVertical: 10
  }
});

export default Home;
