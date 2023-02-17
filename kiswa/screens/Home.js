import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Block, theme, Text, Button } from 'galio-framework';

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card title='HELLO WORLD'></Card>
        </Block>
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
        <Button 
        style={{width: '100%'}}
        onPress={() => navigation.navigate("Onboarding")}>
          GO BACK
        </Button>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
