import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
    const element = (data, index) => (
      <View style={{padding: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={styles.btn}>
            <Feather name="edit" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={[styles.btn, {backgroundColor: 'white'}]}>
            <AntDesign name="delete" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <ScrollView>
          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.headerText} widthArr={state.widthArr}/>
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={[styles.row, index % 2 === 1 && styles.alternateRow]} widthArr={state.widthArr}>
                  {
                    rowData.map((cellData, cellIndex) => {
                      const isLastCell = cellIndex === rowData.length - 1;
                      const cellContent = isLastCell ? element(cellData, index) : 
                        this._isImageUrl(cellData) ? 
                        <Image source={{ uri: cellData }} style={{marginVertical: 5, width: 35, height: 35, borderRadius: 25}} /> : 
                        cellData;

                      return (
                        <Cell key={cellIndex} data={cellContent} textStyle={styles.text}/>
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
  head: { height: 40, backgroundColor: '#782F40', paddingLeft: 16 },
  headerText: { margin: 6, fontWeight: 600, color: '#fff' }, // Custom style for header text
  text: { margin: 6, color: 'black' }, // Custom style for normal row text
  row: { flexDirection: 'row', backgroundColor: '#fff', paddingLeft: 16 },
  alternateRow: { backgroundColor: '#D9D9D950' }, // Style for alternating rows
  img: {marginVertical: 5, width: 35, height: 35, borderRadius: 25},
  btn: { height: 25, backgroundColor: 'white' },
  btnText: { textAlign: 'center', color: '#fff' }
});
