import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import img from "../assets/Koi.jpg";

const { height } = Dimensions.get("window");

const ViewPage = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'PirataOne-Regular': require('../assets/PirataOne-Regular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  return (
    <ImageBackground source={img} style={styles.heroContainer}>
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>KOITO</Text>
        <Text style={styles.subtitle}>Where tranquility meets nature</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    height: height * (3 / 3), 
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    zIndex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 75,
    fontWeight: '200',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PirataOne-Regular', 
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ViewPage;
