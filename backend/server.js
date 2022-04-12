const express = require('express');
const mongoose = require('mongoose');


const app = express();

const port = process.env.PORT || 5000;

const ConnectDB = require('./database');

//Connect Database
ConnectDB();

app.listen(port, ()=>{
    console.log(`Server started on PORT ${port}`);
});
