const express = require('express');
const pool = require('../db/database');
var cors = require('cors');

const router = express.Router();             //Allows us to use the express framework

// REQUEST TYPE: GET
// REQUEST URL: /api/health
router.get('/health', (req, res) => {
  res.status(200);
});

// INPUT STRING
// REQUEST TYPE: POST
// REQUEST URL: /users/:userID/add-to-saveds
router.post('/users/:userID/add-to-saved', async (req, res) => {
  try{
    console.log('adding')
  const {PostID} = req.body;
  const userID = req.params.userID; 
  const client = await pool.connect();
  const result = await client.query('UPDATE users SET saved = array_append(saved, $1) WHERE id = $2', [PostID ,userID]);
  const newEvent = result.rows[0];
  res.json(newEvent); 

  }catch(err){
    console.error('Error executing update array q.', err);
    res.status(500).send('Error creating event');
  }

});

// INPUT STRING
// REQUEST TYPE: POST
// REQUEST URL: /users/:userID/add-to-saveds
router.post('/users/:userID/remove-from-saved', async (req, res) => {
  try {
    console.log("remove")
    const { PostID } = req.body;
    const userID = req.params.userID; 
    const client = await pool.connect();
    const result = await client.query('UPDATE users SET saved = array_remove(saved, $1) WHERE id = $2', [PostID, userID]);
    client.release();
    res.json({ success: true }); // Respond with a success message
  } catch (err) {
    console.error('Error executing update array query:', err);
    res.status(500).json({ error: 'Error removing saved post' }); // Send an error response
  }
});


// REQUEST TYPE: GET
// REQUEST URL: /api/getSavedEvents/:userID
// RESPONSE: JSON
router.get('/getSavedEvents/:userID', async (req, res) => {
  try {
    const client = await pool.connect();
    const userID = req.params.userID;
    const result = await client.query('SELECT saved FROM users WHERE id IN ($1);',[userID]);
    const users = result.rows;
    client.release();

    res.status(200).json({data: users, total: users.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({data: {}, message: "Internal Error", total: users.length});
  }  
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

router.get('/getTwentyEvents/:AboveId', async (req, res) => {
  try {
    const client = await pool.connect();
    const aboveId = req.params.AboveId
    const result = await client.query('SELECT * FROM events WHERE id > $1 ORDER BY id LIMIT 20', [aboveId]);
    client.release();

    res.status(200).json({data: result.rows, message: "Data Recieved", total: result.rows.length})
  } catch (err) {
    console.error('Error executing query', err);
    res.status(404).json({data: {}, message: "Internal Error", total: result.rows.length})
  }


});


router.get('/getEventsFromKey/:key', async (req, res) => { 
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events WHERE query_key = $1', [req.params.key]);
    const events = result.rows;
    client.release();

    res.status(200).json({data: events, message: "Data Recieved", total: events.length})
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
router.post('/addEvent', async (req, res) => {
    const { Title, Club, Type, startDate, endDate, Interested, Category } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO events (title, club, type, startDate, endDate, interested, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [Title, Club, Type, startDate, endDate, Interested, Category]);
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

// CLUB RELATED ROUTES

router.post('/addClub', async (req, res) => {
  const { Name, Type, Socials, URL } = req.body;
  

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO clubs (name, type, socials, url) VALUES ($1, $2, $3, $4) RETURNING *',
      [Name, Type, Socials, URL]);
    const newClub = result.rows[0];
    client.release();
    res.json(newClub);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating club');
  }
}
);

router.post('/club/:id/update', async (req, res) => {
  const ID = req.params.id;
  const { Name, Type, Socials, URL } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE clubs SET name = $1, type = $2, socials = $3, url = $4 WHERE id = $5 RETURNING *',
      [Name, Type, Socials, URL, ID]);
    const newClub = result.rows[0];
    client.release();
    res.json(newClub);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating club');
  }
});

router.delete('/club/:id/delete', async (req, res) => {
  const ID = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM clubs WHERE id = $1 RETURNING *', [ID]);
    const newClub = result.rows[0];
    client.release();
    res.json(newClub);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting club');
  }
});



module.exports = router;