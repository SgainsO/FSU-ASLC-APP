import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native'

const Card = (props) => {
  const randomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`; // Adjust opacity (last value) for desired tint
  };
  
  const cardStyle = {
    marginHorizontal: 10,
    marginBottom: 20,
    width: 350,
    height: 300, 
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  };

  const overlayStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: randomColor(),
  };

  const titleContainerStyle = {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderBottomLeftRadius: 10, // Match the border radius of the parent View
    borderBottomRightRadius: 10,
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: 27,
    fontWeight: '600',
    color: 'white',
  };

  const detailsContainerStyle = {
    position: 'absolute',
    bottom: 2,
    left: 10,
    right: 10,
    alignItems: 'center'
  };

  const detailsStyle = {
    fontSize: 14,
    color: 'white',
  };

  const interestedContainerStyle = {
    position: 'absolute',
    top: 10, 
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  };

  const blur = {
    flex: 1,
    ...StyleSheet.absoluteFillObject    
  }

  const interestedStyle = {
    fontSize: 14,
    color: 'white',
  };

  const navigation = useNavigation();

    function NavigateToEvent()
    {
        navigation.navigate('Events', {title: props.title, dbLink: props.dbLink});
    }
  const image = {uri : props.image_link}
    
  return (
    <TouchableOpacity style={cardStyle} onPress={() => navigation.navigate('Events', {title: props.title, dbLink: props.dbLink})}>
      <ImageBackground source={image} style={{ flex: 1 }} blurRadius = {10}  resizeMode='cover'>
         <View style={[overlayStyle]}>
          <View style={titleContainerStyle}>
            <Text style={titleStyle}>{props.title}</Text>
            </View>
          </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

/*
          <View style={detailsContainerStyle}>
            <Text style={detailsStyle}>{details}</Text>
          </View>
          <View style={interestedContainerStyle}>
            <Text style={interestedStyle}>{interested}</Text>
          </View>
*/



export default Card;

