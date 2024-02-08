import React, { useContext } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';

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

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Header navigation={navigation}/>
        <Content navigation={navigation}/>
        <Footer navigation={navigation}/>
      </View>
    </NavigationContainer>
  );
};

export default App;