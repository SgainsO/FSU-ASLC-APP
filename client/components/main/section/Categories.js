import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../cards/HomeEventCard';
import CommentSection from '../modal/Comments';

const Categories = () => {
  const getTodayDate = () => {
    const currentDate = new Date();
    const format = { weekday: 'long', month: '2-digit', day: '2-digit', year: '2-digit' };
    const finalFormat = currentDate.toLocaleDateString('en-US', format);
    return finalFormat;
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };

  const textStyle = {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  };

  const data = [
    { id: 0, title: 'Movies', image_link: 'https://media.newyorker.com/photos/64ba967803ba9998f5c20360/master/w_960,c_limit/TNY_final_2.jpg', dbLink: 'mov'},
    { id: 1, title: 'Games',  image_link: 'https://www.smashbros.com/assets_v2/img/movie/20200622_1.jpg', dbLink: 'game' },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigate = (navigateTo) => {
    navigation.navigate(navigateTo);
  }

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        Categories
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Card {...item} />
          </View>
        )}
        showsVerticalScrollIndicator={false} 
        keyExtractor={item => item.id.toString()}
        vertical
      />

    </View>
  );
};

export default Categories;
