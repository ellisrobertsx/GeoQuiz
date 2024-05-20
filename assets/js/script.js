// Get all flag buttons
const flagButtons = document.querySelectorAll('.flag-buttons button');

// Add click event listener to each flag button
flagButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Show an alert when the button is clicked
        alert('You clicked the flag button!');
    });
});

// Get all location buttons
const locationButtons = document.querySelectorAll('.locations-buttons button');

// Add click event listener to each location button
locationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Show an alert when the button is clicked
        alert('You clicked the location button!');
    });
});

const questions = [
    {
        flag: 'flag1.jpg',
        options: ['Canada', 'Austria', 'Australia', 'New Zeland'],
        correctAnswer: 2
    },
    {
        flag: 'flag2.jpg',
        options: ['Germany', 'Belgium', 'Sweden', 'The Netherlands'],
        correctAnswer: 0
    },
    {
        flag: 'flag3.jpg',
        options: ['USA', 'Finland', 'Brazil', 'Canada']
        correctAnswer: 3
    },
    {
        flag: 'flag4.jpg',
        options: ['China', 'USA', 'United Kingdom', 'Australia']
        correctAnswer: 1
    },
    {
        flag: 'flag5.jpg',
        options: ['New Zeland', 'Greece', 'Norway', 'United Kingdom']
        correctAnswer: 3
    }

    // Add more questions here...
];

let currentQuestion = 0;

// Function to load the next question
function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('flag-image').src = question.flag;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            checkAnswer(index);
        });
        optionsContainer.appendChild(button);
    });
}

// Function to check the answer
function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedIndex === correctAnswer) {
        alert('Correct!');
    } else {
        alert('Incorrect! The correct answer is: ' + questions[currentQuestion].options[correctAnswer]);
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert('Quiz completed!');
        // You can add code here to handle what happens when the quiz is completed
    }
}

// Event listener for the next button
document.getElementById('next-btn').addEventListener('click', () => {
    loadQuestion();
});

// Initial load of the first question
loadQuestion();

