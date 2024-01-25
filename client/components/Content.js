import { Text, Image, View, FlatList } from 'react-native';

//import * as Section from './section';

const Content = () => {
    const containerStyle = {
        flex: 12, 
        backgroundColor: 'white'
  };

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    // ... more items
  ];

  const renderItem = ({ item }) => (
    <View style={cardImageStyle}>
      <Text>{item.title}</Text>
    </View>
  );

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
  };
  const cardImageStyle = {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 100,
    paddingHorizontal: 70,
    innerWidth: 145,
    innerHeight: 200,
    outerHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4
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
