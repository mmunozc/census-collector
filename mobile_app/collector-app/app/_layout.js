import React, { useState, useLayoutEffect } from "react";
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { messagingTitle, router } from "../components/chat/MessagingTitle";
import { View, Text } from "react-native";
import * as Localization from "expo-localization";


export const unstable_settings = {
  initialRouteName: 'login',
};

const translations = {
  "en-US": {
    login: "Login",
    chats: "Chats",
    directory: "Directory",
    forum: "Forum",
    replies: "replies",
    menu: "Main menu",
    journal: "Journal",
    profile: "Profile",
  },
  "es-ES": {
    login: "Inicio de sesión",
    chats: "Chats",
    directory: "Directorio",
    forum: "Foro",
    replies: "Respuestas",
    menu: "Menú principal",
    journal: "Bitácora",
    profile: "Perfil",
  },
};

const Layout = () => {
  const [mTitle, setMTitle] = useState("");
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

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
      <Stack.Screen name='login' options={{ title: t.login, headerStyle: { backgroundColor: "#CF5C36", }, headerTitleStyle: { color: "#050517", fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='chat' options={{ title: t.chats, headerStyle: { backgroundColor: "#CF5C36", }, headerTitleStyle: { color: "#050517", fontFamily: 'DMBold', }, }} />
    </Stack>
  );
};

export default Layout;