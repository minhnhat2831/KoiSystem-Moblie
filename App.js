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
import CheckInScreen from './src/View/CheckIn';
import ForgotPassword from './src/View/ForgotPassword';
import ResetPassword from './src/View/ResetPassword';
import TripBooking from './src/View/TripBooking';
import BookingSuccessScreen from './src/View/BookingSuccess';
import OrderFish from './src/View/OrderKoi';
import KoiManagementScreen from './src/View/KoiManagement';
import StaffHome from './src/View/StaffPage';
import AddKoiScreen from './src/View/AddKoi';
import AddTripScreen from './src/View/AddTrip';
import AddFarmScreen from './src/View/AddFarm';
import FarmManagementScreen from './src/View/FarmManagement';
import TripManagementScreen from './src/View/TripManagement';
import AboutUs from './src/View/AboutUs';
import EditKoi from './src/View/EditKoi';
import EditFarm from './src/View/EditFarm';
import EditTrip from './src/View/EditTrip';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="TripList" component={TripListScreen} />
          <Stack.Screen name="KoiVariety" component={KoiListScreen} options={{ title: 'Koi Varietiy' }} />
          <Stack.Screen name="KoiFishDetailScreen" component={KoiFishDetailScreen} options={{ title: 'Koi Details' }} />
          <Stack.Screen name="KoiFishScreen" component={KoiFishScreen} options={{ title: 'Koi Fish' }} />
          <Stack.Screen name="KoiFarm" component={KoiFarmListScreen} options={{ title: 'Koi Farms' }} />
          <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ title: 'Trip Details' }} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
          <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: 'Order History' }} />
          <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check in' }} />
          <Stack.Screen name="TripBooking" component={TripBooking} options={{ title: 'Trip Booking' }} />
          <Stack.Screen name="BookSuccess" component={BookingSuccessScreen} options={{ title: 'Booking Success' }} />
          <Stack.Screen name="OrderKoi" component={OrderFish} options={{ title: 'Order Koi' }} />
          <Stack.Screen name="StaffHome" component={StaffHome} options={{ title: 'Staff Dashboard' }} />
          <Stack.Screen name="KoiManagement" component={KoiManagementScreen}  />
          <Stack.Screen name="AddKoi" component={AddKoiScreen} />
          <Stack.Screen name="AddTrip" component={AddTripScreen} />
          <Stack.Screen name="AddFarm" component={AddFarmScreen} />
          <Stack.Screen name="EditKoi" component={EditKoi} />
          <Stack.Screen name="EditFarm" component={EditFarm} />
          <Stack.Screen name="EditTrip" component={EditTrip} />
          <Stack.Screen name="FarmManagement" component={FarmManagementScreen} />
          <Stack.Screen name="TripManagement" component={TripManagementScreen} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AuthProvider>
  );
}
