// Handles loading, editing, and removing an event in editEventForm.html

document.addEventListener('DOMContentLoaded', function() {
    // Get event ID from URL
    function getEventIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }
    const eventId = getEventIdFromUrl();
    if (!eventId) {
        alert('No event ID provided.');
        window.location.href = 'eventsPage.html';
        return;
    }
    // Form fields
    const form = document.getElementById('edit-event-form');
    const nameInput = document.getElementById('eventName');
    const startInput = document.getElementById('eventTime');
    const endInput = document.getElementById('eventFinishTime');
    const dateInput = document.getElementById('eventDate');
    const placeInput = document.getElementById('EventPlace');
    const descInput = document.getElementById('eventDescription');
    const imageInput = document.getElementById('imageInput');
    const removeBtn = document.getElementById('remove-btn');

    // Load event data
    fetch(`https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/get_event_details.php?id=${eventId}`)
        .then(res => res.json())
        .then(event => {
            if (!event) {
                alert('Event not found.');
                window.location.href = 'eventsPage.html';
                return;
            }
            nameInput.value = event.name || '';
            startInput.value = event.start_time || '';
            endInput.value = event.end_time || '';
            dateInput.value = event.event_date || '';
            placeInput.value = event.location || '';
            descInput.value = event.description || '';
        });

    // Edit (submit) handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append('id', eventId);
        fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/update_event.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Event updated successfully!');
                window.location.href = 'eventsPage.html';
            } else {
                alert('Error: ' + (data.error || 'Failed to update event'));
            }
        })
        .catch(() => alert('Error submitting form.'));
    });

    // Remove handler
    removeBtn.addEventListener('click', function() {
        if (!confirm('Are you sure you want to delete this event?')) return;
        const formData = new FormData();
        formData.append('id', eventId);
        fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/delete_event.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Event deleted successfully!');
                window.location.href = 'eventsPage.html';
            } else {
                alert('Error: ' + (data.error || 'Failed to delete event'));
            }
        })
        .catch(() => alert('Error deleting event.'));
    });
});
