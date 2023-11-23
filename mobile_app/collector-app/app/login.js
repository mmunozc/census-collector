import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Text,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ValidateUser, StartConection } from "../database/APIconection";


const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const storeUsername = async (user) => {
    try {
      await AsyncStorage.setItem("username", user);
      router.push("/list");
    } catch (e) {
      console.error("Error al guardar el usuario");
    }
  };

  const handleSignIn = async () => {
    if (await ValidateUser(username)) {
      //console.log("user", username);
      storeUsername(username);
    } else {
      setError("Código erroneo"); // Set error message
    }
  };

  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const user = await AsyncStorage.getItem("username");
        if (user !== null) {
          router.push("/list");
        }
      } catch (e) {
        console.error(t.errorLoadingUser);
      }
    };
    StartConection();
    //getUsername();
  }, []);

  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.loginBox}>
        <Image source={require("../logo.png")} style={styles.logo} />
        <Text style={styles.loginheading}>{"Iniciar sesión"}</Text>
        <View style={styles.logininputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={24} color="#ccc" style={styles.icon} />
            <TextInput
              autoCorrect={false}
              placeholder={"Código de zona"}
              style={styles.logininput}
              onChangeText={(value) => setUsername(value)}
            />
          </View>

          <Pressable onPress={handleSignIn} style={styles.loginbutton}>
            <View>
              <Text style={styles.loginbuttonText}>{"Entrar"}</Text>
            </View>
          </Pressable>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
