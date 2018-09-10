'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LinkedList = require('../linked-list-class');

//router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


const questions = [
  {
    dothraki: 'shierak qiya',
    english: 'comet'
  },
  {
    dothraki: 'Me nem nesa',
    english: 'it is known'
  },
  {
    dothraki: 'Athdavrazar',
    english: 'excellent'
  },
  {
    dothraki: 'shekh ma shieraki anni',
    english: 'my sun and stars'
  },

];

const linkedList = new LinkedList();

function getWords(array){
  for(let i = 0; i < array.length; i++){
    linkedList.insertFirst(array[i]);

  }
}

getWords(questions);


let curNode = linkedList.head;
router.get('/', (req, res, next) => {

  res.json(curNode.value);


});
//  router.get('/', (req, res) => {
//   let questions = req.user.questions.sort((a,b)=>{
//     return a.score - b.score;
//   });
//   res.json(questions.slice(0,10));



module.exports = router;