import { Text, Image, View } from 'react-native';

//import * as Section from './section';

const Card = ({ title, club, startDate, endDate, interested }) => {
  const cardImageStyle = {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 100,
    paddingHorizontal: 70,
    width: 150,
    height: 250,
    //borderWidth: 0,
    //borderColor: 'white',
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
    height: 90,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    borderBottomLeftRadius: 10, // Match the border radius of the parent View
    borderBottomRightRadius: 10,
  };

  function formatNumber(num) {
    if (num >= 1000)
        return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  function formatDateAndTime(startDate, endDate) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // Check if the dates are the same
    const isSameDay = startDate.toDateString() === endDate.toDateString();

    // Format Date
    const formatDay = (date) => {
        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dateOfMonth = date.getDate();
        return `${day}, ${month} ${dateOfMonth}`;
    };

    let dateString;
    if (isSameDay) {
        dateString = formatDay(startDate);
    } else {
        dateString = `${formatDay(startDate)} - ${endDate.getDate()}`;
    }

    // Format Time
    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesFormatted}${ampm}`;
    };
    
    const startTime = formatTime(startDate);
    const endTime = formatTime(endDate);
    const timeString = `${startTime} - ${endTime}`;

    return { dateString, timeString };
  }

  const { dateString, timeString } = formatDateAndTime(startDate, endDate);

  return (
    <View style={cardImageStyle}>
      <View style={overlayStyle}>
        <Text style={{ fontSize: 10, fontWeight: 600 }}>{dateString}</Text>
        <Text style={{ fontSize: 10, fontWeight: 600 }}>{timeString}</Text>
        <Text style={{ fontSize: 12, fontWeight: 600 }}>{title}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{club}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{formatNumber(interested)} interested</Text>
      </View>
    </View>
  );
};

export default Card;
