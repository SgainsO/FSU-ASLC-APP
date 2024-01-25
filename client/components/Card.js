import { Text, Image, View, FlatList } from 'react-native';

//import * as Section from './section';

const Card = ({ title, club, date, interested }) => {
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
    height: 80,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    borderBottomLeftRadius: 10, // Match the border radius of the parent View
    borderBottomRightRadius: 10,
  };

  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  return (
    <View style={cardImageStyle}>
      <View style={overlayStyle}>
        <Text style={{ fontSize: 10, fontWeight: 600 }}>{date}</Text>
        <Text style={{ fontSize: 13, fontWeight: 600 }}>{title}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{club}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{formatNumber(interested)} interested</Text>
      </View>
    </View>
  );
};

export default Card;
