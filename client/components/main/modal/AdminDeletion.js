import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { getURL } from '../../AxiosService';
import axios from 'axios';

import { Entypo } from '@expo/vector-icons';

const modalWidth = Dimensions.get('window').width * 0.8;
const modalheight = Dimensions.get('window').height * 0.25;

const AdminDeletion = (props) => {
  const toggleModal = () => {
    props.setModalVisible(!props.isModalVisible);
  };

  const deleteItem = async () => {

    switch (props.type) {
      case 'User':
        try {
          console.log("Admin UserID" + props)
          const response = await axios.delete(`${getURL()}/api/user/${props.activeKey}/delete`);

          if (response.status === 200) {
            console.log('User deleted successfully');
          }
        } catch (error) {
          console.error('Error deleting user: ', error);
        }

        break;
      case 'Club':
        try {
          const response = await axios.delete(`${getURL()}/api/club/${props.data[1]}/delete`);

          if (response.status === 200) {
            console.log('Club deleted successfully');
          }
        } catch (error) {
          console.error('Error deleting club: ', error);
          
        }
        break;
      case 'Event':
        try {
          const response = await axios.delete(`${getURL()}/api/event/${props.data[1]}/delete`);

          if (response.status === 200) {
            console.log('Event deleted successfully');
          }
        } catch (error) {
          console.error('Error deleting event: ', error);
          
        }
        
        break;
    }

    toggleModal();
  }

  // Function to render form content based on the type
  const renderFormContent = () => {
    switch (props.type) {
      case 'User':
        return (
          <Text>
            <Text style={styles.formLabel}>FirstName:</Text> {props.data[1]}
            <Text style={styles.formLabel}>{'\n'}LastName:</Text> {props.data[2]}
            <Text style={styles.formLabel}>{'\n'}User ID:</Text> {props.activeKey}
          </Text>
        );
      case 'Club':
        return (
          <Text>
            <Text style={styles.formLabel}>ID:</Text> {props.data[1]}
            <Text style={styles.formLabel}>{'\n'}Type ID:</Text> {props.data[2]}
            <Text style={styles.formLabel}>{'\n'}Name:</Text> {props.data[3]}
            <Text style={styles.formLabel}>{'\n'}Socials:</Text> {props.data[4]}
          </Text>
        );
      case 'Event':
        return (
          <Text>
            <Text style={styles.formLabel}>ID:</Text> {props.data[1]}
            <Text style={styles.formLabel}>{'\n'}Club:</Text> {props.data[2]}
            <Text style={styles.formLabel}>{'\n'}Title:</Text> {props.data[4]}
            <Text style={styles.formLabel}>{'\n'}Start Date:</Text> {props.data[5]}
            <Text style={styles.formLabel}>{'\n'}End Date:</Text> {props.data[6]}
          </Text>
        );
    }
  };

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
            {renderFormContent()}
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
    marginTop: 20,
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
    marginTop: 20,
  },
  formCancelText: {
    color: 'black',
    fontWeight: '600',
  }
});

export default AdminDeletion;