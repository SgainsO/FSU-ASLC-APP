import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Events from './Home.js'

import { getURL } from '../../AxiosService.js';

const GoToEvents = ({ navigation: { navigate } }) => {

//Title will be what is actually displayed while dbLink woll be for connecting to the data base

const dbLink = "Category Name In Route"  //category name where the event will be stored

function GetTitleAndRoute()
{
    const response = axios.get(`${getURL()}/api/categories`)
    .then(response => {                    //Error Catching
      console.log("Get Request Succesful")
      return response.data;})
    .catch(error => {
      console.error("Get Request Failed", error)
    })

}

return(
    <View>
        <TouchableOpacity onPress={() =>
          navigate('Events', { title: 'Event Category Name',  dbLink:dbLink})}>
            <Text>1st event types</Text>
        </TouchableOpacity>
    </View>

)


}

export default GoToEvents;