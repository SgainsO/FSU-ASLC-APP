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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header navigation={navigation}/>
      <Content navigation={navigation}/>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default MainScreen;