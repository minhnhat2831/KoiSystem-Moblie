import React, { useState } from "react";
import { KeyboardAvoidingView, View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ImageBackground, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import img from "../assets/Koi1.png"; 
import API from "../api";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation('');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); 
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    if (!email || !username || !fullName || !phone || !password || !address) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.post("/Authentication/Register", {
        email,
        password,
        username,
        fullName,
        PhoneNumber: phone,    
        address,
        dob: dob.toISOString().split("T")[0], 
        IsActive: true,      
        IsVerified: true,
      });
      if (response.status === 200) {
        Toast.show({ type: "success", text1: "Đăng kí thành công" });
        setError(""); 
        resetForm();
        nav.navigate("Login");
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Xảy ra lỗi khi đăng kí");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setFullName("");
    setPhone("");
    setPassword("");
    setAddress("");
    setDob(new Date());
  };

  return (
    <ScrollView>
    <ImageBackground source={img} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />    
        
        {/* Date of Birth Field */}
        <Text style={styles.label}>Date of Birth</Text>
        <Button title={dob.toDateString()} onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()} 
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />   

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button 
          title={isLoading ? "Registering..." : "Sign Up"}
          onPress={handleSubmit}
          disabled={isLoading}
        />
        <Text style={styles.signupPrompt}>
          Already have an account? 
          <TouchableOpacity onPress={() => nav.navigate("Login")}>
              <Text style={styles.signupLink}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
    </ScrollView>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    right : 75,
  },
  error: {
    color: "red",
    marginBottom: 10,
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

export default Register;
