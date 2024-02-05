import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ButtonGroup } from '@rneui/themed';
import SearchBar from '../SearchBar';


import Card from '../cards/EventCard';

const Events = () => {
  const filters = [
    { id: 0, type: 'All' },
    { id: 1, type: 'Club' },
    { id: 2, type: 'Movie' },
    { id: 3, type: 'University' },
  ];

  const data = [
    { id: 0, title: 'Event 1', club: 'Club 1', type: 3, startDate: new Date('2024-01-22T10:30:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 4942 },
    { id: 1, title: 'Event 2', club: 'Club 2', type: 1, startDate: new Date('2024-01-24T1:30:00'), endDate: new Date('2024-01-26T18:30:00'), interested: 2245 },
    { id: 2, title: 'Event 3', club: 'Club 3', type: 2, startDate: new Date('2024-01-21T10:45:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 1632 },
    { id: 3, title: 'Event 4', club: 'Club 4', type: 3, startDate: new Date('2024-01-28T22:30:00'), endDate: new Date('2024-01-29T1:00:00'), interested: 420 },
    { id: 4, title: 'Event 5', club: 'Club 5', type: 1, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-24T12:15:00'), interested: 165 },
    { id: 5, title: 'Event 6', club: 'Club 6', type: 2, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 42 },
  ];

  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // Dropdown filter consts
  const [dropdownType, setdropdownType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // Filter button consts
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const renderItem = ({ item }) => {
    const isMatch = searchPhrase === "" ||
    item.title.toUpperCase().includes(searchPhrase.toUpperCase()) ||
    item.club.toUpperCase().includes(searchPhrase.toUpperCase());

    if (isMatch) {
      return <Card title={item.title} club={item.club} type={item.type} startDate={item.startDate} endDate={item.endDate} interested={item.interested} />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <SearchBar
          dropdownType={dropdownType}
          setdropdownType={setdropdownType}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => <Text style={styles.title}>DISCOVER EVENTS</Text>}
        ListEmptyComponent={() => <Text style={{}}>NO MATCHES FOUND</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: 'white',
  },
  topContainer: {
    height: 80,
    backgroundColor: 'white',
    shadowColor: 'rgba(60,60,67, 0.29)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
    alignItems: 'center',
  },
  searchContainer: {
    height: 40,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBox: {
    width: 300,
    height: 25,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
  },
  searchInput: {
    fontSize: 16,
    color: '#3C3C4399',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginHorizontal: 35,
    marginVertical: 14,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginBottom: 0,
  },
});

export default Events;
