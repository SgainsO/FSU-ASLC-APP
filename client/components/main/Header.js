import React, { useState } from 'react';
import { Text, Image, View, TouchableWithoutFeedback, StyleSheet, KeyboardAvoidingView, Platform, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from "@expo/vector-icons";
import Modal from 'react-native-modal';
import Settings from './modal/settings';
import Animatable from 'react-native-animatable';
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
      console.log('changing modal state')
      setModalVisible(!isModalVisible);
    };

    hideModal = () => {
        console.log('changing modal state')
        setModalVisible(!isModalVisible);
    }

    function freq()
    {
        setModalVisible(false);
        handleIconPress('FAQs', 'FAQs')
    }
    function sett()
    {
        setModalVisible(false);
        handleIconPress('Sett', 'Sett')
    }

    function ModalContent()                           //Content here will show up in the modal
    {
      return(
      <View style= {{justifyContent: 'space-between', width: '100%'}}>
        <TouchableOpacity style = {styles.cat_button} onPress={() => sett()}>
            <Text style={styles.cat_button_text}>Settings</Text>
          </TouchableOpacity>

        <TouchableOpacity style = {styles.cat_button} onPress={() => freq()}>
            <Text style={styles.cat_button_text}>Frequently Asked Questions</Text>
          </TouchableOpacity>
      </View>)
    }


    return (
        <View style={barStyle}>
            <Image source={require('../../assets/fsu_logo.png')} style={{ width: 50, height: 50, margin: 4 }} />
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 600, marginBottom: 8 }}>ASLC Connect</Text>
            <Icon
                iconStyle={iconStyle}
                iconSource={activeIcon === 'Home' ? require('../../assets/burger_menu.png') : require('../../assets/burger_menu.png')}
                onPress={toggleModal}
            />

                <SettingsModule/>
        </View>
    );




    function SettingsModule()
    {
        return (
            <Modal 
              animationType='slide'
              transparent={true}
              isVisible={isModalVisible}
            //  onRequestClose={props.hideModal}
            >
              <TouchableWithoutFeedback onPress={toggleModal}>
                   <View style={modeul_styles.darkBackground}/>
             </TouchableWithoutFeedback>

        
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, backgroundColor: 'red'}}>
                <View style={modeul_styles.container}>
                  <View style={modeul_styles.headerContainer}>
  
                    <Entypo 
                      name="cross" 
                      size={24} 
                      color="#000"  
                      onPress={toggleModal}
                    />
                  </View>
                  <View style={modeul_styles.commentContainer}>
                    <ModalContent/>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          );
    };



};




const styles = StyleSheet.create({
    container: {
        flex: 3,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#782F40',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'visible',
    },
    modal: {
        marginLeft: 10,
        marginRight: 0,
        marginBottom: 104,
        marginTop: 104,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, 0)', // transparent background
        
      },
      title: {
      fontWeight: 'bold',
      },
      cat_button:
      {
        borderWidth: .25,
        fontSize: 16, 
        backgroundColor: '#CEB888',    
        textAlign: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        width: '75%',
        alignSelf: 'center',
        marginBottom: '2%',
        height: '20%',
      },
      cat_button_text:
      {
        alignSelf: 'center',
        fontWeight: 'bold',
      }
    });


    const modeul_styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          paddingTop: 0,
          alignSelf:'center',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '115%',
          overflow: 'hidden',
        },
        headerContainer:{
          backgroundColor: '#CEB888',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '5%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
        },
        commentContainer: {
          flex: 1,
          paddingHorizontal: 15,
        
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: '#EAEAEA',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          overflow: 'hidden',
        },
        commentBarContainer: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          width: '100%',
        },
        darkBackground: {
          flex: 0.4,
          width: '115%',
          alignSelf:'center',
          backgroundColor: 'rgba(0, 0, 0, 0.25)', // Semi-transparent background
        },
        commentIcon: {
          marginTop: 3,
          width: 30,
          height: 30,
          borderRadius: 15,
          marginRight: 10,
        },
        replyIcon: {
          marginTop: 3,
          width: 26,
          height: 26,
          borderRadius: 13,
          marginRight: 10,
        },
        noCommentContainer: {
          marginTop: '150%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        noCommentText: {
          fontSize: 16,
          color: 'gray',
        },
        title: {
          fontSize: 16,
          fontWeight: '600',
          textAlign: 'center',
          marginVertical: 10,
        },
        comment: {
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          padding: 5,
          marginTop: 20,
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        reply: {
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          padding: 5,
          paddingLeft: 45,
          marginTop: 10,
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        commentText: {
          flexShrink: 1,
        },
        replyText: {
          flexShrink: 1,
        },
        contentStyle:
        {
          flex: 1,
          backgroundColor: 'white',
          padding: 5,
          marginTop: 20,
          width: '100%',
        }
      });


export default Header;