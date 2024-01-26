import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from './Icon';

const Footer = () => {
    const barStyle = {
        flex: 1,
        flexDirection: 'row',
        minHeight: 45,
        backgroundColor: '#782F40',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    };

    const navigation = useNavigation();
    
    const [activeIcon, setActiveIcon] = useState("Home");

    const handleIconPress = (iconName, navigateTo) => {
        setActiveIcon(iconName);
        navigation.navigate(navigateTo);
    };

    return (
        <View style={barStyle}>
            <Icon
                iconSource={activeIcon === 'Home' ? require('../assets/home_filled.png') : require('../assets/home_outline.png')}
                text="Home"
                textColor={activeIcon === 'Home' ? "#CEB888" : undefined}
                onPress={() => handleIconPress('Home', 'Home')}
            />
            <Icon
                iconSource={activeIcon === 'Search' ? require('../assets/search_filled.png') : require('../assets/search_outline.png')}
                text="Search"
                textColor={activeIcon === 'Search' ? "#CEB888" : undefined}
                onPress={() => handleIconPress('Search', 'Search')}
            />
            <Icon
                iconSource={activeIcon === 'Post' ? require('../assets/post_filled.png') : require('../assets/post_outline.png')}
                text="Post"
                textColor={activeIcon === 'Post' ? "#CEB888" : undefined}
                onPress={() => handleIconPress('Post', 'Post')}
            />
            <Icon
                iconSource={activeIcon === 'Events' ? require('../assets/events_filled.png') : require('../assets/events_outline.png')}
                text="Events"
                textColor={activeIcon === 'Events' ? "#CEB888" : undefined}
                onPress={() => handleIconPress('Events', 'Events')}
            />
            <Icon
                iconSource={activeIcon === 'Rewards' ? require('../assets/rewards_filled.png') : require('../assets/rewards_outline.png')}
                text="Rewards"
                textColor={activeIcon === 'Rewards' ? "#CEB888" : undefined}
                onPress={() => handleIconPress('Rewards', 'Rewards')}
            />
        </View>
    );
};

export default Footer;
