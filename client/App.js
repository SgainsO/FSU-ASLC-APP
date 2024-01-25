import { StyleSheet, View, StatusBar } from 'react-native';

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
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header />
      <Rewards />
      <Footer />
    </View>
  );
};

export default App;