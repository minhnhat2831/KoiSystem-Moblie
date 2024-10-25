import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import image from '../assets/Koi Farm.jpg';

const trips = [
  { id: 1, name: "Sunny Meadows", image },
  { id: 2, name: "Green Valley", image },
  { id: 3, name: "Misty Mountains", image },
  { id: 4, name: "Golden Fields", image },
];

const TripPanel = ({ trip, navigation }) => {
  return (
    <TouchableOpacity style={styles.tripPanel} onPress={() => navigation.navigate('TripDetail', { id: trip.id })}>
      <Image source={trip.image} style={styles.tripImage} />
      <View style={styles.overlay}>
        <Text style={styles.tripText}>{trip.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TripHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Trips</Text>
      {trips.map((trip) => (
        <TripPanel key={trip.id} trip={trip} navigation={navigation} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 17, backgroundColor: '#bd9d9d', bottom : 15 },
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
  tripImage: { 
    width: '100%', 
    height: 200 
  },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  tripText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});

export default TripHome;
