import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ViewPage from '../View/ViewPage';
import IntroductionHome from '../View/IntroductionHome';
import TripHome from '../View/TripHome';

const SectionsHome = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <ViewPage />
      <IntroductionHome />
      <TripHome />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
});

export default SectionsHome;
