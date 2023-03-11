import { registerRootComponent } from "expo";
import React, { useCallback, useEffect, useState } from "react";
// import { } from "react-native";
import { Image, Text, View, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
//
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

// disable warnings
import { LogBox } from "react-native";

// Ignore all log notifications:
LogBox.ignoreAllLogs();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
function App(props) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([...cacheImages(assetImages)]);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [appIsReady]);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
