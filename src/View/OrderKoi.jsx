import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';

const OrderFish = ({ route, navigation }) => {
  const { koi, quantity } = route.params || {};

  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState("VNPay");  

  const handleContactDetailsChange = (name, value) => {
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitOrder = () => {
    console.log('Order submitted:', { contactDetails, koi, quantity, paymentMethod });
    navigation.navigate('BookSuccess');
  };

  if (!koi) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Koi fish details are unavailable.</Text>
      </View>
    );
  }

  const totalPrice = koi.Price * quantity;  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Order Koi Fish</Text>

      {/* Contact Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={contactDetails.name}
          onChangeText={(text) => handleContactDetailsChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={contactDetails.email}
          onChangeText={(text) => handleContactDetailsChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={contactDetails.phone}
          onChangeText={(text) => handleContactDetailsChange('phone', text)}
        />
      </View>

      {/* Trip Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Details</Text>
        <Text style={styles.detailText}>
          Weight: <Text style={styles.detailValue}>{`${koi.Weight} kg`}</Text>
        </Text>
        <Text style={styles.detailText}>
          Length: <Text style={styles.detailValue}>{`${koi.Length} cm`}</Text>
        </Text>
        <Text style={styles.detailText}>
          Price: <Text style={styles.detailValue}>{`${koi.Price.toLocaleString()} VND`}</Text>
        </Text>
        <Text style={styles.detailText}>
          Quantity: <Text style={styles.detailValue}>{quantity}</Text>
        </Text>
        <Text style={styles.detailText}>
          Total Price: <Text style={styles.detailValue}>{`${totalPrice.toLocaleString()} VND`}</Text>
        </Text>
      </View>

      {/* Payment Method Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text
          style={styles.input}
          value={paymentMethod}
          onChangeText={(text) => setPaymentMethod(text)}
        >VNPay</Text> 
      </View>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Place Order" onPress={handleSubmitOrder} color="#28a745" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderFish;
