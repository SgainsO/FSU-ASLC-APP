import { Text, View } from 'react-native';

const Card = ({ title, icon, rewardAmount}) => {
  const cardImageStyle = {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 100,
    paddingHorizontal: 70,
    width: 150,
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

   return (
    <View style={cardImageStyle}>
      <View style={overlayStyle}>
        <Text style={{ fontSize: 12, fontWeight: 600 }}>{title}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{icon} {rewardAmount}</Text>
      </View>
    </View>
  );
};

export default Card;
