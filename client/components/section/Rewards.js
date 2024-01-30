import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

import RewardsCard from '../RewardsCard';
import RoundedBox from '../RewardsRoundedBox';

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

  /*
  const header [
  {id: 'header1', component: <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 32}}>MY REWARDS</Text>},
    { id: 'header3', component: <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 32}}>REWARDS STORE</Text>}
  ];
  */
  

  const styles = StyleSheet.create({
    centeredBox: {
      flex:1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'left'
    },
    icon: {
      width: 40,
      height: 40, 
      marginLeft: 15,
      marginTop: 5,
    },
    RewardsAmount: {
      fontSize: 40,
      fontWeight: '600',
      paddingLeft: 10
    },
    RewardsHistory: {
      fontSize: 22,
      fontWeight: '600',
      paddingLeft: 50,
      paddingTop: 13
    }
  });

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
      <Image source={require('../../assets/fsu_coins.png')} style={styles.icon} />
      <Text style={styles.RewardsAmount}>180</Text>
      <Text style={styles.RewardsHistory}>Rewards History {'>'}</Text>
      </View>
      <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1, marginVertical: 10 }} />
      <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 32, paddingBottom: 35, paddingTop: 5}}>MY REWARDS</Text>
      <View style={styles.centeredBox}>
        <RoundedBox />
      </View>
      <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 32, paddingTop: 43}}>REWARDS STORE</Text>
      <FlatList
      data ={data}
      renderItem ={({item}) => <RewardsCard {...item} />}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={rowStyle}
      />
      <Text> Rewards </Text>
    </View>
  );
};

export default Rewards;