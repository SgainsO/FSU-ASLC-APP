import React, { useState, } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import AdminCreation from '../modal/AdminCreation';
import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';

import { Entypo } from '@expo/vector-icons';

const AdminEvents = () => {
  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  state = {
    tableHead: ['Image', 'ID', 'Club', 'Type', 'Title', 'Start', 'End', 'Actions'],
    tableData: [
      ['https://live.staticflickr.com/4434/37031540756_7a686a22ac_b.jpg', '0', '1', '3', 'ACM Programming Contest', '2024-04-03T01:41:00.000Z',  '2024-04-03T01:42:00.000Z'],
      ['https://th.bing.com/th/id/OIP.TMjzM_W0Yn61ahSvOtBD-QHaEP?rs=1&pid=ImgDetMain.jpeg', '1', '2', '2', 'The Big Rave', '2024-04-03T01:43:00.000Z',  '2024-04-03T01:44:00.000Z'],
      ['https://th.bing.com/th/id/OIP.vikfs7CXQWAmevCktVY00AHaE8?rs=1&pid=ImgDetMain.jpeg', '2', '0', '1', 'Purplefest', '2024-04-03T01:45:00.000Z',  '2024-04-03T01:46:00.000Z'],
      ['https://th.bing.com/th/id/R.b1009333f7318c65de313e30e748e6f3?rik=qFQ9k2BQn9wP7w&riu=http%3a%2f%2fimages.fineartamerica.com%2fimages-medium-large%2fflorida-state-fountain-at-the-westcott-building-larry-novey.jpg&ehk=hqJ8yHxQE42AptqT8pHfWe8u5sNkDeBzSiCC%2f8uzY8Q%3d&risl=&pid=ImgRaw&r=0.png', '3', '3', '0', 'Westcott Fountain Drinking', '2024-04-03T01:47:00.000Z',  '2024-04-03T01:48:00.000Z'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '4', '0', '5', 'Example Event', '2024-04-03T01:49:00.000Z',  '2024-04-03T01:50:00.000Z'],
    ],
    widthPercents: [15, 7, 8, 8, 17, 13, 13, 20],
    type: 'Event'
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <AdminCreation isModalVisible={isModalVisible} setModalVisible={setModalVisible} type={state.type} />
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
      <AdminTable state={state}/>
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