import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import API from "../api"; 
import { useNavigation } from '@react-navigation/native';

const TripBooking = ({ route }) => {
  const { trip } = route.params; 
  const [bookingDetails, setBookingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    numberOfPeople: '',
    specialRequirements: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation('');

  const handleInputChange = (name, value) => {
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.post('/api/OrderTrips', {
        ...bookingDetails,
        tripId: trip.id, 
      });
      
      if (response.status === 200) {
        console.log('Booking successful:', response.data);
        navigation.navigate('BookSuccess'); 
      } else {
        setError('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError('Error submitting booking. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Trip</Text>
      <Text style={styles.tripDetails}>
        {`Trip: ${trip.Transportation}\nDate: ${trip.TripDate}\nPrice: ${trip.Price.toLocaleString()} VND`}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={bookingDetails.firstName}
        onChangeText={value => handleInputChange('firstName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={bookingDetails.lastName}
        onChangeText={value => handleInputChange('lastName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={bookingDetails.email}
        onChangeText={value => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={bookingDetails.phoneNumber}
        onChangeText={value => handleInputChange('phoneNumber', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of People"
        value={bookingDetails.numberOfPeople.toString()}
        onChangeText={value => handleInputChange('numberOfPeople', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Special Requirements"
        value={bookingDetails.specialRequirements}
        onChangeText={value => handleInputChange('specialRequirements', value)}
      />
      <Button title="Submit Booking" onPress={handleSubmit} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  tripDetails: { 
    fontSize: 18, 
    marginBottom: 16 
  },
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 8 
  },
});

export default TripBooking;
