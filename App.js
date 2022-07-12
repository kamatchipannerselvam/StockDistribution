import React from 'react';  //1. import `NativeBaseProvider` component
import { StatusBar, IconButton, Image, Icon, MaterialIcons, ScrollView, NativeBaseProvider, Heading, View, Text, Box, VStack, Center, Skeleton, HStack } from 'native-base';
import { useMediaQuery } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
enableScreens(false);
//header
import HeaderBar from "./Components/header";
//buttongroup
//import Navbuttons from "./Components/navbutton";
import Screens from "./Screen/DrawerScreen";
//import Screens from "./Screen/Screen";
//header gradient color
const config = {
  dependencies: {
    "linear-gradient": require("react-native-linear-gradient").default,
  },
};

export default function App() { // 2. Use at the root of your app
  return (
    <NativeBaseProvider config={config}>
      <HeaderBar />
          <NavigationContainer>
          <Screens />
          </NavigationContainer>
    </NativeBaseProvider>
  );
}