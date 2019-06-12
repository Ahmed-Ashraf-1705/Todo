const express = require('express');
const mongoose = require('mongoose');




//var dbUrl = 'mongodb+srv://todoAPI:todoAPI@cluster0-hfclw.mongodb.net/todoApp';
// for localhost database
//var dbUrl = 'mongodb://localhost:27017/TODO';
var dbUrl = "mongodb+srv://todoApp:17051998_A_A@cluster0-f6tj0.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbUrl,{useCreateIndex: true, useNewUrlParser: true });

// on successful connection
mongoose.connection.on('connected',()=>{
    console.log('Database connection established!');
});
// settind some configurations for mongodb
mongoose.set('useFindAndModify', false);

// when error happens
mongoose.connection.on('error',err=>{
    console.log('Error happened \n Details: '+err);
});

module.exports = {
    database : 'mongodb://localhost:27017/TODO',
    secret : 'mysecret' // can be changed
}