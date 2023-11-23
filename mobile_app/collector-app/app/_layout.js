import React, { useState, useLayoutEffect } from "react";
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { COLORS } from "../constants";


export const unstable_settings = {
  initialRouteName: 'login',
};

const Layout = () => {
  return (
    <Stack initialRouteName='login'>
      <Stack.Screen name='login' options={{ title: "Login", headerStyle: { backgroundColor: COLORS.tertiary, }, headerTitleStyle: { color: "#050517", fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='list' options={{ title: "Lista", headerStyle: { backgroundColor: COLORS.tertiary, }, headerTitleStyle: { color: "#050517", fontFamily: 'DMBold', }, }} />
    </Stack>
  );
};

export default Layout;
