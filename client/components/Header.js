import React, { useState } from 'react';
import { Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from './Icon'

const Header = () => {
    const barStyle = {
        flex: 1,
        flexDirection: 'row',
        minHeight: 45,
        backgroundColor: '#782F40',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    };

    const navigation = useNavigation();

    const [activeIcon, setActiveIcon] = useState("Home");

    const handleIconPress = (iconName, navigateTo) => {
        setActiveIcon(iconName);
        navigation.navigate(navigateTo);
    };

    return (
        <View style={barStyle}>
            <Image source={require('../assets/fsu_logo.png')} style={{ width: 50, height: 50, margin: 4 }} />
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 600, marginBottom: 8 }}>ASLC Connect</Text>
            <Icon
                iconSource={activeIcon === 'Home' ? require('../assets/burger_menu.png') : require('../assets/burger_menu.png')}
                onPress={() => handleIconPress('FAQs', 'FAQs')}
            />
        </View>
    );
};

export default Header;
