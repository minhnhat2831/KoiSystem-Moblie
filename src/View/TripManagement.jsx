import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import API from "../api";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const TripManagementScreen = () => {
  const [tripList, setTripList] = useState([]);
  const navigation = useNavigation();

  const fetchTripList = async () => {
    try {
      const response = await API.get(`/api/Trips`);
      setTripList(response.data.Data || []);
      console.log("Fetched trip list:", response.data.Data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch trip list.");
    }
  };

  const handleDeleteTrip = async (id) => {
    try {
      await API.delete(`/api/Trips/${id}`);
      setTripList(tripList.filter((trip) => trip.TripId !== id));
      Toast.show({ type: "success", text1: "Trip deleted successfully" });
    } catch (error) {
      Alert.alert("Error", "Failed to delete trip.");
    }
  };

  useEffect(() => {
    fetchTripList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Trips</Text>
      <Button title="Add Trip" onPress={() => navigation.navigate("AddTrip")} />
      <FlatList
        data={tripList}
        keyExtractor={(item) => item.TripId.toString()}
        renderItem={({ item }) => (
          <View style={styles.tripItem}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{item.MeetingLocation || "N/A"}</Text>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{item.TripDate || "N/A"}</Text>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{item.Duration || "N/A"}</Text>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{item.Price ? `${item.Price} VND` : "N/A"}</Text>
            <Text style={styles.label}>Transportation:</Text>
            <Text style={styles.value}>{item.Transportation || "N/A"}</Text>
            <Button title="Edit" onPress={() => navigation.navigate("EditTrip", { trip: item.TripId })} />
            <Button title="Delete" onPress={() => handleDeleteTrip(item.TripId)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  tripItem: { 
    marginBottom: 15, 
    padding: 15, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 16, marginBottom: 5 }
});

export default TripManagementScreen;
