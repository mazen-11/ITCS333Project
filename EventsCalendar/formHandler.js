// Handles event form submission and fetching events for display

// Submit event form via AJAX
function setupEventFormHandler() {
    const form = document.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/add_event.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Event added successfully!');
                window.location.href = 'eventsPage.html';
            } else {
                alert('Error: ' + (data.error || 'Failed to add event'));
            }
        })
        .catch(() => alert('Error submitting form.'));
    });
}

// Fetch and display events on the events page
function fetchAndDisplayEvents(containerSelector = '.services-section .row') {
    fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/get_events.php')
        .then(response => response.json())
        .then(events => {
            const container = document.querySelector(containerSelector);
            if (!container) return;
            container.innerHTML = '';
            events.forEach(event => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                <div class="card">
                    <img src="${event.image_url ? event.image_url : 'https://pngimg.com/uploads/plus/plus_PNG47.png'}" class="card-img-top" alt="Event Image" width="200" height="300">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.start_time}</p>
                        <p class="card-text">${event.event_date}</p>
                        <p class="card-text">${event.location}</p>
                        <a href="eventsDetails.html?id=${event.id}" class="btn btn-primary">Event's details</a>
                        <a href="eventsForm.html?id=${event.id}" class="btn btn-primary">Edit/Remove event</a>
                    </div>
                </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(() => {
            const container = document.querySelector(containerSelector);
            if (container) container.innerHTML = '<p>Error loading events.</p>';
        });
}

// Auto-setup for each page
if (window.location.pathname.includes('eventsForm.html')) {
    setupEventFormHandler();
}
if (window.location.pathname.includes('eventsPage.html')) {
    fetchAndDisplayEvents();
}
