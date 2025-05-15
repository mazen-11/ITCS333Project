// Optional: JS for comment section UI only

let currentReviewId = null;

/**
 * Returns a string of stars based on rating (1 to 5)
 * Example: ★★★☆☆
 */
function getStarRating(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

/**
 * Adds a comment to the comment list on the page (UI only)
 * Note: Does not save to the database — handled by PHP form
 */
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentsList = document.getElementById('commentsList');

    if (commentInput.value.trim() !== '') {
        const newComment = document.createElement('li');
        newComment.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
        newComment.innerHTML = `
            <span><strong>You:</strong> ${commentInput.value}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteComment(this)">Delete</button>
        `;
        commentsList.appendChild(newComment);
        commentInput.value = '';
    } else {
        alert('Please enter a comment before submitting.');
    }
}

/**
 * Deletes a comment from the UI (does not delete from the database)
 */
function deleteComment(button) {
    const comment = button.parentElement;
    comment.remove();
}
