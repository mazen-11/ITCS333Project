document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    attachSearchListener();
    attachSortListener();
});

let currentReviewId = null;

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    renderReviews(reviews);
}

function renderReviews(reviews) {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';

    if (reviews.length === 0) {
        container.innerHTML = '<p class="text-center">No reviews found. Be the first to add one!</p>';
        return;
    }

    reviews.forEach(review => {
        if (review.reported) return;
        
        const reviewCard = `
            <article class="col">
                <div class="card h-100 review-card" data-id="${review.id}" data-bs-toggle="modal" data-bs-target="#reviewModal">
                    <div class="card-body">
                        <h5 class="card-title">${review.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${review.code}</h6>
                        <p class="card-text">${review.description.substring(0, 100)}...</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <small class="text-muted">${getStarRating(review.rating)}</small>
                        <small class="text-muted">${new Date(review.date).toLocaleDateString()}</small>
                    </div>
                </div>
            </article>
        `;
        container.insertAdjacentHTML('beforeend', reviewCard);
    });

    // Add click handlers
    document.querySelectorAll('.review-card').forEach(card => {
        card.addEventListener('click', () => showReviewDetail(card.dataset.id));
    });
}

function showReviewDetail(reviewId) {
    currentReviewId = reviewId;
    const review = JSON.parse(localStorage.getItem('reviews')).find(r => r.id == reviewId);
    
    // Populate modal content
    document.getElementById('reviewModalLabel').textContent = review.title;
    document.getElementById('modalCourseCode').textContent = review.code;
    document.getElementById('modalReviewText').textContent = review.description;
    document.getElementById('modalRating').innerHTML = getStarRating(review.rating);
    document.getElementById('modalDate').textContent = new Date(review.date).toLocaleDateString();
}

function deleteReview() {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    const updatedReviews = reviews.filter(r => r.id != currentReviewId);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    
    // Close modal and refresh list
    const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    modal.hide();
    loadReviews();
    
    alert('Review deleted successfully!');
}

function getStarRating(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function attachSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        
        const filtered = reviews.filter(review => 
            review.title.toLowerCase().includes(term) || 
            review.code.toLowerCase().includes(term)
        );
        
        renderReviews(filtered);
    });
}

function attachSortListener() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        let sorted = [...reviews];

        switch(e.target.value) {
            case '1': // Highest Rating
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case '2': // Lowest Rating
                sorted.sort((a, b) => a.rating - b.rating);
                break;
            case '3': // Most Recent
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                sorted.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        renderReviews(sorted);
    });
}