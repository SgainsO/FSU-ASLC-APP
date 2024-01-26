const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const eventSchema = require('../models/model');
const Event = mongoose.model('Event', eventSchema);

// GET ALL DATA
router.get('/events', async (req, res) => {
    try {
        // Returns all events from the database
        const events = await Event.find({});

        res.status(200).json(events);
    } catch (error) {
        console.error('Error Retrieving events: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST 
router.post('/create_event', async (req, res) => {
    try {
        // Parse data from the req.bodys
        const { id, title, club, date, interested} = req.body;

        // Create a new instance of event from our eventScheme with mongoose
        const newEvent = new Event({id, title, club, date, interested});

        // Save the event to the database
        await newEvent.save();

        // Return status 200 and json message
        res.status(200).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Internal server error" });
    }
})

// DELETE by id param
router.delete('/remove_event/:id', async (req, res) => {
    try {
        // Parse the id from params
        const eventID = req.params.id

        const deletedEvent = await Event.findOneAndDelete({id: eventID});

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found in database." });
        }

        res.status(200).send()
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;
