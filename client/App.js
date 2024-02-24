import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ScreenHandler from './components/ScreenHandler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'}/>
        <ScreenHandler/>
      </View>
    </NavigationContainer>
  );
};

export default App;