import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import { useAuth } from '../context/AuthContext';
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const KoiManagementScreen = () => {
  const [koiList, setKoiList] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user || (user.RoleId !== 3 && user.RoleId !== 4)) { 
      navigation.replace("Unauthorized");
    }
  }, [user, navigation]);

  useEffect(() => {
    fetchKoiList();
  }, []);

  const fetchKoiList = async () => {
    try {
      const response = await API.get(`/api/KoiFish`);
      setKoiList(response.data.Data || []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch Koi list.");
    }
  };

  const handleEditKoi = (koi) => {
    navigation.navigate("EditKoi", { koi });
  };

  const handleDeleteKoi = async (id) => {
    try {
      await API.delete(`/api/KoiFish/${id}`);
      setKoiList(koiList.filter((koi) => koi.id !== id));
      Toast.show({ type: "success", text1: "Koi deleted successfully" });
    } catch (error) {
      Alert.alert("Error", "Failed to delete Koi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Koi Fish</Text>
      <Button title="Add Koi" onPress={() => navigation.navigate("AddKoi")} />
      <FlatList
        data={koiList}
        keyExtractor={(item) => item.KoiFishId.toString()}
        renderItem={({ item }) => (
          <View style={styles.koiItem}>
            <Text>Color: {item.color || "N/A"}</Text>
            <Text>Weight: {item.weight ? `${item.weight} kg` : "N/A"}</Text>
            <Text>Length: {item.length ? `${item.length} cm` : "N/A"}</Text>
            <Text>Price: {item.price ? `$${item.price}` : "N/A"}</Text>
            <Text>Date Added: {item.DateAdded || "N/A"}</Text>
            <Text>Notes: {item.Notes || "No notes"}</Text>
            <Text>Supplier: {item.Supplier || "Unknown"}</Text>
            <Text>Gender: {item.Gender || "Unknown"}</Text>
            <Button title="Edit" onPress={() => handleEditKoi(item)} />
            <Button title="Delete" onPress={() => handleDeleteKoi(item.KoiFishId)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  koiItem: { 
    marginBottom: 10, 
    padding: 10, 
    borderColor: "#ddd", 
    borderWidth: 1, 
    borderRadius: 5 
  },
});

export default KoiManagementScreen;
