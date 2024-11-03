import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, FlatList } from 'react-native';
import API from '../api.js';

const KoiFarmListScreen = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await API.get('api/Farms');
        setFarms(response.data.Data); 
      } catch (error) {
        console.error("Failed to fetch farms:", error);
      }
    };
    fetchFarms();
  }, []);

  const openWebsite = (websiteUrl) => {
    if (websiteUrl) {
      Linking.openURL(websiteUrl);
    } else {
      alert("No website available for this farm.");
    }
  };

  const renderFarm = ({ item }) => (
    <View style={styles.farmContainer}>
      <Text style={styles.farmName}>{item.FarmName}</Text>
      <Text style={styles.farmInfo}>📍 Location: {item.Location}</Text>
      <Text style={styles.farmInfo}>👤 Owner: {item.OwnerName}</Text>
      <Text style={styles.farmInfo}>📧 Contact: {item.ContactEmail || item.ContactPhone}</Text>
      <Text style={styles.farmInfo}>⭐ Rating: {item.Rating ?? 'N/A'}</Text>
      <TouchableOpacity
        style={styles.websiteButton}
        onPress={() => openWebsite(item.Website)}
      >
        <Text style={styles.websiteButtonText}>Visit Website</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={farms}
      renderItem={renderFarm}
      keyExtractor={(item) => item.FarmId.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f5',
  },
  farmContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  farmName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  farmInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
    lineHeight: 22,
  },
  websiteButton: {
    marginTop: 12,
    backgroundColor: '#ff6f61',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#ff6f61',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default KoiFarmListScreen;
