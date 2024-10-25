import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Menu, X } from 'lucide-react-native';

const navItems = [
  { label: "Home", href: "Home" },
  { label: "Login", href: "Login" },
  { label: "Register", href: "Register" },
  { label: "Contact" ,href: ""},
];

const NavigationBar = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setModalVisible(!isModalVisible);
  };

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
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  navigation.navigate(item.href);
                  toggleMenu();
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
