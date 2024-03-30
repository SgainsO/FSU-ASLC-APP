import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <View style={{padding: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={styles.btn}>
            <Feather name="edit" size={24} color="black" />
            <Text style={styles.btnText}>edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={styles.btn}>
            <AntDesign name="delete" size={24} color="black" />
            <Text style={styles.btnText}>delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <ScrollView>
          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} widthArr={state.widthArr}/>
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row} widthArr={state.widthArr}>
                  {
                    rowData.map((cellData, cellIndex) => {
                      // Dynamically determine if the current cell should contain the buttons
                      // by checking if it's the last cell in the row
                      const isLastCell = cellIndex === rowData.length - 1;
                      const cellContent = isLastCell ? element(cellData, index) : cellData;
    
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
  container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#D9D9D9', color: '#782F40' },
  text: { margin: 6, color: 'black'},
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 25, height: 25, backgroundColor: 'white' },
  btnText: { textAlign: 'center', color: '#fff' }
});