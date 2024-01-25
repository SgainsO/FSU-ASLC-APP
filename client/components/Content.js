import { Text, Image, View, FlatList } from 'react-native';

import Card from './Card';
//import * as Section from './section';

const Content = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginVertical: 10,
  };

  const data = [
    { id: 0, title: 'Event 1', club: 'Club 1', date: 'MON, JAN 22 AT 10 PM', interested: 4942 },
    { id: 1, title: 'Event 2', club: 'Club 2', date: 'WED, JAN 24 - 25', interested: 2245 },
    { id: 2, title: 'Event 3', club: 'Club 3', date: 'MON, JAN 22 AT 10 AM', interested: 1632 },
    { id: 3, title: 'Event 4', club: 'Club 4', date: 'THUR, JAN 25 - 26', interested: 420 },
    { id: 4, title: 'Event 5', club: 'Club 5', date: 'MON, JAN 22 AT 9 AM', interested: 165 },
    { id: 5, title: 'Event 6', club: 'Club 6', date: 'SAT, JAN 27 - 28', interested: 42 },
  ];

  return (
    <View style={containerStyle}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={rowStyle}
      />
    </View>
  );
};

export default Content;
