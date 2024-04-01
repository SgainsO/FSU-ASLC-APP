import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Entypo } from '@expo/vector-icons';

const modalWidth = Dimensions.get('window').width * 0.8;
const modalheight = Dimensions.get('window').height * 0.25;

const AdminDeletion = (props) => {
  const toggleModal = () => {
    props.setModalVisible(!props.isModalVisible);
  };

  const deleteItem = () => {
    console.log("Implement delete on ID", props.data[1]);
    toggleModal();
  }

  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={props.isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Delete {props.type}</Text>
            <Entypo 
              name="cross" 
              size={28} 
              color="#fff" 
              style={{ position: 'absolute', right: 10 }} 
              onPress={toggleModal}
            />
          </View>
          <View style={styles.form}>
            <Text style={{ fontWeight: '600' }}>Are you sure you want to delete this {props.type}?</Text>
            <Text>
              <Text style={styles.formLabel}>ID:</Text> {props.data[1]}
            </Text>
            <Text>
              <Text style={styles.formLabel}>Name:</Text> {props.data[2]}
            </Text>
            <Text>
              <Text style={styles.formLabel}>Email:</Text> {props.data[3]}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.formDelete} onPress={deleteItem}>
                <Text style={styles.formDeleteText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.formCancel} onPress={toggleModal}>
                <Text style={styles.formCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // This centers the children vertically in the container
    alignItems: 'center', // This centers the children horizontally in the container
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: modalheight,
    width: modalWidth,
    borderRadius: 15,
    borderTopLeftRadius: 16, // higher values to hide behind header
    borderTopRightRadius: 16,
    justifyContent: 'flex-start',
    color: 'black'
  },
  header: {
    backgroundColor: '#782F40',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modalheight * 0.08,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  form: {
    width: '100%',
    height: modalheight * 0.78,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  formLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  formDelete: {
    width: '48%',
    height: 40,
    backgroundColor: '#782F40',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  formDeleteText: {
    color: 'white',
    fontWeight: '600',
  },
  formCancel: {
    width: '48%',
    height: 40,
    backgroundColor: '#fff',
    borderColor: 'D9D9D9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  formCancelText: {
    color: 'black',
    fontWeight: '600',
  }
});

export default AdminDeletion;