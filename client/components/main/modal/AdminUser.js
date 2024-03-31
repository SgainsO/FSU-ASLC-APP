import React, { useState, } from 'react';
import {Button, Text, TextInput, Image, View, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome6, Entypo } from '@expo/vector-icons';

const modalWidth = Dimensions.get('window').width * 0.8;
const modalheight = Dimensions.get('window').height * 0.6;

const AdminUser = (props) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleModal = () => {
    props.setModalVisible(!props.isModalVisible);
  };

  const { control, handleSubmit, formState: { errors }, } = useForm({ defaultValues: {
    firstName: "",
    lastName: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data);
    toggleModal();
  }

  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={props.isModalVisible} onBackdropPress={() => props.setModalVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create User</Text>
            <Entypo 
              name="cross" 
              size={28} 
              color="#fff" 
              style={{ position: 'absolute', right: 10 }} 
              onPress={() => props.setModalVisible(false)}
            />
          </View>
          <View style={styles.imageSection}>
            <View style={ styles.imagePicker }>
              <FontAwesome6 name="image" size={24} color="black" />
              <Text style={{ marginLeft: 5, fontWeight: 600 }} onPress={pickImage}>Add</Text>
            </View>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>
          <View>
            {errors.firstName && <Text>This is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="First name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style= {{ borderColor: errors.firstName ? "red" : "black", borderWidth: 1, color: errors.firstName ? "red" : "black" }}
                />
              )}
              name="firstName"
            />
            
            {errors.lastName && <Text>This is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Last name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style= {{ borderColor: errors.lastName ? "red" : "black", borderWidth: 1, color: errors.lastName ? "red" : "black" }}
                />
              )}
              name="lastName"
            />
          </View>
          <Button title="Create User" onPress={handleSubmit(onSubmit)} />
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
    justifyContent: 'flex-start'
  },
  header: {
    backgroundColor: '#782F40',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: modalheight * 0.03,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: modalheight * 0.18,
    paddingVertical: modalheight * 0.03,
    width: '100%',
    backgroundColor: '#D9D9D9'
  },
  imagePicker: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: modalheight * 0.18,
    height: modalheight * 0.18,
    borderRadius: modalheight * 0.18
  }
});

export default AdminUser;