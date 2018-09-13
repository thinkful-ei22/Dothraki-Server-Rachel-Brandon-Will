
'use strict';

const express = require('express');

const router = express.Router();


const questions = [
  {
    english: 'Do you ride well today?',
    dothraki: 'Shieraki gori ha yeraan!',
    next: 1
  },
  {
    english: 'The stars are charging for you!',
    dothraki: 'Shieraki gori ha yeraan!',
    next: 2
  },
  {
    english: 'my sun and stars',
    dothraki: 'shekh ma shieraki anni',
    next: 3
  },
  {
    english: 'The moon of my life',
    dothraki: 'jalan atthirari anni',
    next: 4
  }
]

const linkedList = new LinkedList();

function insertWords(array){
  for(let i = 0; i < array.length; i++){
    linkedList.insertFirst(array[i]);

  
  }
}


insertWords(questions);

let curNode = linkedList.head;
let prevNode= null;


router.get('/',(req,res,next) =>{

  if(curNode.next === null){
    curNode = linkedList.head;
  }
  
  let nodes ={
    current: curNode.value,
    previous: prevNode ? prevNode.value : {dothraki:'',english:''}
  };

  res.json(nodes);

});


module.exports = router;


