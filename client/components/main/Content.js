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
import Sett from './dropdown/Sett'
import Account from './dropdown/settings/Account'
import Display from './dropdown/settings/Display'
import Interaction from './dropdown/settings/Interaction'
import Notifications from './dropdown/settings/Notifications'
import ContactUs from './dropdown/settings/ContactUs'
import CategoryHolder from './cards/CategoryHolder';


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
            <Stack.Screen
              name="Sett"
              component={Sett}
              options={{headerShown: false }}
              />
              <Stack.Screen
              name="Account"
              component={Account}
              options={{headerShown: false}}
              />
              <Stack.Screen
              name="Display"
              component={Display}
              options={{headerShown: false}}
              />
              <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{headerShown: false}}
              />
              <Stack.Screen
              name="Interaction"
              component={Interaction}
              options={{headerShown: false}}
              />
              <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{headerShown: false}}
              />
              <Stack.Screen
              name='CategoryHolder'
              component={CategoryHolder}
              options={{headerShown: false}}
              />
              
          </Stack.Navigator>
      </View>
    </NavigationContext.Provider>
  );
};

export default Content;