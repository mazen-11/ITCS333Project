function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function formatTime(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(":");
    let hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString();
}

const eventId = getEventIdFromUrl();
if (eventId) {
    fetch(`https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/get_event_details.php?id=${eventId}`)
        .then(res => {
            if (!res.ok) {
                console.error('Failed to fetch event details:', res.status, res.statusText);
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(event => {
            console.log('Fetched event:', event);
            if (!event || Object.keys(event).length === 0) {
                document.querySelector('.container.mt-5 .row').innerHTML = '<div class="col-12"><p>Event not found.</p></div>';
                return;
            }
            let imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Noto_Emoji_Pie_1f389.svg/512px-Noto_Emoji_Pie_1f389.svg.png?20190226132538';
            if (event.image_url && event.image_url.trim() !== '') {
                if (/^https?:\/\//i.test(event.image_url)) {
                    imgSrc = event.image_url;
                } else {
                    imgSrc = `https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/event_image.php?file=${encodeURIComponent(event.image_url)}`;
                }
            }
            const imgElem = document.getElementById('event-image');
            if (imgElem) imgElem.src = imgSrc;
            const titleElem = document.getElementById('event-title');
            if (titleElem) titleElem.textContent = event.name || 'No title';
            const descElem = document.getElementById('event-description');
            if (descElem) descElem.textContent = event.description || 'No description.';
            const startElem = document.getElementById('event-start-time');
            if (startElem) startElem.textContent = formatTime(event.start_time) || '-';
            const endElem = document.getElementById('event-end-time');
            if (endElem) endElem.textContent = formatTime(event.end_time) || '-';
            const dateElem = document.getElementById('event-date');
            if (dateElem) dateElem.textContent = formatDate(event.event_date) || '-';
            const locElem = document.getElementById('event-location');
            if (locElem) locElem.textContent = event.location || '-';
        })
        .catch((err) => {
            console.error('Error loading event details:', err);
            document.querySelector('.container.mt-5 .row').innerHTML = '<div class="col-12"><p>Error loading event details.</p></div>';
        });
} else {
    document.querySelector('.container.mt-5 .row').innerHTML = '<div class="col-12"><p>No event ID provided.</p></div>';
}

function renderRecommendedEvents(currentId) {
    fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/get_events.php')
        .then(res => res.json())
        .then(events => {
            // Exclude the current event
            const filtered = events.filter(ev => String(ev.id) !== String(currentId));
            // Shuffle and pick 3
            for (let i = filtered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
            }
            const recommended = filtered.slice(0, 3);
            const container = document.getElementById('recommended-events');
            container.innerHTML = '';
            if (recommended.length === 0) {
                container.innerHTML = '<div class="col-12"><p>No recommendations available.</p></div>';
                return;
            }
            recommended.forEach(event => {
                let imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Noto_Emoji_Pie_1f389.svg/512px-Noto_Emoji_Pie_1f389.svg.png?20190226132538';
                if (event.image_url && event.image_url.trim() !== '') {
                    if (/^https?:\/\//i.test(event.image_url)) {
                        imgSrc = event.image_url;
                    } else {
                        imgSrc = `https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/event_image.php?file=${encodeURIComponent(event.image_url)}`;
                    }
                }
                container.insertAdjacentHTML('beforeend', `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${imgSrc}" class="card-img-top" alt="${event.name}" width="200" height="300">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.start_time ? event.start_time : ''}</p>
                                <p class="card-text">${event.event_date || ''}</p>
                                <p class="card-text">${event.location || ''}</p>
                                <a href="eventsDetails.html?id=${event.id}" class="btn btn-primary">Event's details</a>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
}
if (eventId) {
    renderRecommendedEvents(eventId);
}
