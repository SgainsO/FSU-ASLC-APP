import axios from 'axios';

function getEventDetails()
{
  const response = axios.get('http://localhost:3000/GetEvent')
  return response.data;
}

function postEventDetails(iD, t, clubName, d, i)
{
  axios.post('http://localhost:3000/postEvent', {id : iD, title : t, club_name : clubName, data: d, intrested : i})
}
