import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image, View, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller, set } from "react-hook-form"
import * as ImagePicker from 'expo-image-picker';
import { Dropdown, SelectCountry as SelectClub } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';

import { FontAwesome6, Entypo, Fontisto } from '@expo/vector-icons';
import { getURL } from '../../AxiosService';


const AdminCreation = (props) => {
  const modalWidth = Dimensions.get('window').width * 0.8;
  let modalHeight = Dimensions.get('window').height * 0.5;

  if (props.type == 'Event') {
    modalHeight *= 1.3;
  }

  const container = {
    justifyContent: 'center',
    alignItems: 'center',
  }
  const modal = {
    alignItems: 'center',
    justifyContent: 'center',
  }
  const modalContent= {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: modalWidth,
    borderRadius: 15,
    borderTopLeftRadius: 16, // higher values to hide behind header
    borderTopRightRadius: 16,
    justifyContent: 'flex-start',
    color: 'black'
  }
  const header = {
    backgroundColor: '#782F40',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: props.type == 'Event' ? modalHeight * 0.03 : modalHeight * 0.04,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }
  const headerText = {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  }
  const imageSection = {
    alignItems: 'center',
    justifyContent: 'center',
    height: modalHeight * 0.25,
    paddingVertical: modalHeight * 0.03,
    width: '100%',
    backgroundColor: '#D9D9D9',
  }
  const imagePicker = {
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
  }
  const imageStyle = {
    width: modalHeight * 0.22,
    height: props.type === 'Event' ? modalHeight * 0.22 * (14 / 13) : modalHeight * 0.22, // 13:14 aspect ratio for Event image
    borderRadius: props.type === 'Event' ? 0 : modalHeight * 0.22
  }
  const dropdownImage = {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 5,
  }
  const form = {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  }
  const formLabelContainer = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  }
  const formLabel = {
    fontSize: 14,
    fontWeight: '600',
  }
  const formText = {
    color: 'black',
    fontSize: 14,
  }
  const formSubmit = {
    width: '100%',
    height: 40,
    backgroundColor: '#782F40',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  }
  const formSubmitText = {
    color: 'white',
    fontWeight: '600',
  }

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
      aspect: props.type === 'Event' ? [13, 14] : [4, 4], // 4:4 for User and Club, 13:14 for Event
      quality: 1,
    });

    console.log(result);

    // Set the selected image URI, or keep the default image URI if canceled
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue('image', result.assets[0].uri);
    } else {
      setImage(props.data?.[0] ?? defaultImg);
      setValue('image', result.assets[0].uri);
    }
  };

  const dateTimeOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    dayPeriod: 'narrow',
  	hour: 'numeric',
  	minute: 'numeric',
  };

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [endDateEnabled, setEndDateEnabled] = useState(false);

  const toggleModal = () => {
    // Reset form fields to default values
    if (props.isModalVisible && !isEditMode) {
      setEndDateEnabled(false);

      reset(defaultFormValues);
  
      setImage(props.data?.[0] ?? defaultImg);
    }

    props.setModalVisible(!props.isModalVisible);
  };

  let defaultFormValues;
  switch (props.type) {
    case 'User':
      defaultFormValues = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
      };
      break;
    case 'Club':
      defaultFormValues = {
        id: "",
        name: "",
        type: "",
        socials: "",
      };
      break;
    case 'Event':
      defaultFormValues = {
        id: "",
        club: "",
        type: "",
        title: "",
        startDate: new Date(),
        endDate: "",
      };
      break;
  }

  const { control, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ defaultValues: defaultFormValues})

  useEffect(() => {
    console.log(props.data)
    if (props.data) {
      switch (props.type) {
        case 'User':
          console.log(props.data[2])
          
          setValue('id', props.data[1])
          setValue('firstName', props.data[2]);
          setValue('lastName', props.data[3]);
          setValue('email', props.data[4]);
          break;
        case 'Club':
          setValue('id', props.data[1])
          setValue('name', props.data[3]);
          setValue('type', props.data[2]);
          setValue('socials', props.data[4]);
          break;
        case 'Event':
          if (props.data[6]) {
            setEndDateEnabled(true);
          }
          console.log("Props" + props.data);

          setValue('url', props.data[0])
          setValue('id', props.data[1])
          setValue('club', props.data[2]);
          setValue('type', props.data[3]);
          setValue('title', props.data[4]);
          setValue('startDate', new Date(props.data[5]));
          setValue('endDate', new Date(props.data[6]));
          break;
      }
      
      setImage(props.data[0] || defaultImg);
      setValue('image', props.data[0] || defaultImg);
    }
  }, [props.data, setValue]);

  const getFormInputStyle = (error) => ({
    width: '100%',
    height: 40,
    borderColor: error ? "red" : "black",
    borderWidth: 1,
    color: error ? "red" : "black",
    marginBottom: 10,
    paddingLeft: 10,
  });

  const onSubmit = async (data) => {
    if (isEditMode) {
      switch (props.type) {
        case 'User':
          const userPayload = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "Email": data.email,
            "URL": "d"
          }

          try {
            const response = await axios.post(`${getURL()}/api/user/${data.id}/update`, userPayload);

            if (response.status === 200) {
              console.log(`Updated ${props.type}`, data);
            }
          } catch (error) {
            console.error(error);
          }

          break;
        case 'Club':
          const clubPayload = {
            "Name": data.name,
            "Type": data.type,
            "Socials": data.socials,
            "URL": "d"
          }

          try {
            const response = await axios.post(`${getURL()}/api/club/${data.id}/update`, clubPayload);
            
            if (response.status === 200) {
              console.log(`Updated ${props.type}`, data);
            }
          } catch (error) {
            console.error(error);
          }
          
          break;
        case 'Event':
          
          const eventPayload = {
            "Club": data.club,
            "Type": data.type,
            "Title": data.title,
            "StartDate": data.startDate,
            "EndDate": "Tomorrow",
            "URL": "d"
          }

          try {
            const response = await axios.post(`${getURL()}/api/event/${data.id}/update`, eventPayload);

            if (response.status === 200) {
              console.log(`Updated ${props.type}`, data);
            }
          }
          catch (error) {
            console.error(error);
          }
          break;
      }
    }
    else {
      console.log(props)
      switch (props.type) {
        case 'User':
          console.log(`Created ${props.type}`, data);
          break;
        case 'Club':
          payload = {
            "Name": data.name,
            "Type": data.type,
            "Socials": data.socials,
            "URL": "d"
          }
                    
          try {
            const response = await axios.post(`${getURL()}/api/club/add`, payload);

            if (response.status === 200) {
              console.log(`Created ${props.type}`, data);
            }
          } catch (error) {
            console.error(error);
          }
          break;
        case 'Event':
          const eventPayload = {
            "Club": data.club,
            "Type": data.type,
            "Title": data.title,
            "StartDate": data.startDate,
            "EndDate": data.endDate !== "" ? data.endDate : new Date(data.startDate.getTime() + (3 * 60 * 60 * 1000)),
            "URL": "d"
          }

          try {
            const response = await axios.post(`${getURL()}/api/event/add`, eventPayload);

            if (response.status === 200) {
              console.log(`Created ${props.type}`, data);
            }
          }
          catch (error) {
            console.error(error);
          }

          break;
      }
    }
    
    toggleModal();
  }

  // derived from https://nolecentral.dsa.fsu.edu/organizations
  const [isClubTypeFocus, setClubTypeFocus] = useState(false);
  const clubTypes = [
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

  const [isEventTypeFocus, setEventTypeFocus] = useState(false);
  const eventTypes = [
    { label: 'today', value: '0' },
    { label: 'past', value: '1' },
    { label: 'game', value: '2' },
    { label: 'New', value: '3' },
    { label: 'Classics', value: '4' },
    { label: 'Co-ops', value: '5' },
    { label: 'Midnights', value: '6' },
    { label: 'Cultural', value: '7' },
    { label: 'Study', value: '8' },
    { label: 'Activity', value: '9' },
    { label: 'Bookmark', value: '10' },
    { label: 'MovieMeeting', value: '11'},
    { label: 'GeneralMeeting', value: '12'}
  ];
  const [isEventClubFocus, setEventClubFocus] = useState(false);
  // should retrieve this from backend
  const eventClubs = [
    {
      value: '0',
      label: 'Association for Computing Machinery',
      image: {
        uri: 'https://se-images.campuslabs.com/clink/images/3068826d-991b-4dcc-9865-e2798ee514d0971ee766-4888-4337-b212-498ad95eaaf2.png',
      },
    },
    {
      value: '1',
      label: 'Cybersecurity Club at Florida State University',
      image: {
        uri: 'https://se-images.campuslabs.com/clink/images/ebef7389-2a8f-47e8-a2cb-e4c98ed6eadf58eb52e3-1209-4b37-b472-f5bbd39e14a5.jpeg',
      },
    },
    {
      value: '2',
      label: 'Action Shooting Club at Florida State University',
      image: {
        uri: 'https://se-images.campuslabs.com/clink/images/90270a5e-ed0b-4377-aa44-2460ebbc8c332d5c0c5f-f2af-4adf-b2af-89a7d24d21f9.JPG',
      },
    },
    {
      value: '3',
      label: 'The Esports Club at FSU',
      image: {
        uri: 'https://se-images.campuslabs.com/clink/images/4a46260c-df6e-4a63-97d3-601c593ed4f20f25d630-fc77-4cc2-bd63-8c4a861b9718.png',
      },
    },
    {
      value: '4',
      label: 'Astrology Club at FSU',
      image: {
        uri: 'https://se-images.campuslabs.com/clink/images/9766cade-610f-40f9-b9d5-7b6cfdcad4813efdc5f9-e7d3-4b63-a7ff-b09a3e45f916.JPG',
      },
    },
  ];

  // Dynamically renders form based off props.type
  const renderFormContent = () => {
    switch (props.type) {
      case 'User':
        return (
          <View style={form}>
            <View>
              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={formLabel}>First Name </Text>
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
                    style={getFormInputStyle(errors.firstName)}
                  />
                )}
                name="firstName"
              />
              
              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={formLabel}>Last Name </Text>
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
                    style={getFormInputStyle(errors.lastName)}
                  />
                )}
                name="lastName"
              />

              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={formLabel}>Email </Text>
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
                    style={getFormInputStyle(errors.email)}
                  />
                )}
                name="email"
              />
            </View>

            <TouchableOpacity style={formSubmit} onPress={handleSubmit(onSubmit)}>
              <Text style={formSubmitText}>{isEditMode ? "Update" : "Create"} {props.type}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Club':
        return (
          <View style={form}>
            <View>
              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Club Name </Text>
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
                    inputStyle={formText}
                    placeholderTextColor='gray'
                    style={getFormInputStyle(errors.name)}
                  />
                )}
                name="name"
              />
              
              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Club Type </Text>
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
                    style={getFormInputStyle(errors.type)}
                    placeholderStyle={[formText, { color: 'gray' }]}
                    selectedTextStyle={formText}
                    inputSearchStyle={formText}
                    data={clubTypes}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!isClubTypeFocus ? 'Select type' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setClubTypeFocus(true)}
                    onBlur={() => {
                      setClubTypeFocus(false);
                      onBlur(); // To ensure form validation
                    }}
                    onChange={(item) => {
                      onChange(item.value);
                      setClubTypeFocus(false);
                    }}
                  />
                )}
                name="type"
              />

              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Socials </Text>
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
                    style={getFormInputStyle(errors.socials)}
                  />
                )}
                name="socials"
              />
            </View>

            <TouchableOpacity style={formSubmit} onPress={handleSubmit(onSubmit)}>
              <Text style={formSubmitText}>{isEditMode ? "Update" : "Create"} {props.type}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Event':
        return (
          <View style={form}>
            <View>
              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Event Title </Text>
                  <Text style={{ color: 'red' }}>*</Text>
                </View>
                {errors.title && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter event title"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    inputStyle={formText}
                    placeholderTextColor='gray'
                    style={getFormInputStyle(errors.title)}
                  />
                )}
                name="title"
              />
              
              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Club </Text>
                  <Text style={{ color: 'red' }}>*</Text>
                </View>
                {errors.club && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectClub
                    style={getFormInputStyle(errors.club)}
                    placeholderStyle={[formText, { color: 'gray' }]}
                    selectedTextStyle={formText}
                    inputSearchStyle={formText}
                    imageStyle={dropdownImage}
                    iconStyle={dropdownImage}
                    data={eventClubs}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    imageField="image"
                    placeholder={!isEventClubFocus ? 'Select club' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setEventClubFocus(true)}
                    onBlur={() => {
                      setEventClubFocus(false);
                      onBlur(); // To ensure form validation
                    }}
                    onChange={(item) => {
                      onChange(item.value);
                      setEventClubFocus(false);
                    }}
                  />
                )}
                name="club"
              />

              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Event Type </Text>
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
                    style={getFormInputStyle(errors.type)}
                    placeholderStyle={[formText, { color: 'gray' }]}
                    selectedTextStyle={formText}
                    inputSearchStyle={formText}
                    data={eventTypes}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!isEventTypeFocus ? 'Select type' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setEventTypeFocus(true)}
                    onBlur={() => {
                      setEventTypeFocus(false);
                      onBlur(); // To ensure form validation
                    }}
                    onChange={(item) => {
                      onChange(item.label);
                      setEventTypeFocus(false);
                    }}
                  />
                )}
                name="type"
              />

              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>Start Date </Text>
                  <Text style={{ color: 'red' }}>*</Text>
                </View>
                {errors.startDate && <Text style={{ color: "red", fontStyle: 'italic' }}>Required</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TouchableWithoutFeedback onPress={() => setShowStartDate(!showStartDate)}>
                    <View style={[getFormInputStyle(errors.startDate), {flexDirection: 'row', alignItems: 'center'}]}>
                      <Fontisto name="date" size={16} color="gray" />
                      <DateTimePickerModal
                        mode="datetime"
                        isVisible={showStartDate}
                        open={showStartDate}
                        date={startDate}
                        onConfirm={(selectedDate) => {
                          const currentDate = selectedDate || startDate;
                          setShowStartDate(!showStartDate);
                          setStartDate(currentDate);
                          onChange(currentDate);
                        }}
                        onCancel={() => {
                          setShowStartDate(!showStartDate);
                        }}
                      /> 
                      <Text style={{marginLeft: 5, width: '80%', color: 'black'}} >
                        {value.toLocaleString('en-US', dateTimeOptions) || "Enter start date"}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                name="startDate"
              />

              <View style={formLabelContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={formLabel}>End Date </Text>
                </View>
                {errors.endDate && <Text style={{ color: "red", fontStyle: 'italic' }}>Must be after start date</Text>}
              </View>
              <Controller
                control={control}
                rules={{
                  required: false,
                  validate: {
                    isAfterStartDate: value => {
                    if (endDateEnabled)
                      return value > getValues("startDate") || "End date must be after start date";
                    return true;
                  }},
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TouchableWithoutFeedback onPress={() => setShowEndDate(!showEndDate)}>
                    <View style={[getFormInputStyle(errors.endDate), {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
                        <Fontisto name="date" size={16} color="gray" />
                        <DateTimePickerModal
                          mode="datetime"
                          minimumDate={startDate}
                          isVisible={showEndDate}
                          open={showEndDate}
                          date={endDate}
                          onConfirm={(selectedDate) => {
                            const currentDate = selectedDate || endDate;
                            setEndDateEnabled(true);
                            setShowEndDate(!showEndDate);
                            setEndDate(currentDate);
                            onChange(currentDate);
                          }}
                          onCancel={() => {
                            setShowEndDate(!showEndDate);
                          }}
                        /> 
                        <Text style={{marginLeft: 5, color: `${endDateEnabled ? 'black' : 'gray'}`}} >
                          {endDateEnabled ? value.toLocaleString('en-US', dateTimeOptions) : "Enter end date"}
                        </Text>
                      </View>
                      {endDateEnabled && (
                        <Entypo 
                          name="cross" 
                          size={16} 
                          color="#878787" 
                          onPress={() => {
                            const currentDate = new Date();
                            setEndDate(currentDate);
                            onChange(currentDate);
                            setEndDateEnabled(false);
                          }}
                          style={{ marginRight: 5 }}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                )}
                name="endDate"
              />
            </View>

            <TouchableOpacity style={formSubmit} onPress={handleSubmit(onSubmit)}>             
              <Text style={formSubmitText}>{isEditMode ? "Update" : "Create"} {props.type}</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={container}>
      <Modal style={modal} isVisible={props.isModalVisible} onBackdropPress={toggleModal}>
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={modalContent}>
            <View style={header}>
              <Text style={headerText}>{isEditMode ? "Edit" : "Create"} {props.type}</Text>
              <Entypo 
                name="cross" 
                size={28} 
                color="#fff" 
                style={{ position: 'absolute', right: 10 }} 
                onPress={toggleModal}
              />
            </View>
            <View style={imageSection}>
              <TouchableOpacity style={ imagePicker } onPress={pickImage}>
                <FontAwesome6 name="image" size={20} color="black" />
                <Text style={{ marginLeft: 5, fontWeight: 600 }}>Add</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={[imageStyle]} />}
            </View>

            {renderFormContent()}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default AdminCreation;