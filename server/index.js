const express = require('express');
const app = express();
const eventRoutes = require('./routes/routes');
const PORT = process.env.PORT || 3000; 
const Axios = require('axios');

console.log('Starting server')
app.use(express.json());

app.use('/api', eventRoutes);

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
