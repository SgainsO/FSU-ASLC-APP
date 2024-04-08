const express = require('express');
const dbConfig = require("../db.config.js");
const { Pool } = require('pg');
var cors = require('cors');

const router = express.Router();             //Allows us to use the express framework

const pool = new Pool({ 
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: 5432
});                          //Connects to the PostSQL database

// REQUEST TYPE: GET
// REQUEST URL: /api/health
router.get('/health', (req, res) => {
  res.status(200);
});

// REQUEST TYPE: GET
// REQUEST URL: /api/getUsers
// RESPONSE: JSON
router.get('/getUsers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    client.release();

    res.status(200).json({data: users, total: users.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({data: {}, message: "Internal Error", total: users.length});
  }  
});

// REQUEST TYPE: GET
// REQUEST URL: /api/getAllEvents
// RESPONSE: JSON
router.get('/getEvents', async (req, res) => { 
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events');
    const events = result.rows;
    client.release();

    res.status(200).json({data: events, total: events.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(404).json({data: {}, message: "Internal Error", total: events.lengths})
  }
});

// REQUEST TYPE: GET
// REQUEST URL: /api/getClubs
// RESPONSE: JSON
router.get('/getClubs', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM clubs');
    const clubs = result.rows;
    client.release();
    
    res.status(200).json({data: clubs, total: clubs.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({data: {}, message: "Internal Error", total: clubs.length});
  }
});
// REQUEST TYPE: GET
// REQUEST URL: /api/getAllCategories
// RESPONSE: JSON
router.get('/getAllCategories', cors(), async (req, res) => {
  console.log("entered getAllCategories")
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM cats');
    const categories =  result.rows;
    client.release();

    res.status(200).json({data: categories, message: "Data Recieved", total: categories.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({data: {}, message: "Internal Error", total: categories.length});
  }    
})

// REQUEST TYPE: GET
// REQUEST URL: /api/getEvent/1
// REQUEST PARMS: id
// RESPONSE: JSON
router.get('getEvent/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events WHERE id = $1', [id]);
    const events = result.rows;
    client.release();

    // Checks if event exists
    if (events.length === 0) {
      res.status(404).json({data: {}, message: "Event not found", total: events.length});
    }

    res.status(200).json({data: events[0], message: "", total: events.length});
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({data: {}, message: "Internal Error", total: events.length});
  }
});

// REQUEST TYPE: GET
// REQUEST URL: /api/getCategory/social
// REQUEST PARMS: category
router.get('getCategory/:id', async (req, res) => {
  const category = req.params.category;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events WHERE category = $1', [category]);
    const events = result.rows;
    client.release();

    res.status(200).json({data: events, message: "", total: events.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({data: {}, message: "Internal Error", total: events.length});
  }
});


// REQUEST TYPE: POST
// REQUEST URL: /api/postEvent
// REQUEST PARMS: title, club, type, startDate, endDate, interested, category
router.post('/postEvent', async (req, res) => {
    const { title, club, type, startDate, endDate, interested, category } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO events (title, club, type, startDate, endDate, interested, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, club, type, startDate, endDate, interested, category]);
    const newEvent = result.rows[0];
    client.release();
    res.json(newEvent);
    console.log(newEvent);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating event');
  }
});

// REQUEST TYPE: POST
// REQUEST URL: /api/postEventCat
// REQUEST PARMS: id, title, cat_query, imageurl
router.post('/postEventCat', async (req, res) => {
    const {id, title, cat_query, imageurl } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO event_categories (id, title, cat_query, imageurl) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, events_header, category_type]);
    const newEvent = result.rows[0];
    client.release();
    res.json(newEvent);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating event');
  }
});


module.exports = router;