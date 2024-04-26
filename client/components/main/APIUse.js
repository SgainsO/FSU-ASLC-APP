import axios from 'axios';
import { useState } from 'react';
import { getURL } from '../AxiosService';

import AsyncStorage from '@react-native-async-storage/async-storage';
//axios.defaults.withCredentials = true; 

const APIUse = async () => {

const [userID, setUserId] = useState(null)


async function retrieveUserSession() {
  try {   
      setUserId(await EncryptedStorage.getItem("userID"));
  
  } catch (error) {
    console.error(error);
  }
}


//Retrieves all event data and return as a json file
 function getCategories() {
  return axios.get(`${getURL()}/api/getAllCategories`) // Adjust the URL to match your local server
    .then(response => {
      // Assuming the response contains JSON data, you can access it through response.data
   //   console.log('Data received:', response.data);
      
      return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // Re-throwing the error to propagate it to the caller
    });
}

 async function GetSaved() 
{
  if(userID == null)
  {
    try{
      setUserId(await AsyncStorage.getItem('userID'));
    }
    catch(error)
    {
      console.log(error);
    }
  }


  return axios.get(`${getURL()}/api/getSavedEvents/${userID}`) // Adjust the URL to match your local server
  .then(response => {


    console.log('GetSaved')
    console.log(response.data.data[0].saved)
    return response.data.data[0].saved;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    throw error; // Re-throwing the error to propagate it to the caller
  });

}

 async function AddToSave(eventId)
{
  await console.log(eventId);
  console.log('entered add')
  axios.post(`${getURL()}/api/users/${userID}/add-to-saved`, {PostID: eventId})
  .then(response => {
    console.log('Response:', response);
    // Handle response data here
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle errors here
  });
}

function RemoveFromSave(eventId)
{
  axios.post(`${getURL()}/api/users/${userID}/remove-from-saved`, {PostID: eventId})
  .then(response => {
    // Handle response data here
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle errors here
  });
}

function GetEventsFromKey(key) 
{                                        
  console.log(key)            //FOR TESTING
  return axios.get(`${getURL()}/api/getEventsFromKey/${key}`) // Adjust the URL to match your local server
  .then(response => {

    return response.data.data;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    throw error; // Re-throwing the error to propagate it to the caller
  });

}

 function GetAllEvents()
{
  return axios.get(`${getURL()}/api/getEvents`) // Adjust the URL to match your local server
    .then(response => {
      // Assuming the response contains JSON data, you can access it through response.data
      console.log('Data received:', response.data);
      return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // Re-throwing the error to propagate it to the caller
    });

}

function GetTwentyEvents(aboveId, limit = 20, key) {   //activeButton holds the key name
  return axios.get(`${getURL()}/api/getTwentyEvents/${aboveId}`, { params: { limit, key } })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

}