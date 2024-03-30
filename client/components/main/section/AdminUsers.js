import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

import AdminTable from '../tables/AdminTable';

const AdminUsers = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    //paddingHorizontal: 16,
  };
  
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
    <View style={containerStyle}>
      <AdminTable state={state}/>
    </View>
  );
};

export default AdminUsers;
