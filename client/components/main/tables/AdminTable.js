import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image, Button } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';
import { Dimensions } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  _isImageUrl(url) {
    return typeof url === 'string' && url.match(/^http.*\.(jpeg|jpg|gif|png)$/);
  }

  render() {
    const state = this.state;
    const screenWidth = Dimensions.get('window').width;
    const widthArr = state.widthPercents.map(percent => (screenWidth * percent) / 100);

    const actionButtons = (data, index) => (
      <View style={{paddingVertical: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
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

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headerText} widthArr={widthArr}/>
        </View>

        {/* Scrollable Table */}
        <ScrollView style={styles.scrollContainer}>
          <Table borderStyle={{borderColor: 'transparent'}}>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={[styles.row, index % 2 === 1 && styles.alternateRow]}>
                {
                  rowData.map((cellData, cellIndex) => {
                    const cellWidth = widthArr[cellIndex];
                    const isLastCell = cellIndex === rowData.length - 1;
                    const cellContent = isLastCell ? actionButtons(cellData, index) : 
                      this._isImageUrl(cellData) ? 
                      <Image source={{ uri: cellData }} style={styles.img} /> : 
                      cellData;
                    
                    return (
                      <Cell key={cellIndex} data={cellContent} textStyle={styles.text} style={{ width: cellWidth, alignItems: 'left' }}/>
                    );
                  })
                }
              </TableWrapper>
            ))
          }
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#782F40', },
  headerText: { fontWeight: 600, color: '#fff', textAlign: 'center' }, // Custom style for header text
  text: { paddingRight: 10, color: 'black' }, // Custom style for normal row text
  row: { flexDirection: 'row', backgroundColor: '#fff', paddingLeft: 16 },
  alternateRow: { backgroundColor: '#D9D9D950' }, // Style for alternating rows
  img: {marginVertical: 5, width: 35, height: 35, borderRadius: 25},
  btn: { width: 34, height: 34, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'transparent'},
  btnText: { textAlign: 'center', color: '#000' }
});
