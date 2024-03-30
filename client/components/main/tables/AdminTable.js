import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';

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
        <>
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>edit</Text>
                </View>
            </TouchableOpacity><TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>delete</Text>
                </View>
            </TouchableOpacity>
        </>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'black', borderWidth: 1}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} widthArr={state.widthArr}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row} widthArr={state.widthArr}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#fff', color: '#782F40' },
  text: { margin: 6, color: 'black'},
  row: { flexDirection: 'row', backgroundColor: '#D9D9D9' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});