'use strict';

const express = require('express');

const router = express.Router();
const passport =  require('passport');
const Queue = require('../utils/queue-class');


router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


const DothQ = new Queue();

DothQ.enqueue({
  question: 'The stars are charging for you!',
  hint: 'The Dothraki word for "stars" is "shieraki"',
  answer: 'Shieraki gori ha yeraan!'

});

DothQ.enqueue({
  question: 'Are you speaking truthfully?',
  hint: 'The Dothraki word for "truthfully" is "k’athijilari"',
  answer: 'Hash yer asti k’athijilari?'
    
});

DothQ.enqueue({
  question: 'Do you ride well today?',
  hint: 'The Dothraki word for "ride" is "dothrae"',
  answer: 'Hash yer dothrae chek asshekh?'
        
});

DothQ.enqueue({
  question: 'Happy Birthday!',
  hint: 'The literal translation from Dothraki is "Great day of blood!"',
  answer: 'Shieraki gori ha yeraan!'
            
});





router.get('/', (req, res) => {


  //User.findOne({ 'username': username }).then(() => {
    
//   //   if (cnt > 0) {
//   //     const err = new Error('username already exists');
//   //     err.status = 422;
//   //     return next(err);
//   //   } else { //else if no validation errors, create user
    
//   //     return User.hashPassword(password)
//   //       .then(digest => { 
//   //         encryptedPassword = digest;
//   //         return Questions.find();
//   //       })
//   //       .then((questions) => {
//   //         //console.log('concosle.log questions', questions);
//   //         questions.map((question, index) => {
//   //           //console.log('indeces', index, question);
//   //           if(index !== questions.length -1 ){ 
//   //             question._next = index +1;
//   //           } else {
//   //             question._next = 0;
//   //           }
            
//   //         });
//   //         //console.log('after next map', questions);
//   //         const newUser = {
//   //           username,
//   //           password: encryptedPassword,
//   //           firstname: firstName,
//   //           lastName,
//   //           questions,
//   //           head: 0
//   //         };
//   //         return User.create(newUser);
//   //       })
//   //       .then(user => {
//   //        // console.log(user, '>>>>>>>>>>>USER');
//   //         return res.status(201).location(`/api/users/${user.id}`).json(user.serialize());
//   //       })
//   //       .catch(err => {
//   //         if (err.code === 11000) {
//   //           err = new Error('The username already exists');
//   //           err.status = 400;
//   //         }
//   //         next(err);
//   //       });
//   //   }
//   // });
// });

console.log(req.currentUser);
  const nextQuestion = DothQ.dequeue();
  DothQ.enqueue(nextQuestion);
  return res.json(nextQuestion);



//   let questions = req.user.questions.sort((a,b)=>{
//     return a.score - b.score;
//   });
//   res.json(questions.slice(0,10));
});


module.exports = router;