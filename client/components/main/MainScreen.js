import React, { useContext, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const MainScreen = () => {
  const navigation = useContext(NavigationContext);

  const [isAdmin, setIsAdmin] = useState(false);
  // setIsAdmin(...); SET ADMIN BASED OFF FIREBASE AUTH

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header navigation={navigation}/>
      <Content navigation={navigation} isAdmin={isAdmin}/>
      <Footer navigation={navigation} isAdmin={isAdmin}/>
    </View>
  );
};

export default MainScreen;