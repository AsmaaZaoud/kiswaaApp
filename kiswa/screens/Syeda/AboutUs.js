import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Animated } from 'react-native';

const AboutUs = ({ route, navigation }) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, 200],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Text style={styles.title}>Welcome to React Native!</Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, 400],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://reactnative.dev/docs/assets/p_cat2.png',
              }}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, 600],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Text style={styles.text}>
              Edit App.js to change this screen and turn it
              into your app.
            </Text>
          </Animated.View>

          {/* Add more content here */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutUs;