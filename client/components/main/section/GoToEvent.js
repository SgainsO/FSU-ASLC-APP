import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryHolder from '../cards/CategoryHolder.js'; 
//props {imageLink(image that will be cover), toNav(the screen that will be navigated to) }
import Events from './Events.js'

const goToEvents = ({ navigation: { navigate } }) => {

//Title will be what is actually displayed while dbLink woll be for connecting to the data base

const dbLink = "Category Name In Route"  //category name where the event will be stored

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    flexWrap: true,
    justifyContent: "space-between",
    padding: 10
  }



})


function GetTitleAndRoute()
{
    const response = axios.get('http://localhost:8080/api/categories')
    .then(response => {                    //Error Catching
      console.log("Get Request Succesful")
      return response.data;})
    .catch(error => {
      console.error("Get Request Failed", error)
    })

}
/*
return(
    <View>
        <TouchableOpacity onPress={() =>
         navigate('Events', { title: 'Event Category Name',  dbLink:dbLink})}>
            <Text>1st event types</Text>
        </TouchableOpacity>
    </View>

)
*/
return(

  <View style={styles.container}>
    <CategoryHolder url = 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_479,q_75,w_600/v1/clients/lascrucesnm/WEB_rio_grande_stage_2_1657190b-8b35-45fd-8407-dc6492631380.jpg' 
        title = 'Movies'  dbLink = 'default' />
  </View>
)



}

export default goToEvents;