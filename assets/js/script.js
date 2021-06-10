//arrray of the quiz questions, choices, and correct answers     
var questions = [{
  title: "Commonly used data types do NOT include _____?",
  choices: ["Alerts", "Strings", "Booleans", "Numbers"],
  answer: "Alerts"
},
{
  title: "The condition in an if/else statement is enclosed within _____?",
  choices: ["Curly brackets", "Square brackets", "Parentheses", "Quotes"],
  answer: "Parentheses"
},
{
  title: "Arrays in JavaScript can be used to store _____?",
  choices: ["Booleans", "Numbers & Strings", "Other Arrays", "All of the Above"],
  answer: "All of the Above"
},
{
  title: "String values must be enclosed within _____ when being assigned to variables.",
  choices: ["Single or Double Quotes", "Commas", "Curly Brackets", "Parentheses"],
  answer: "Single or Double Quotes"
},
{
  title: "A very useful tool used during development and debugging for printing content to the debugger is:",
  choices: ["Terminal/Bash", "JavaScript", "For Loop", "console.log"],
  answer: "JavaScript"
}
]

//variables for functions, score and timer 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
  timeLeft--;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  //ends game function when timer runs out
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(); 
  }
}, 1000);

next();
}

//stops the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//stores the scores 
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears score
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//resets the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
  Play Again?
</h1>
<h3>
    
</h3>
<button onclick="start()">Yes!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
  endGame();
  return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
  var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
  buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
  if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
  } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
  }
  quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
