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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    StartConection();
  }, []);

  const storeUsername = async (user) => {
    try {
      await AsyncStorage.setItem("username", user);
      router.push("/list");
    } catch (e) {
      console.error("Error al guardar el usuario");
    }
  };

  const handleSignIn = async () => {
    if (await ValidateUser(username, password)) {
      //console.log("user", username);
      setError("");
      storeUsername(username);
    } else {
      setError("Usuario o contraseña equivocados"); // Set error message
    }
  };

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
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={24} color="#ccc" style={styles.icon} />
            <TextInput
              autoCorrect={false}
              secureTextEntry={true} // Password input
              placeholder={t.passwordPlaceholder}
              style={styles.logininput}
              onChangeText={(value) => setPassword(value)}
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
