import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Order details are unavailable.</Text>
      </View>
    );
  }

  const formattedOrderDate = order.OrderDate ? new Date(order.OrderDate).toLocaleDateString() : 'N/A';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        {/* Customer Information */}
        <View style={styles.customerInfo}>
          <Text style={styles.title}>Customer Information</Text>
          <Text style={styles.detailText}>Full Name: {order.Customer?.FullName || 'N/A'}</Text>
          <Text style={styles.detailText}>Email: {order.Customer?.Email || 'N/A'}</Text>
          <Text style={styles.detailText}>Phone: {order.Customer?.PhoneNumber || 'N/A'}</Text>
          <Text style={styles.detailText}>Address: {order.Customer?.Address || 'N/A'}</Text>
        </View>
        
        {/* Order Information */}
        <View style={styles.orderInfo}>
          <Text style={styles.title}>Order Information</Text>
          <Text style={styles.detailText}>Order ID: {order.OrderHistoryId}</Text>
          <Text style={styles.detailText}>Total Price: {order.TotalPrice.toLocaleString()} VND</Text>
          <Text style={styles.detailText}>Status: {order.Status}</Text>
          <Text style={styles.detailText}>Order Date: {formattedOrderDate}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#bd9d9d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'column',
    marginTop: 20,
    flex: 1,
  },
  customerInfo: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderDetailScreen;
