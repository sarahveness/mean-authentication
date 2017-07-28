const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('connected to db ' + config.database);
})

mongoose.connection.on('error', (err) => {
  console.log('Database Error ' + err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS Middleware
app.use(cors());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Uses the 'users/' routes in the routes folder
app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
})

app.listen(port, () => {
  console.log(`Server listening on Andre ${port}`)
});
