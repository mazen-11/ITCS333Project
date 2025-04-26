document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'); // Select the form element

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting

        // Capture inputs from the form
        const eventName = document.querySelector('#eventName').value.trim(); // Event Name
        const eventTime = document.querySelector('#eventTime').value; // Event Start Time
        const eventFinishTime = document.querySelector('#eventFinishTime').value; // Event Finish Time
        const eventDate = document.querySelector('#eventDate').value; // Event Date
        const eventPlace = document.querySelector('#eventPlace').value.trim(); // Event Location
        const eventDescription = document.querySelector('#eventDescription').value.trim(); // Event eventDescription
        const eventImage = document.querySelector('#eventImage').files[0]; // Event Image (file input)


        
        // Validation checks
        if (!eventName) {
            alert('Event name is required.');
            return;
        }

        if (!eventTime) {
            alert('Event start time is required.');
            return;
        }

        if (!eventFinishTime) {
            alert('Event finish time is required.');
            return;
        }

        // Check if finish time is after start time
        if (eventTime >= eventFinishTime) {
            alert('Event finish time must be after the start time.');
            return;
        }

        if (!eventDate) {
            alert('Event date is required.');
            return;
        }

        if (!eventPlace) {
            alert('Event location is required.');
            return;
        }

        if (!eventDescription) {
            alert('Event event description is required.');
            return;
        }

        

        // Create an object to store the event data
        const eventData = {
            name: eventName,
            startTime: eventTime,
            finishTime: eventFinishTime,
            date: eventDate,
            location: eventPlace,
            eventDescription: eventDescription,
            image: eventImage ? eventImage.name : 'No image uploaded'
        };



        // Display an alert to confirm the submission
        alert('Event registered successfully: ' + JSON.stringify(eventData, null, 2));
    });



    // Handle the "Remove Event" button
    const removeButton = document.querySelector('.btn[href="#"]'); // Select the remove button
    if (removeButton) {
        removeButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default link action

            // Reset all input fields
            document.querySelector('#eventName').value = '';
            document.querySelector('#eventTime').value = '';
            document.querySelector('#eventFinishTime').value = '';
            document.querySelector('#eventDate').value = '';
            document.querySelector('#eventPlace').value = '';
            document.querySelector('#eventDescription').value = '';
            document.querySelector('#eventImage').value = ''; // Clear file input

            // Display a confirmation message
            alert('Event form cleared!');
        });
    }
});