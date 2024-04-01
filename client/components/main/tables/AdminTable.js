import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons, Fontisto } from '@expo/vector-icons';

import AdminUser from '../modal/AdminUser';
import AdminDeletion from '../modal/AdminDeletion';

const AdminTable = (props) => {
  const state = props.state;

  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const isImageUrl = (url) => {
    return typeof url === 'string' && url.match(/^http.*\.(jpeg|jpg|gif|png)$/);
  }

  const toggleModal = (data) => {
    setModalVisible(!isModalVisible);
    setData(data);
  };

  actionButtons = (data, index) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 5 }}>
      <TouchableOpacity onPress={() => toggleModal(data)}>
        <View style={styles.btn}>
          <MaterialIcons name="edit" size={30} color="#CEB888" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleModal(data)}>
        <View style={styles.btn}>
          <Fontisto name="trash" size={24} color="#782F40" />
        </View>
      </TouchableOpacity>
    </View>
  );

  renderItem = ({ item, index }) => {
    return (
      <View style={[styles.row, index % 2 === 1 && styles.alternateRow]}>
        {item.map((cellData, cellIndex) => {
          const cellWidth = state.widthPercents[cellIndex];
          const isFirstCell = cellIndex === 0;
          const cellContent = isImageUrl(cellData) ?
              <Image source={{ uri: cellData }} style={styles.img} /> :
              <Text style={styles.text}>{cellData}</Text>;
  
          return (
            <View key={cellIndex} style={[styles.cell, { width: `${cellWidth}%` }, isFirstCell && { alignItems: 'center' }]}>
              {cellContent}
            </View>
          );
        })}
        {/* Add action buttons as an additional cell */}
        <View style={[styles.cell, { width: `${state.widthPercents[state.widthPercents.length - 1]}%`, justifyContent: 'center', alignItems: 'center' }]}>
          {this.actionButtons(item, index)}
        </View>
      </View>
    );
  };
  

  renderHeader = () => {
    return (
      <View style={styles.head}>
        {this.state.tableHead.map((headerItem, index) => (
          <Text key={index} style={[styles.headerText, { width: `${state.widthPercents[index]}%` }]}>
            {headerItem}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <AdminDeletion isModalVisible={isModalVisible} setModalVisible={setModalVisible} data={data} type={props.state.type} />
      <FlatList
        data={state.tableData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
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

export default AdminTable;