// Quiz questions and answers
const questions = [
    {
        question: "What is JavaScript?",
        answers: ["A programming language", "A markup language", "A database", "A browser"],
        correctAnswer: "A programming language"
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        answers: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
        correctAnswer: "<script src='script.js'>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correctAnswer: "alert('Hello World');"
    },
    {
        question: "How do you print 'Hello World' in the console?",
        answers: ["console.log('Hello World');", "console('Hello World');", "print('Hello World');", "log('Hello World');"],
        correctAnswer: "console.log('Hello World');"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function => myFunction()"],
        correctAnswer: "function myFunction()"
    },
];

// Global variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

// DOM elements
const startButton = document.getElementById("start-button");
const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const timerSpan = document.getElementById("timer-left");
const scoreForm = document.getElementById("score-form");
const finalScoreSpan = document.getElementById("final-score");

// Function to start the quiz
function startQuiz() {
    startButton.style.display = "none";
    questionDiv.style.display = "block";
    optionsDiv.style.display = "block";
    timerSpan.style.display = "block";
    displayQuestion(currentQuestionIndex);
    startTimer();
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            endQuiz(); // End the quiz when time is up
        } else {
            timerSpan.textContent = timeLeft;
        }
    }, 1000);
}

// Function to display a question
function displayQuestion(index) {
    const currentQuestion = questions[index];
    const questionTitle = `Question ${index + 1}:`;
    const questionText = currentQuestion.question;
    const answerOptions = currentQuestion.answers;

    // Update the question display
    document.getElementById("question-title").textContent = questionTitle;
    document.getElementById("question-text").textContent = questionText;

    // Clear previous answer options
    optionsDiv.innerHTML = "";

    // Create buttons for answer options
    answerOptions.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("btn", "btn-secondary", "mr-2");
        optionButton.addEventListener("click", () => checkAnswer(option));
        optionsDiv.appendChild(optionButton);
    });
}

// Function to check the selected answer
function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
        // No need to add remaining time here
        // We will calculate the score based on the time left when the quiz ends
    } else {
        // Deduct time for incorrect answers (e.g., 10 seconds)
        timeLeft -= 10;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

const highScores = [];

// Function to save high scores to local storage
function saveHighScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


// Function to display high scores
function displayHighScores() {
    const highScoresList = document.getElementById("high-scores-list");
    highScoresList.innerHTML = "";

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${item.initials}: ${item.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    questionDiv.style.display = "none";
    optionsDiv.style.display = "none";
    timerSpan.style.display = "none"; 
    scoreForm.style.display = "block";
    finalScoreSpan.textContent = score;
    
    // Get initials from the input field
    const initials = initialsInput.value;
    
    // Save high score and initials
    saveHighScore(initials, score);
    
    // Display high scores
    displayHighScores();
}


// Event listener for the start button
startButton.addEventListener("click", startQuiz);

const initialsInput = document.getElementById("initials");

scoreForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    
    // Get the initials from the input field
    const initials = initialsInput.value;
    
    // Save high score and initials
    saveHighScore(initials, score);
    
    // Display high scores
    displayHighScores();
    
    // You can optionally clear the input field or reset the game here
    initialsInput.value = "";
});


