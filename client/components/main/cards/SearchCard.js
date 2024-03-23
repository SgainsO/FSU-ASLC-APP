import { Text, View, ImageBackground, StyleSheet } from 'react-native';

const Card = ({ title, backgroundImage }) => {
const cardStyle = {
marginHorizontal: 10,
width: 150,
height: 150, // Making it square
borderRadius: 10,
backgroundColor: '#D9D9D9', // Background color for the card
shadowColor: 'rgba(0,0,0, 0.25)',
shadowOpacity: 0.5,
shadowOffset: { width: 0, height: 4 },
shadowRadius: 4,
elevation: 4,
overflow: 'hidden', // Ensure the image doesn't overflow the card
};

const overlayStyle = {
...StyleSheet.absoluteFillObject,
backgroundColor: 'rgba(120, 47, 64, 0.7)'
}

const titleContainerStyle = {
position: 'absolute',
bottom: 0,
left: 0,
right: 0,
paddingHorizontal: 8,
paddingVertical: 5,
borderBottomLeftRadius: 10, // Match the border radius of the parent View
borderBottomRightRadius: 10,
};

const titleStyle = {
fontSize: 27,
fontWeight: '600',
color: 'rgba(206, 184, 136, 1)',
};

return (
<View style={cardStyle}>
<ImageBackground source={backgroundImage} style = {{flex: 1}} resizeMode='cover'>
<View style={[overlayStyle]}>
<View style={titleContainerStyle}>
<Text style={titleStyle}>{title}</Text>
</View>
</View>
</ImageBackground>
</View>
);
};

export default Card;