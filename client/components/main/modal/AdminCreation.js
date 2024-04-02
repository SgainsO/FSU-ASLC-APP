import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image, View, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

import { FontAwesome6, Entypo } from '@expo/vector-icons';

const modalWidth = Dimensions.get('window').width * 0.8;
const modalheight = Dimensions.get('window').height * 0.5;

const AdminCreation = (props) => {
  const isEditMode = !!props.data;
  
  let defaultImg;
  switch (props.type) {
    case 'User':
      defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/600px-Placeholder_no_text.svg.png';
      break;
    case 'Club':
      defaultImg = 'https://clipartcraft.com/images/no-logo-placeholder-2.png';
      break;
    case 'Event':
      defaultImg = 'https://clipartcraft.com/images/no-logo-placeholder-2.png';
      break;
  }

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
    if (props.isModalVisible && !isEditMode) {
      switch (props.type) {
        case 'User':
          reset({
            firstName: "",
            lastName: "",
            email: "",
          });
          break;
        case 'Club':
          reset({
            name: "",
            type: "",
            socials: "",
          });
          break;
        case 'Event':
          break;
      }
  
      setImage(props.data?.[0] ?? defaultImg);
    }

    props.setModalVisible(!props.isModalVisible);
  };

  let defaultFormValues;
  switch (props.type) {
    case 'User':
      defaultFormValues = {
        firstName: "",
        lastName: "",
        email: "",
      };
      break;
    case 'Club':
      defaultFormValues = {
        name: "",
        type: "",
        socials: "",
      };
      break;
    case 'Event':
      defaultFormValues = {
        name: "",
        type: "",
        socials: "",
      };
      break;
  }

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({ defaultValues: defaultFormValues})

  useEffect(() => {
    if (props.data) {
      switch (props.type) {
        case 'User':
          setValue('firstName', props.data[2] || "");
          setValue('lastName', props.data[2] || "");
          setValue('email', props.data[3] || "");
          break;
        case 'Club':
          setValue('name', props.data[3] || "");
          setValue('type', props.data[2] || "");
          setValue('socials', props.data[4] || "");
          break;
        case 'Event':
          defaultFormValues = {
            name: "",
            type: "",
            socials: "",
          };
          break;
      }
      
      setImage(props.data[0] || defaultImg);
      setValue('avatar', props.data[0] || defaultImg);
    }
  }, [props.data, setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      console.log(`Edited ${props.type}`, data);
    }
    else {
      console.log(`Created new ${props.type}`, data);
    }
    
    toggleModal();
  }

  // derived from https://nolecentral.dsa.fsu.edu/organizations
  const [isDropdownFocus, setDropdownFocus] = useState(false);
  const typeData = [
    { label: 'Academic/Honorary', value: '0' },
    { label: 'Community Service', value: '1' },
    { label: 'Department', value: '2' },
    { label: 'Departmental Affiliate', value: '3' },
    { label: 'Graduate', value: '4' },
    { label: 'Greek', value: '5' },
    { label: 'Health/Wellness', value: '6' },
    { label: 'Multicultural', value: '7' },
    { label: 'Performance', value: '8' },
    { label: 'Political', value: '9' },
    { label: 'Professional', value: '10' },
    { label: 'Recreational/Sport', value: '11' },
    { label: 'Religious/Spiritual', value: '12' },
    { label: 'SGA Affiliate', value: '13' },
    { label: 'Social', value: '14' },
    { label: 'Special Interest', value: '15' },
    { label: 'Sport Club', value: '16' },
    { label: 'Student Academic Program', value: '17' },
    { label: 'Umbrella', value: '18' },
  ];

  // Dynamically renders form based off props.type
  const renderFormContent = () => {
    switch (props.type) {
      case 'User':
        return (
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
                    placeholder="Enter first name"
                    placeholderTextColor = 'gray'
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
                    placeholder="Enter last name"
                    placeholderTextColor = 'gray'
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
                    placeholder="Enter email"
                    placeholderTextColor = 'gray'
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
              <Text style={styles.formSubmitText}>{isEditMode ? "Update" : "Create"} {props.type}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Club':
        return (
          <View style={styles.form}>
            <View>
              <View style={styles.formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.formLabel}>Club Name </Text>
                  <Text style={{ color: 'red' }}>*</Text>
                </View>
                {errors.name && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter club name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    inputStyle={styles.formText}
                    placeholderTextColor='gray'
                    style={[styles.formInput,
                    { borderColor: errors.name ? "red" : "black", borderWidth: 1, color: errors.name ? "red" : "black" }
                    ]}
                  />
                )}
                name="name"
              />
              
              <View style={styles.formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.formLabel}>Club Type </Text>
                  <Text style={{ color: 'red' }}>*</Text>
                </View>
                {errors.type && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    style={[styles.formInput,
                    { borderColor: errors.type ? "red" : "black", borderWidth: 1, color: errors.type ? "red" : "black" }
                    ]}
                    placeholderStyle={[styles.formText, { color: 'gray' }]}
                    selectedTextStyle={styles.formText}
                    inputSearchStyle={styles.formText}
                    data={typeData}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!isDropdownFocus ? 'Select type' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setDropdownFocus(true)}
                    onBlur={() => {
                      setDropdownFocus(false);
                      onBlur(); // To ensure form validation
                    }}
                    onChange={(item) => {
                      onChange(item.value);
                      setDropdownFocus(false);
                    }}
                  />
                )}
                name="type"
              />

              <View style={styles.formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.formLabel}>Socials </Text>
                  <Text style={{ color: 'red' }}>*</Text>
                </View>
                {errors.socials && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter socials"
                    placeholderTextColor='gray'
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
              <Text style={styles.formSubmitText}>{isEditMode ? "Update" : "Create"} {props.type}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Event':
        return (
          <View>
            <View style={styles.formLabelContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.formLabel}>Club Name </Text>
                <Text style={{ color: 'red' }}>*</Text>
              </View>
              {errors.name && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter club name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  inputStyle={styles.formText}
                  placeholderTextColor='gray'
                  style={[styles.formInput,
                  { borderColor: errors.name ? "red" : "black", borderWidth: 1, color: errors.name ? "red" : "black" }
                  ]}
                />
              )}
              name="name"
            />
            
            <View style={styles.formLabelContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.formLabel}>Club type </Text>
                <Text style={{ color: 'red' }}>*</Text>
              </View>
              {errors.type && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={[styles.formInput,
                  { borderColor: errors.type ? "red" : "black", borderWidth: 1, color: errors.type ? "red" : "black" }
                  ]}
                  placeholderStyle={[styles.formText, { color: 'gray' }]}
                  selectedTextStyle={styles.formText}
                  inputSearchStyle={styles.formText}
                  data={typeData}
                  search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isDropdownFocus ? 'Select type' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setDropdownFocus(true)}
                  onBlur={() => {
                    setDropdownFocus(false);
                    onBlur(); // To ensure form validation
                  }}
                  onChange={(item) => {
                    onChange(item.value);
                    setDropdownFocus(false);
                  }}
                />
              )}
              name="type"
            />

            <View style={styles.formLabelContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.formLabel}>Socials </Text>
                <Text style={{ color: 'red' }}>*</Text>
              </View>
              {errors.socials && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter socials"
                  placeholderTextColor='gray'
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
        );
    }
  };

  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={props.isModalVisible} onBackdropPress={toggleModal}>
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{isEditMode ? "Edit" : "Create"} {props.type}</Text>
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

            {renderFormContent()}
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
    paddingLeft: 10,
  },
  formText: {
    color: 'black',
    fontSize: 14,
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

export default AdminCreation;