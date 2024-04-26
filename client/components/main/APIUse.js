import axios from 'axios';
import { getURL } from '../AxiosService';

//axios.defaults.withCredentials = true; 
const userID = '76d3aebd-5af3-496e-bd67-0d37c84bf28c'
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

export function GetSaved() 
{                                                    //FOR TESTING
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

export async function AddToSave(eventId)
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

export function RemoveFromSave(eventId)
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