import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const FarmManagementScreen = () => {
  const [farmList, setFarmList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFarmList();
  }, []);

  const fetchFarmList = async () => {
    try {
      const response = await API.get("/api/Farms");
      setFarmList(response.data.Data); 
    } catch (error) {
      Alert.alert("Error", "Failed to fetch farm list.");
    }
  };

  const handleDeleteFarm = async (id) => {
    try {
      await API.delete(`/api/Farms/${id}`);
      setFarmList(farmList.filter((farm) => farm.FarmId !== id)); 
      Toast.show({ type: "success", text1: "Farm deleted successfully" }); 
    } catch (error) {
      Alert.alert("Error", "Failed to delete farm.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Farms</Text>
      <Button title="Add Farm" onPress={() => navigation.navigate("AddFarm")} />
      <FlatList
        data={farmList}
        keyExtractor={(item) => item.FarmId.toString()}
        renderItem={({ item }) => (
          <View style={styles.farmItem}>
            <Text>Name: {item.FarmName || "N/A"}</Text>
            <Text>Location: {item.Location || "N/A"}</Text>
            <Text>Description: {item.Description || "No description"}</Text>
            <Text>Size: {item.AreaSize || "N/A"} ha</Text>
            <Text>Owner: {item.OwnerName || "N/A"}</Text>
            <Text>Rating: {item.Rating || "N/A"}</Text>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("EditFarm", { farmId: item.FarmId })
              }
            />
            <Button title="Delete" onPress={() => handleDeleteFarm(item.FarmId)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  farmItem: {
    marginBottom: 15,
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
});

export default FarmManagementScreen;
