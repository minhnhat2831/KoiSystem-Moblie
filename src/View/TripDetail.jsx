import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';

const TripDetailScreen = ({ route }) => {
  const { trip } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{trip.Transportation} Trip</Text>
      <Text style={styles.detailText}>Date: {trip.TripDate}</Text>
      <Text style={styles.detailText}>Price: {trip.Price.toLocaleString()} VND</Text>
      <Text style={styles.detailText}>Duration: {trip.Duration}</Text>
      <Text style={styles.detailText}>Location: {trip.MeetingLocation}</Text>
      <Text style={styles.detailText}>Max Participants: {trip.MaxParticipants ?? 'N/A'}</Text>
      <Text style={styles.detailText}>Min Participants: {trip.MinParticipants ?? 'N/A'}</Text>
      <Text style={styles.detailText}>Special Instructions: {trip.SpecialInstructions}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Order" onPress={() => console.log('Order button pressed')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#bd9d9d' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10 
  },
  detailText: { 
    fontSize: 18, 
    color: '#555', 
    marginBottom: 8 
  },
  buttonContainer: { 
    marginTop: 20 
  },
});

export default TripDetailScreen;
