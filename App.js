import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/View/HomePage';
import Login from './src/View/Login';
import RegisterPage from './src/View/Register';
import { AuthProvider } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
import UserProfile from './src/View/UserProfile';
import TripListScreen from './src/View/TripList';
import KoiFarmListScreen from './src/View/KoiFarm';
import KoiListScreen from './src/View/KoiVariety';
import TripDetailScreen from './src/View/TripDetail';
import KoiFishScreen from './src/View/KoiFish';
import KoiFishDetailScreen from './src/View/KoiDetail';
import OrderHistoryScreen from './src/View/OrderHistory';
import OrderDetailScreen from './src/View/OrderKoiDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="TripList" component={TripListScreen} />
          <Stack.Screen name="KoiVariety" component={KoiListScreen} options={{ title: 'Koi Varietiy' }} />
          <Stack.Screen name="KoiFishDetailScreen" component={KoiFishDetailScreen} options={{ title: 'Koi Details' }} />
          <Stack.Screen name="KoiFishScreen" component={KoiFishScreen} options={{ title: 'Koi Fish' }} />
          <Stack.Screen name="KoiFarm" component={KoiFarmListScreen} options={{ title: 'Koi Farms' }} />
          <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ title: 'Trip Details' }} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
          <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: 'Order History' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AuthProvider>
  );
}
