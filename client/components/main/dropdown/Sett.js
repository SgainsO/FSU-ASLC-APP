import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


    

    

const WordWithLine = ({ word, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.word}>{word}</Text>
        <View style={styles.line} />
      </View>
      </TouchableOpacity>
    );
  };
  const WordWithLineRed = ({ word, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.word2}>{word}</Text>
        <View style={styles.line} />
      </View>
      </TouchableOpacity>
    );
  };

const Sett = () => {
    const navigation = useNavigation();
    
    const [activeIcon, setActiveIcon] = useState("Home");

    const handleIconPress = (iconName, navigateTo) => {
        setActiveIcon(iconName);
        navigation.navigate(navigateTo);
    };

    return (

<View>
    <View style={styles.Title}>
            <Text style={styles.Title}>Settings</Text>
            <Image
        source={require('../../../assets/gear.png')} 
        style={styles.image}
        />
        </View>

        

<View>
    <Text></Text>
</View>
    <WordWithLine/>
      <WordWithLine word="Account                                       >" onPress={() => handleIconPress('Account', 'Account')} />    
      <WordWithLine word="Display                                         > "onPress={() => handleIconPress('Display', 'Display')} />
      <WordWithLine word="Notifications                               >" onPress={() => handleIconPress('Notifications', 'Notifications')}/>
      <WordWithLine word="Interaction History                    >" onPress={() => handleIconPress('Interaction', 'Interaction')}/>
      <WordWithLine word="Contact Us                                  >" onPress={() => handleIconPress('ContactUs', 'ContactUs')}/>
      <WordWithLineRed word="Log out                                         " />

</View>
    )}

    const styles = StyleSheet.create({
        Title: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'black', fontSize: 40, fontWeight: 'bold',
            marginLeft: 5,
        },
        line: {
            height: 1,
            backgroundColor: 'black',
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
          },
          word2: {
            fontSize: 30,
            marginBottom: 5,
            marginLeft: 20,
            marginTop: 10,
            color: 'red'
          },
    });

    export default Sett;