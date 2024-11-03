import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../api.js';

const KoiListScreen = () => {
  const [search, setSearch] = useState('');
  const [koiVarieties, setKoiVarieties] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchKoiVarieties = async () => {
      try {
        const response = await API.get('api/KoiFishVarieties');
        setKoiVarieties(response.data.Data || []);
      } catch (error) {
        console.error('Error fetching Koi varieties:', error);
        Alert.alert('Error', 'Failed to load Koi varieties. Please try again later.');
      }
    };
    fetchKoiVarieties();
  }, []);

  const filteredKoi = koiVarieties.filter(variety =>
    variety.TypeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Koi Fish Varieties</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a Koi variety..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredKoi}
        keyExtractor={(item) => item.KoiFishVarietyId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.koiCard}
            onPress={() => navigation.navigate('KoiFishScreen', { koiVarietyId: item.KoiFishVarietyId })}
          >
            <Text style={styles.koiText}>{item.TypeName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f58e8e', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
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
  },
  koiText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: '#444',
    textAlign: 'center',
  },
});

export default KoiListScreen;
