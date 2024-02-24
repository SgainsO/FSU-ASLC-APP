import React, {  } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center', justifyContent: 'center', alignItems: 'center'
  },
});

const SettingsScreen = () => {
  const navigation = useNavigation();

  const navigate = (navigateTo) => {
    navigation.navigate(navigateTo);
  }

  return (
    <View style={styles.container}>
      <Text style={{}}> Settings Screen </Text>
      <Button title="Placeholder Home Button" onPress={() => navigate('Home')} />
    </View>
  );
};

export default SettingsScreen;