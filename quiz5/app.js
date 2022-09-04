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
    new Question("Add the following mixed numbers <img src='quiz5/1.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["6", "5 3/10", "5 3/5", "5 3/6"], "5 3/5"),
    new Question("Subtract the following mixed numbers <img src='quiz5/2.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["7", "7 40/77", "10 37/77", "6 20/33"], "7 40/77"),
    new Question("Find the difference <img src='quiz5/3.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["14 ½", "15", "16 ½ ", "15 ½ "], "14 ½ "),
    new Question("Jane bought a cake. She ate one quarter right away and two quarters over the following two days. How much cake was remaining on day 3? <img src='images/quiz_images/cake.jpg' style='margin-left: 100px;max-height: 150px; max-width: 150px'>", ["none", "one quarter", "half of the cake", "three quarters"], "one quarter"),
    new Question("What is 25% of 80?", ["45", "20", "25", "8"], "20"),
    new Question("One file on the laptop is 14.5 Mb. It is 10 Mb smaller than the other file in the same folder. How big is the other file?", ["4.5Mb", "24.5Mb", "10.5Mb", "30Mb"], "24.5Mb"),
    new Question("What is the final result? <img src='quiz5/4.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["7", "8", "7 13/26", "7 13/13"], "8"),
    new Question("Express as a decimal <img src='quiz5/5.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["0.23", "0.0023", "230", "2.3"], "0.23"),
    new Question("Determine the place value of the digit. Which number in the decimal 10.605 represents tenths?", ["10", "5", "6", "0"], "6"),
    new Question("Determine the place value of the digit. In the decimal 56.001 the number 6 represents:", ["ones", "hundredths", "tenths", "thousandths"], "ones"),
    new Question("Jay is 1.5 meters tall. Rick is 1.34 m tall. How much taller is Jay than Rick?", ["0.16m", "16m", "1.6m", "0.17"], "0.16m"),
    new Question("What is 75% of 15?", ["7.5", "6", "11.25", "1.5"], "11.25"),
    new Question("There were 100 sweaters for sale at a store. 90% of those sweaters were black. The rest were white. How many white sweaters were there?", ["1", "90", "95", "10"], "10"),
    new Question("There were 30 students in class. 50% of those students were never late to class. How many students were never late to class?", ["15", "0.3", "0.15", "1.5"], "15"),
    new Question("There are two bags with fruit. The bag containing bananas weighs 3.45 kg. The bag containing apples weighs 5.04 kg. How much more heavier is the bag with apples? <img src='quiz5/apples.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["1.61kg", "15.9kg", "15kg", "1.59kg"], "1.59kg"),
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


