import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';
import axios from 'axios';

import { getURL } from './AxiosService';
import { set } from 'react-hook-form';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const handleLogin = (email, password, setSubmitted, setResponse) => {
  
    if (email != "" && password != "") {
      axios.post(`${getURL()}/auth/login`, {
        email: email,
        password: password
      }).then((response) => {
        setUserID(response.data.userID);
        setUserToken(response.data.userToken);
        AsyncStorage.setItem('userID', response.data.userID);
        AsyncStorage.setItem('userToken', response.data.userToken);
      }
      ).catch((error) => {
          setSubmitted(true);
          setResponse(error.response.data.message);
      });
    }
    else {
      setSubmitted(true);
      setResponse("Please enter a valid email and password.");
    }
  }

  const handleRegister = (firstName, lastName, email, password, setSubmitted, setResponse) => {
    if (firstName != "" && lastName != "" && email != "" && password != "") {
      axios.post(`${getURL()}/auth/register`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }).then((response) => {
        if (response.status === 201) {
          setUserID(response.data.userID);
          setUserToken(response.data.userToken);
          AsyncStorage.setItem('userID', response.data.userID);
          AsyncStorage.setItem('userToken', response.data.userToken);
        }
      }).catch((error) => {
          setSubmitted(true);
          setResponse(error.response.data.message);
      });
    }
    else {
      setSubmitted(true);
      setResponse("Please enter a valid name, email, and password.");
    }
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
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, userToken, userID, handleLogin, isLoggedIn, handleRegister, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);