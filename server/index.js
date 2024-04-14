const express = require('express');
const app = express();
const eventRoutes = require('./routes/routes');
const authRoutes = require('./routes/auth');
const Axios = require('axios');
const cors = require("cors");
const ip = require('ip');

const HOST = ip.address();
const PORT = process.env.PORT || 3000; 

app.use(cors())
console.log('Starting server')
app.use(express.json());

app.use('/api', eventRoutes);
app.use('/auth', authRoutes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, UPDATE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
}); 

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
