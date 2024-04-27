import axios from 'axios';
import { getURL } from '../AxiosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Retrieves all event data and return as a json file
export function getCategories() {
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

export async function GetSaved() {  
  try {
    const userID = await AsyncStorage.getItem('userID');  // Correctly await the promise
    if (!userID) {
      throw new Error('No user ID found');
    }

    const response = await axios.get(`${getURL()}/api/getSavedEvents/${userID}`); // Ensure userID is a string
    console.log('GetSaved');
    console.log(response.data.data[0].saved);
    return response.data.data[0].saved;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throwing the error to propagate it to the caller
  }
}

export async function AddToSave(eventId)
{
  const userID = await AsyncStorage.getItem('userID');
  axios.post(`${getURL()}/api/users/${userID}/add-to-saved`, { PostID: eventId })
  .then(response => {
    console.log('Response:', response);
    // Handle response data here
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle errors here
  });
}

export async function RemoveFromSave(eventId) {
  try {
    const response = await axios.post(`${getURL()}/api/users/${userID}/remove-from-saved`, { PostID: eventId });
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export function GetEventsFromKey(key) 
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

export function GetAllEvents()
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

export function GetTwentyEvents(aboveId, limit = 20, key) {   //activeButton holds the key name
  return axios.get(`${getURL()}/api/getTwentyEvents/${aboveId}`, { params: { limit, key } })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

export const increaseInterested = async (eventId) => {
  try {
    const response = await axios.put(`${getURL()}/api/increase-interested/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error increasing the interested count:', error);
    throw error;
  }
}

export const decreaseInterested = async (eventId) => {
  try {
    const response = await axios.put(`${getURL()}/api/decrease-interested/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error decreasing the interested count:', error);
    throw error;
  }
}