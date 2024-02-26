import React, { useState } from 'react';
import { Text, Image, View, TouchableWithoutFeedback, StyleSheet, KeyboardAvoidingView, Platform, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

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

    const iconStyle = {
        width: 30,
        height: 30,
        marginTop: 8,
        marginBottom: 8,
        marginHorizontal: 8,
    };

    const navigation = useNavigation();

    const [activeIcon, setActiveIcon] = useState("Home");

    const handleIconPress = (iconName, navigateTo) => {
        setActiveIcon(iconName);
        navigation.navigate(navigateTo);
    };

    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    function freq()
    {
        setModalVisible(false);
        handleIconPress('FAQs', 'FAQs')
    }

    return (
        <View style={barStyle}>
            <Image source={require('../assets/fsu_logo.png')} style={{ width: 50, height: 50, margin: 4 }} />
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 600, marginBottom: 8 }}>ASLC Connect</Text>
            <Icon
                iconStyle={iconStyle}
                iconSource={activeIcon === 'Home' ? require('../assets/burger_menu.png') : require('../assets/burger_menu.png')}
                onPress={() => setModalVisible(true)}
            />

            <Modal
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                visible = {isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
                >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
                    <View style={styles.container}>

                
                    <Text>Sample Text</Text>
                    <Button color = 'white' fontSize large title="Frequently Asked Questions           |" 
                    onPress={() => freq()}
                    titleStyle={{
                        fontSize: 16,
                    }}
                    />
                    <TouchableOpacity onPress={toggleModal}>
                        <Text>Close Modal</Text>
                    </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#782F40',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    modal: {
        marginLeft: 10,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 104,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)', // transparent background
      },
    });

export default Header;