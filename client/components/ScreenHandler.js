import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../components/AuthProvider';
import { useNavigation } from '@react-navigation/native';

import Signup from './login/Signup'
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ScreenHandler = () => {

  const { userToken } = useAuth();

  const navigation = useNavigation();

  // Listens to if userToken changes
  useEffect(() => {
    if (userToken) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Signup');
    }
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName={userToken !== null ? "Main" : "Login"} screenOptions={{animation: 'none'}}>
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
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default ScreenHandler;