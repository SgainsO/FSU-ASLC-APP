import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


  


  const handleLogin = async (email, password) => {
  

    console.log('attempted login')
    if (email != "" && password != "") {
      try {
        axios.post(`${getURL()}/auth/login`, {
          email: email,
          password: password
        }).then((response) => {
          console.log("then")
          console.log(response.data.data)
          setUserID(response.data.userID);
          setUserToken(response.data.userToken);

          console.log(userID)
          PassInTokens(userID, userToken)

//          AsyncStorage.setItem('userID', response.data.userID);
//          AsyncStorage.setItem('userToken', response.data.userToken);
        }
        ).catch((error) => {
          console.log("then")
          console.log(error);
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async function PassInTokens(userId,userToken) 
  {
    try {
      await AsyncStorage.setItem("userID",userID)
      await AsyncStorage.setItem("userToken",userToken)
      }catch(error)
      {
        console.log(error);
      }

      // Congrats! You've just stored your first value!
  
  }


  const handleRegister = (firstName, lastName, email, password, setSubmitted, setResponse) => {
    if (email != "" && password != "") {
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