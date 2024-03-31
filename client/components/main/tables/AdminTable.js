import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { MaterialIcons, Fontisto } from '@expo/vector-icons';

export default class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  _isImageUrl(url) {
    return typeof url === 'string' && url.match(/^http.*\.(jpeg|jpg|gif|png)$/);
  }

  actionButtons = (data, index) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 5 }}>
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <MaterialIcons name="edit" size={30} color="#CEB888" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Fontisto name="trash" size={24} color="#782F40" />
        </View>
      </TouchableOpacity>
    </View>
  );

  renderItem = ({ item, index }) => {
    const screenWidth = Dimensions.get('window').width;
    const widthArr = this.state.widthPercents.map(percent => (screenWidth * percent) / 100);

    return (
      <View style={[styles.row, index % 2 === 1 && styles.alternateRow]}>
        {item.map((cellData, cellIndex) => {
          const cellWidth = widthArr[cellIndex];
          const isLastCell = cellIndex === item.length - 1;
          const isFirstCell = cellIndex === 0;
          const isSecondCell = cellIndex === 1;
          const cellContent = isLastCell ? this.actionButtons(cellData, index) :
            this._isImageUrl(cellData) ?
              <Image source={{ uri: cellData }} style={styles.img} /> :
              <Text style={styles.text}>{cellData}</Text>;

          return (
            <View key={cellIndex} style={[styles.cell, { width: cellWidth }, (isFirstCell || isSecondCell || isLastCell) && { alignItems: 'center' }]}>
              {cellContent}
            </View>
          );
        })}
      </View>
    );
  };


  renderHeader = () => {
    const screenWidth = Dimensions.get('window').width;
    const widthArr = this.state.widthPercents.map(percent => (screenWidth * percent) / 100);
    return (
      <View style={styles.head}>
        {this.state.tableHead.map((headerItem, index) => (
          <Text key={index} style={[styles.headerText, { width: widthArr[index], }]}>
            {headerItem}
          </Text>
        ))}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <FlatList
          data={this.state.tableData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  head: { flexDirection: 'row', height: 40, backgroundColor: '#782F40', alignItems: 'center', },
  headerText: { fontWeight: '600', color: '#fff', textAlign: 'center' }, // Custom style for header text
  text: { paddingRight: 0, color: 'black' }, // Custom style for normal row text
  row: { flexDirection: 'row', paddingLeft: 0, alignItems: 'center' },
  alternateRow: { backgroundColor: '#D9D9D950' }, // Style for alternating rows
  img: { marginVertical: 5, width: 35, height: 35, borderRadius: 25 },
  btn: { width: 34, height: 34, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'transparent' },
});
