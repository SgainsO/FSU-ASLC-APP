import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import PostHolder from './PostHolder';
const {width, height} = Dimensions.get('window');
import { useFonts, AbhayaLibre_400Regular } from '@expo-google-fonts/abhaya-libre';
const PostEventTemplate = (props) => 
{
const {Title} = props; 


Title !== undefined ? Title : "NO_TITLE"; 

return (
    <View style= {styles.PageStyle}>
        <TextInput
            style = {styles.searchBar}
            placeholder= "Search"
        />
        <Text style = {styles.titleStyle}> Past Events </Text>  
        <View style = {styles.line}></View>
    <View style = {styles.ScrollHolderStyle}>
    <ScrollView 
       contentContainerStyle= {styles.scrollStyle}
       showsVerticalScrollIndicator = {false}
       >
        <View style= {styles.post}>  
        <PostHolder clubName= "Club One" date = {new Date('2024-02-17T12:00:00')}/>
        <PostHolder clubName= "Club Two" date = {new Date('2024-02-17T12:00:00')}/>
        <PostHolder clubName= "Club Three" date = {new Date('2024-02-17T12:00:00')}/>
        <PostHolder clubName= "Club Four" date = {new Date('2024-02-17T12:00:00')}/>
        <PostHolder clubName= "Club Five" date = {new Date('2024-02-17T12:00:00')}/>
        </View>
    </ScrollView>
    </View>
    </View>  
);

}

const styles = StyleSheet.create
({
PageStyle: 
{
   flex: 1,
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
    },
 ScrollHolderStyle: 
 {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
 },
 scrollStyle:
 {  
    width: '100%',
    alignItems: 'center',    
 },
 titleStyle:
 {
    fontFamily: 'AbhayaLibre_400Regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8C5E5E',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,   
 },
 post:
 {
    paddingLeft: 10,
    paddingRight: 10,
    alignContent: 'center',
    justifyContent: 'center',
 },
 searchBar:
 {
    marginTop: 20,
    fontFamily: 'AbhayaLibre_400Regular',
    width: '80%',
    height: '3%',
    borderRadius: '30px',
    backgroundColor: '#D9D9D9',
    textAlign: 'center'
 }, 
 line:
 {
    width: '100%',
    height: 1,
    backgroundColor: '#8C5E5E',
 }


})

export default PostEventTemplate;