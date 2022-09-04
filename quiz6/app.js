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
    new Question("<b>Which number is the greatest?</b> <br> 2,671,300; 2,718,400; 2,099,999; 2,004,999", ["2,099,999", "2,718,400", "2,671,300", "2,004,999"], "2,718,400"),
    new Question("To order the numbers from least to greatest, which number would you start with? <b> 6,056,945,341; 6,103,913,899; 6,200,000,000; 6,119,999 </b>", ["6,056,945,341", "6,103,913,899", "6,200,000,000", "6,119,999"], "6,056,945,341"),
    new Question("(12 × 13) × 4 =", ["523", "26", "624", "126 "], "624"),
    new Question("Solve the following problem. There are 945 files on your laptop. A memory stick (USB) contains twice as many files as your laptop. How many files are there on a memory stick (USB)?", ["1,890 files", "2,835 files", "945 files", "893,025 files"], "1,890 files"),
    new Question("Multiply the numbers. (Do not use calculator!)<br><strong> 432 × (3 × 18) =  </strong> ", ["12665", "1822", "23328", "289"], "23328"),
    new Question("Perform multiplication. (Do not use calculator!)<br><strong> 1001 × 345 =  </strong>", ["345345", "346345", "445345", "334534"], "345345"),
    new Question("What is the final result? <img src='quiz5/4.jpg' style='margin-left: 30px;max-height: 300px; max-width: 300px'>", ["7", "8", "7 13/26", "7 13/13"], "8"),
    new Question("<b>Solve the following problem.</b> <br> Jim read three books over the summer. One book had 297 pages. The other book had 146 pages. And the third book had 251 pages. How many pages did Jim read in total?", ["347", "498", "548", "694"], "694"),
    new Question("How would you record this decimal? <br><b>three wholes two tenths and three hundredths</b>", ["32.3", "3.23", "3.32", "323.0"], "3.23"),
    new Question("<b>Solve the following word problem.</b> <br>There are 568 beads in the jar. Half of those beads are green. The rest are blue.How many blue beads are there?", ["426", "234", "142", "284"], "284"),
    new Question("On Sunday Saman had 123 followers on a social media platform. On Monday he lost 4 followers. On Tuesday 37 more people started following him. How many followers did Saman start his Wednesday with?", ["129", "156", "142", "135"], "156"),
    new Question("Determine the quotient. <br> <b> 756.4 ÷ 6.2 = </b>", ["122", "120", "121", "123"], "122"),
    new Question("Lina and Katya went to the farm. Lina picked 13 apples. Katya picked 3 times as many. How many apples have they picked altogether? <img src='quiz5/apples.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["39", "169", "52", "16"], "52"),
    new Question("Solve the problem. There were 13 cars in the parking lot. 5 cars left and 11 cars arrived within an hour. How many cars were in the parking lot after one hour?", ["19", "13", "12", "14"], "19"),
    new Question("Peter spent a quarter of his pocket saving. He has 9 euros now in his wallet. How many euros spent? <img src='quiz6/euros.jpg' style='margin-left: 30px;max-height: 200px; max-width: 200px'>", ["3euros", "2.5euros", "14euros", "5euros"], "3euros"),
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

