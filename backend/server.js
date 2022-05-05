const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');
var cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

const ConnectDB = require('./database');

//Connect Database
ConnectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(router);
app.listen(port, ()=>{
    console.log(`Server started on PORT ${port}`);
});


