'use strict';

const express = require('express');

const router = express.Router();
const passport =  require('passport');
const Queue = require('../utils/queue-class');
const User = require('../models/user');


router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


// const DothQ = new Queue();

// DothQ.enqueue({
//   question: 'The stars are charging for you!',
//   hint: 'The Dothraki word for "stars" is "shieraki"',
//   answer: 'Shieraki gori ha yeraan!'

// });

// DothQ.enqueue({
//   question: 'Are you speaking truthfully?',
//   hint: 'The Dothraki word for "truthfully" is "k’athijilari"',
//   answer: 'Hash yer asti k’athijilari?'
    
// });

// DothQ.enqueue({
//   question: 'Do you ride well today?',
//   hint: 'The Dothraki word for "ride" is "dothrae"',
//   answer: 'Hash yer dothrae chek asshekh?'
        
// });

// DothQ.enqueue({
//   question: 'Happy Birthday!',
//   hint: 'The literal translation from Dothraki is "Great day of blood!"',
//   answer: 'Shieraki gori ha yeraan!'
            
// });





router.get('/', (req, res) => {

  let user = req.user.username;
  let questions = req.user.questions;
  let head = req.user.head;
  return res.json(questions[head]);



  // DothQ.enqueue(nextQuestion);
  // return res.json(nextQuestion);



//   let questions = req.user.questions.sort((a,b)=>{
//     return a.score - b.score;
//   });
//   res.json(questions.slice(0,10));
});

// router.get('/:id', (req, res, next) => { 
  
//   for (let i=0; i < req.user.questions.length; i++){
//     if (id === req.user.questions[i]._id){
//       return res.json(req.user.questions[i]);
//     }
//   }
// });
router.put('/:id', (req, res, next) => {
  const {nextQ} = req.body;

  res.json(nextQ);
});

module.exports = router;