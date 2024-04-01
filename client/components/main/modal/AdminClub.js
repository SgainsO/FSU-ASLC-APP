import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image, View, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome6, Entypo } from '@expo/vector-icons';

const modalWidth = Dimensions.get('window').width * 0.8;
const modalheight = Dimensions.get('window').height * 0.5;

const AdminClub = (props) => {
  const isEditMode = !!props.data;
  
  const defaultImg = 'https://clipartcraft.com/images/no-logo-placeholder-2.png';
  const [image, setImage] = useState(props.data?.[0] ?? defaultImg);

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
      setValue('avatar', result.assets[0].uri);
    } else {
      setImage(props.data?.[0] ?? defaultImg);
      setValue('avatar', result.assets[0].uri);
    }
  };

  const toggleModal = () => {
    // Reset form fields to default values
    if (props.isModalVisible) {
      reset({
        name: "",
        category: "",
        socials: "",
      });
  
      setImage(props.data?.[0] ?? defaultImg);
    }

    props.setModalVisible(!props.isModalVisible);
  };

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({ defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    },
  })

  useEffect(() => {
    if (props.data) {
      setValue('name', props.data[3] || "");
      setValue('type', props.data[2] || "");
      setValue('socials', props.data[4] || "");
      setImage(props.data[0] || defaultImg);
      setValue('avatar', props.data[0] || defaultImg);
    }
  }, [props.data, setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      console.log("Edited user", data);
    }
    else {
      console.log("Created new user", data);
    }
    
    toggleModal();
  }

  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={props.isModalVisible} onBackdropPress={toggleModal}>
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{isEditMode ? "Edit" : "Create"} Club</Text>
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
                    <Text style={styles.formLabel}>Club Name </Text>
                    <Text style={{ color: 'red' }}>*</Text>
                  </View>
                  {errors.name && <Text style={{color: "red", fontStyle: 'italic' }}>Required</Text>}
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Club Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={[styles.formInput,
                        { borderColor: errors.name ? "red" : "black", borderWidth: 1, color: errors.name ? "red" : "black" }
                      ]}
                    />
                  )}
                  name="name"
                />
                
                <View style={styles.formLabelContainer}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.formLabel}>Club Category </Text>
                    <Text style={{ color: 'red' }}>*</Text>
                  </View>
                  {errors.type && <Text style={{color: "red", fontStyle: 'italic' }}>Required</Text>}
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Club Category"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={[styles.formInput,
                        { borderColor: errors.type ? "red" : "black", borderWidth: 1, color: errors.type ? "red" : "black" }
                      ]}
                    />
                  )}
                  name="type"
                />

                <View style={styles.formLabelContainer}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.formLabel}>Socials </Text>
                    <Text style={{ color: 'red' }}>*</Text>
                  </View>
                  {errors.socials && <Text style={{color: "red", fontStyle: 'italic' }}>Required</Text>}
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Socials"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={[styles.formInput,
                        { borderColor: errors.socials ? "red" : "black", borderWidth: 1, color: errors.socials ? "red" : "black" }
                      ]}
                    />
                  )}
                  name="socials"
                />
              </View>

              <TouchableOpacity style={styles.formSubmit} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.formSubmitText}>{isEditMode ? "Update" : "Create"} Club</Text>
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

export default AdminClub;