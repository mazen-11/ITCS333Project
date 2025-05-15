<!-- add-review.php -->
 <?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Review</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Campus Hub</a>
    </div>
</nav>

<main class="container my-4">
    <form action="save-review.php" method="post" class="bg-white p-4 rounded shadow">
        <h2 class="mb-4">Add New Course Review</h2>

        <div class="mb-3">
            <label class="form-label">Course Title</label>
            <input type="text" name="title" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Course Code (e.g., ITCS333)</label>
            <input type="text" name="code" class="form-control" pattern="[A-Za-z]{4}\d{3}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Rating</label>
            <select name="rating" class="form-select" required>
                <option value="">Choose...</option>
                <option value="5">★★★★★ (Excellent)</option>
                <option value="4">★★★★☆ (Very Good)</option>
                <option value="3">★★★☆☆ (Good)</option>
                <option value="2">★★☆☆☆ (Fair)</option>
                <option value="1">★☆☆☆☆ (Poor)</option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Review</label>
            <textarea name="description" class="form-control" rows="5" required></textarea>
        </div>

        <button type="submit" class="btn btn-success">Submit Review</button>
        <a href="index.php" class="btn btn-secondary ms-2">Cancel</a>
    </form>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
