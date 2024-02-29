import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Events from './Events.js'

const goToEvents = ({ navigation: { navigate } }) => {

//Title will be what is actually displayed while dbLink woll be for connecting to the data base

return(
    <View>
        <TouchableOpacity onPress={() =>
         navigate('Events', { title: 'Event Type',  dbLink:'Da'})}>
            <Text>1st event types</Text>
        </TouchableOpacity>
    </View>

)


}

export default goToEvents;