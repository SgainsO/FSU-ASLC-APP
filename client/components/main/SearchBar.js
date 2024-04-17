import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';
import { useColorSchemeContext } from './ColorSchemeContext';

const SearchBar = (props) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>

      <View style={ [!props.clicked ? styles.searchBar__unclicked : styles.searchBar__clicked,] }>
        <Ionicons
          name="search"
          size={16}
          color="#3C3C4360"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={[styles.input, colorScheme === 'dark' && styles.darkText]}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => { props.setClicked(true); }}
        />
        {props.clicked && props.searchPhrase != "" && (
          <Entypo 
            name="cross" 
            size={16} 
            color="#3C3C4360" 
            style={{  }} 
            onPress={() => { props.setSearchPhrase("") }}
          />
        )}
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
              props.setSearchPhrase("");
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 7,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "84%",
    maxWidth: 360,
    height: 35,
    
  },
  darkContainer: {
    backgroundColor: 'black',
    color: 'white',
  },
  darkText: {
    color: 'white',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    alignItems: "center",
    height: 35,
    
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    alignItems: "center",
    height: 35,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    height: "150%",
    width: "85%",
    color: '#3C3C4399',
  },
});

export default SearchBar;