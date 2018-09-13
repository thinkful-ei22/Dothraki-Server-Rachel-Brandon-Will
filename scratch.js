router.put('/:memoryStrength', (req, res, next) => {

    const{memoryStrength} = req.params;

    const { head, id} = req.user;
   const {user} = req.user;
   
//    currentQuestion = user.questions[head];
//    //copy currentQuestion to currentNode since currentNode transforms
//    //into target in the while loop below
//    currentNode = currentQuestion


//     target = null;
//     counter = 0;
    
//     while(counter < memoryStrength){
//       currentNode = questions[currentNode.next];
//       counter++;
//     }
//     target = currentNode;

//     newNextValueForCurrentQuestion = target._next
//    target._next = currentQuestion.index;

//id is userId 
   User.findById(id)
.then( user => {
	let questionsArray = user.questions;
	// ... update as necessary;
	
	// when done, call a save;
	user.save();
})
.then( userUpdated => {
	let updatedQuestions = userUpdated.questions;
});