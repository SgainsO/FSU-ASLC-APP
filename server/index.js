require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const mongoString = process.env.DATABASE_URL;

// Import your routes
const routes = require('./routes/routes');

const app = express();
app.use(express.json()); //Utilize express json middleware to turn req.body to json
app.use('/api', routes); // localhost:8080/api

// Establish a connection to the database via mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error('Database connection error:', error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
