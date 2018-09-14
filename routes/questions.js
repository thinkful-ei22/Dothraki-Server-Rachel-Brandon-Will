'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {User} = require('../models/user');

const {Question} = require('../models/question');
const router = express.Router();


const jsonParser = bodyParser.json();


//when /next endpoint is used, authenticate
// then find the user with the correct username
//find the first question for that user and display it

router.use(jsonParser);
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    User.findOne({
      username: req.user.username
    }).then(user => res.json(user.questions[user.head]));
  }
);

// //added later - need to go through this code....
// //when you add this you need to have head in user schema...

router.post(
  '/answer',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    //console.log('running');
    console.log(req.body.isCorrect, 'ISCORRECT SENT TO ENDPOINT');
    User.findOne({
      username: req.user.username
    })
      .then(user => {
        //console.log('username', user);
        console.log(user.head, '<<< user.head');
        const answeredQuestionIndex = user.head;
        //console.log(user.questions[answeredQuestionIndex], '<<<question at answeredIndex');
        const answeredQuestion = user.questions[answeredQuestionIndex];
        console.log('MEMORY STRENGTH BEFORE CHANGE:', answeredQuestion.memoryStrength);
        if (req.body.isCorrect) {
          user.score += 1;
          answeredQuestion.memoryStrength *= 2;
        } else {
          answeredQuestion.memoryStrength = 1;
        }
        console.log('MEMORY STRENGTH after CHANGE:', answeredQuestion.memoryStrength);
        // console.log(user.score, '<<<<user score');
        // console.log(answeredQuestion, '<<<answeredQuestion');


        if (user.questions.length < 2) {
          return;
        }

        // Remove the answered question from the head
        console.log(answeredQuestion._next, '<<<next Question');
        user.head = answeredQuestion._next;

        // Find the insertion point
        let currentQuestion = answeredQuestion;
        console.log(answeredQuestion.memoryStrength, 'ANSWERED DOT MEMORY');
        
        for (let i = 0; i < answeredQuestion.memoryStrength; i++) {
          const nextIndex = currentQuestion._next;
          console.log(nextIndex , '<<<next Index');
          if (nextIndex === null) {
            // We are inserting at the end
            break;
          }


          //target = user.questions[nextIndex];

          //this changes the current question to the target
          currentQuestion = user.questions[nextIndex];

          // console.log(currentQuestion, '<<< currentQuestion (in for loop)');
        }
        // aLex's code
       

        answeredQuestion._next = currentQuestion._next;
        currentQuestion._next = answeredQuestionIndex;
        return user.save();
      })
      .then(() => res.status(200).json({}));
  }
);

// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const {User} = require('../models/user');

// const {Question} = require('../models/question');
// const router = express.Router();

// //onst jsonParser = bodyParser.json();


// //when /next endpoint is used, authenticate
// // then find the user with the correct username
// //find the first question for that user and display it
// // router.get(
// //   '/next',
// //   passport.authenticate('jwt', {session: false}),
// //   (req, res) => {
// //     User.findOne({
// //       username: req.user.username
// //     }).then(user => res.json(user.questions[user.head]));
// //   }
// // );

// // //added later - need to go through this code....
// // //when you add this you need to have head in user schema...

// // router.post(
// //   '/answer',
// //   [passport.authenticate('jwt', {session: false}), jsonParser],
// //   (req, res) => {
// //     User.findOne({
// //       username: req.user.username
// //     })
// //       .then(user => {
// //         const answeredQuestionIndex = user.head;
// //         const answeredQuestion = user.questions[answeredQuestionIndex];
// //         if (req.body.isCorrect) {
// //           user.score += 1;
// //           answeredQuestion.memoryStrength *= 2;
// //         } else {
// //           answeredQuestion.memoryStrength = 1;
// //         }

// //         if (user.questions.length < 2) {
// //           return;
// //         }

// //         // Remove the answered question from the head
// //         user.head = answeredQuestion.next;

// //         // Find the insertion point
// //         let currentQuestion = answeredQuestion;
// //         for (let i = 0; i < answeredQuestion.memoryStrength; i++) {
// //           const nextIndex = currentQuestion.next;
// //           if (nextIndex === null) {
// //             // We are inserting at the end
// //             break;
// //           }

// //           currentQuestion = user.questions[nextIndex];
// //         }
// //         // Insert the node
// //         answeredQuestion.next = currentQuestion.next;
// //         currentQuestion.next = answeredQuestionIndex;
// //         return user.save();
// //       })
// //       .then(() => res.status(200).json({}));
// //   }
// // );

// router.get('/', (req, res) => {
//   console.log('running getAll');
//   return Question.find()
//     .then(questions => res.json(questions))
//     .catch((err) => {
//       res.status(500).json({message: 'Internal server error'});
//       console.log(err);
//     }
//     );         
// });


// module.exports = {router};



//const express = require('express');

//const router = express.Router();


//const passport =  require('passport');
//const Queue = require('../utils/queue-class');
//const User = require('../models/user');




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

// //let memoryStrength = 0;

// router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));
// router.put('/:memoryStrength', (req, res, next) => {
// console.log(req.user, 'REQ.USER_________');
//   const { _id} = req.user;
//   const memoryStrength  = req.params.memoryStrength;

//   console.log('MEMORY STRENGTH', memoryStrength);

//   User.findById(_id)
//     .then( user => {
//       console.log(user, 'USER+++++');
//       console.log('HEAD++++++++', user.head);
//       let head = user.head;
//       let questionsArray = user.questions;
//       console.log('QUESTIONS ARRAY BEFORE NEXT CHANGES',questionsArray);
//       console.log('MEMORY STRENGTH INSIDE USER CALL', memoryStrength);
    
//       let currentQuestionNode = questionsArray[head];
//       currentQuestionNode.memoryStrength = memoryStrength;
//       // console.log('CURRENT QUESTION', currentQuestionNode);
//       //console.log('NEXT QUESTION', questionsArray[currentQuestionNode._next])
//       //console.log('CURRENT _NEXT', currentQuestionNode._next);
//       //copy currentQuestionNode to currentNode since currentNode transforms
//       //into target in the while loop below
//       let currentNode = currentQuestionNode;
//       let counter = 0;
//       while(counter < memoryStrength){
//         currentNode = questionsArray[currentNode._next];
//         counter++;
//       }
//       let target = currentNode;
//       console.log('TARGET QUESTION', target);
     

// //
// user.head = currentQuestionNode._next;
// console.log('NEW HEAD', currentQuestionNode._next);
// let originalNextInLine =  currentQuestionNode._next;
// //
// console.log('CURRENT NODE BEFORE NEXT IS CHANGED', currentQuestionNode);
// currentQuestionNode._next = target._next;
// console.log('CURRENT NODE AFTER NEXT IS CHANGED', currentQuestionNode);

// console.log('NEW CURRENT NODE _NEXT', currentQuestionNode._next);
// //need if statement to handle when index is larger than length
// target._next = currentQuestionNode._index;

// console.log('NEW TARGET _NEXT', target._next);
  

// // questionsArray.map(question => console.log(question.question, 'INDEX', question._index, 
// //   'MEMORY STRENGTH', question.memoryStrength,'_NEXT VALUE', question._next));
// console.log('QUESTIONS ARRAY ', questionsArray);
// let nextQuestionToDisplay = questionsArray[originalNextInLine];
// // when done, call a save;
// //use .then to make sure user saves before sending response
// user.save()
//   .then(() =>  res.json(nextQuestionToDisplay) );
     
//     });
// //add catch blocks
// });


// router.get('/', (req, res) => {
//   // const { username } = req;

//   // User.findOne({ 'username': username }).then(() => {
    
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
//  //

//   // console.log(req.currentUser);
//   // const nextQuestion = DothQ.dequeue();
//   // DothQ.enqueue(nextQuestion);
//   // return res.json(nextQuestion);

//   //let user = req.user.username;
//   let questions = req.user.questions;
//   let head = req.user.head;
//   return res.json(questions[head]);

//   // let questions = req.user.questions.sort((a,b)=>{
//   //   return a.score - b.score;
//   // });
//   // res.json(questions.slice(0,10));
// });

module.exports = router;