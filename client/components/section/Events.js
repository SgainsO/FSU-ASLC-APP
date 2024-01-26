import { View, FlatList, Text } from 'react-native';

import Card from '../Card';

const Home = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  return (
    <View style={containerStyle}>
      <Text> Events </Text>
    </View>
  );
};

export default Home;
