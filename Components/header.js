import React, {useState} from "react";
import { StatusBar, IconButton, Image, Icon, MaterialIcons, ScrollView, NativeBaseProvider, Heading, View, Text, Box, VStack, Center, Skeleton, HStack } from 'native-base';
import { useMediaQuery } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

function AppBar() {
  const [isLandScape, isPortrait] = useMediaQuery([{
    orientation: "landscape"
  }, {
    orientation: "portrait"
  }]);
  return <>
    {isPortrait && 
      <HStack w="100%" bg={{
        linearGradient: {
          colors: ["darkBlue.800", "darkBlue.500"],
          start: [0, 1],
          end: [1, 0],
        },
      }} h="10%" maxW="400" borderWidth="1" space={8}>
        <HStack alignItems="center">
          <Image source={ require('../image/cwms.png') } alt="Comtel Stocks" resizeMode="center" />
        </HStack>
      </HStack>}
      {isLandScape && 
        <HStack w="100%" bg={{
        linearGradient: {
          colors: ["darkBlue.800", "darkBlue.500"],
          start: [0, 1],
          end: [1, 0],
        },
      }} h="15%" maxW="800" borderWidth="1" space={8}>
        <HStack alignItems="center">
          <Image source={ require('../image/cwms.png') } alt="Comtel Stocks" resizeMode="center"/>
        </HStack>
        </HStack>}
    </>;
}

export default AppBar;