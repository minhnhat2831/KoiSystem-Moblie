import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const KoiFishDetailScreen = ({ route }) => {
  const { koi } = route.params;
  const nav = useNavigation('');
  const [quantity, setQuantity] = useState(1);
  if (!koi) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Koi fish details are unavailable.</Text>
      </View>
    );
  }

  const getGenderString = (gender) => {
    return gender === 1 ? 'Female' : 'Male';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{koi.Color} Koi Fish</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>KoiFishID : <Text style={styles.detailValue}>{koi.KoiFishId} </Text></Text>
        <Text style={styles.detailText}>Weight: <Text style={styles.detailValue}>{koi.Weight} kg</Text></Text>
        <Text style={styles.detailText}>Length: <Text style={styles.detailValue}>{koi.Length} cm</Text></Text>
        <Text style={styles.detailText}>Price: <Text style={styles.detailValue}>{koi.Price.toLocaleString()} VND</Text></Text>
        <Text style={styles.detailText}>Supplier: <Text style={styles.detailValue}>{koi.Supplier}</Text></Text>
        <Text style={styles.detailText}>Notes: <Text style={styles.detailValue}>{koi.Notes}</Text></Text>
        <Text style={styles.detailText}>Gender: <Text style={styles.detailValue}>{getGenderString(koi.Gender)}</Text></Text>       
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Quantity</Text>
        <Picker
          selectedValue={quantity}
          style={styles.picker}
          onValueChange={(itemValue) => setQuantity(itemValue)}
        >
          {[...Array(10).keys()].map((num) => (
            <Picker.Item key={num} label={`${num + 1}`} value={num + 1} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Order" color="#28a745" onPress={() => nav.navigate('OrderKoi', { koi, quantity })} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f58e8e' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff', 
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  detailText: { 
    fontSize: 18, 
    color: '#555', 
    marginBottom: 8 
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#333',
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
  picker: {
    height: 50,
    width: 150,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: { 
    marginTop: 20 
  },
  errorText: { 
    fontSize: 18, 
    color: 'red', 
    textAlign: 'center', 
    marginTop: 20 
  },
});

export default KoiFishDetailScreen;
