import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import API from '../api.js';

const CheckInScreen = () => {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await API.get('api/CheckIns');
        setCheckIns(response.data.Data || []);
      } catch (error) {
        console.error('Error fetching check-in data:', error);
        Alert.alert('Error', 'Failed to load check-in data. Please try again later.');
      }
    };
    fetchCheckIns();
  }, []);

  const renderCheckIn = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.headerText}>Check-In ID: {item.CheckInId}</Text>
      <Text style={styles.text}>Status: {item.CheckInStatus}</Text>
      <Text style={styles.text}>Check-In Date: {new Date(item.CheckInDate).toLocaleDateString()}</Text>
      
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Customer Information</Text>
      </View>
      <Text style={styles.text}>Name: {item.Customer?.FullName || 'N/A'}</Text>
      <Text style={styles.text}>Email: {item.Customer?.Email || 'N/A'}</Text>
      <Text style={styles.text}>Phone: {item.Customer?.PhoneNumber || 'N/A'}</Text>

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Consulting Staff</Text>
      </View>
      <Text style={styles.text}>Name: {item.ConsultingStaff?.FullName || 'N/A'}</Text>
      <Text style={styles.text}>Email: {item.ConsultingStaff?.Email || 'N/A'}</Text>
      <Text style={styles.text}>Phone: {item.ConsultingStaff?.PhoneNumber || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In Records</Text>
      <FlatList
        data={checkIns}
        keyExtractor={(item) => item.CheckInId.toString()}
        renderItem={renderCheckIn}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  subHeader: {
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
    paddingTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default CheckInScreen;
