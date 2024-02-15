import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import PostHolder from './PostHolder';
const {width, height} = Dimensions.get('window');
const PostEventTemplate = (props) => 
{
const {Title} = props; 



Title !== undefined ? Title : "NO_TITLE"; 

return (
    <View style= {styles.mainStyle}>
        <Text style = {styles.titleStyle}> Yesy </Text>  
    <View style = {styles.mainStyle}>
    <ScrollView contentContainerStyle= {styles.mainStyle}>
        <PostHolder clubName= "Club One"/>
        <PostHolder clubName= "Club Two"/>
        <PostHolder clubName= "Club Three"/>
        <PostHolder clubName= "Club Four"/>
        <PostHolder clubName= "Club Five"/>
    </ScrollView>
    </View>
    </View>  
);

}

const styles = StyleSheet.create
({
 mainStyle: 
 {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',


 },
 titleStyle:
 {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,   
 }



})

export default PostEventTemplate;