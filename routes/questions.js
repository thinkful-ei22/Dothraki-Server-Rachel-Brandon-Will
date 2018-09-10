'use strict';

const express = require('express');

const router = express.Router();
const passport =  require('passport');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


router.get('/', (req, res) => {


//   let questions = req.user.questions.sort((a,b)=>{
//     return a.score - b.score;
//   });
//   res.json(questions.slice(0,10));
}
);


module.exports = router;