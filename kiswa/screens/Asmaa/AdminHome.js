import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../../components';
import articles from '../../constants/articles';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';


const { width } = Dimensions.get('screen');

const AdminHome = ({navigation}) => {
  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
        <Card item={articles[4]}   />

             <Block flex row> 
             <Card item={articles[0]}   />

              <Card item={articles[3]}  />
             </Block>
         
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
         
          {/* <Card item={articles[4]} full /> */}
        </Block>
      </ScrollView>
    )
  }

 
    return (
        
      <Block flex center style={styles.home}>

        <HeaderRNE backgroundColor={theme.COLORS.DRIBBBLE}
      leftComponent={{
        icon: 'menu',
        color: '#fff',
      }}
      rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity >
              <Icon name="chat" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
             // onPress={playgroundNavigate}
            >
              <Icon type="antdesign" name="user" color="white" />
            </TouchableOpacity>
          </View>
      }
      centerComponent={{ text: 'Dashboard', style: styles.heading }}
    />

        {renderArticles()}
      </Block>
    );
  

}
const styles = StyleSheet.create({
  home: {
    width: width, 
    marginTop:50   
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  headerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
  marginBottom: 20,
  width: '100%',
  paddingVertical: 15,
},
heading: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
},
headerRight: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default AdminHome;
