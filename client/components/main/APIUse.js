import axios from 'axios';

//axios.defaults.withCredentials = true; 

//Retrieves all event data and return as a json file
export function getCategories() {
  return axios.get('http://localhost:3000/api/getAllCategories') // Adjust the URL to match your local server
    .then(response => {
      // Assuming the response contains JSON data, you can access it through response.data
      console.log('Data received:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // Re-throwing the error to propagate it to the caller
    });
}