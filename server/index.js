const express = require('express');
const app = express();
const eventsRouter = require('./routes/events');
const PORT = process.env.PORT || 3000; 
const Axios = require('axios');

console.log('Starting server')
app.use(express.json());

app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


async function Test() {
try{
await Axios.post('http://localhost:3000/events/postEventCat', {id: 3, events_header: '',category_type: 'social'})
.then(response => console.log(response.data))
console.log("Testing!")
}
catch(err) {
console.error(err);
}
}

//Test()
console.log('exited axios test')