import { StyleSheet, View, StatusBar } from 'react-native';

import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

import Events from './components/section/Events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header />
      <Events />
      <Footer />
    </View>
  );
};

export default App;