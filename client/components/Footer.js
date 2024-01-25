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
    
    return (
        <View style={barStyle}>
            <Icon
                iconSource={require('../assets/home_outline.png')}
                text="Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Icon
                iconSource={require('../assets/search_outline.png')}
                text="Search"
                onPress={() => navigation.navigate('Events')}
            />
            <Icon
                iconSource={require('../assets/post_outline.png')}
                text="Post"
                onPress={() => navigation.navigate('Events')}
            />
            <Icon
                iconSource={require('../assets/events_filled.png')}
                text="Events"
                textColor="#CEB888"
                onPress={() => navigation.navigate('Events')}
            />
            <Icon
                iconSource={require('../assets/rewards_outline.png')}
                text="Rewards"
                onPress={() => navigation.navigate('Rewards')}
            />
        </View>
    );
};

export default Footer;
