import * as React from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Events from './section/Events';
import Home from './section/Home';
import Rewards from './section/Rewards';

const Stack = createNativeStackNavigator();

const Content = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const navigation = React.useContext(NavigationContext);

  return (
    <NavigationContext.Provider value={navigation}>
      <View style={containerStyle}>
          <Stack.Navigator initialRouteName="Events">
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
