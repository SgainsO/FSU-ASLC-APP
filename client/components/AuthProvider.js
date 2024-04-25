import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';
import axios from 'axios';

import { getURL } from './AxiosService';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const handleLogin = (email, password) => {
  
    if (email != "" && password != "") {
      try {
        axios.post(`${getURL()}/auth/login`, {
          email: email,
          password: password
        }).then((response) => {
          console.log(response.data);
          setUserToken(response.data.userToken);
          AsyncStorage.setItem('userToken', response.data.userToken);
          console.log('Set user token to AsyncStorage');
        }
        ).catch((error) => {
          console.log(error);
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  // TODO: Implement register
  const handleRegister = (firstName, lastName, email, password) => {

    if (email != "" && password != "") {
      try {
        axios.post(`${getURL()}/auth/register`, {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        }).then((response) => {

          if (response.status === 201) {
            console.log(response.data);
            setUserToken(response.data.userToken);
            AsyncStorage.setItem('userToken', response.data.userToken);
            console.log('Set user token to AsyncStorage');
          } else {
            console.log('Error registering user');
          }
        }
        ).catch((error) => {
          console.log(error);
        });
      }
      catch (error) {
        console.log(error);
        }
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
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, userToken, handleLogin, isLoggedIn, handleRegister, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);