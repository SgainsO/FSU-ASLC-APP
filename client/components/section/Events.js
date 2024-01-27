import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { Icon } from '@rneui/base';

import Card from '../EventCard';

const Events = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const topContainerStyle = {
    height: 80,
    backgroundColor: 'white',
    shadowColor: 'rgba(60,60,67, 0.29)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
    alignItems: 'center',
  };

  const searchContainerStyle = {
    height: 40,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  };

  const searchBoxStyle = {
    width: 300,
    height: 25,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
  };

  const searchInputStyle = {
    fontSize: 16,
    color: '#3C3C4399',
  };

  const titleStyle = {
    fontSize: 16,
    fontWeight: 600,
    marginHorizontal: 35,
    marginVertical: 14,
  };

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginBottom: 20,
  };

  const data = [
    { id: 0, title: 'Event 1', club: 'Club 1', startDate: new Date('2024-01-22T10:30:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 4942 },
    { id: 1, title: 'Event 2', club: 'Club 2', startDate: new Date('2024-01-24T1:30:00'), endDate: new Date('2024-01-26T18:30:00'), interested: 2245 },
    { id: 2, title: 'Event 3', club: 'Club 3', startDate: new Date('2024-01-21T10:45:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 1632 },
    { id: 3, title: 'Event 4', club: 'Club 4', startDate: new Date('2024-01-28T22:30:00'), endDate: new Date('2024-01-29T1:00:00'), interested: 420 },
    { id: 4, title: 'Event 5', club: 'Club 5', startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-24T12:15:00'), interested: 165 },
    { id: 5, title: 'Event 6', club: 'Club 6', startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 42 },
  ];

  const [value, setValue] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={containerStyle}>
      <View style={topContainerStyle}>
        <SearchBar
          containerStyle={searchContainerStyle}
          inputContainerStyle={searchBoxStyle}
          inputStyle={searchInputStyle}
          searchIcon={{ color: '#3C3C4360' }}
          clearIcon={{ color: '#3C3C4360' }}
          onChangeText={newVal => setValue(newVal)}
          onClearText={() => console.log(onClearText())}
          placeholder='Search'
          placeholderTextColor='#3C3C4350'
          value={value}
        />
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={rowStyle}
        ListHeaderComponent={() => <Text style={titleStyle}>DISCOVER EVENTS</Text>}
      />
      
      
    </View>
  );
};

export default Events;
