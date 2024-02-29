import React from 'react';
import { View } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './section/Home';
import Search from './section/Search';
import Post from './section//Post';
import Events from './section/Events';
import Rewards from './section/Rewards';
import FAQs from './section/FAQs';
import goToEvent from './section/GoToEvent';
const Stack = createNativeStackNavigator();

const Content = ({ navigation }) => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  return (
    <NavigationContext.Provider value={navigation}>
      <View style={containerStyle}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{animation: 'none'}}>
            <Stack.Screen
              name="GoToEvents"
              component={goToEvent}
              options={{ headerShown: false }}
              />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Post"
              component={Post}
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
            <Stack.Screen
              name="FAQs"
              component={FAQs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      </View>
    </NavigationContext.Provider>
  );
};

export default Content;