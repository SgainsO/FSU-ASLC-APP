import { View } from 'react-native';

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

    return (
        <View style={barStyle}>
            <Icon iconSource={require('../assets/home_outline.png')} text="Home" />
            <Icon iconSource={require('../assets/search_outline.png')} text="Search" />
            <Icon iconSource={require('../assets/post_outline.png')} text="Post" />
            <Icon iconSource={require('../assets/events_filled.png')} text="Events" textColor="#CEB888" />
            <Icon iconSource={require('../assets/rewards_outline.png')} text="Rewards" />
        </View>
    );
};

export default Footer;
