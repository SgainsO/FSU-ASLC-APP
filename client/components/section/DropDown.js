import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, FlatList, Button, Input  } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import FAQs from './FAQs'



const DropDown = () => {
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
        <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{color: 'black', alignItems: 'center' }}>Show Modal</Text>
        
      </TouchableOpacity>
        
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


    export default DropDown;