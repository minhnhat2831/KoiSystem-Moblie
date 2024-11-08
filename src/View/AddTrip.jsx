import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";

const AddTripScreen = ({ navigation }) => {
  const [newTrip, setNewTrip] = useState({ location: '', date: '', description: '', transportation: '', Price : '' });

  const handleAddTrip = async () => {
    try {
      const response = await API.post("/api/Trips", newTrip);
      Toast.show({ type: "success", text1: "Trip added successfully" });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to add trip.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Location"
        value={newTrip.location}
        onChangeText={(text) => setNewTrip({ ...newTrip, location: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={newTrip.Price}
        onChangeText={(text) => setNewTrip({ ...newTrip, Price: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Date"
        value={newTrip.date}
        onChangeText={(text) => setNewTrip({ ...newTrip, date: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={newTrip.description}
        onChangeText={(text) => setNewTrip({ ...newTrip, description: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Transportation"
        value={newTrip.transportation}
        onChangeText={(text) => setNewTrip({ ...newTrip, transportation: text })}
        style={styles.input}
      />
      <Button title="Add Trip" onPress={handleAddTrip} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5",
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

export default AddTripScreen;
