import { View } from 'react-native';

import Events from './section/Events';
import Home from './section/Home';
import Rewards from './section/Rewards';

const Content = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  return (
    <View style={containerStyle}>
      <Events />
    </View>
  );
};

export default Content;
