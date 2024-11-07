import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookingSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Successful!</Text>
      <Text style={styles.successMessage}>Your booking was successful. Thank you for choosing us!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default BookingSuccessScreen;
