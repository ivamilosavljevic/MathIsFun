var timetaken = 1;
var timeTaken = setInterval(function(){
    if(timetaken <= 0){
        clearInterval(timeTaken);
    } else {
        document.getElementById("count").innerHTML = timetaken + " seconds taken";
    }
    timetaken += 1;
}, 1000);

function convertToMinAndSec(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return (minutes<1 ? seconds+" seconds" : minutes + " minute"+(minutes===1?" ":"s ")+seconds + " seconds");
}

function populate() {
    if(quiz.isEnded()) {
        showScore();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var choices = quiz.getQuestionIndex().choices;
        for(var i=0; i<choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScore(){
    var gameOverHtml = "<h1>Result: </h1>";
        gameOverHtml += "<h2 id='score'>Your score: " + quiz.score + "</h2>";
        gameOverHtml += "<h2 id='timeTaken'>Time taken: " + convertToMinAndSec(timetaken) + " </h2>";
    if(quiz.score <= 0){
        gameOverHtml += "<h2 id='timeTaken'>Hmm, that doesn't look too good...<br/><br/> Maybe <a href='quiz.html'>try again?</a></h2>";
    } else if (quiz.score > 10 && quiz.score!=questions.length){
        gameOverHtml += "<h2 id='timeTaken'>Good job!</h2>";
    }
    if(quiz.score == questions.length){
        gameOverHtml += "<h2 id='timeTaken'>Perfect! Congratulations, you got maximum points!</h2>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
    var btns = document.getElementById("endQuizButtons")
    btns.style.display = 'block';
};



var questions = [
    new Question("<b>Determine the distance</b><br>What is the absolute value distance between the two integers <img src='quiz7/distance1.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["-2", "-8", "8", "9"], "-8"),
    new Question("<b>Determine the distance</b><br>Determine the absolute distance on a number line between the two given integers <img src='quiz7/distance2.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["-11", "-7", "7", "9"], "7"),
    new Question("What is the blue line segment called?<br><img src='quiz7/watermelon.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["diameter", "radius", "chord", "arc "], "chord"),
    new Question("<b>Determine the factors</b><br>How many possible factors does number <b>7</b> have", ["2", "1", "0", "3"], "2"),
    new Question("Subtract the following integers<br><strong> 25 - (-5) = </strong> ", ["20", "25", "-25", "-20"], "25"),
    new Question("<b>Compare the integers</b><br>Which number is the bigest?", ["-3", "-4", "-5", "-2"], "-2"),
    new Question("What is the final result? <img src='quiz7/divide.png' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["16/5", "5", "5/16", "1/5"], "5"),
    new Question("<b>Determine the LCM</b> <br> What is the Lowest Common Multiple of 6 and 9", ["18", "3", "9", "12"], "18"),
    new Question("Convert into a fraction and reduce <br><b>3.6</b>", ["36/100", "18/5", "18/1", "100/36"], "18/5"),
    new Question("<b>Determine the GCF</b><br>What is the Greatest Common Factor of 12 and 16", ["8", "4", "12", "16"], "4"),
    new Question("<b>Determine the difference</b><br><img src='quiz7/diff1.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["20/16", "4/8", "¾ ", "½ "], "¾ "),
    new Question("Determine the quotient. <br> <b> 756.4 ÷ 6.2 = </b>", ["122", "120", "121", "123"], "122"),
    new Question("<img src='quiz7/divide2.png' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["15/6", "2/3", "45/30", "6/15"], "2/3"),
    new Question("<b>Please convert</b><br>25% into a fraction", ["¼", "½", "¾", "none of this"], "¼"),
    new Question("<b>Determine the measure of the missing angles</b><img src='quiz7/angles.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["Each angle is 45º", "Each angle is 60º", "Each angle is 80º", "Angle measures cannot be determined"], "Each angle is 60º"),
];

const shuffleQuestions = questions => {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions;
};

shuffleQuestions(questions);
var quiz = new Quiz(questions);
populate();

