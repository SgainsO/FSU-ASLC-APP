import { Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const infoHeight = 85

const cardHeight = 250;

const EventCard = (props) => {

  const cardWidth = screenWidth * props.SizePerc
  console.log(cardWidth)

  const cardImageStyle = {
    marginRight: 10,
    marginBottom: 20,
    paddingVertical: 100,
    paddingHorizontal: 30,
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4
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
    borderBottomLeftRadius: 10, // Match the border radius of the parent View
    borderBottomRightRadius: 10,
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
      
        <Image source={ require("./ubel.jpg")} style = {ProfileImageHolder}/>
      <View style={overlayStyle}>
        <Text style={{ fontSize: 10, fontWeight: 600 }}>{dateString}</Text>
        <Text style={{ fontSize: 10, fontWeight: 600 }}>{timeString}</Text>
        <Text style={{ fontSize: 12, fontWeight: 600 }}>{props.title}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{props.club}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{formatNumber(props.interested)} interested</Text>
      </View>
    </View>
  );
};

export default EventCard;