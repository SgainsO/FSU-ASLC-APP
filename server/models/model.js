const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    id: Number,
    title: String,
    club: String,
    date: String,
    interested: Number,
}, { collection: 'events' });

module.exports = eventSchema
