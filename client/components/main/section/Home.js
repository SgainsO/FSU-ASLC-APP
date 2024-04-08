import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';

import { useAuth } from '../../AuthProvider';

const Home = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();

  const { handleLogout } = useAuth();

  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>This is a template screen</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default Home;