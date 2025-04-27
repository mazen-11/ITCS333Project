document.addEventListener('DOMContentLoaded', function () {
    const events = [
        { name: 'Coding Hackathon', time: '8:00', date: 'March 24', location: 'S40-13', image: 'https://blog.pango.education/hubfs/Coding%20Blog%20Image.jpg' },
        { name: '3D Printing Demo', time: '12:00', date: 'Aug 15', location: 'S40-1015', image: 'https://images.icon-icons.com/1633/PNG/512/52707partypopper_109417.png' },
        { name: 'E-sports Tournaments', time: '14:00', date: 'May 2', location: 'S40-open labs', image: 'https://optimise2.assets-servd.host/tense-pelican/production/global/blog/AdobeStock_484007461.jpeg?w=1600&q=30&auto=format&fit=crop&dm=1670535816&s=dbdc96ceeb35708728bc767ab8a88792' },
        { name: 'Game Development Jam', time: '10:00', date: 'April 24', location: 'S40-1048', image: 'https://images.icon-icons.com/1633/PNG/512/52707partypopper_109417.png' },
        { name: 'Cybersecurity Workshop', time: '12:00', date: 'April 18', location: 'S40-2013', image: 'https://www.effra.eu/wp-content/uploads/2023/11/fotolia_cybersecurity_xl-1-scaled.jpg' }
    ];

    const userInput = document.querySelector('.form-control'); // Text input for user filter
    const searchButton = document.querySelector('.btn[type="submit"]'); // Search button
    const timeFilterRadios = document.querySelectorAll('input[name="time-filter"]'); // Time radio buttons
    const searchFilterDropdown = document.querySelector('#searchFilter'); // Dropdown for filters
    const eventsContainer = document.querySelector('.services-section .row'); // Event container

    function filterEvents() {
        const searchText = userInput.value.toLowerCase().trim(); // Trimmed, lowercase text input
        const selectedTime = document.querySelector('input[name="time-filter"]:checked').value; // Selected time filter
        const selectedFilter = searchFilterDropdown.value; // Selected dropdown filter

        // Filtering logic
        const filteredEvents = events.filter(event => {
            const matchesTime =
                selectedTime === 'at-day, at-night' ||
                (selectedTime === 'at-day' && parseInt(event.time.split(':')[0]) < 12) ||
                (selectedTime === 'at-night' && parseInt(event.time.split(':')[0]) >= 12);

            const matchesSearch =
                selectedFilter === 'event-place'
                    ? event.location.toLowerCase().includes(searchText) // Text comparison for location
                    : event[selectedFilter.replace('event-', '')]?.toLowerCase().includes(searchText); // Other filters

            return matchesTime && matchesSearch;
        });

        displayEvents(filteredEvents);
    }

    function displayEvents(filteredEvents) {
        eventsContainer.innerHTML = ''; // Clear all previous results

        // Add filtered event cards
        if (filteredEvents.length === 0) {
            eventsContainer.insertAdjacentHTML('beforeend', '<p class="text-center">No events found!</p>');
        } else {
            filteredEvents.forEach(event => {
                const eventCard = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${event.image}" class="card-img-top" alt="${event.name}" width="200" height="300" />
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text"> ${event.time}</p>
                                <p class="card-text"> ${event.date}</p>
                                <p class="card-text"> ${event.location}</p>
                                <a href="eventsDetails.html" class="btn btn-primary">Event's details</a>
                                <a href="eventsForm.html" class="btn-primary">Edit/Remove event</a>
                            </div>
                        </div>
                    </div>
                `;
                eventsContainer.insertAdjacentHTML('beforeend', eventCard);
            });
        }

        // Always add the register event card at the end
        const registerEventCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="https://pngimg.com/uploads/plus/plus_PNG47.png" class="card-img-top" alt="Register Event" width="200" height="300">
                    <div class="card-body">
                        <h5 class="card-title">Event register</h5>
                        <p class="card-text">Time</p>
                        <p class="card-text">Date</p>
                        <p class="card-text">Place</p>
                        <a href="eventsForm.html" class="btn btn-primary">Add new event</a>
                    </div>
                </div>
            </div>
        `;
        eventsContainer.insertAdjacentHTML('beforeend', registerEventCard);
    }

    searchButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form submission
        filterEvents(); // Trigger the filter function
    });

    timeFilterRadios.forEach(radio => {
        radio.addEventListener('change', filterEvents); // Trigger filter on time selection
    });

    searchFilterDropdown.addEventListener('change', filterEvents); // Trigger filter on dropdown selection
});