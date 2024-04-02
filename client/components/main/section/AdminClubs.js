import React, { useState, } from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';

import AdminCreation from '../modal/AdminCreation';
import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';

import { Entypo } from '@expo/vector-icons';

const AdminClubs = () => {
  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
    
  state = {
    tableHead: ['Avatar', 'ID', 'Type', 'Name', 'Socials', 'Actions'],
    tableData: [
      ['https://se-images.campuslabs.com/clink/images/3068826d-991b-4dcc-9865-e2798ee514d0971ee766-4888-4337-b212-498ad95eaaf2.png', '0', '1', 'Association for Computing Machinery', 'contact@fsu.acm.org'],
      ['https://se-images.campuslabs.com/clink/images/ebef7389-2a8f-47e8-a2cb-e4c98ed6eadf58eb52e3-1209-4b37-b472-f5bbd39e14a5.jpeg', '1', '2', 'Cybersecurity Club at Florida State University', 'https://www.instagram.com/fsucybersecurity/'],
      ['https://se-images.campuslabs.com/clink/images/90270a5e-ed0b-4377-aa44-2460ebbc8c332d5c0c5f-f2af-4adf-b2af-89a7d24d21f9.JPG', '2', '0', 'Action Shooting Club at Florida State University', 'FSUActionShooting@gmail.com'],
      ['https://se-images.campuslabs.com/clink/images/4a46260c-df6e-4a63-97d3-601c593ed4f20f25d630-fc77-4cc2-bd63-8c4a861b9718.png', '3', '3', 'The Esports Club at FSU', 'https://linkin.bio/esportsatfsu/'],
      ['https://se-images.campuslabs.com/clink/images/9766cade-610f-40f9-b9d5-7b6cfdcad4813efdc5f9-e7d3-4b63-a7ff-b09a3e45f916.JPG', '4', '0', 'Astrology Club at FSU', 'mp20n@fsu.edu'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '5', '1', 'Alex Morgan', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '6', '0', 'Jordan Casey', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '8', '1', 'Jamie Park', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '7', '1', 'Taylor Reed', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '9', '0', 'Casey Lee', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '10', '2', 'Riley Quinn', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '11', '2', 'Dakota Ellis', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '12', '3', 'Parker Grey', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '13', '1', 'Morgan Bailey', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '14', '3', 'Quinn Avery', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '15', '1', 'Charlie Jordan', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '16', '3', 'Skyler Pat', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '17', '2', 'Robin Blake', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '18', '0', 'Jesse Cameron', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '19', '1', 'Avery Sam', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '20', '0', 'Rowan Alex', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '21', '3', 'Drew Jordan', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '22', '0', 'Sawyer Lee', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '23', '0', 'Peyton Chris', 'temp@gmail.com'],
      ['https://clipartcraft.com/images/no-logo-placeholder-2.png', '24', '2', 'Kai Morgan', 'temp@gmail.com'],
    ],
    widthPercents: [15, 10, 10, 25, 20, 20],
    type: 'Club'
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

export default AdminClubs;