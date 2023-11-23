import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import DwellingComponent from "../components/DwellingComponent";
import { styles } from "../utils/styles";
import { getData, fetchDataAndStoreLocally } from "../database/localdatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const List = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

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
    </SafeAreaView>
  );
};

export default List;
