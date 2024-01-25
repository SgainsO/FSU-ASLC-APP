import axios from 'axios';

function getEventDetails()
{
  axios.get('http://localhost:3000/GetEvent').then(function (response) {return response.data})
}

function postEventDetails(iD, t, clubName, d, i)
{
  axios.post('http://localhost:3000/post', {id : iD, title : t, club_name : clubName, d: date, intrested : i})
  
}
