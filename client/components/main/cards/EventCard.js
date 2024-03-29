import {useState} from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorSchemeContext } from '../ColorSchemeContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const infoHeight = 85

const cardHeight = 250;

const EventCard = (props) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();

  const cardWidth = screenWidth * props.SizePerc
  console.log(cardWidth)

  const cardImageStyle = {
    marginRight: 10,
    marginBottom: 20,
    paddingVertical: 100,
    paddingHorizontal: 30,
    width: cardWidth,
    height: cardHeight,
    border: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#D9D9D9',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: infoHeight,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',

  };

  const darkOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: infoHeight,
    paddingHorizontal: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'left',
  };

  const ImageHolderStyle = {
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: cardWidth,
    height: cardHeight - infoHeight,
    backgroundColor: 'black',
  }

  const ImageStyle = {
    resizeMode: 'contain',
    flex: 1

  }


  const ProfileImageHolder =
  {
      borderWidth: 3,
      borderColor: 'black',
      position: 'absolute',
      left: 5,
      top: 5,
      width: 40,
      height: 40,
      resizeMode: 'contain',
      overflow: 'hidden',
      borderRadius: 40,
  }

  const BookMarkButton =
  {
    position: 'absolute',
    right:5,
    bottom:90,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
  
  const [BookmarkColor, ChangeBookmarkColor] = useState('white')     //Allows button to change from white to another color
  const [BookmarkState, ChangeBookmarkState] = useState('star-outline') //Allows button to

  function HandleBookmarkPress()
  {
    console.log("Bookmark button pressed")
    ChangeBookmarkColor(BookmarkColor === "white"? "#CEB888" : "white")
    ChangeBookmarkState(BookmarkState === "star-outline"? "star" : "star-outline")
  }


  function formatNumber(num) {
    if (num >= 1000)
        return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  function formatDateAndTime(startDate, endDate) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];    

    const formatDay = (date) => {
        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dateOfMonth = date.getDate();
        return `${day}, ${month} ${dateOfMonth}`;
    };

    const isSameDay = props.startDate.toDateString() === props.endDate.toDateString();

    let dateString;
    if (isSameDay) {
        dateString = formatDay(props.startDate);
    } else {
        dateString = `${formatDay(props.startDate)} - ${props.endDate.getDate()}`;
    }

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours <= 12 ? 'AM' : 'PM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesFormatted}${ampm}`;
    };
    
    const startTime = formatTime(props.startDate);
    const endTime = formatTime(props.endDate);
    const timeString = `${startTime} - ${endTime}`;

    return { dateString, timeString };
  }

  const { dateString, timeString } = formatDateAndTime(props.startDate, props.endDate);

  return (
    <View style={cardImageStyle}>
      <View style={ImageHolderStyle}>
        <Image source={ require("./bob.jpg")} style = {ImageStyle}/>        
        </View>
        <TouchableOpacity style={BookMarkButton} onPress={() => HandleBookmarkPress()}>
          <Icon name={BookmarkState} size = {30} color={BookmarkColor}/>
        </TouchableOpacity>
        <Image source={ require("./ubel.jpg")} style = {ProfileImageHolder}/>
      <View style= {[overlayStyle, colorScheme === 'dark' && darkOverlayStyle]}>
        <Text style={[styles.textStyle1, colorScheme === 'dark' && styles.darkTextStyle1]}>{dateString}</Text>
        <Text style={[styles.textStyle1, colorScheme === 'dark' && styles.darkTextStyle1]}>{timeString}</Text>
        <Text style={ [styles.textStyle2, colorScheme === 'dark' && styles.darkTextStyle2] }>{props.title}</Text>
        <Text style={[styles.textStyle3, colorScheme === 'dark' && styles.darkTextStyle3]}>{props.club}</Text>
        <Text style={[styles.textStyle3, colorScheme === 'dark' && styles.darkTextStyle3]}>{formatNumber(props.interested)} interested</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle1: {
    fontSize: 10, fontWeight: 600
  },
  textStyle2: {
    fontSize: 12, fontWeight: 600
  },
  darkTextStyle1: {
    fontSize: 10, fontWeight: 600, color: 'white',
  },
  darkTextStyle2: {
    fontSize: 12, fontWeight: 600, color: 'white',
  },
  textStyle3: {
    fontSize: 12, color: '#455154'
  },
  darkTextStyle3: {
    fontSize: 12, color: '#D3D3D3',
  },
});

export default EventCard;