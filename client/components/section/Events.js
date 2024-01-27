import { View, Text, FlatList } from 'react-native';

import Card from '../EventCard';
import { SearchBar } from 'react-native-screens';

const Events = () => {
  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const searchContainerStyle = {
    height: 60,
    backgroundColor: 'white',
    shadowColor: 'rgba(60,60,67, 0.29)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1
  };

  const titleStyle = {
    fontSize: 16,
    fontWeight: 600,
    marginHorizontal: 35,
    marginVertical: 14,
  };

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginBottom: 20,
  };

  const data = [
    { id: 0, title: 'Event 1', club: 'Club 1', startDate: new Date('2024-01-22T10:30:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 4942 },
    { id: 1, title: 'Event 2', club: 'Club 2', startDate: new Date('2024-01-24T1:30:00'), endDate: new Date('2024-01-26T18:30:00'), interested: 2245 },
    { id: 2, title: 'Event 3', club: 'Club 3', startDate: new Date('2024-01-21T10:45:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 1632 },
    { id: 3, title: 'Event 4', club: 'Club 4', startDate: new Date('2024-01-28T22:30:00'), endDate: new Date('2024-01-29T1:00:00'), interested: 420 },
    { id: 4, title: 'Event 5', club: 'Club 5', startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-24T12:15:00'), interested: 165 },
    { id: 5, title: 'Event 6', club: 'Club 6', startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 42 },
  ];

  return (
    <View style={containerStyle}>
      <View style={searchContainerStyle}>
        <SearchBar placeholder="Search" />
      </View>
        <FlatList
          data={data}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={rowStyle}
          ListHeaderComponent={() => <Text style={titleStyle}>DISCOVER EVENTS</Text>}
        />
      
      
    </View>
  );
};

export default Events;
