const mongoose = require('mongoose');


// user.js

const carSchema = new mongoose.Schema({
  
  name: String,

  
}, { timestamps: true })



const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
//pantry
  pantry: [carSchema]
 //  carSchema 

});

const User = mongoose.model('User', userSchema);

module.exports = User;




