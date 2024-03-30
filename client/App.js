import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ScreenHandler from './components/ScreenHandler';
import { AuthProvider } from './components/AuthProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'}/>
          <ScreenHandler/>
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;