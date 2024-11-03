import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../api.js';
import image from '../assets/Koi Farm.jpg';

const TripListScreen = () => {
  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();

  const mockTrips = [
    {
      TripId: 1,
      Transportation: 'Bus',
      TripDate: '2024-11-05',
      Price: 150000,
      Duration: '2 hours',
      MeetingLocation: 'City Center',
      MaxParticipants: 30,
      MinParticipants: 5,
      SpecialInstructions: 'Bring water and snacks.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9QFatgDlIqaddiyJyF0gfkMybiMgvssODzw&s', 
    },
    {
      TripId: 2,
      Transportation: 'Train',
      TripDate: '2024-11-10',
      Price: 200000,
      Duration: '3 hours',
      MeetingLocation: 'Central Station',
      MaxParticipants: 50,
      MinParticipants: 10,
      SpecialInstructions: 'Arrive 30 minutes early.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9QFatgDlIqaddiyJyF0gfkMybiMgvssODzw&s', 
    },
    {
      TripId: 3,
      Transportation: 'Airplane',
      TripDate: '2024-11-15',
      Price: 500000,
      Duration: '1 hour',
      MeetingLocation: 'Airport',
      MaxParticipants: 100,
      MinParticipants: 20,
      SpecialInstructions: 'Check in online.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9QFatgDlIqaddiyJyF0gfkMybiMgvssODzw&s', 
    },
  ];

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await API.get('api/Trips');
        setTrips(response.data.Data); 
      } catch (error) {
        console.error('Error fetching trips:', error);
        Alert.alert('Error', 'Failed to load trips. Please try again later.');
      }
    };
    fetchTrips();
  }, []);
  

  const renderTrip = ({ item }) => {
    if (!item || !item.TripId) return null; 
    return (
      <TouchableOpacity
        style={styles.tripPanel}
        onPress={() => navigation.navigate('TripDetail', { trip: item })}
      >
        <View style={styles.overlay}>
          <Text style={styles.tripText}>{item.Transportation || 'N/A'}</Text>
          <Text style={styles.tripSubText}>Date: {item.TripDate || 'N/A'}</Text>
          <Text style={styles.tripSubText}>Price: {item.Price ? item.Price.toLocaleString() + ' VND' : 'N/A'}</Text>
          <Text style={styles.tripSubText}>Duration: {item.Duration ? item.Duration.trim() : 'N/A'}</Text>
          <Text style={styles.tripSubText}>Location: {item.MeetingLocation || 'N/A'}</Text>         
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Trips</Text>
      {trips.length === 0 ? (
        <Text style={{ color: 'white' }}>No trips available.</Text>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTrip}
          keyExtractor={(item) => item.TripId.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 17, 
    backgroundColor: '#bd9d9d', 
    flex: 1 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: 'black' 
  },
  tripPanel: { 
    marginBottom: 25, 
    borderRadius: 8, 
    overflow: 'hidden' 
  },
  overlay: { 
    padding: 10, 
    backgroundColor: '#fff', 
    justifyContent: 'center' 
  },
});

export default TripListScreen;
