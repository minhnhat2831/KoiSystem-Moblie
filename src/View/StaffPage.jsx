import React, { useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function StaffHome() {
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Staff Home User RoleID:', user?.RoleId); 
    if (user?.RoleID == 3 && user?.RoleID == 4) {
      console.log('Redirecting to Home...');
      navigation.replace("Home");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Staff Manager</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Manage Koi Fish"
          onPress={() => navigation.navigate("KoiManagement")}
          color="#1E90FF"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Manage Trips"
          onPress={() => navigation.navigate("TripManagement")}
          color="#32CD32"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Manage Farms"
          onPress={() => navigation.navigate("FarmManagement")}
          color="#FF8C00"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Check In"
          onPress={() => navigation.navigate("CheckIn")}
          color="#FF8C00"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Order History"
          onPress={() => navigation.navigate("OrderHistory")}
          color="#8A2BE2"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#DC143C"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});
