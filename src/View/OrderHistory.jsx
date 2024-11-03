import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button } from 'react-native';
import API from '../api.js'; 

const OrderHistoryScreen = ({ navigation }) => {
  const [orderHistories, setOrderHistories] = useState([]);
  const [filteredHistories, setFilteredHistories] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  useEffect(() => {
    const fetchOrderHistories = async () => {
      try {
        const response = await API.get('api/OrderHistories');
        setOrderHistories(response.data.Data || []);
        setFilteredHistories(response.data.Data || []);
      } catch (error) {
        console.error('Error fetching order histories:', error);
        Alert.alert('Error', 'Failed to load order histories. Please try again later.');
      }
    };
    fetchOrderHistories();
  }, []);

  const handleSearch = () => {
    const filtered = orderHistories.filter(order => {
      const matchesDate = searchDate ? order.OrderDate?.toISOString().split('T')[0] === searchDate : true;
      const matchesStatus = searchStatus ? order.Status.toLowerCase() === searchStatus.toLowerCase() : true;
      return matchesDate && matchesStatus;
    });
    setFilteredHistories(filtered);
  };

  const handleViewDetails = (order) => {
    navigation.navigate('OrderDetailScreen', { order });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by Date (YYYY-MM-DD)"
          value={searchDate}
          onChangeText={setSearchDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Search by Status"
          value={searchStatus}
          onChangeText={setSearchStatus}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={filteredHistories}
        keyExtractor={(item) => item.OrderHistoryId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard} onPress={() => handleViewDetails(item)}>
            <Text style={styles.orderText}>Order ID: {item.OrderHistoryId}</Text>
            <Text style={styles.orderText}>Date: {item.OrderDate ? new Date(item.OrderDate).toLocaleDateString() : 'N/A'}</Text>
            <Text style={styles.orderText}>Total Price: {item.TotalPrice.toLocaleString()} VND</Text>
            <Text style={styles.orderText}>Status: {item.Status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
    flex: 1,
  },
  orderCard: {
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
  orderText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
});

export default OrderHistoryScreen;
