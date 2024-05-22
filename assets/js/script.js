const flagEasyQuestions = [
    {
        imagePath: 'assets/images/flag1.jpg',
        answers: [
            { text: "New Zealand", correct: false },
            { text: "Australia", correct: true },
            { text: "USA", correct: false },
            { text: "United Kingdom", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/flag2.jpg',
        answers: [
            { text: "Greece", correct: false },
            { text: "The Netherlands", correct: false },
            { text: "Sweden", correct: false },
            { text: "Germany", correct: true }
        ]
    },
    {
        imagePath: 'assets/images/flag3.jpg',
        answers: [
            { text: "Brazil", correct: false },
            { text: "Greenland", correct: false },
            { text: "Canada", correct: true },
            { text: "USA", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/flag4.jpg',
        answers: [
            { text: "USA", correct: true },
            { text: "China", correct: false },
            { text: "United Kingdom", correct: false },
            { text: "France", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/flag5.jpg',
        answers: [
            { text: "Sweden", correct: false },
            { text: "Switzerland", correct: false },
            { text: "United Kingdom", correct: true },
            { text: "France", correct: false }
        ]
    }
];

const flagHardQuestions = [
    {
        imagePath: 'assets/images/flag6.jpg',
        answers: [
            { text: "Iceland", correct: true },
            { text: "Norway", correct: false },
            { text: "United Kingdom", correct: false },
            { text: "France", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/flag7.jpg',
        answers: [
            { text: "Iran", correct: false },
            { text: "Pakistan", correct: false },
            { text: "Egypt", correct: true },
            { text: "Turkey", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/flag8.jpg',
        answers: [
            { text: "Indonesia", correct: false },
            { text: "Thailand", correct: true },
            { text: "Vietnam", correct: false },
            { text: "Cambodia", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/flag9.jpg',
        answers: [
            { text: "Argentina", correct: false },
            { text: "Columbia", correct: false },
            { text: "Brazil", correct: false },
            { text: "Peru", correct: true }
        ]
    },
    {
        imagePath: 'assets/images/flag10.jpg',
        answers: [
            { text: "Ghana", correct: true },
            { text: "Burkina Faso", correct: false },
            { text: "Côte d'Ivoire,", correct: false },
            { text: "Togo", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const flagEasyButton = document.querySelector(".flag-easy");
const flagHardButton = document.querySelector(".flag-hard");
const initialContent = document.getElementById("initial-content");
const locationsContent = document.querySelector(".locations");
const scoreArea = document.querySelector(".score-area");

let currentQuestionIndex = 0;
let currentQuestions = [];
let score = 0;
let incorrectAnswers = 0;

// Event listener for flag easy button
flagEasyButton.addEventListener("click", () => {
    initialContent.classList.add("hidden");
    locationsContent.classList.add("hidden"); // Hide locations div
    quizContainer.classList.remove("hidden");
    scoreArea.classList.remove("hidden");
    startQuiz(flagEasyQuestions);
});

// Event listener for flag hard button
flagHardButton.addEventListener("click", () => {
    initialContent.classList.add("hidden");
    locationsContent.classList.add("hidden"); // Hide locations div
    quizContainer.classList.remove("hidden");
    scoreArea.classList.remove("hidden");
    startQuiz(flagHardQuestions);
});

// Function to start the quiz
function startQuiz(questionsArray) {
    currentQuestions = questionsArray;
    currentQuestionIndex = 0;
    score = 0;
    incorrectAnswers = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
    updateScores();
}

// Function to display the current question
function showQuestion() {
    resetState();
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `<img src="${currentQuestion.imagePath}" alt="Flag" />`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Function to reset the state of the quiz
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle the selection of an answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    } else {
        incorrectAnswers++;
    }
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    setTimeout(() => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            nextQuestion();
        } else {
            alert(`Quiz finished! Your score is ${score}/${currentQuestions.length}.`);
            startQuiz(currentQuestions);
        }
    }, 2000); // 2 seconds delay
    updateScores();
}

// Function to set the status class of an element
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

// Function to clear the status class of an element
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// Function to update the displayed scores
function updateScores() {
    document.getElementById("score").textContent = score;
    document.getElementById("Incorrect").textContent = incorrectAnswers;
}
