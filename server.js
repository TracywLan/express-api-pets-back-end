const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors')

// Import controller file
const petRouter = require('./controllers/pets.controller')

// Middleware
mongoose.connect(process.env.MONGODB_URI);

// Logs on connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Logs on errors
mongoose.connection.on('error', (error) => {
  console.log(`Mongoose had an error connecting ${error.message}`);
})

// Tell express we want to use Json
app.use(express.json());
app.use(logger('dev'));
app.use(cors({ origin: 'http://localhost:5173' }));
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Please leave a message!'
//   })
// })


app.use('/pets', petRouter);

app.listen(3000, () => {
  console.log('The express app is ready at localhost:3000');
});
