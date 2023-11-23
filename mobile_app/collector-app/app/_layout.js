import React, { useState, useLayoutEffect } from "react";
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { messagingTitle, router } from "../components/chat/MessagingTitle";
import { View, Text } from "react-native";
import * as Localization from "expo-localization";


export const unstable_settings = {
  initialRouteName: 'login',
};

const Layout = () => {
  const [mTitle, setMTitle] = useState("");

  useLayoutEffect(() => {
    console.log("Router changed in Layout ", messagingTitle.value);
    setMTitle(messagingTitle.value);
  }, [messagingTitle.value, router])

  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName='login'>
      <Stack.Screen name='login' options={{ title: "Login", headerStyle: { backgroundColor: "#CF5C36", }, headerTitleStyle: { color: "#050517", fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='list' options={{ title: "Lista", headerStyle: { backgroundColor: "#CF5C36", }, headerTitleStyle: { color: "#050517", fontFamily: 'DMBold', }, }} />
    </Stack>
  );
};

export default Layout;
