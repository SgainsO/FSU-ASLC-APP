import React, { useState, } from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';

import AdminTable from '../tables/AdminTable';
import SearchBar from '../SearchBar';

import { Entypo } from '@expo/vector-icons';
import AdminCreation from '../modal/AdminCreation';

const AdminUsers = () => {
  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // Dropdown filter consts
  const [dropdownType, setdropdownType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
    
  state = {
    tableHead: ['Avatar', 'ID', 'Name', 'Email', 'Actions'],
    tableData: [
      ['https://c.stocksy.com/a/bBo600/z9/1622887.jpg', '0', 'Daniel Dang', 'dtd21b@fsu.edu'],
      ['https://i.pinimg.com/originals/80/fb/8d/80fb8d8390601bfe5ba4c52b4dc79b8a.jpg', '1', 'Zachary De Aguiar', 'zzd21@fsu.edu'],
      ['https://i.pinimg.com/236x/47/51/48/475148587abdbdd81cc3d09fdbcbab16.jpg', '2', 'Jas Chawla', 'jsc21b@fsu.edu'],
      ['https://th.bing.com/th/id/R.57529fe941352b6a608aa0c77cacc099?rik=ja%2f2y3qTNUZQVQ&riu=http%3a%2f%2fwww.pak101.com%2ffunnypictures%2fFunny%2f2011%2f7%2f22%2f5_cjlxs.jpg&ehk=8WobPJQV0XRZ0iGg7UzDSOJbCsygoHpsoYYUz7WoF9o%3d&risl=&pid=ImgRaw&r=0.jpg', '3', 'Ryan Nageer', 'rfn22@fsu.edu'],
      ['https://th.bing.com/th/id/OIP.3GZTipqj8i7LniAr6IgDdwAAAA?rs=1&pid=ImgDetMain.jpg', '4', 'Matthew Echenique', 'mme21a@fsu.edu'],
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
    type: 'User'
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

export default AdminUsers;