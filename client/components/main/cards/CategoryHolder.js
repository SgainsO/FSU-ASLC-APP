import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
//import { ImageBackground, TouchableOpacity } from 'react-native-web';
const {width, height} = Dimensions.get('window');

//Back Color is used to keep the holder the same color as callers background
PostWidth = width * 1/2 - 20;
iconHolderWidth = PostWidth * 1/5;
iconWidth = iconHolderWidth * 1/2;
//const Icons = [require("../assets/Like.png"), require("../assets/message.png"),
//require("../assets/Bookmark.png"), require("../assets/Share.png")]
PostHeight = height * 1;

const CategoryHolder = (props) => {
    const Styles = StyleSheet.create({
        Canvas:
        {
            flex: 1,
            flexDirection: 'row',
            borderBottomLeftRadius: 80,
            borderTopLeftRadius: 80,
            backgroundColor: '#ccc8b9',

//            borderRadius: 30
        },
        PostHolderStyle: {
            flexDirection: 'row',
            backgroundColor: 'ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            width: PostWidth,
            borderRadius: 20,
            aspectRatio: 1,
            marginTop: '10%',
            shadowOpacity: 0.8,
            shadowRadius: 10,
            shadowColor: '#000',
            overflow: 'hidden'
        },
        RightButtonStyle: {
            height: '100%',
            width: 38,
            alignItems: 'center',
            justifyContent: 'flex-end',
  //          backgroundColor: '#ccc8b9',
        },
        ImageStyle:
        {
            flex: 1,
            width: PostWidth, 
            aspectRatio: 1,
            background: 'transparent',
        },
        IconStyle:
        {
            flex: 1,
            marginBottom: 1,
            width: iconWidth,
            height: undefined,
            aspectRatio: 1,
            resizeMode: 'contain',

        },
        CatNameHolder:
        {
          position: 'absolute',
          textAlign: 'center',
          textAlignVertical: "center",
          justifyContent: 'center',
          alignContent: 'center',
          width: PostWidth,
          top: '45%',
          
        },
        TitleStyle:
        {
          color: 'white', 
          fontWeight: 'bold',
          alignSelf: 'center',
          textShadowColor: 'black',
          textShadowRadius: '10px',
        }

/*        ButtonEdge:
       {
            backgroundColor: ccc8b9,
            height: '100%',
            width: 50
        }
*/
    });

    const {navigation} = props;
    function NavigateToEvent()
    {
        navigation.navigate('Events', {title: props.title, dbLink: props.dbLink});
    }


      const dots = []
      const dotColors = []



return (
    <TouchableOpacity style = {Styles.PostHolderStyle} onPress={() => NavigateToEvent}>
        <Image
        style = {Styles.ImageStyle}
        source = {{uri: props.url}}
        resizeMode= {'cover'} />
        <View style = {Styles.CatNameHolder}>
          <Text style = {Styles.TitleStyle}>{props.title}</Text>
        </View>

    </TouchableOpacity>
  
 

        
       

);

};

export default CategoryHolder;

