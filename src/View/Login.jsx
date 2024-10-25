import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ImageBackground } from "react-native";
import axios from "axios";
import img from "../assets/Koi1.png"; // Hình nền

const Login = () => {
  const [email, setEmail] = useState("vana@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.234:7043/Login",
        {
          email,
          password,
        }
      );
      Alert.alert("Login Successful", "You are logged in!");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "An error occurred during login.");
      } else {
        setError("An unexpected error occurred.");
      }
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
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <Text style={styles.signupPrompt}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
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

export default Login;
