import { Dimensions, StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImageBackground } from 'react-native-web';
const {width, height} = Dimensions.get('window');

//Back Color is used to keep the holder the same color as callers background
PostWidth = width * 1/3;
const Icons = [require("../assets/Like.png"), require("../assets/message.png"),
require("../assets/Bookmark.png"), require("../assets/Share.png")]

const PostHolder = (Club, Date, BackColor) => {
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
            width: width * 1/3,
            borderRadius: 80,
            aspectRatio: 1,

        //    background: 'transparent',
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
            width: width * 1/3, 
            aspectRatio: 1,
            background: 'transparent',
            alignSelf: 'left'
        },
        VectorStyle:
        {
            flex: 1,
            marginBottom: 50,
//            width:'50%',
//            height: '50%'
        },
/*        ButtonEdge:
       {
            backgroundColor: ccc8b9,
            height: '100%',
            width: 50
        }
*/
    });

    const IconView = ({ icons, spacing = 10 }) => {
        return (
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            {icons.map((icon, index) => (
              <Image key={index} source={icon} style={{ marginBottom: spacing }} />
            ))}
          </View>
        );
      };

      
return (
    <View style = {Styles.Canvas}>

    <View style = {Styles.PostHolderStyle}>
        <Image
        style = {Styles.ImageStyle}
        source = {require('../assets/Daniel.jpg')}
        resizeMode= {'contain'} />
    </View>
        <View style = {Styles.RightButtonStyle}>
        <IconView icons={Icons} spacing={10} />
        </View>

 

        
       
    </View>
);

};

export default PostHolder;


/*
    <Image style ={{paddingBottom : 100}}
            source={ require('../assets/Bookmark.png')} />
         </View>
         <View style = {Styles.RightButtonStyle}>
            <Image
             style = {Styles.VectorStyle}
             source={require('../assets/Share.png')} />
          </View>
          <View style = {Styles.RightButtonStyle}>
            <Image
            style = {Styles.VectorStyle}
            source={require('../assets/message.png')} />
            </View>
         <View style = {Styles.RightButtonStyle}>
            <Image 
            style = {Styles.VectorStyle}
            source={require('../assets/Like.png')} />
*/