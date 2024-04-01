import React, { useState, } from 'react';
import { Text, TextInput, Image, View, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome6, Entypo } from '@expo/vector-icons';

const modalWidth = Dimensions.get('window').width * 0.8;
const modalheight = Dimensions.get('window').height * 0.5;

const AdminUser = (props) => {
  const [image, setImage] = useState(props.data?.[0] ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    // Set the selected image URI, or keep the default image URI if canceled
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(props.data?.[0] ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png');
    }
  };

  const toggleModal = () => {
    // Reset form fields to default values
    if (props.isModalVisible) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
      });
  
      setImage(props.data?.[0] ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png');
    }

    props.setModalVisible(!props.isModalVisible);
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data);
    toggleModal();
  }

  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={props.isModalVisible} onBackdropPress={toggleModal}>
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Create User</Text>
              <Entypo 
                name="cross" 
                size={28} 
                color="#fff" 
                style={{ position: 'absolute', right: 10 }} 
                onPress={toggleModal}
              />
            </View>
            <View style={styles.imageSection}>
              <TouchableOpacity style={ styles.imagePicker } onPress={pickImage}>
                <FontAwesome6 name="image" size={20} color="black" />
                <Text style={{ marginLeft: 5, fontWeight: 600 }}>Add</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <View style={styles.form}>
              <View>
                <View style={styles.formLabelContainer}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.formLabel}>First Name </Text>
                    <Text style={{ color: 'red' }}>*</Text>
                  </View>
                  {errors.firstName && <Text style={{color: "red", fontStyle: 'italic' }}>Required</Text>}
                </View>
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
                      style={[styles.formInput,
                        { borderColor: errors.firstName ? "red" : "black", borderWidth: 1, color: errors.firstName ? "red" : "black" }
                      ]}
                    />
                  )}
                  name="firstName"
                />
                
                <View style={styles.formLabelContainer}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.formLabel}>Last Name </Text>
                    <Text style={{ color: 'red' }}>*</Text>
                  </View>
                  {errors.lastName && <Text style={{color: "red", fontStyle: 'italic' }}>Required</Text>}
                </View>
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
                      style={[styles.formInput,
                        { borderColor: errors.lastName ? "red" : "black", borderWidth: 1, color: errors.lastName ? "red" : "black" }
                      ]}
                    />
                  )}
                  name="lastName"
                />

                <View style={styles.formLabelContainer}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.formLabel}>Email </Text>
                    <Text style={{ color: 'red' }}>*</Text>
                  </View>
                  {errors.email && <Text style={{color: "red", fontStyle: 'italic' }}>Required</Text>}
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={[styles.formInput,
                        { borderColor: errors.email ? "red" : "black", borderWidth: 1, color: errors.email ? "red" : "black" }
                      ]}
                    />
                  )}
                  name="email"
                />
              </View>

              <TouchableOpacity style={styles.formSubmit} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.formSubmitText}>Create User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    paddingVertical: modalheight * 0.04,
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
    height: modalheight * 0.25,
    paddingVertical: modalheight * 0.03,
    width: '100%',
    backgroundColor: '#D9D9D9',
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
    width: modalheight * 0.22,
    height: modalheight * 0.22,
    borderRadius: modalheight * 0.22
  },
  form: {
    width: '100%',
    height: modalheight * 0.65,
    paddingVertical: 20,
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
  formInput: {
    width: '100%',
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    marginBottom: 10,
  },
  formSubmit: {
    width: '100%',
    height: 40,
    backgroundColor: '#782F40',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  formSubmitText: {
    color: 'white',
    fontWeight: '600',
  }
});

export default AdminUser;