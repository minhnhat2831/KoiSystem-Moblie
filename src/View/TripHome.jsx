import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import image from '../assets/Koi Farm.jpg';

const trips = [
  { id: 1, name: "Sunny Meadows", image },
  { id: 2, name: "Green Valley", image },
  { id: 3, name: "Misty Mountains", image },
  { id: 4, name: "Golden Fields", image },
];

const SunnyMeadows = 
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
  };

const TripPanel = ({ trip }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity style={styles.tripPanel} onPress={() => {}}>
      <Image source={trip.image} style={styles.tripImage} />
      <View style={styles.overlay}>
        <Text style={styles.tripText}>{trip.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TripHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Trips</Text>
      {trips.map((trip) => (
        <TripPanel key={trip.id} trip={trip} />
      ))}
      <TouchableOpacity onPress={() => navigation.navigate('TripList')}>
        <Text style={{ color: 'blue', fontSize: 16 }}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 17, 
    backgroundColor: '#bd9d9d', 
    bottom : 15 
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
  tripImage: { 
    width: '100%', 
    height: 200 
  },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  tripText: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
});

export default TripHome;
