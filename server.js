var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var cors = require('cors');
var app = express();

// importing routes and connection
var user = require('./routes/user.routes');
const db = require('./config/connection.db');

// setting port
const port = 3000;

// middleware
//    cors 
app.use(cors());

//    passport for creating sessions
app.use(passport.initialize());
app.use(passport.session());
require('./config/config.passport')(passport);

// for processing json requests
app.use(bodyParser.json());

//    setting pubic folder
app.use(express.static(path.join(__dirname,'public')));

// user route
app.use('/users',user);

// Index Route
app.get('/',(req,res)=>{
  res.send('Invalid Endpoint!');
});

// rest of routes
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
});


// initialize server at port 3000
app.listen(port,()=>{
  console.log("Server started at port"+port);
});
