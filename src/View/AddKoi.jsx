import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";

const AddKoiScreen = ({ navigation }) => {
  const [newKoi, setNewKoi] = useState({ color: '', weight: '', length: '', price: '' });

  const handleAddKoi = async () => {
    try {
      const response = await API.post("/api/KoiFish", newKoi);
      Toast.show({ type: "success", text1: "Koi added successfully" });
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Error", "Failed to add Koi.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Color"
        value={newKoi.color}
        onChangeText={(text) => setNewKoi({ ...newKoi, color: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Weight"
        value={newKoi.weight}
        onChangeText={(text) => setNewKoi({ ...newKoi, weight: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Length"
        value={newKoi.length}
        onChangeText={(text) => setNewKoi({ ...newKoi, length: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={newKoi.price}
        onChangeText={(text) => setNewKoi({ ...newKoi, price: text })}
        style={styles.input}
      />
      <Button title="Add Koi" onPress={handleAddKoi} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8, borderRadius: 5 },
});

export default AddKoiScreen;
