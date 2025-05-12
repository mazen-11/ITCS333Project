document.addEventListener("DOMContentLoaded", function() {
    let commentCount = 0;
    let commentCounter = document.getElementById("comment-count");

    document.getElementById("add-comment-btn").addEventListener("click", function() {
        this.style.display = "none";
        document.getElementById("comment-box").style.display = "block";
    });

    document.getElementById("send-comment-btn").addEventListener("click", function() {
        let commentText = document.getElementById("comment-input").value.trim();

        if (commentText !== "") {
            commentCount++;
            commentCounter.textContent = `(${commentCount})`;

            let newCommentContainer = document.createElement("div");
            newCommentContainer.classList.add("comment-container");

            let commentWrapper = document.createElement("div");
            commentWrapper.classList.add("comment-wrapper");

            let newComment = document.createElement("p");
            newComment.textContent = commentText;
            newComment.classList.add("comment-text");

            let editButton = document.createElement("button");
            editButton.textContent = "Edit Comment";
            editButton.classList.add("edit-btn");
            editButton.style.display = "none";

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Comment";
            deleteButton.classList.add("delete-btn");
            deleteButton.style.display = "none";

            let separator = document.createElement("hr");

            // Show edit & delete buttons on hover
            newCommentContainer.addEventListener("mouseenter", function() {
                editButton.style.display = "inline-block";
                deleteButton.style.display = "inline-block";
            });

            newCommentContainer.addEventListener("mouseleave", function() {
                editButton.style.display = "none";
                deleteButton.style.display = "none";
            });

            // Edit comment functionality
            editButton.addEventListener("click", function() {
                let editBox = document.createElement("textarea");
                editBox.classList.add("edit-box");
                editBox.value = newComment.textContent;

                let saveButton = document.createElement("button");
                saveButton.textContent = "Save";
                saveButton.classList.add("save-btn");

                // Save changes
                saveButton.addEventListener("click", function() {
                    newComment.textContent = editBox.value;
                    commentWrapper.innerHTML = "";
                    commentWrapper.appendChild(newComment);
                    commentWrapper.appendChild(editButton);
                    commentWrapper.appendChild(deleteButton);
                });

                commentWrapper.innerHTML = "";
                commentWrapper.appendChild(editBox);
                commentWrapper.appendChild(saveButton);
            });

            // Delete comment functionality
            deleteButton.addEventListener("click", function() {
                newCommentContainer.remove(); // Removes the comment from the page
                commentCount--; // Decrease comment count
                commentCounter.textContent = `(${commentCount})`;
            });

            commentWrapper.appendChild(newComment);
            commentWrapper.appendChild(editButton);
            commentWrapper.appendChild(deleteButton);
            
            newCommentContainer.appendChild(commentWrapper);
            newCommentContainer.appendChild(separator);
            
            document.getElementById("comments-list").appendChild(newCommentContainer);

            document.getElementById("comment-input").value = "";
            document.getElementById("comment-box").style.display = "none";
            document.getElementById("add-comment-btn").style.display = "block";
        }
    });
});