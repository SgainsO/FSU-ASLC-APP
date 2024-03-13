const express = require('express');
const dbConfig = require("../db.config.js");
const { Pool } = require('pg');

const router = express.Router();             //Allows us to use the express framework

const pool = new Pool({ 
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD,
    port: 5432
});                          //Connects to the PostSQL database


router.get('/GetAllEvents', async (req, res) => { 
   try{
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events');
    const events = result.rows;
    client.release();
    console.log(events);
    res.json(events);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving events');
  }
});

router.get('/GetAllEventCats', async (req, res) => {
   try{ 
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM event_categories');
    const events = result.rows;
    res.json(events);
} catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving events');
  }
    
    
})

router.get('/:category', async (req, res) => {
    const category = req.params.category;
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM events WHERE category = $1', [category]);
      const events = result.rows;
      client.release();
      res.json(events);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error retrieving events');
    }
  });



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

//id, name, type
router.post('/postEventCat', async (req, res) => {
    const {id, events_header, category_type } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO event_categories (id, events_header, category_type) VALUES ($1, $2, $3) RETURNING *',
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