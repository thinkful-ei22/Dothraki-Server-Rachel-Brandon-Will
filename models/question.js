'use strict';
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    
  question: {
    type: String,
    required: true
  },
  hint: {
    type: String
  },
  answer: {
    type: String,
    required: true
  },
  _next: { type: Number}

});

module.exports =  mongoose.model('Questions', QuestionSchema);




