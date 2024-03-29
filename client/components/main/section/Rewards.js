import { View, FlatList, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';
import RewardsCard from '../cards/RewardsCard';
import RoundedBox from '../cards/RewardsRoundedBox';

const Rewards = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
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
    { id: 0, title: 'Reward 1', icon: <Image source = {require('../../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 200 },
    { id: 1, title: 'Reward 2', icon: <Image source = {require('../../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 300 },
    { id: 2, title: 'Reward 3', icon: <Image source = {require('../../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 500 },
    { id: 3, title: 'Reward 4', icon: <Image source = {require('../../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>, rewardAmount: 1000 },
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
      justifyContent: 'center',
      alignItems: 'left',
      backgroundColor: 'white',
      shadowColor: 'rgba(60,60,67, 0.29)',
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 1,
      elevation: 1,
      paddingBottom: 10,
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
    },
    darkContainer: {
      backgroundColor: '#121212',
    },
    darkContainer2: {
      backgroundColor: '#171717'
    },
    darkText: {
      color: '#FFFFFF',
    },
  });

  return (
    <View style={[{containerStyle}, colorScheme === 'dark' && styles.darkContainer2]}>
      <View style={[styles.header, colorScheme === 'dark' && styles.darkContainer]}>
        <Image source={require('../../../assets/fsu_coins.png')} style={styles.icon} />
        <Text style={[styles.RewardsAmount,  colorScheme === 'dark' && styles.darkText]}>180</Text>
        <Text style={[styles.RewardsHistory,  colorScheme === 'dark' && styles.darkText]}>Rewards History {'>'}</Text>
      </View>
      <ScrollView style={{paddingTop: 10}}>
        <Text style={[{fontSize: 16, fontWeight: '600', paddingLeft: 35, paddingBottom: 14, paddingTop: 5},  colorScheme === 'dark' && styles.darkText]}>MY REWARDS</Text>
        <View style={styles.centeredBox}>
          <RoundedBox />
        </View>
        <Text style={[{fontSize: 16, fontWeight: '600', paddingLeft: 35, paddingBottom: 14, paddingTop: 15},colorScheme === 'dark' && styles.darkText ]}>REWARDS STORE</Text>
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