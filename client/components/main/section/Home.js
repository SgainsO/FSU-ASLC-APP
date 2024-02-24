import React, { useState, } from 'react';
import { View, Button, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation();

  const navigate = (navigateTo) => {
    navigation.navigate(navigateTo);
  }

  return (
    <View style={containerStyle}>
      <Button title="Placeholder Comments Button" onPress={toggleModal} />
      <CommentSection isVisible={isModalVisible} onClose={toggleModal} />

      <Button title="Placeholder Settings Button" onPress={() => navigate('Settings')} />
      <Button title="Placeholder Signout Button" onPress={() => navigate('Login')} />
    </View>
  );
};

export default Home;
