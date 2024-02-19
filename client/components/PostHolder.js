import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
//import { ImageBackground, TouchableOpacity } from 'react-native-web';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

//Back Color is used to keep the holder the same color as callers background
PostWidth = width * 3/4;
iconHolderWidth = PostWidth * 1/5;
iconWidth = iconHolderWidth * 1/2;
const Icons = [require("../assets/Like.png"), require("../assets/message.png"),
require("../assets/Bookmark.png"), require("../assets/Share.png")]
const months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];    
PostHeight = height * 1;


const PostHolder = (props) => {
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
            marginTop: '10%',
//            margin: '10%',
            shadowOpacity: 0.8,
            shadowRadius: 10,
            shadowColor: '#000',
  //          padding: '20%',
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
            width: '40%',
            height: '20%',
            flexDirection: 'row',
            top: '80%',
            left: '27%',
        },
        DotHolder:
        {   position: 'absolute',
            justifyContent: 'center',
            width: iconHolderWidth /2,
            flexDirection: 'row',
            bottom: '95%',
            },
        IconStyle:
        {
            flex: 1,
            marginBottom: 1,
            width: iconWidth,
            height: undefined,
            aspectRatio: 1,
            resizeMode: 'contain',
            marginLeft: 10,
        },
        OrgAndDeventParent:
        {
          position: 'absolute',
          justifyContent: 'left',
          flex: 1,
          flexDirection: 'row',
//          backgroundColor: 'green',
          top: 15,
          left:15
          
        },
        OrgPhotoHolder:
        {
            height: 40,
            width: 80,
            borderRadius: 40,
        },
        ProfileImage:
        {
          height: 40,
          width: 40,
          borderRadius:20,
          overflow: 'hidden'
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

    

      const TestPhotos = [require("../assets/Daniel.jpg"), require("../assets/Ryan.jpg")]
      const [Image_Source, ChaImageSource] = useState(TestPhotos[0])
      const [ImageIndex, ChangeImageIndex] = useState(0)

      const {clubName, date} = props;

      console.log(clubName)
      const IconView = ({icons}) => {                                    // Create progress widgets and Icon widgets 
        return (
          <View style={Styles.VectorStyle}>
            {icons.map((icon, index) => (
              <Image key={index} source={icon} style={Styles.IconStyle}  />
            ))}
          </View>
        );
      };
      const dots = []
      const dotColors = []

      for (let i = 0; i < TestPhotos.length; i++)
      {
        const [color, setColor] = useState(i === 0 ? "black" : "white")
        dotColors.push({color, setColor})
        dots.push(
          <Icon name= 'square' size={4} color={color} style= {{margin: 1}}/>
        )
      }
        
    



      const GoForeward = () =>
      {
        ImageIndex < (TestPhotos.length - 1) ? ChangeImageIndex(ImageIndex + 1) : ChangeImageIndex(0);           ///Changes the image index
        console.log("Going to " + ImageIndex)  
        ChaImageSource(TestPhotos[ImageIndex])       
        dotColors[ImageIndex !== 0 ? ImageIndex - 1 : TestPhotos.length - 1].setColor("white")                   //Sets previous to White and Current to black
        dotColors[ImageIndex].setColor("black")
      } 

      const GoBackward =  () =>
      {
        ImageIndex > 0 ? ChangeImageIndex(ImageIndex - 1) : ChangeImageIndex(TestPhotos.length - 1);      //saves the current image index
        console.log("Going to " + ImageIndex)
        ChaImageSource(TestPhotos[ImageIndex])
        dotColors[ImageIndex === TestPhotos.length - 1 ? 0 : ImageIndex + 1].setColor("white")             // Sets previous Image Tracker to white and Current to Black
        console.log("ii is: " + ImageIndex)
        dotColors[ImageIndex].setColor("black")
      }

return (
    <View style = {Styles.PostHolderStyle}>
        <Image
        style = {Styles.ImageStyle}
        source = {Image_Source}
        resizeMode= {'contain'} />
        <IconView icons={Icons} spacing={10} />         
        <View style = {Styles.DotHolder}>
        {dots}
        </View>
        <View style = {Styles.OrgAndDeventParent}>
        <Image style = {Styles.ProfileImage} source = {require("../assets/smile.png")}/>
        <View style = {Styles.OrgPhotoHolder}> 
        <Text style= {{color: "white", marginLeft: 3}}>
          {clubName}
        </Text>
        <Text style= {{color: "white", marginLeft: 3}}>
          {months[date.getMonth()]}
        </Text>
        </View>
        </View>
        <TouchableOpacity onPress = {GoBackward} style = {Styles.GoLeft}>
        </TouchableOpacity> 
        
        <TouchableOpacity onPress={GoForeward} style = {Styles.GoRight}>
        </TouchableOpacity>


    </View>
  
 

        
       

);

};

export default PostHolder;

