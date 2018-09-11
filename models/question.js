'use strict';
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    
  question: { type: String, required: true },
  hint: { type: String, required: true },
  answer: { type: String, required: true }

});

QuestionSchema.methods.serialize  = function () {
  return {
    id: this._id,
    question: this.question,
    hint: this.hint,
    answer: this.answer
  }
}

module.exports = mongoose.model('Question', QuestionSchema);
