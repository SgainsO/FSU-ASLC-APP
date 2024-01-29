import { View, FlatList, Text, Image } from 'react-native';

import RewardsCard from '../RewardsCard';

const Rewards = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginVertical: 10,
  };

  const data = [
    { id: 0, title: 'Reward 1', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 200 },
    { id: 1, title: 'Reward 2', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 300 },
    { id: 2, title: 'Reward 3', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 500 },
    { id: 3, title: 'Reward 4', icon: <Image source = {require('../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 1000 },
  ];

  return (
    <View style={containerStyle}>
      <FlatList
      data ={data}
      renderItem ={({item}) => <RewardsCard {...item}/>}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={rowStyle}
      />
      <Text> Rewards </Text>
    </View>
  );
};

export default Rewards;