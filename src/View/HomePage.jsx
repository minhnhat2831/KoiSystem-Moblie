import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import ViewPage from '../View/ViewPage';
import IntroductionHome from '../View/IntroductionHome';
import TripHome from '../View/TripHome';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationBar navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <ViewPage />
          <IntroductionHome />
          <TripHome />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 80, 
  },
});

export default HomePage;
