import { View, FlatList, Text } from 'react-native';

import Card from '../RewardsCard';

const Rewards = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  return (
    <View style={containerStyle}>
      <Text> Rewards </Text>
    </View>
  );
};

export default Rewards;
