import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

import AdminTable from '../tables/AdminTable';

const AdminUsers = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };
  
  state = {
    tableHead: ['UUID', 'Name', 'Actions'],
    tableData: [
      ['0', 'Daniel Dang', '3',],
      ['1', 'Zachary De Aguiar', 'c',],
      ['2', 'Jas Chawla', '3',],
      ['3', 'Ryan Nageer', 'c',],
      ['4', 'Matthew Echenique', '3',],
    ],
    //widthArr: [50, 60, 80]
  }

  return (
    <View style={containerStyle}>
      <AdminTable state={state}/>
    </View>
  );
};

export default AdminUsers;
