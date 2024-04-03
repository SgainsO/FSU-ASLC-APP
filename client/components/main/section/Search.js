import { View, FlatList, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import SearchCard from '../cards/SearchCard';
import { useColorSchemeContext } from '../ColorSchemeContext';
import { getCategories } from '../APIUse';

const Search = () => {
const { colorScheme, toggleColorScheme } = useColorSchemeContext();
const fetchMoreData = () => {

}


const rowStyle = {
  flex: 1,
  justifyContent: "space-around",
  marginHorizontal: 25,
  marginVertical: 10,
};

const searchBarContainerStyle = {
  alignItems: 'center',
}

const [searchText, setSearchText] = useState('');

const handleSearch = (text) => {
  setSearchText(text);
}


const data = [
  { id: 0, title: 'Today\'s Events', backgroundImage: require('../../../assets/calendar.png') },
  { id: 1, title: 'Upcoming Events', backgroundImage: require('../../../assets/save_the_date.png') },
  { id: 2, title: 'Past Events', backgroundImage: require('../../../assets/indiana_jones.png') },
  { id: 3, title: 'Movie Events', backgroundImage: require('../../../assets/pulp_fiction.png') },
  { id: 4, title: 'Gaming Events', backgroundImage: require('../../../assets/sans_undertale.png') },
  { id: 5, title: 'Pottery Events', backgroundImage: require('../../../assets/Pottery.png') },
  { id: 6, title: 'Holiday Specific Events', backgroundImage: require('../../../assets/american_psycho.png') },
  { id: 7, title: 'FAQ', backgroundImage: require('../../../assets/faq_guy.png') },
];

const dbLink = 1;     //In application we will actually recieve this value from the database


const [serverData, newData] = useState([])
const [page, setPage] = useState(0)
const [loading, setLoading] = useState(false)

useEffect(() =>{
  fetchData();
}, [page])


fetchData = async () => 
{
  setLoading(true)
  console.log('being called')
  if (!serverData.isistEnd)
  {
  newData(await getCategories())
  console.log(await serverData)
  }
  setLoading(false)
};


return (
<View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
  <View style={searchBarContainerStyle}>
    <SearchBar
      searchPhrase={searchText}
      setSearchPhrase={handleSearch}
    />
  </View>
  <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1, marginVertical: 10 }} />
  <Text style={[{fontSize: 25, fontWeight: '600', paddingLeft: 32, paddingTop: 5}, colorScheme === 'dark' && styles.darkText]}>Browse Categories</Text>
  <FlatList
    data ={data}           //Change to "ServerData" to run api command
    renderItem ={({item}) => <SearchCard {...item} />}
    keyExtractor={item => item.id}
    numColumns={2}
    columnWrapperStyle={rowStyle}
//    onEndReached={fetchData} 

  />
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: 'white',
    },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default Search;