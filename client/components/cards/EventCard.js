import { Text, View } from 'react-native';

const EventCard = (props) => {
  const cardImageStyle = {
    marginHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 100,
    paddingHorizontal: 30,
    width: '45%',
    height: 250,
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
    height: 85,
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
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

    // Check if the dates are the same
    const isSameDay = props.startDate.toDateString() === props.endDate.toDateString();

    // Format Date
    const formatDay = (date) => {
        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dateOfMonth = date.getDate();
        return `${day}, ${month} ${dateOfMonth}`;
    };

    let dateString;
    if (isSameDay) {
        dateString = formatDay(props.startDate);
    } else {
        dateString = `${formatDay(props.startDate)} - ${props.endDate.getDate()}`;
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
    
    const startTime = formatTime(props.startDate);
    const endTime = formatTime(props.endDate);
    const timeString = `${startTime} - ${endTime}`;

    return { dateString, timeString };
  }

  const { dateString, timeString } = formatDateAndTime(props.startDate, props.endDate);

  return (
    <View style={cardImageStyle}>
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