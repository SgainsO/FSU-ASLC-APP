import { Text, Image, View } from 'react-native';

const Header = () => {
    const barStyle = {
        flex: 1,
        flexDirection: 'row',
        minHeight: 45,
        backgroundColor: '#782F40',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
  };

    return (
        <View style={barStyle}>
            <Image source={require('../assets/fsu_logo.png')} style={{ width: 50, height: 50, margin: 4 }} />
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 600, marginBottom: 8 }}>ASLC Connect</Text>
            <Image source={require('../assets/burger_menu.png')} style={{ width: 25, height: 25, margin: 8 }} />
        </View>
  );
};

export default Header;
