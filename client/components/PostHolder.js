import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, Touchable } from 'react-native';
import { ImageBackground, TouchableOpacity } from 'react-native-web';
const {width, height} = Dimensions.get('window');

//Back Color is used to keep the holder the same color as callers background
PostWidth = width * 1/2;
iconHolderWidth = PostWidth * 1/5;
iconWidth = iconHolderWidth * 1/2;
const Icons = [require("../assets/Like.png"), require("../assets/message.png"),
require("../assets/Bookmark.png"), require("../assets/Share.png")]

PostHeight = height * 1;


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
            width: PostWidth,
            borderRadius: 40,
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
            width: PostWidth, 
            aspectRatio: 1,
            background: 'transparent',
            alignSelf: 'left'
        },
        VectorStyle:             // Holds the icon
        {
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            width: '50%',
            height: '20%',
            flexDirection: 'row',
            top: '80%',
            left: '25%',
        },
        IconStyle:
        {
            flex: 1,
            marginBottom: 1,
            width: iconWidth,
            height: undefined,
            aspectRatio: 1,
            resizeMode: 'contain'
        },
        GoLeft:
        {
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            height: height,
            width: PostWidth * 1/4,

        },
        GoRight:
        {
            position: 'absolute',
            top: 0,
            right: 0,
     //       backgroundColor: 'black',
            flex: 1,
            height: height,
            width: PostWidth * 1/4,
            transform: [{scaleX: -1}]
        }
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
          <View style={Styles.VectorStyle}>
            {icons.map((icon, index) => (
              <Image key={index} source={icon} style={Styles.IconStyle}  />
            ))}
          </View>
        );
      };

      const TestPhotos = [require("../assets/Daniel.jpg"), require("../assets/Ryan.jpg")]
      const [Image_Source, ChaImageSource] = useState(TestPhotos[0])
      const [ImageIndex, ChangeImageIndex] = useState(0)

      const GoForeward = () =>
      {
        ImageIndex < (TestPhotos.length - 1) ? ChangeImageIndex(ImageIndex + 1) : ChangeImageIndex(0); 
        console.log("Going to " + ImageIndex)
        ChaImageSource(TestPhotos[ImageIndex])
      } 

      const GoBackward = () =>
      {
        ImageIndex > 0 ? ChangeImageIndex(ImageIndex - 1) : ChangeImageIndex(TestPhotos.length - 1); 
        console.log("Going to " + ImageIndex)
        ChaImageSource(TestPhotos[ImageIndex])
      }

return (
    <View style = {Styles.PostHolderStyle}>
        <Image
        style = {Styles.ImageStyle}
        source = {Image_Source}
        resizeMode= {'contain'} />
        <IconView icons={Icons} spacing={10} />         
        <TouchableOpacity onPress = {GoBackward} style = {Styles.GoLeft}>
        </TouchableOpacity> 
        
        <TouchableOpacity onPress={GoForeward} style = {Styles.GoRight}>
        
        </TouchableOpacity>


    </View>
  
 

        
       

);

};

export default PostHolder;
