import { View, FlatList, Text } from 'react-native';

import Card from '../RewardsCard';

const Rewards = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const data = [
    { id: 0, title: 'Rewards 1', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 200 },
    { id: 1, title: 'Rewards 2', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 300 },
    { id: 2, title: 'Rewards 3', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 500 },
    { id: 3, title: 'Rewards 4', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 1000 },
  ];

  return (
    <View style={containerStyle}>
      <Text> Rewards </Text>
    </View>
  );
};

export default Rewards;

