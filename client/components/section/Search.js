import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

import SearchCard from '../SearchCard';

const Search = () => {
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
    { id: 0, picture: <Image source = {require('../../assets/calendar.png')}/>, title: 'Today\'s Events'},
    { id: 1, picture: <Image source = {require('../../assets/save_the_date.png')}/>, title: 'Upcoming Events'},
    { id: 2, picture: <Image source = {require('../../assets/indiana_jones.png')}/>, title: 'Past Events'},
    { id: 3, picture: <Image source = {require('../../assets/pulp_fiction.png')}/>, title: 'Movie Events'},
    { id: 4, picture: <Image source = {require('../../assets/sans_undertale.png')}/>, title: 'Gaming Events'},
    { id: 5, picture: <Image source = {require('../../assets/Pottery.png')}/>, title: 'Pottery Events'},
    { id: 6, picture: <Image source = {require('../../assets/american_psycho.png')}/>, title: 'Holiday Specific Events'},
    { id: 7, picture: <Image source = {require('../../assets/faq_guy.png')}/>, title: 'FAQ'},
  ];

  

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
      <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1, marginVertical: 10 }} />
      <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 32, paddingBottom: 35, paddingTop: 5}}>Browse Categories</Text>
      <FlatList
      data ={data}
      renderItem ={({item}) => <SearchCard {...item} />}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={rowStyle}
      />
      <Text> Search </Text>
    </View>
  );
};

export default Search;
