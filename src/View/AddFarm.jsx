import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";

const AddFarmScreen = ({ navigation }) => {
  const [newFarm, setNewFarm] = useState({ name: '', location: '', description: '' });

  const handleAddFarm = async () => {
    try {
      const response = await API.post("/api/Farm", newFarm);
      Toast.show({ type: "success", text1: "Farm added successfully" });
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Error", "Failed to add farm.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={newFarm.name}
        onChangeText={(text) => setNewFarm({ ...newFarm, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={newFarm.location}
        onChangeText={(text) => setNewFarm({ ...newFarm, location: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={newFarm.description}
        onChangeText={(text) => setNewFarm({ ...newFarm, description: text })}
        style={styles.input}
      />
      <Button title="Add Farm" onPress={handleAddFarm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8, borderRadius: 5 },
});

export default AddFarmScreen;
