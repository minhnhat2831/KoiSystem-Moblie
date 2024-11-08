import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";

const EditKoi = ({ route, navigation }) => {
  const { koiId } = route.params; 
  const [koiData, setKoiData] = useState({ species: "", age: "", color: "", price: "" });

  const fetchKoiData = async () => {
    try {
      const response = await API.get(`/api/KoiFish/${koiId}`);
      setKoiData(response.data); 
    } catch (error) {
      Alert.alert("Error", "Failed to fetch koi data.");
    }
  };

  const handleUpdateKoi = async () => {
    try {
      await API.put(`/api/KoiFish/${koiId}`, koiData);
      Toast.show({ type: "success", text1: "Koi updated successfully" });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update koi.");
    }
  };

  useEffect(() => {
    fetchKoiData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Species"
        value={koiData.species}
        onChangeText={(text) => setKoiData({ ...koiData, species: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={koiData.age.toString()}
        onChangeText={(text) => setKoiData({ ...koiData, age: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Color"
        value={koiData.color}
        onChangeText={(text) => setKoiData({ ...koiData, color: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={koiData.price.toString()}
        onChangeText={(text) => setKoiData({ ...koiData, price: text })}
        style={styles.input}
      />
      <Button title="Update Koi" onPress={handleUpdateKoi} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    marginBottom: 15, 
    padding: 10, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    fontSize: 16 
  },
});

export default EditKoi;
