import { View } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Events from './section/Events';
import Home from './section/Home';
import Rewards from './section/Rewards';

const Stack = createNativeStackNavigator();

const Content = ({ navigation }) => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  return (
    <NavigationContext.Provider value={navigation}>
      <View style={containerStyle}>
          <Stack.Navigator initialRouteName="Events" screenOptions={{animation: 'none'}}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Events"
              component={Events}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Rewards"
              component={Rewards}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      </View>
    </NavigationContext.Provider>
  );
};

export default Content;
