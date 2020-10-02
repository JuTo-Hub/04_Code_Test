var countdownEl = document.querySelector(".timer");
var time = 50;
var questionEl = document.querySelector(".main");
var contentEl = document.querySelector(".content");
var bttnEl = document.querySelector(".start");
var verifyEl = document.querySelector(".verify");
var initialForm = document.querySelector(".initials");
var initialBtn = document.querySelector(".initialSubmit");
var quizIndex = 0;
var gameEnded = true;
// Create an array inside of an array.
var quiz = [
    {
      question : "What is the condition of an if/else statement enclosed with?",
      answers : ["quotes", "curly brackets", "parentheses", "square brackets"],
      correct : "parentheses"
    },
    {
      question : "Javascript arrays can be used to store:",
      answers : ["numbers & strings", "other arrays", "booleans", "all of the above"],
      correct : "all of the above"
    },
    {
      question : "Commonly used data types do not include which of the following:",
      answers : ["prompts", "strings", "booleans", "numbers"],
      correct : "prompts"
    },
    {
      question : "How do we enclose string values? With____",
      answers : ["commas", "curly brackets", "quotes", "parentheses"],
      correct : "quotes"
    },
    {
      question : "What is a useful tool for debugging?",
      answers : ["Javascript", "terminal", "for loops", "console.log"],
      correct : "console.log"
    },
];

var highscores = [];

// Button functionality
function fillContentWithQuestion(quizIndex){
  questionEl.textContent = quiz[quizIndex].question;
  contentEl.textContent ="";
  for (i = 0; i < quiz[quizIndex].answers.length; i++){
    var answerBtn = document.createElement("BUTTON");
    answerBtn.innerHTML = quiz[quizIndex].answers[i];
    contentEl.appendChild(answerBtn);
    answerBtn.className = "answer-button";
    
    if (quiz[quizIndex].answers[i] === quiz[quizIndex].correct){
        answerBtn.setAttribute("data-correct", true);
    }
  }
}



// For the start button
bttnEl.addEventListener("click", function(event){
    bttnEl.style.display = "none";
    gameEnded = false;
    console.log(quiz, "quiz index");

    // This is to generate the first set of buttons and continuously generates quiz array.
    fillContentWithQuestion(0);

});

// This defines how the answer-button work.
document.body.addEventListener("click", function(event){
    var target = event.target;
    if (target.classList.contains("answer-button")){
        var isCorrect = target.getAttribute("data-correct");
        if (isCorrect) {
            verifyEl.textContent = "Correct!";
        }
        if(!isCorrect){
            verifyEl.textContent = "Wrong. Sorry -5 seconds.";
            time = time-5;
        }
        quizIndex++;
        if (quizIndex >= quiz.length) {
          tally();

        }
        fillContentWithQuestion(quizIndex)
    }
});

// For the Timer/Score
function counter() {
  var intervalID = setInterval(function(){
    if (!gameEnded){
      time--;
    }
    countdownEl.textContent = "Time: " + time;
    if (time === 0 ) {
      tally();
    }
  }, 1000);
}
counter();

function tally(){
  gameEnded = true;
  questionEl.textContent = "All Done! Here is your score!";
  contentEl.textContent = "Score: " + time;
  verifyEl.textContent = "";
  countdownEl.style.display = "none";
    initialForm.classList.add("is-visible");
  }

initialBtn.addEventListener("click", function(event){
  initialForm.classList.remove("is-visible");
  document.querySelector(".scoreboard").classList.add("is-visible");
  document.querySelector(".endOfGameButtons").classList.add("is-visible");
  console.log( document.querySelector(".scoreboard").classList)
  var highscore = {
    score: time,
    initials : document.querySelector(".initialsTextBox").value
  }
  questionEl.textContent = "High Scores!";
  contentEl.textContent = " ";
  highscores.push(highscore)
  document.querySelector(".scoreboard").innerHTML = 
  document.querySelector(".scoreboard").innerHTML +
  "<tr><td>"+highscore.initials+"</td><td>"+ highscore.score+"</td></tr>";
  })

  var clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", function(event){
    highscore=[];
    document.querySelector(".scoreboard").innerHTML="<tr><td>Initial</td><td>Score</td></tr>";
  })

  var restartBtn = document.querySelector(".restart");

  restartBtn.addEventListener("click", function(){
    document.querySelector(".scoreboard").classList.remove("is-visible");
    document.querySelector(".endOfGameButtons").classList.remove("is-visible");
    time = 50;
    quizIndex = 0;
    countdownEl.style.display = "block";
    fillContentWithQuestion(quizIndex);
  })