import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';

import { getURL } from '../../AxiosService';

import { Entypo } from '@expo/vector-icons';
import AdminCreation from '../modal/AdminCreation';

const AdminUsers = () => {
  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState({
    tableHead: ['Admin', 'First Name', 'Last Name', 'Email', 'Actions'],
    tableData: [],
    widthPercents: [20, 20, 20, 20, 20],
    type: 'User'
  });
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${getURL()}/api/getUsers`);

        console.log(response)
        const formattedData = response.data.data.map(user => [
          user.admin_priv === 'true'? 'Yes' : 'No',
          user.firstname,
          user.lastname,
          user.email,
        ]);
        console.log('formattedData: ', formattedData);
        setUserData(prevState => ({ ...prevState, tableData: formattedData }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);


  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <AdminCreation isModalVisible={isModalVisible} setModalVisible={setModalVisible} type="User" />
      <View style={styles.topContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        <TouchableOpacity onPress={toggleModal}>
          <Entypo name="squared-plus" size={40} color="#27ae60" />
        </TouchableOpacity>
      </View>
      <AdminTable searchPhrase={searchPhrase} state={userData}/>
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
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
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

export default AdminUsers;