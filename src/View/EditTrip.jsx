import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";

const EditTrip = ({ route, navigation }) => {
  const { trip } = route.params; // Extract trip ID from route params
  const [tripData, setTripData] = useState({
    location: "",
    date: "",
    duration: "",
    price: "", // Initialize price as an empty string
    transportation: "",
  });

  // Fetch the trip data from API using the trip ID
  const fetchTripData = async () => {
    try {
      const response = await API.get(`/api/Trips/${trip}`);
      setTripData(response.data || {}); // Ensure to set the default empty object if response.data is undefined
    } catch (error) {
      Alert.alert("Error", "Failed to fetch trip data.");
    }
  };

  // Handle the update of trip data
  const handleUpdateTrip = async () => {
    try {
      await API.put(`/api/Trips/${trip}`, tripData);
      Toast.show({ type: "success", text1: "Trip updated successfully" });
      navigation.goBack(); // Navigate back to previous screen after successful update
    } catch (error) {
      Alert.alert("Error", "Failed to update trip.");
    }
  };

  useEffect(() => {
    fetchTripData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Location"
        value={tripData.location || ""} // Use fallback empty string if location is undefined
        onChangeText={(text) => setTripData({ ...tripData, location: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Date"
        value={tripData.date || ""} // Use fallback empty string if date is undefined
        onChangeText={(text) => setTripData({ ...tripData, date: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration"
        value={tripData.duration || ""} // Use fallback empty string if duration is undefined
        onChangeText={(text) => setTripData({ ...tripData, duration: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={tripData.price ? tripData.price.toString() : ""} // Ensure to handle undefined price
        onChangeText={(text) => setTripData({ ...tripData, price: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Transportation"
        value={tripData.transportation || ""} 
        onChangeText={(text) => setTripData({ ...tripData, transportation: text })}
        style={styles.input}
      />
      <Button title="Update Trip" onPress={handleUpdateTrip} color="#4CAF50" />
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

export default EditTrip;
