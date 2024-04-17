import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';
const RoundedBox = () => {
    const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    return (
        <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
            <View style={styles.content}>
                <Image source={require('../../../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>
                <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>Unlocked Rewards will appear here.</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1, 
        borderColor: 'black',
        padding: 10,
        width: 360,
        height: 50,
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
        fontFamily: 'Arial'
    },
    darkContainer: {
        borderColor: 'white',
        backgroundColor: '#2b2b2b'
      },
      darkText: {
        color: '#FFFFFF',
      },
});

export default RoundedBox