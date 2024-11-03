import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Menu, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import userIcon from '../assets/avatar.jpg'; 

const NavigationBar = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
    navigation.replace("Home");
  };

  const navItems = user
    ? [
        { label: "Home", href: "Home" },
        { label: "Koi Buying Trip", href: "TripList" },
        { label: "Koi Varietiy", href: "KoiVariety" },
        { label: "Koi Farm" , href : "KoiFarm"},
        { label: "Log Out", action: handleLogout },
      ]
    : [
        { label: "Home", href: "Home" },
        { label: "Login", href: "Login" },
        { label: "Register", href: "Register" },
        { label: "Contact", href: "Contact" },
      ];

  return (
    <>
      <View style={styles.navContainer}>
        <View style={styles.navContent}>
          <Text style={styles.logoText}>Logo</Text>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Menu color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
              <X size={24} color="#fff" />
            </TouchableOpacity>

            {user && (
              <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => {
                  toggleMenu();
                  navigation.navigate("UserProfile");
                }}>
                <Image
                  source={user.ImageUser ? { uri: user.ImageUser } : userIcon}
                  style={styles.userIcon}
                />
                </TouchableOpacity>
                <Text style={styles.userName}>{user.username}</Text>
              </View>
            )}

            {navItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigation.navigate(item.href);
                    toggleMenu();
                  }
                }}
                style={styles.menuItem}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    color: 'white',
    marginTop: 8,
  },
  navContainer: {
    position: 'absolute', 
    width: '100%',
    zIndex: 10,
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 16,
    top: 0, 
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
    
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    color: 'white',
  },
});

export default NavigationBar;
