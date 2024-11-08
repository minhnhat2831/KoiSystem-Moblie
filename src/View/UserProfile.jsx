import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_IMAGE = require('../assets/avatar.jpg');

const UserProfile = () => {
  const { user } = useAuth(); 
  const [menuVisible, setMenuVisible] = useState(false);
  const nav = useNavigation();

  if (!user) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const userInfo = [
    { label: 'Gender', value: user.Gender },
    { label: 'Email', value: user.Email },
    { label: 'Phone', value: user.PhoneNumber },
    { label: 'Address', value: user.Address },
    { label: 'BirthDate', value: user.BirthDate },
  ];

  return (
    <View style={styles.container}>
      {/* Menu */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <Button title="Edit Profile" onPress={() => {}} />
          <Button title="Change Password" onPress={() => nav.navigate('ForgotPassword')} />
        </View>
      )}

      {/* Avatar and Name Container */}
      <View style={styles.avatarContainer}>
        <Image source={user.ImageUser ? { uri: user.ImageUser } : DEFAULT_IMAGE} style={styles.avatar} />
        <Text style={styles.fullName}>{user.FullName}</Text>
        {userInfo.map((info, index) => (
          <Text key={index} style={styles.info}>{`${info.label}: ${info.value}`}</Text>
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#bda662',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 0,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  menuButtonText: {
    fontSize: 18,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    backgroundColor: '#d6aa83',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#555',
  },
});

export default UserProfile;
