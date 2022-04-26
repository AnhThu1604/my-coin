const express = require('express');
const mongoose = require('mongoose');
const router = require('./router')

const app = express();

const port = process.env.PORT || 5000;

const ConnectDB = require('./database');

//Connect Database
ConnectDB();

app.use(router);
app.listen(port, ()=>{
    console.log(`Server started on PORT ${port}`);
});


