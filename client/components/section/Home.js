import React, { useState, useContext } from 'react';
import { View, FlatList, Text, Button } from 'react-native';

import CommentSection from '../modal/Comments';

const Home = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={containerStyle}>
      <Button title="Placeholder Comments Button" onPress={toggleModal} />
      <CommentSection isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

export default Home;
