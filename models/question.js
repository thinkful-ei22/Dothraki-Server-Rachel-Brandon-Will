'use strict';
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    
  prompt: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }

});

var Question = mongoose.model('Question', QuestionSchema);



exports.Question = Question;
