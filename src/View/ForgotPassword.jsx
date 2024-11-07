import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import API from "../api"; 
import icon from "../assets/forgotPass.png";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const nav = useNavigation('');

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Please enter a valid email" });
      return;
    }
  
    setIsLoading(true); 
    try {
      const response = await API.post("/Authentication/forgot-password", { email });
  
      if (response && response.status === 200 && response.data) {
        Toast.show({ type: "success", text1: "A reset link has been sent to your email." });
        nav.navigate("ResetPassword");
      } else {
        Toast.show({ type: "error", text1: "Failed to send reset email. Please try again." });
      }
    } catch (err) {
      console.error(err); 
      if (axios.isAxiosError(err) && err.response) {
        Toast.show({ type: "error", text1: err.response.data.message || "Failed to send reset email. Please try again." });
      } else {
        Toast.show({ type: "error", text1: "Failed to send reset email. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit" onPress={handleForgotPassword} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default ForgotPassword;
