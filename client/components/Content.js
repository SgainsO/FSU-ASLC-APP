import { Text, Image, View, FlatList } from 'react-native';

//import * as Section from './section';

const Content = () => {
    const containerStyle = {
        flex: 12, 
        backgroundColor: 'white',
  };

  const data = [
    { id: '0', title: 'Event 1', club: 'Club 1', date: 'MON, JAN 22 AT 10 PM', interested: '4.9K interested'},
    { id: '1', title: 'Event 2', club: 'Club 2', date: 'WED, JAN 24 - 25', interested: '2.2K interested'},
    { id: '2', title: 'Event 3', club: 'Club 3', date: 'MON, JAN 22 AT 10 AM', interested: '1.6K interested'},
    { id: '3', title: 'Event 4', club: 'Club 4', date: 'THUR, JAN 25 - 26', interested: '420 interested'},
    { id: '4', title: 'Event 5', club: 'Club 5', date: 'MON, JAN 22 AT 9 AM', interested: '160 interested'},
    { id: '5', title: 'Event 6', club: 'Club 6', date: 'SAT, JAN 27 - 28', interested: '42 interested'},
  ];

  const renderItem = ({ item }) => (
    <View style={cardImageStyle}>
      <View style={overlayStyle}>
        <Text style={{ fontSize: 10, fontWeight: 600 }}>{item.date}</Text>
        <Text style={{ fontSize: 13, fontWeight: 600 }}>{item.title}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{item.club}</Text>
        <Text style={{ fontSize: 12, color: '#455154' }}>{item.interested}</Text>
      </View>
    </View>
  );

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginVertical: 10, 
  };
  const cardImageStyle = {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 100,
    paddingHorizontal: 70,
    width: 150,
    height: 250,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4
  };
  const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    borderBottomLeftRadius: 10, // Match the border radius of the parent View
    borderBottomRightRadius: 10,
};

    return (
        <View style={containerStyle}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={rowStyle}
            />
        </View>
  );
};

export default Content;
