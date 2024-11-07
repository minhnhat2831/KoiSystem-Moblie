import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../api.js';

const KoiFishScreen = ({ route }) => {
  const { koiVarietyId } = route.params;
  const [koiFishes, setKoiFishes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchKoiFishes = async () => {
      try {
        const response = await API.get(`api/KoiFishVarieties/${koiVarietyId}`);
        setKoiFishes(response.data.Data.KoiFishes || []);
        console.log('Fetched Koi Fishes:', response.data.Data.KoiFishes);
      } catch (error) {
        console.error('Error fetching Koi fish:', error);
        Alert.alert('Error', 'Failed to load Koi fish. Please try again later.');
      }
    };
    fetchKoiFishes();
  }, [koiVarietyId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Koi Fish List</Text>
      <FlatList
        data={koiFishes}
        keyExtractor={(item) => item.KoiFishId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.koiCard}
            onPress={() => navigation.navigate('KoiFishDetailScreen', { koi: item })}
          >
            <Text style={styles.koiText}>Color: {item.Color} </Text>
            <Text style={styles.koiText}>Length: {item.Length} kg</Text>
            <Text style={styles.koiText}>Weight: {item.Weight} kg</Text>
            <Text style={styles.koiText}>Price: {item.Price.toLocaleString()} VND</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    backgroundColor: '#f58e8e', 
    flex: 1 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: 'black' 
  },
  koiCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
  },
  koiText: {
    fontSize: 18,
    color: 'black',
    marginTop: 5,
  },
});

export default KoiFishScreen;
