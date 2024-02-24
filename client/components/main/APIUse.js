import axios from 'axios';



//Retrieves all event data and return as a json file
function GetAllEventData()
{
  const response = axios.get('http://localhost:8080/api/events')
    .then(response => {                    //Error Catching
      console.log("Get Request Succesful")
      return response.data;})
    .catch(error => {
      console.error("Get Request Failed", error)
    })

  
}

//Makes a new event based on the parameters passed in.
function postEventDetails(iD, t, clubName, sD, ed, i)
{  
  axios.post('http://localhost:8080/api/create_event', 
    {id : iD, title : "t", club_name : "clubName", start_date: "sD", end_date: "ed", intrested : i})
      .then(response =>
        {
          console.log("Post Request Succesful")
        })
      .catch
      (error =>
        {
          console.error("Post Failed", error)
        }
      )

}

// Delete event based on event given 
function deleteEvent(idToDelete)
{
  axios.delete('http://localhost:8080/api/remove_event/' + idToDelete)
    .then(response => {
      console.log("Deleted Succesfully", response)
    })
    .catch(error => {
      console.error("Error making delete request", error)
    });
}