import React, { useState, } from 'react';
import { View, StyleSheet, Button, FlatList, Text } from 'react-native';

import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';

const AdminUsers = () => {
    // Search bar consts
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    // Dropdown filter consts
    const [dropdownType, setdropdownType] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
  state = {
    tableHead: ['UUID', 'Name', 'Actions'],
    tableData: [
      ['0', 'Daniel Dang', '',],
      ['1', 'Zachary De Aguiar', '',],
      ['2', 'Jas Chawla', '',],
      ['3', 'Ryan Nageer', '',],
      ['4', 'Matthew Echenique', '',],
      ['5', 'Alex Morgan', '',],
      ['6', 'Jordan Casey', '',],
      ['7', 'Taylor Reed', '',],
      ['8', 'Jamie Park', '',],
      ['9', 'Casey Lee', '',],
      ['10', 'Riley Quinn', '',],
      ['11', 'Dakota Ellis', '',],
      ['12', 'Parker Grey', '',],
      ['13', 'Morgan Bailey', '',],
      ['14', 'Quinn Avery', '',],
      ['15', 'Charlie Jordan', '',],
      ['16', 'Skyler Pat', '',],
      ['17', 'Robin Blake', '',],
      ['18', 'Jesse Cameron', '',],
      ['19', 'Avery Sam', '',],
      ['20', 'Rowan Alex', '',],
      ['21', 'Drew Jordan', '',],
      ['22', 'Sawyer Lee', '',],
      ['23', 'Peyton Chris', '',],
      ['24', 'Kai Morgan', '',],
    ],
    //widthArr: [50, 60, 80]
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <SearchBar
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
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
    height: 60,
    marginBottom: 10,
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
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginBottom: 0,
  },
});

export default AdminUsers;