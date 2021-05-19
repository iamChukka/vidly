require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to MongoDB...'))
.catch(err=>console.error('Could not connect to MongoDB....'));

const express = require('express');
const genres = require('./routes/genres');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);

port = process.env.APP_PORT;


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
  