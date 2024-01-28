import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

import Card from "../cards/EventCard";

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Card title={item.title} club={item.club} startDate={item.startDate} endDate={item.endDate} interested={item.interested} />
    }
    // filter of the title
    if (item.title.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Card title={item.title} club={item.club} startDate={item.startDate} endDate={item.endDate} interested={item.interested} />
    }
    // filter of the club
    if (item.club.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Card title={item.title} club={item.club} startDate={item.startDate} endDate={item.endDate} interested={item.interested} />
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={rowStyle}
        ListHeaderComponent={() => <Text style={titleStyle}>DISCOVER EVENTS</Text>}
      />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});