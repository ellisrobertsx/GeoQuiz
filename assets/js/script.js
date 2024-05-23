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

const locationEasyQuestions = [
    {
        imagePath: 'assets/images/locations1.jpg',
        answers: [
            { text: "Texas", correct: false },
            { text: "California", correct: false },
            { text: "New York", correct: false },
            { text: "Washington DC", correct: true }
        ]
    },
    {
        imagePath: 'assets/images/locations2.jpg',
        answers: [
            { text: "Abu Dhabi", correct: false },
            { text: "Dubai", correct: true },
            { text: "Singapore", correct: false },
            { text: "Qatar", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/locations3.jpg',
        answers: [
            { text: "Newcastle", correct: false },
            { text: "Manchester", correct: false },
            { text: "London", correct: true },
            { text: "Leeds", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/locations4.jpg',
        answers: [
            { text: "Toronto", correct: true },
            { text: "Vancouver", correct: false },
            { text: "Montreal", correct: false },
            { text: "New York", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/locations5.jpg',
        answers: [
            { text: "Brisbane", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Sydney", correct: true },
            { text: "Perth", correct: false }
        ]
    }
];


document.addEventListener("DOMContentLoaded", () => {
    const flagEasyButton = document.querySelector(".flag-easy");
    const flagHardButton = document.querySelector(".flag-hard");
    const locationsEasyButton = document.querySelector(".locations-easy");
    const initialContent = document.getElementById("initial-content");
    const locationsContent = document.querySelector(".locations");
    const quizContainer = document.getElementById("quiz-container");
    const scoreArea = document.querySelector(".score-area");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const correctScore = document.getElementById("score");
    const incorrectScore = document.getElementById("Incorrect");

    let currentQuestionIndex = 0;
    let currentQuestions = [];
    let score = 0;
    let incorrectAnswers = 0;

    flagEasyButton.addEventListener("click", () => {
        startQuiz(flagEasyQuestions);
    });

    flagHardButton.addEventListener("click", () => {
        startQuiz(flagHardQuestions);
    });

    locationsEasyButton.addEventListener("click", () => {
        startQuiz(locationEasyQuestions);
    });

    function startQuiz(questionsArray) {
        initialContent.classList.add("hidden");
        locationsContent.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        scoreArea.style.display = "block !important"; // Add this line
        currentQuestions = questionsArray;
        currentQuestionIndex = 0;
        score = 0;
        incorrectAnswers = 0;
        nextButton.style.display = "none";
        showQuestion();
        updateScores();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = currentQuestions[currentQuestionIndex];
        questionElement.innerHTML = `<img src="${currentQuestion.imagePath}" alt="Question Image" />`;

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

    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

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
        
        // Update scores immediately after the user selects an answer
        updateScores();
        
        setTimeout(() => {
            if (currentQuestionIndex < currentQuestions.length - 1) {
                nextQuestion();
            } else {
                alert(`Quiz finished! Your score is ${score}/${currentQuestions.length}.`);
                startQuiz(currentQuestions);
            }
        }, 2000); // 2 seconds delay
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    }

    function clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("wrong");
    }

    function nextQuestion() {
        currentQuestionIndex++;
        showQuestion();
    }

    function updateScores() {
        correctScore.textContent = score;
        incorrectScore.textContent = incorrectAnswers;
    }
});