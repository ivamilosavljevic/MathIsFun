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

