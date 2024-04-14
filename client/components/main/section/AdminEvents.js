import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import AdminCreation from '../modal/AdminCreation';
import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';
import { getEventsURL } from '../../AxiosService';

import { Entypo } from '@expo/vector-icons';

const AdminEvents = () => {
  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [eventData, setEventData] = useState({
    tableHead: ['Image', 'ID', 'Club', 'Type', 'Title', 'Start', 'End', 'Actions'],
    tableData: [],
    widthPercents: [15, 7, 8, 8, 17, 13, 13, 20],
    type: 'Event'
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(getEventsURL());
        const formattedData = response.data.data.map(event => [
          event.url, // TODO: FIX THIS
          event.id.toString(),
          event.club_id,
          event.type,
          event.title,
          event.start_date,
          event.end_date,
        ]);
        console.log('formattedData: ', formattedData);
        setEventData(prevState => ({ ...prevState, tableData: formattedData }));
      } catch (error) {
        console.error('Error retrieving events: ', error);
      }
    }
    fetchEvents();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <AdminCreation isModalVisible={isModalVisible} setModalVisible={setModalVisible} type={'Event'} />
      <View style={styles.topContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        <TouchableOpacity onPress={() => toggleModal()}>
          <Entypo name="squared-plus" size={40} color="#27ae60" />
        </TouchableOpacity>
      </View>
      <AdminTable state={eventData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
  topContainer: {
    height: 50,
    backgroundColor: 'white',
    shadowColor: 'rgba(60,60,67, 0.29)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
});

export default AdminEvents;