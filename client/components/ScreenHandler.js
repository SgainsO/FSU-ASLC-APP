import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import SettingsScreen from './settings/SettingsScreen';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ScreenHandler = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{animation: 'none'}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default ScreenHandler;