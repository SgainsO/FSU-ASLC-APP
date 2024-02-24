import { View, FlatList, Text, StyleSheet, TextInput } from 'react-native';
//import React, { useState } from 'react';

import SearchCard from '../SearchCard';

const Search = () => {
//const [searchText, setSearchText] = useState('');

  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  /*const searchBarContainerStyle = {
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10, 
  };*/

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginVertical: 10,
  };

  const handleSearch = (text) => {
    setSearchText(text);
  }

  const data = [
    { id: 0, title: 'Today\'s Events', backgroundImage: require('../../assets/calendar.png') },
    { id: 1, title: 'Upcoming Events', backgroundImage: require('../../assets/save_the_date.png') },
    { id: 2, title: 'Past Events', backgroundImage: require('../../assets/indiana_jones.png') },
    { id: 3, title: 'Movie Events', backgroundImage: require('../../assets/pulp_fiction.png') },
    { id: 4, title: 'Gaming Events', backgroundImage: require('../../assets/sans_undertale.png') },
    { id: 5, title: 'Pottery Events', backgroundImage: require('../../assets/Pottery.png') },
    { id: 6, title: 'Holiday Specific Events', backgroundImage: require('../../assets/american_psycho.png') },
    { id: 7, title: 'FAQ', backgroundImage: require('../../assets/faq_guy.png') },
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
      <Text style={{fontSize: 25, fontWeight: '600', paddingLeft: 32, paddingTop: 5}}>Browse Categories</Text>
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
