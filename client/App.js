import { StyleSheet, View, StatusBar } from 'react-native';
import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ColorSchemeProvider } from './components/main/ColorSchemeContext';
import ScreenHandler from './components/ScreenHandler';
import { AuthProvider, useAuth } from './components/AuthProvider';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {

  return (

  <AuthProvider>
    <ColorSchemeProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'}/>
          <ScreenHandler/>
        </View>
      </NavigationContainer>
    </ColorSchemeProvider>
  </AuthProvider>
  );
};

export default App;