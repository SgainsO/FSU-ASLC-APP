import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

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
        <StatusBar barStyle={'light-content'} />
        <Header />
        <Content />
        <Footer />
      </View>
    </NavigationContainer>
  );
};

export default App;