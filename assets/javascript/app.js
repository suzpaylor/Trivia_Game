var triviaQuestions = [{
	question: "Who wrote jQuery?",
	answerList: ["Lou 🤓 & Tyler 🤓", "Mark Myers 👨‍💻", "John Resig 👨‍💻", "Ethan 👨‍🏫"],
	answer: 2
},{
	question: "When you want to animate elements, you need their position property set to:",
	answerList: ["absolute", "fixed", "relative", "floating"],
	answer: 0
},{
	question: "JSON = ",
	answerList: ["JavaScript Sounds ON", "JavaScript Operational Status", "JavaScript Objects Notation", "JavaScript Object Notation"],
	answer: 3
},{
	question: "API = ",
	answerList: ["Applied Platform Information", "Application Programming Interface", "Apples Pickles Igloos", "Application Programmin Integration"],
	answer: 1
},{
	question: "An API is a series of object _____________, allowing you to create your own instances in of the API provider's objects",
	answerList: ["Methods", "Databases", "Programs", "Constructors"],
	answer: 3
},{
	question: "Which of the following is not a jQuery method?",
	answerList: ["animate()", "fadeOut()", "appendTo()", "class()"],
	answer: 3
},{
	question: "_______________ = 1,000 milliseconds?",
	answerList: ["10 seconds", "1 second", "100 seconds", "10 seconds"],
	answer: 1
},{
	question: "When you run this jQuery effect, the JS interpreter changes the CSS opacity property for the selected element from 0 to 100.",
	answerList: ["fadeOut()", "hide()", "fadeIn()", "fadeTo()"],
	answer: 2
},{
	question: "What is the parameter that controls how long it takes for the effect to complete?",
	answerList: ["milliseconds", "duration", "length", "delay"],
	answer: 1
},{
	question: "SQL = ___________________?",
	answerList: ["Stupidest Questions Language", "Sophisticated Query Language", "Standard Query Language", "Structured Query Language"],
	answer: 3
},{
	question: "Tells a function to run repeatedly with an interval of time between each repetition",
	answerList: ["setInterval()", "setTimeout()", "delay()", "looping"],
	answer: 0
},{
	question: "Use this JavaScript timer method when you want to set a period of time to wait until telling a function to run",
	answerList: ["delay()", "setTimeout()", "setTimeOut()", "setInterval()"],
	answer: 1
},{
	question: "This jQuery method adds a pause between different effects that are queued up in a chain of effects",
	answerList: ["setTimeout()", "setDelay()", "setInterval()", "delay()"],
	answer: 3
},{
	question: "This is used when a variable (or property of an array item) hasn't been initialized to a value",
	answerList: ["undefined", "null", "NaN", "void"],
	answer: 0
},{
	question: "Which of these items is not considered a falsey value in JavaScript?",
	answerList: ["NaN", "undefined", "'0'", "null"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that is correct! 😀",
	incorrect: "Nope. 😕",
	endTime: "Time's up! ⏱️",
	finished: "Let's see how well you did. ✔️"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}