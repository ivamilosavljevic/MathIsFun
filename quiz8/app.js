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
    new Question("<b>Solve an equation:</b><br>5(x - 1) - 4(x - 3) = -20", ["x=-27", "x=-28", "x=-29", "x=-26"], "x=-27"),
    new Question("Simplify the following expression and collect like terms:<br><b> 8a - (10a + 7b - 1)</b>", ["none of this", "-2a-7b+1", "-2a-8b+1", "-2a-10a+1"], "-2a-7b+1"),
    new Question("If a number is increased by two thirds of itself and then by 1 more, the answer is 11. What is the number?", ["6", "8", "4", "3 "], "6"),
    new Question("Solve the equation: <br><b>7(x + 2) = - 14 </b>", ["4", "3", "-3", "-4"], "-4"),
    new Question("0.8 m of fabric costs $5.4. How much would 3 m of the same fabric cost?", ["$25.20", "$22.25", "$20.22", "$20.25"], "$20.25"),
    new Question("Determine the unknown:<b> 1/3 = x/18 </b>", ["x=6", "x=2", "x=3", "x=16"], "x=6"),
    new Question("<b>What are the coordinates of the given point?</b><img src=quiz8/03.jpg  style='margin-left: 200px;max-height: 300px; max-width: 300px'>", ["(9,2)", "(2,9)", "(10,4)", "(4,10)"], "(2,9)"),
    new Question("<b>Perform operations in order</b><br><img src=quiz8/01.png style='margin-left: 200px;max-height: 200px; max-width: 200px'>", ["5/2", "1", "5/6", "2"], "5/2"),
    new Question("Divide the fractions<br><img src=quiz8/02.png style='margin-left: 200px;max-height: 200px; max-width: 200px'>", ["12/25", "4/3", "1/3", "3/2"], "4/3"),
    new Question("<b>Convert the following</b><br>125 m into cm", ["12.5 cm", "12,500 cm", "1250 cm", "0.125 cm"], "12,500 cm"),
    new Question("Jaymil has 3 bags of birdseed. He wants to put the birdseed into 4 bird feeders equally. What fraction of the three bags will go into each feeder?", ["3/8", "3/4", "1/4", "none of this"], "none of this"),
    new Question("Determine 5% of 1035", ["51.75", "207", "855", "53.67"], "51.75"),
    new Question("A contractor has 500 m of wiring. He only needs 345 m. What fraction of wiring does he need out of the total in <b>lowest terms</b>?", ["500/345", "100/69", "69/100", "345/500"], "69/100"),
    new Question("¾ of the students on the school track team are boys. One third of those students are in grade 8. What fraction of the students on the track team are grade 8 boys?", ["3/4", "1/4", "9/4", "2/4"], "1/4"),
    new Question("<b>Solve the problem.</b><br>Lana added 2 cups of flour to the mix. Then she realized it was not enough and added another ¾ cup. But that was now too much. So she quickly scooped out half of what she added on top of the first two cups. How much flour went into the mix in the end?", ["2cups", "2 and 3/8", "2 and 2/8", "1 and 3/4"], "2 and 3/8"),
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

