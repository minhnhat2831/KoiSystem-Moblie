import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Fish, Stethoscope, MapPin, Ticket } from 'lucide-react-native';
import image from "../assets/Koi2.jpg";

const IntroductionHome = () => {
  const data = [
    { title: "Beautiful Koi", description: "Experience the elegance of colorful Koi fish.", icon: <Fish size={5} /> },
    { title: "Koi Care Tips", description: "Learn how to care for your Koi to keep them healthy.", icon: <Stethoscope size={5} /> },
    { title: "Farm Tour", description: "Take a tour of our peaceful Koi farm.", icon: <MapPin size={5} /> },
    { title: "Book a Visit", description: "Plan your visit and enjoy a day with the Koi.", icon: <Ticket size={5} /> },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Discover the World of Koi</Text>
      <Text style={styles.description}>
        Join us on an immersive journey through our Koi farm, where you can explore the beauty, history, and care of these elegant fish. Book your farm tour today and experience the serene world of Koi.
      </Text>
      <View style={styles.featuresGrid}>
        {data.map((item, index) => (
          <View key={index} style={styles.featureItem}>
            {item.icon}
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
      <Image source={image} style={styles.image} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#D2B48C' , bottom : 15},  
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: 'black' },
  description: { fontSize: 16, marginBottom: 16, color: '#333' },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#E6CDAA', 
  },
  textContainer: {
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  itemDescription: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default IntroductionHome;
