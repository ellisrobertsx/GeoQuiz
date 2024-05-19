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


