import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ButtonGroup } from '@rneui/themed';
import SearchBar from '../SearchBar';
import { useColorSchemeContext } from '../ColorSchemeContext';

import Card from '../cards/EventCard';

const Events = ({ route }) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();

  const [data, setData] = useState({
    tableHead: ['Image', 'ID', 'Club', 'Type', 'Title', 'Start', 'End', 'Actions'],
    tableData: [],
    widthPercents: [15, 7, 8, 8, 17, 13, 13, 20],
    type: 'Event'
  });

  const { title } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getEvents');
        const formattedData = response.data.data.map(event => [
          event.url,
          event.id.toString(),
          event.club_id,
          event.type,
          event.title,
          event.start_date,
          event.end_date,
        ]);
        console.log('formattedData: ', formattedData);
        setData(prevState => ({ ...prevState, tableData: formattedData }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return <Card title={item.title} club={item.club} type={item.type} startDate={item.startDate} endDate={item.endDate} interested={item.interested} SizePerc={0.43} />;
  };

  return (
    <View style={colorScheme === 'dark' ? styles.darkContainer : styles.container}>
      <Text style={[styles.Title, colorScheme === 'dark' && styles.darkText]}><Text>{title}</Text></Text>
      <View style={[styles.topContainer, colorScheme === 'dark' && styles.darkContainer]}>
        {/*search bar*/}
      </View>

      <FlatList
        data={data} 
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} 
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => <Text style={[styles.title, colorScheme === 'dark' && styles.darkText]}>DISCOVER EVENTS</Text>}
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
  Title: {
    paddingTop: 10,
    fontSize: 40,
    fontWeight: '600',
    alignSelf: 'center',
  },
  topContainer: {
    height: 60,
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
    fontWeight: '600',
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
