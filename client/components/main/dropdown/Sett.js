import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorSchemeContext } from '../ColorSchemeContext';
import {useAuth} from "../../AuthProvider.js";
import SettingScreen from '../modal/Comments.js'
    

const WordWithLine = ({ word, onPress }) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <Text style={[styles.word, colorScheme === 'dark' && styles.darkText]}>{word}</Text>
        <View style={[styles.line, colorScheme === 'dark' && styles.whiteline]} />
      </View>
      </TouchableOpacity>
    );
  };
  const WordWithLineRed = ({ word, onPress }) => {
    const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.word2}>{word}</Text>
        <View style={[styles.line,colorScheme === 'dark' && styles.whiteline]} />
      </View>
      </TouchableOpacity>
    );
  };

const Sett = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    const navigation = useNavigation();
    
    const [activeIcon, setActiveIcon] = useState("Home");
    const { handleLogout, isLoggedIn} = useAuth();


    const handleIconPress = (iconName, navigateTo) => {
        setActiveIcon(iconName);
        navigation.navigate(navigateTo);
    };

    return (

<View style={colorScheme === 'dark' && styles.blackBackground}>
    <View style={[styles.Title,colorScheme === 'dark' && styles.darkContainer]}>
            <Text style={[styles.Title, colorScheme === 'dark' && styles.darkContainer]}>Settings</Text>
            <Image
        source={require('../../../assets/gear.png')} 
        style={styles.image}
        />
        </View>

        

<View>
    <Text></Text>
</View>
    <WordWithLine/>
      <WordWithLine word="Account                               >" onPress={() => handleIconPress('Account', 'Account')} />    
      <WordWithLine word="Display                                > "onPress={() => handleIconPress('Display', 'Display')} />
      <WordWithLine word="Notifications                        >" onPress={() => handleIconPress('Notifications', 'Notifications')}/>
      <WordWithLine word="Interaction History               >" onPress={() => handleIconPress('Interaction', 'Interaction')}/>
      <WordWithLine word="Contact Us                          >" onPress={() => handleIconPress('ContactUs', 'ContactUs')}/>
      <WordWithLineRed word="Log out                                >" onPress={() => [handleLogout(), handleIconPress('Login', 'Login')]}/>
      
<View style={colorScheme === 'dark' && styles.blackBackground}>

</View>
</View>
    )}

    const styles = StyleSheet.create({
        Title: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'black', fontSize: 45, fontWeight: 'bold',
            marginLeft: 5,
            fontFamily: 'Times New Roman',
        },
        line: {
            height: 1,
            backgroundColor: 'black',
            width: '100%', // Adjust the width of the line as needed
          },
          whiteline: {
            height: 1,
            backgroundColor: 'white',
            width: '100%', // Adjust the width of the line as needed
          },
          image: {
            width: 100, // Set the width of the image
            height: 100, // Set the height of the image
            resizeMode: 'contain', // Adjust the resizeMode property as needed
            marginRight: 25,
            marginTop: 10,
            
          },
          word: {
            fontSize: 30,
            marginBottom: 5,
            marginLeft: 20,
            marginTop: 10,
            fontFamily: 'Arial',
          },
          word2: {
            fontSize: 30,
            marginBottom: 5,
            marginLeft: 20,
            marginTop: 10,
            color: 'red',
            fontFamily: 'Arial',
          },
          darkContainer: {
            
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'white', fontSize: 45, fontWeight: 'bold',
            marginLeft: 5,
            backgroundColor: '#121212',
          },
          darkText: {
            fontSize: 30,
            marginBottom: 5,
            marginLeft: 20,
            marginTop: 10,
            color: '#FFFFFF',
            backgroundColor: '#121212',
          },
          blackBackground: {
            backgroundColor: '#121212', // Change background color to black
            paddingTop: 1,
            flex: 1,
          },
    });

    export default Sett;