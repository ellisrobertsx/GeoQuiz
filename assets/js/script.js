// Get the easy buttons
const easyButtons = document.querySelectorAll('.flag-easy, .locations-easy');

// Add event listener to each easy button
easyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Show the quiz container
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.classList.remove('hidden');

        // Hide all other content
        const otherContent = document.querySelectorAll('body > *:not(#quiz-container)');
        otherContent.forEach(element => {
            element.classList.add('hidden');
        });

        // Start the quiz
        loadQuestion();
    });
});
