import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import img from "../assets/Koi1.png";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import  API  from "../api";
 
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("vana@gmail.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email và mật khẩu không được để trống.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.post("/Authentication/Login", { email, password });
      if (response.status === 200) {
        const { Token, User } = response.data;
        Toast.show({ type: "success", text1: "Đăng nhập thành công" });
        console.log("User logged in:", User);
        login(User, Token);
        navigation.replace("Home");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Sai email hoặc mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={img} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Text style={styles.title}>SIGN IN</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                required
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button
                title={isLoading ? "Logging in..." : "Login"}
                onPress={handleSubmit}
                disabled={isLoading}
            />
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
            <Text style={styles.signupPrompt}>
                Don't have an account? 
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
            </Text>
        </View>
    </ImageBackground>
);
};


const styles = StyleSheet.create({
backgroundImage: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center", 
},
container: {
  justifyContent: "center",
  padding: 20,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: 10,
  elevation: 5, 
  width: "80%", 
},
title: {
  fontSize: 32,
  textAlign: "center",
  marginBottom: 20,
},
input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 5,
  padding: 10,
  marginBottom: 15,
  backgroundColor: "white",
},
error: {
  color: "red",
  marginBottom: 10,
},
forgotPassword: {
  color: "blue",
  textAlign: "center",
  marginTop: 10,
},
signupPrompt: {
  textAlign: "center",
  marginTop: 20,
},
signupLink: {
  color: "blue",
  textDecorationLine: "underline",
},
});
