import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import Icon from './Icon';

const windowWidth = Dimensions.get('window').width;

const Footer = () => {
    const barStyle = {
        flex: 1,
        flexDirection: 'row',
        minHeight: 45,
        backgroundColor: '#782F40',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    };

    const iconStyle = {
        width: windowWidth * 0.06,
        height: windowWidth * 0.06,
        borderRadius: 0,
        marginTop: 12,
        marginHorizontal: 28,
        marginBottom: 4,
    }

    const navigation = useNavigation();
    
    const [activeIcon, setActiveIcon] = useState("Home");
    const [isAdmin, setIsAdmin] = useState(false);

    const userIcons = [
        { name: 'Home', navigateTo: 'Home', activeImage: require('../../assets/home_filled.png'), inactiveImage: require('../../assets/home_outline.png') },
        { name: 'Search', navigateTo: 'Search', activeImage: require('../../assets/search_filled.png'), inactiveImage: require('../../assets/search_outline.png') },
        { name: 'Post', navigateTo: 'Post', activeImage: require('../../assets/post_filled.png'), inactiveImage: require('../../assets/post_outline.png') },
        { name: 'Events', navigateTo: 'Categories', activeImage: require('../../assets/events_filled.png'), inactiveImage: require('../../assets/events_outline.png') },
        { name: 'Rewards', navigateTo: 'Rewards', activeImage: require('../../assets/rewards_filled.png'), inactiveImage: require('../../assets/rewards_outline.png') },
    ]

    const adminIcons = [
        { name: 'Users', navigateTo: 'Home', activeImage: require('../../assets/home_filled.png'), inactiveImage: require('../../assets/home_outline.png') },
        { name: 'Events', navigateTo: 'Search', activeImage: require('../../assets/search_filled.png'), inactiveImage: require('../../assets/search_outline.png') },
        { name: 'Clubs', navigateTo: 'Post', activeImage: require('../../assets/post_filled.png'), inactiveImage: require('../../assets/post_outline.png') },
    ];

    // set icons based off of user type
    const icons = isAdmin ? adminIcons : userIcons;

    const handleIconPress = (iconName, navigateTo) => {
        setActiveIcon(iconName);
        navigation.navigate(navigateTo);
    };

    return (
        <View style={barStyle}>
            {icons.map((icon, index) => (
                <Icon
                    key={index}
                    iconSource={activeIcon === icon.name ? icon.activeImage : icon.inactiveImage}
                    text={icon.name}
                    textColor={activeIcon === icon.name ? '#CEB888' : 'white'}
                    onPress={() => handleIconPress(icon.name, icon.navigateTo)}
                    iconStyle={iconStyle}
                />
            ))}
        </View>
    );
};

export default Footer;