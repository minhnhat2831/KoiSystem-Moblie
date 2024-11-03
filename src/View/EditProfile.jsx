import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import DateTimePicker from '@react-native-community/datetimepicker';

const DEFAULT_IMAGE = require('../assets/avatar.jpg');

const EditProfile = ({ navigation }) => {
  const { user, login } = useAuth();
  
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    BirthDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        FullName: user.FullName || '',
        Email: user.Email || '',
        PhoneNumber: user.PhoneNumber || '',
        Address: user.Address || '',
        BirthDate: user.BirthDate ? new Date(user.BirthDate) : new Date(),
      });
    }
  }, [user]); 

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    console.log("Form Data before sending:", formData);

    try {
      const payload = {
        UserId: user.UserId, 
        ...formData,
        BirthDate: formData.BirthDate.toISOString().split('T')[0], 
      };

      console.log("Payload being sent:", payload); 
      const response = await API.put(`/api/Users/${user.UserId}`, payload);
      
      if (response.status === 200) {
        login(response.data, user.token);
        navigation.goBack();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data); 
        setError(err.response.data.message || 'Failed to update profile. Please try again later.'); 
      } else {
        setError('Failed to update profile. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.BirthDate;
    setShowDatePicker(false);
    handleChange('BirthDate', currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image source={user.ImageUser ? { uri: user.ImageUser } : DEFAULT_IMAGE} style={styles.avatar} />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={formData.FullName}
        onChangeText={(value) => handleChange('FullName', value)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.Email}
        onChangeText={(value) => handleChange('Email', value)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={formData.PhoneNumber}
        onChangeText={(value) => handleChange('PhoneNumber', value)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={formData.Address}
        onChangeText={(value) => handleChange('Address', value)}
      />

      <Text style={styles.label}>Birth Date</Text>
      <TouchableOpacity onPress={showPicker}>
        <TextInput
          style={styles.input}
          value={formData.BirthDate ? formData.BirthDate.toLocaleDateString() : ''}
          editable={false}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={formData.BirthDate}
          mode="date"
          is24Hour={true}
          onChange={onDateChange}
        />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title={loading ? "Saving..." : "Save Changes"} onPress={handleSave} disabled={loading} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default EditProfile;
