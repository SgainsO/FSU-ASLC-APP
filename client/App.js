import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import firebase from 'firebase/app';
import { auth } from './config/firebase';
import LoginScreen from './components/section/LoginScreen';

import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Rewards from './components/section/Rewards'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  const navigation = useContext(NavigationContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'} />
          <Header navigation={navigation}/>
          <Content navigation={navigation}/>
          <Footer navigation={navigation}/>
        </View>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
};

export default App;