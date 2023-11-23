import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import ChatComponent from "../components/chat/ChatComponent";
import DwellingComponent from "../components/DwellingComponent";
import { styles } from "../utils/styles";
import Menu from "../components/Menu/Menu";
import { getData, fetchDataAndStoreLocally } from "../database/localdatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constantes from "../constants";

const translations = {
  "en-US": {
    search: "Search",
    searchPlaceholder: "Search",
    noChats: "No chats created!",
  },
  "es-ES": {
    search: "Buscar",
    searchPlaceholder: "Buscar",
    noChats: "No hay chats creados!",
  },
};

const List = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const chatIdentifiers = [];
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  useLayoutEffect(() => {
    const values = async () => {
      const u = await AsyncStorage.getItem("username");
      setUser(u);
      //console.log("user list", u);
      getDwellings(u);
    };
    values();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getDwellings(user);
  //   }, 500);
  //   return () => clearInterval(intervalId);
  // }, []);

  const handleCreateGroup = () => router.push("/directory");

  async function getDwellings(user) {
    //console.log("user list 2 ", user);
    if (user) {
      await fetchDataAndStoreLocally(user);
      const userData = await getData(user);
      const rawData = Object.values(userData);
      const keys = Object.keys(userData);
      const transformedData = rawData.map((item, index) => {
        return {
          ...item,
          CFN: keys[index],
        };
      });
      setData(transformedData);
      //console.log("rawData", transformedData);
    }
  }

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <DwellingComponent item={item} user={user} />}
            keyExtractor={() => Math.random().toString(36).substring(2)}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <ActivityIndicator size="large" color="#CF5C36" />
          </View>
        )}
      </View>
      <Menu />
    </SafeAreaView>
  );
};

export default List;
