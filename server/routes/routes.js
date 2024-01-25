const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const eventSchema = require('../models/model');
const Event = mongoose.model('Event', eventSchema);

// GET all data
router.get('/getAll', async (req, res) => {
    try {
        const events = await Event.find({});

        res.status(200).json(events);
    } catch (error) {
        console.error('Error Retrieving events: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
