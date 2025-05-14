// Wrap all logic in DOMContentLoaded to ensure elements exist

document.addEventListener('DOMContentLoaded', function() {
    function getEventIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    const eventId = getEventIdFromUrl();
    const commentsList = document.getElementById('comments-list');
    const commentCount = document.getElementById('comment-count');
    const addCommentBtn = document.getElementById('add-comment-btn');
    const commentBox = document.getElementById('comment-box');
    const sendCommentBtn = document.getElementById('send-comment-btn');
    const commentInput = document.getElementById('comment-input');

    function fetchComments() {
        if (!eventId) return;
        fetch(`https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/comments.php?event_id=${eventId}`)
            .then(res => res.json())
            .then(comments => {
                commentsList.innerHTML = '';
                if (Array.isArray(comments) && comments.length > 0) {
                    commentCount.textContent = `(${comments.length})`;
                    comments.forEach(c => {
                        const li = document.createElement('li');
                        li.style.position = 'relative';
                        li.style.paddingRight = '120px'; // More space for two buttons
                        li.innerHTML = `
                            <span class="comment-text">${c.comment} [${new Date(c.created_at).toLocaleString()}]</span>
                            <button class="edit-comment-btn btn btn-sm btn-secondary" style="display:none; position:absolute; right:60px; top:0;">Edit</button>
                            <button class="delete-comment-btn btn btn-sm btn-danger" style="display:none; position:absolute; right:0; top:0; margin-right:0;">Delete</button>
                        `;
                        // Show buttons only on hover (unless editing)
                        li.addEventListener('mouseenter', function() {
                            if (!li.classList.contains('editing')) {
                                li.querySelector('.edit-comment-btn').style.display = 'inline-block';
                                li.querySelector('.delete-comment-btn').style.display = 'inline-block';
                            }
                        });
                        li.addEventListener('mouseleave', function() {
                            if (!li.classList.contains('editing')) {
                                li.querySelector('.edit-comment-btn').style.display = 'none';
                                li.querySelector('.delete-comment-btn').style.display = 'none';
                            }
                        });
                        // Edit button logic
                        li.querySelector('.edit-comment-btn').addEventListener('click', function() {
                            li.classList.add('editing');
                            const commentSpan = li.querySelector('.comment-text');
                            commentSpan.style.display = 'none';
                            this.style.display = 'none';
                            li.querySelector('.delete-comment-btn').style.display = 'none';
                            let editBox = document.createElement('div');
                            editBox.innerHTML = `
                                <textarea class="form-control" rows="2" style="margin-bottom:5px;">${c.comment}</textarea>
                                <button class="btn btn-primary btn-sm save-edit-btn">Save</button>
                                <button class="btn btn-secondary btn-sm cancel-edit-btn">Cancel</button>
                            `;
                            li.appendChild(editBox);
                            editBox.querySelector('.save-edit-btn').addEventListener('click', function() {
                                const newComment = editBox.querySelector('textarea').value.trim();
                                if (!newComment) return;
                                const formData = new FormData();
                                formData.append('comment_id', c.id);
                                formData.append('comment', newComment);
                                fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/update_comment.php', {
                                    method: 'POST',
                                    body: formData
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        fetchComments();
                                    } else {
                                        alert('Failed to update comment.');
                                    }
                                });
                            });
                            editBox.querySelector('.cancel-edit-btn').addEventListener('click', function() {
                                editBox.remove();
                                commentSpan.style.display = '';
                                li.classList.remove('editing');
                                li.querySelector('.edit-comment-btn').style.display = 'inline-block';
                                li.querySelector('.delete-comment-btn').style.display = 'inline-block';
                            });
                        });
                        // Delete button logic
                        li.querySelector('.delete-comment-btn').addEventListener('click', function() {
                            if (confirm('Are you sure you want to delete this comment?')) {
                                const formData = new FormData();
                                formData.append('comment_id', c.id);
                                fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/delete_comment.php', {
                                    method: 'POST',
                                    body: formData
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        fetchComments();
                                    } else {
                                        alert('Failed to delete comment.');
                                    }
                                });
                            }
                        });
                        commentsList.appendChild(li);
                    });
                } else {
                    commentCount.textContent = '(0)';
                    commentsList.innerHTML = '<li>No comments yet.</li>';
                }
            });
    }

    if (addCommentBtn) {
        addCommentBtn.addEventListener('click', function() {
            commentBox.style.display = 'block';
            commentInput.focus();
        });
    }

    if (sendCommentBtn) {
        sendCommentBtn.addEventListener('click', function() {
            const comment = commentInput.value.trim();
            if (!comment) return;
            const formData = new FormData();
            formData.append('event_id', eventId);
            formData.append('comment', comment);
            fetch('https://6ee6ec88-0f2a-4299-b825-a1ec248398d4-00-2lq9fq7s2l1jc.sisko.replit.dev/comments.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    commentInput.value = '';
                    commentBox.style.display = 'none';
                    fetchComments();
                } else {
                    alert('Failed to add comment.');
                }
            });
        });
    }

    fetchComments();
});