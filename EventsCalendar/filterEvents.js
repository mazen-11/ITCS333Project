document.addEventListener('DOMContentLoaded', function () {
    let events = [];

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
            // Convert DB fields to match old structure for filtering
            const eventTime = event.start_time ? event.start_time : (event.time || '');
            const eventHour = parseInt(eventTime.split(':')[0]);
            const matchesTime =
                selectedTime === 'at-day, at-night' ||
                (selectedTime === 'at-day' && eventHour < 12) ||
                (selectedTime === 'at-night' && eventHour >= 12);

            let matchesSearch = false;
            if (selectedFilter === 'event-place') {
                matchesSearch = (event.location || '').toLowerCase().includes(searchText);
            } else if (selectedFilter === 'event-time') {
                matchesSearch = (eventTime || '').toLowerCase().includes(searchText);
            } else if (selectedFilter === 'event-date') {
                matchesSearch = (event.event_date || event.date || '').toLowerCase().includes(searchText);
            } else if (selectedFilter === 'event-name') {
                matchesSearch = (event.name || '').toLowerCase().includes(searchText);
            }
            return matchesTime && matchesSearch;
        });

        displayEvents(filteredEvents);
    }

    function displayEvents(filteredEvents) {
        eventsContainer.innerHTML = '';
        if (filteredEvents.length === 0) {
            eventsContainer.insertAdjacentHTML('beforeend', '<p class="text-center">No events found!</p>');
        } else {
            filteredEvents.forEach(event => {
                let imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Noto_Emoji_Pie_1f389.svg/512px-Noto_Emoji_Pie_1f389.svg.png?20190226132538';
                if (event.image_url) {
                    if (event.image_url.startsWith('http')) {
                        imgSrc = event.image_url;
                    } else {
                        imgSrc = `https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/event_image.php?file=${encodeURIComponent(event.image_url)}`;
                    }
                }
                const eventCard = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${imgSrc}" class="card-img-top" alt="${event.name}" width="200" height="300" />
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.start_time ? event.start_time + (event.end_time ? ' - ' + event.end_time : '') : (event.time || '')}</p>
                                <p class="card-text">${event.event_date || event.date || ''}</p>
                                <p class="card-text">${event.location || ''}</p>
                                <a href="eventsDetails.html?id=${event.id}" class="btn btn-primary">Event's details</a>
                                <a href="editEventForm.html?id=${event.id}" class="btn btn-primary">Edit/Remove event</a>
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

    // Fetch events from remote backend
    fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/get_events.php')
        .then(response => response.json())
        .then(data => {
            events = data;
            displayEvents(events); // Show all events initially
        })
        .catch(() => {
            eventsContainer.innerHTML = '<p class="text-center">Error loading events.</p>';
        });

    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        filterEvents();
    });
    timeFilterRadios.forEach(radio => {
        radio.addEventListener('change', filterEvents);
    });
    searchFilterDropdown.addEventListener('change', filterEvents);
});