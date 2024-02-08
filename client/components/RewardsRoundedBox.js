import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native';

const RoundedBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/fsu_coins.png')} style={{width: 20, height: 20}}/>
                <Text style={styles.text}>Unlocked Rewards will appear here.</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth:1, 
        borderColor: 'black',
        padding: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
    }
});

export default RoundedBox