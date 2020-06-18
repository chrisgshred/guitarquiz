var currentQuestion = 0;
var score = 0;

var questionsArray = [

    {
        question: "Which city is considered the birthplace of jazz?",
        choices: ["New Orleans", "New York City", "Chicago", "Kansas City"],
        answer: 0
    },

    {
        question: "Jazz is characterized by ______.",
        choices: ["Polyrhythms", "Blue Notes", "Improvisation", "All Of These"],
        answer: 3

    },

    {
        question: "What instrument did John Coltrane experiment with toward the end of his career?",
        choices: ["Flute", "Drums", "Sitar", "Guitar"],
        answer: 0
    },

]

var timerElement = document.querySelector("#timer");
var timerValue = 75;
var timerInterval;

function setTime() {
    timerInterval = setInterval(function()
        {
            timerValue--;
            timerElement.textContent = "Time: " + timerValue;
            if (timerValue === 0)
            {
                clearInterval(timerInterval);
            }
        }, 1000);
}

// function to clear elements
var startQuiz = document.querySelector("#startBtn");
startQuiz.addEventListener("click", function () {
    var startWrapper = document.querySelector("#startWrapper");
    startWrapper.innerHTML="";
    questionSetup();
    setTime();
})

var quizQuestion = document.querySelector("#quiz-question");
var btnWrapper = document.querySelector("#btnWrapper");
var choicesArray = [];

function questionSetup() {
    if(currentQuestion <= questionsArray.length - 1)
    {
        var questionMember = questionsArray[currentQuestion];
        quizQuestion.textContent = questionMember.question;
        for (var i = 0; i < questionMember.choices.length; i++){
            var btn = document.createElement("button");
            btn.setAttribute("data-index", i);
            btn.textContent = questionsArray[currentQuestion].choices[i];
            choicesArray.push(btn);
            btnWrapper.appendChild(btn);
        }        
    }
    else
    {
        score = score + timerValue;
        allDone();
    }
}

var correctIncorrect = document.querySelector("#correct-incorrect");
btnWrapper.addEventListener("click", function (event)
{
    if(parseInt(event.target.getAttribute("data-index")) === questionsArray[currentQuestion].answer)
    {
        score += 10;
        clearChoices();
        currentQuestion++;
        questionSetup();
        correctIncorrect.textContent = "Good job! You get a cookie! +10 points";
        var feedbackDisplay = setInterval(function ()
        {
            answerFeedback.textContent = "";
            clearInterval(feedbackDisplay);
        }, 2000);
    }
    else
    {
        clearChoices();
        currentQuestion++;
        questionSetup();
        timer -= 10;
        answerFeedback.textContent = "Incorrect! -10 seconds!";
        var feedbackDisplay = setInterval(function ()
        {
            answerFeedback.textContent = "";
            clearInterval(feedbackDisplay);
        }, 2000);
    }
});

function clearChoices() {
    while (btnWrapper.firstChild)
    {
        btnWrapper.removeChild(btnWrapper.firstChild);
    }
    choicesArray = [];
    quizQuestion.textContent = "";
}

function allDone() {
    quizQuestion.textContent = "All Done!";
    var yourScore = document.createElement("p");
    yourScore.textContent = "Your final score is " + score + " points!";
    quizQuestion.appendChild(yourScore);

    var initialsForm = document.querySelector(".input-group");
    initialsForm.setAttribute("class", "input-group");
    clearInterval(timerInterval);
}

var highscoreList = JSON.parse(localStorage.getItem("highscoreList"));
if (highscoreList === null) {
    highscoreList = [];
}

var submit = document.querySelector("#submit");
var initialsInput = document.querySelector("#initials");

submit.addEventListener("click", function (event) {
    event.preventDefault();
    var newItem = initialsInput.nodeValue.trim();
    highscoreList.push(newItem + "-" + score);
    localStorage.setItem("highscoreList", JSON.stringify(highscoreList));
    document.location.href = "./highscores.html";
});