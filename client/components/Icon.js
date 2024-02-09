import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';

const Icon = (props) => {
  const textStyle = {
    fontSize: 12,
    fontWeight: '600',
    ...(props.textColor && { color: props.textColor }),
    textAlign: 'center',
  };

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <Image source={props.iconSource} style={props.iconStyle} />
        {props.text && <Text style={textStyle}>{props.text}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Icon;