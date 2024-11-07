import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import API from "../api"; 
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const [token, setToken] = useState(""); // Trường token
  const [newPassword, setNewPassword] = useState(""); // Trường mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Trường xác nhận mật khẩu mới
  const [isLoading, setIsLoading] = useState(false); // Để hiển thị loading
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!token || !newPassword || !confirmPassword) {
      Toast.show({ type: "error", text1: "Please fill all fields" });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      // Gửi yêu cầu reset mật khẩu với token và mật khẩu mới
      const response = await API.post("/Authentication/reset-password", {
        token,
        newPassword,
      });

      if (response.status === 200) {
        Toast.show({ type: "success", text1: "Password reset successfully" });
        navigation.navigate("Login"); // Sau khi reset thành công, chuyển đến trang đăng nhập
      } else {
        Toast.show({ type: "error", text1: "Failed to reset password. Please try again." });
      }
    } catch (err) {
      Toast.show({ type: "error", text1: err.response?.data?.message || "Failed to reset password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter the token from your email"
        value={token}
        onChangeText={setToken}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title={isLoading ? "Resetting..." : "Reset Password"}
        onPress={handleResetPassword}
        disabled={isLoading}
      />
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

export default ResetPassword;
