import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ColorSchemeProvider } from './components/main/ColorSchemeContext';
import ScreenHandler from './components/ScreenHandler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  return (
  <ColorSchemeProvider>
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'}/>
        <ScreenHandler/>
      </View>
    </NavigationContainer>
  </ColorSchemeProvider>
  );
};

export default App;