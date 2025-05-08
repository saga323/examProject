

var nextBtn = document.getElementById("nextQuestion");
var currentQuestionIndex = 0;
var questions = [];
var questionContainer = document.getElementById("examUsers");
var resultContainer = document.createElement("div");
var prevBtn = document.getElementById("prevQuestion");
let timeLeft = 5 * 60; 
let countdown;

function startTimer() {
    countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        const timerDisplay = document.getElementById("timer");
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            showStudentResult(); 
        }

        timeLeft--;
    }, 1000);
}



var progressContainer = document.createElement("div");
progressContainer.className = "progress";


document.querySelector("#loader").classList.remove("hidden");
document.querySelector("#empty").classList.add("hidden");
document.querySelector("#error").classList.add("hidden");
questionContainer.innerHTML = "";

nextBtn.classList.add("hidden");

var xhr = new XMLHttpRequest();

xhr.open("GET", "../js/question.json");

xhr.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector("#loader").classList.add("hidden");

        if (xhr.status == 200) {
            try {

                questions = reloadQuestion(JSON.parse(xhr.response));
                if (questions.length == 0) {
                    document.querySelector("#empty").classList.remove("hidden");
                } else {
                    currentQuestionIndex = 0;
                    updateProgress();
                    showCurrentQuestion();
                    nextBtn.classList.remove("hidden");
                    startTimer();
                }
            } catch (e) {
                console.error("Error:", e);
                document.querySelector("#error").classList.remove("hidden");
            }
        } else {
            console.log("HTTP Error:", xhr.status);
            document.querySelector("#error").classList.remove("hidden");
        }
    }, 1000);
});


xhr.send();

//reload Question 

function reloadQuestion(e) {
    for (let i = e.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [e[i], e[j]] = [e[j], e[i]];
    }
    return e;
}



function updateProgress() {
    progressContainer.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}


// ---------------------------------Eng Saja------------------------------------------------

// ---------------------------------Naser------------------------------------------------

var markedQuestions = [];

function showCurrentQuestion() {
    questionContainer.innerHTML = "";
    questionContainer.appendChild(progressContainer);

    var question = questions[currentQuestionIndex];

    var questionDiv = document.createElement("div");
    questionDiv.className = "question";

    var questionText = document.createElement("h3");
    questionText.className = "question-text";
    questionText.textContent = question.question;

    var optionsList = document.createElement("ul");
    optionsList.className = "options-list";

    question.options.forEach(function (option, index) {
        var listItem = document.createElement("li");
        listItem.className = "option-item";

        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;
        radio.id = "" + currentQuestionIndex + "-" + index;
        radio.className = "option-radio";


        if (question.userAnswer === index) {
            radio.checked = true;
        }

        radio.addEventListener("change", function () {
            questions[currentQuestionIndex].userAnswer = index;
        });

        var label = document.createElement("label");
        label.htmlFor = "" + currentQuestionIndex + "-" + index;
        label.className = "option-label";
        label.textContent = option;

        listItem.appendChild(radio);
        listItem.appendChild(label);
        optionsList.appendChild(listItem);
    });

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(optionsList);



    let mark = document.createElement("button");
    mark.id = "mark";
    mark.title = "Mark this question";

    var markIcon = document.createElement("img");
    markIcon.src = "../img/save.jpg";
    markIcon.alt = "mark";
    markIcon.width = 25;

    mark.appendChild(markIcon);


    mark.onclick = markClick;
    questionContainer.appendChild(questionDiv);

    questionDiv.appendChild(mark);


    setTimeout(function () {
        var markButton = document.getElementById("mark");
        if (markButton) {
            if (markedQuestions.includes(currentQuestionIndex)) {
                markButton.classList.add('clicked');
            } else {
                markButton.classList.remove('clicked');
            }
        }
    }, 0);


    if (currentQuestionIndex === 0) {
        prevBtn.classList.add("hidden");
        console.log('hide in show content')
    } else {
        prevBtn.classList.remove("hidden");
    }

    updateMarkedQuestionsList();

}



function markClick() {
    var markButton = document.getElementById("mark");
    if (!markButton) {
        console.error("Mark button not found");
        return;
    }


    var questionIndex = currentQuestionIndex;


    if (markButton.classList.contains('clicked')) {
        markButton.classList.remove('clicked'); 
        

        markedQuestions = markedQuestions.filter(index => index !== questionIndex);
    } else {
        markButton.classList.add('clicked'); 
        

        if (!markedQuestions.includes(questionIndex)) {
            markedQuestions.push(questionIndex);
        }
    }

    console.log("Marked questions:", markedQuestions); 
    
}


function updateMarkedQuestionsList() {
    var markedListContainer = document.getElementById("markedQuestionsList");


    if (!markedListContainer) {
        markedListContainer = document.createElement("div");
        markedListContainer.id = "markedQuestionsList";
        markedListContainer.className = "marked-questions-list";
        document.body.appendChild(markedListContainer);
    }


    
    if (markedQuestions.length === 0) {
        markedListContainer.style.display = "none";
    } else {
        markedListContainer.style.display = "block";
    }


    markedListContainer.innerHTML = "<h3>Marked Questions</h3>";


    markedQuestions.forEach(function (questionIndex) {
        var listItem = document.createElement("div");
        listItem.className = "marked-question-item";
        listItem.textContent = `Question ${questionIndex + 1}`;


        listItem.addEventListener('click', function () {
            nextBtn.textContent = "Next Question";
            currentQuestionIndex = questionIndex;
            updateProgress();
            showCurrentQuestion();
        });

        markedListContainer.appendChild(listItem);
    });
}



prevBtn.addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateProgress();
        showCurrentQuestion();


        nextBtn.textContent = "Next Question";
    }


    if (currentQuestionIndex === 0) {
        prevBtn.classList.add("hidden");
        console.log('hide in prevBtn click')
    }
});

nextBtn.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        updateProgress();
        showCurrentQuestion();


        prevBtn.classList.remove("hidden");

        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.textContent = "See Results";
        }
    } else {

        if (markedQuestions.length > 0) {
            showPopup(`Please unmark all (${markedQuestions.length}) marked question(s) before seeing results.`);
            return;
        }

        showStudentResult();
    }
});

function showPopup(message) {
    document.getElementById("popup-message").innerText = message;
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}


// ---------------------------------Naser------------------------------------------------


// // ---------------------------------Naser------------------------------------------------






function showStudentResult() {
    clearInterval(countdown);
    var correctAnswers = 0;
    questions.forEach(function (question) {
        if (question.userAnswer === question.correctAnswer) {
            correctAnswers++;
        }
    });

    var percentage = (correctAnswers / questions.length) * 100;
    var isPassed = percentage >= 60;

    var resultMessage;
    var resultClass;
    var restartButtonHTML = '';

    if (isPassed) {
        resultClass = 'pass';
        resultMessage = '<img class="imgSucess" src="../img/Success Animation.gif"> Congratulations! You Passed!';

        restartButtonHTML = '';
    } else {
        resultClass = 'fail';
        resultMessage = '<img class="imgSucess" src="../img/fail-badtestscore.gif">Sorry! You Failed!';

        restartButtonHTML = '<button id="restartBtn" class="restart-btn">Take Quiz Again</button>';
    }


    sessionStorage.setItem("examFinished", "true");

    questionContainer.innerHTML = "";
    resultContainer.className = "result";
    resultContainer.innerHTML = `
        <div class="result-box ${resultClass}">
            <h2>Your Results</h2>
            <div class="score-circle">
                <span>${percentage.toFixed(1)}%</span>
            </div>
            <p class="correct-answers">Correct Answers: ${correctAnswers}/${questions.length}</p>
            <div class="result-message">${resultMessage}</div>
            ${restartButtonHTML}
        </div>
    `;

    questionContainer.appendChild(resultContainer);


    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");


    var markedListContainer = document.getElementById("markedQuestionsList");
    if (markedListContainer) {
        markedListContainer.style.display = "none";
    }


    var restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", function () {
            currentQuestionIndex = 0;
            markedQuestions = [];
            for (let i = 0; i < questions.length; i++) {
                questions[i].userAnswer = null;
                const radios = document.querySelectorAll(`input[name="question-${i}"]`);
                radios.forEach(radio => {
                    radio.checked = false;
                });
            }
            updateProgress();
            showCurrentQuestion();
            nextBtn.textContent = "Next Question";
            nextBtn.classList.remove("hidden");
        });
    }
}

//////////////////////


window.onload = function() {

    
    const examFinished = sessionStorage.getItem("examFinished");

    if (examFinished) {

        sessionStorage.removeItem("examFinished"); 
        
        window.location.href = "../html/login.html";
    }
};


