'use strict';


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  hint: String,
  memoryStrength: Number,
  _next: Number
});

module.exports = mongoose.model('Question', questionSchema);
// var mongoose = require('mongoose');

// var QuestionSchema = new mongoose.Schema({
    
//   question: {
//     type: String,
//     required: true
//   },
//   hint: {
//     type: String
//   },
//   answer: {
//     type: String,
//     required: true
//   },
//   _next: { type: Number},
//   _index: {type: Number },
//   memoryStrength: {type: Number}

// });

// module.exports =  mongoose.model('Questions', QuestionSchema);




