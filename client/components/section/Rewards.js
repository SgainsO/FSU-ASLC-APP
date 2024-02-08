import { View, FlatList, Text, Image, StyleSheet, ScrollView } from 'react-native';

import RewardsCard from '../cards/RewardsCard';
import RoundedBox from '../cards/RewardsRoundedBox';

const Rewards = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const rowStyle = {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginBottom: 0,
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'left',
    },
    icon: {
      width: 40,
      height: 40, 
      marginLeft: 35,
      marginTop: 10,
    },
    RewardsAmount: {
      fontSize: 40,
      fontWeight: '600',
      paddingLeft: 10,
      marginTop: 6,
    },
    RewardsHistory: {
      fontSize: 22,
      fontWeight: '600',
      paddingLeft: '14%',
      paddingTop: 17
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
      <ScrollView>
        <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 35, paddingBottom: 14, paddingTop: 5}}>MY REWARDS</Text>
        <View style={styles.centeredBox}>
          <RoundedBox />
        </View>
        <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 35, paddingBottom: 14, paddingTop: 15}}>REWARDS STORE</Text>
        <FlatList
          data ={data}
          renderItem ={({item}) => <RewardsCard {...item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={rowStyle}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Rewards;