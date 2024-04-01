import React, { useState, } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, FlatList, Text } from 'react-native';

import AdminClub from '../modal/AdminClub';
import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';

import { Entypo } from '@expo/vector-icons';

const AdminClubs = () => {
  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // Dropdown filter consts
  const [dropdownType, setdropdownType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
    
  state = {
    tableHead: ['Avatar', 'ID', 'Name', 'Socials', 'Actions'],
    tableData: [
      ['https://se-images.campuslabs.com/clink/images/3068826d-991b-4dcc-9865-e2798ee514d0971ee766-4888-4337-b212-498ad95eaaf2.png', '0', 'Association for Computing Machinery', 'contact@fsu.acm.org'],
      ['https://se-images.campuslabs.com/clink/images/ebef7389-2a8f-47e8-a2cb-e4c98ed6eadf58eb52e3-1209-4b37-b472-f5bbd39e14a5.jpeg', '1', 'Cybersecurity Club at Florida State University', 'https://www.instagram.com/fsucybersecurity/'],
      ['https://se-images.campuslabs.com/clink/images/90270a5e-ed0b-4377-aa44-2460ebbc8c332d5c0c5f-f2af-4adf-b2af-89a7d24d21f9.JPG', '2', 'Action Shooting Club at Florida State University', 'FSUActionShooting@gmail.com'],
      ['https://se-images.campuslabs.com/clink/images/4a46260c-df6e-4a63-97d3-601c593ed4f20f25d630-fc77-4cc2-bd63-8c4a861b9718.png', '3', 'The Esports Club at FSU', 'https://linkin.bio/esportsatfsu/'],
      ['https://se-images.campuslabs.com/clink/images/9766cade-610f-40f9-b9d5-7b6cfdcad4813efdc5f9-e7d3-4b63-a7ff-b09a3e45f916.JPG', '4', 'Astrology Club at FSU', 'mp20n@fsu.edu'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '5', 'Alex Morgan', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '6', 'Jordan Casey', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '8', 'Jamie Park', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '7', 'Taylor Reed', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '9', 'Casey Lee', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '10', 'Riley Quinn', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '11', 'Dakota Ellis', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '12', 'Parker Grey', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '13', 'Morgan Bailey', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '14', 'Quinn Avery', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '15', 'Charlie Jordan', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '16', 'Skyler Pat', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '17', 'Robin Blake', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '18', 'Jesse Cameron', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '19', 'Avery Sam', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '20', 'Rowan Alex', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '21', 'Drew Jordan', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '22', 'Sawyer Lee', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '23', 'Peyton Chris', 'temp@gmail.com'],
      ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png', '24', 'Kai Morgan', 'temp@gmail.com'],
    ],
    widthPercents: [15, 15, 22, 28, 20],
    type: 'Club'
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <AdminClub isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
      <View style={styles.topContainer}>
        <SearchBar
          isFocus={isFocus}
          setIsFocus={setIsFocus}
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

export default AdminClubs;