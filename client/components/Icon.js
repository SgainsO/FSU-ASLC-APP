import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';

const Icon = (props) => {
  const iconStyle = {
    width: 30,
    height: 30,
    marginTop: 12,
    marginHorizontal: 28,
    marginBottom: 4,
  };

  const textStyle = {
    fontSize: 12,
    fontWeight: 600,
    ...(props.textColor && { color: props.textColor }),
    textAlign: 'center',
  };

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <Image source={props.iconSource} style={iconStyle} />
        {props.text && <Text style={textStyle}>{props.text}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Icon;
