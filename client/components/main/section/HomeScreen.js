import { View, FlatList, Text, } from 'react-native';
import React from 'react';
import Card from '../HomeEventCard';

const HomeScreen = () => {
  const getTodayDate = () => {
    const currentDate = new Date();
    const format = {weekday: 'long', month: '2-digit', day: '2-digit', year: '2-digit'};
    const finalFormat = currentDate.toLocaleDateString('en-US', format);
    return finalFormat;
  };

  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const textStyle = {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  };

  const data = [
    {id: 0, title: 'American Psycho', backgroundImage: require('../../assets/american_psycho.png'), interested: '69 interested', details: 'doors open at 11:00pm\nmovie starts at 12:00am',},
    {id: 1, title: 'Undertale Game Session', backgroundImage: require('../../assets/sans_undertale.png'), interested: '420 interested', details: 'starts at 2pm in theater',},
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        Today is...{'\n'}
        {getTodayDate()}
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Card {...item} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        vertical
        contentContainerStyle={{ paddingHorizontal: 16}}
        />
      <Text> Home </Text>
    </View>
  );
};

export default HomeScreen;
