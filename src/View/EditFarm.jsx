import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";

const EditFarmScreen = ({ route, navigation }) => {
  const { farmId } = route.params; 
  const [farmData, setFarmData] = useState({
    FarmName: "",
    Location: "",
    Description: "",
    AreaSize: "",
    OwnerName: "",
    Rating: "",
  });

  const fetchFarmData = async () => {
    try {
      const response = await API.get(`/api/Farms/${farmId}`);
      setFarmData(response.data); 
    } catch (error) {
      Alert.alert("Error", "Failed to fetch farm data.");
    }
  };

  const handleUpdateFarm = async () => {
    try {
      await API.put(`/api/Farms/${farmId}`, farmData); 
      Toast.show({ type: "success", text1: "Farm updated successfully" });
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Error", "Failed to update farm.");
    }
  };

  useEffect(() => {
    fetchFarmData(); 
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Farm Name"
        value={farmData.FarmName}
        onChangeText={(text) => setFarmData({ ...farmData, FarmName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={farmData.Location}
        onChangeText={(text) => setFarmData({ ...farmData, Location: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={farmData.Description}
        onChangeText={(text) => setFarmData({ ...farmData, Description: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Area Size"
        value={farmData.AreaSize}
        onChangeText={(text) => setFarmData({ ...farmData, AreaSize: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Owner Name"
        value={farmData.OwnerName}
        onChangeText={(text) => setFarmData({ ...farmData, OwnerName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Rating"
        value={farmData.Rating}
        onChangeText={(text) => setFarmData({ ...farmData, Rating: text })}
        style={styles.input}
      />
      <Button title="Update Farm" onPress={handleUpdateFarm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
});

export default EditFarmScreen;
