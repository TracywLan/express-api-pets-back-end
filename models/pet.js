// models/pet.js

const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  breed: String,
  isAdopted: {
    type:Boolean,
    default:false,
    },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
