import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

const koiSuppliers = [
  {
    id: '1',
    name: 'Tokyo Koi Farm',
    location: 'Tokyo, Japan',
    description: 'Tokyo Koi Farm specializes in high-quality koi with unique colors and patterns.',
    imageUrl: 'https://via.placeholder.com/100', 
  },
  {
    id: '2',
    name: 'Kyoto Nishikigoi',
    location: 'Kyoto, Japan',
    description: 'Known for traditional breeding techniques, Kyoto Nishikigoi has been in business for over 50 years.',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'Osaka Koi Export',
    location: 'Osaka, Japan',
    description: 'Osaka Koi Export offers a wide range of koi varieties for competitive and home enthusiasts.',
    imageUrl: 'https://via.placeholder.com/100',
  },
];

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        We are a company dedicated to bringing the best quality koi fish to our customers. Our commitment to quality ensures that every koi fish you receive is healthy and vibrant.
      </Text>

      <Text style={styles.subtitle}>Our Mission</Text>
      <Text style={styles.description}>
        Our mission is to provide top-quality koi fish sourced from reputable breeders around the world. We aim to be a trusted name in the koi fish industry, bringing joy and beauty to koi enthusiasts everywhere.
      </Text>

      <Text style={styles.subtitle}>Our Koi Suppliers</Text>
      <FlatList
        data={koiSuppliers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.supplierItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>Location: {item.location}</Text>
              <Text style={styles.supplierDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#edcece',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  supplierItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  supplierDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default AboutUs;
