import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const Icon = ({ iconSource, text, textColor = 'white', onPress }) => {
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
    color: textColor,
    textAlign: 'center',
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Image source={iconSource} style={iconStyle} />
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Icon;
