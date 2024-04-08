import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const handleLogin = () => {
    setUserToken('testoken');
    AsyncStorage.setItem('userToken', 'testoken');
    console.log('Set user token to AsyncStorage');
  }

  // TODO: Implement register
  const handleRegister = () => {
    setUserToken('testoken');
    AsyncStorage.setItem('userToken', 'testoken');
  }

  const handleLogout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');

    console.log("User has been logged out.")
  }

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
      console.log('User is logged in')
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, userToken, handleLogin, isLoggedIn, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);