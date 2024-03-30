import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
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
        <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>edit</Text>
                </View>
            </TouchableOpacity><TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
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
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#D9D9D9', color: '#782F40' },
  text: { margin: 6, color: 'black'},
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 50, height: 25, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});