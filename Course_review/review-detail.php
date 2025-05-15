<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    die("Invalid review ID.");
}

// Get the review
$stmt = $pdo->prepare("SELECT * FROM Reviews WHERE id = :id");
$stmt->execute([':id' => $id]);
$review = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$review) {
    die("Review not found.");
}

// Get comments
$stmt = $pdo->prepare("SELECT * FROM Comments WHERE review_id = :id ORDER BY created_at DESC");
$stmt->execute([':id' => $id]);
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Review Detail</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="style.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.php">← Back to Reviews</a>
  </div>
</nav>

<main class="container my-5">
  <h2><?= htmlspecialchars($review['course_name']) ?></h2>
  <p class="text-muted"><?= htmlspecialchars($review['course_id']) ?> | <?= date('F j, Y', strtotime($review['created_at'])) ?></p>
  <p><?= nl2br(htmlspecialchars($review['review_text'])) ?></p>
  <p><strong>Rating:</strong> <?= str_repeat("★", $review['rating']) . str_repeat("☆", 5 - $review['rating']) ?></p>

  <hr>
  <h4>Comments</h4>

  <?php foreach ($comments as $comment): ?>
    <div class="bg-light p-3 rounded mb-2">
      <?= nl2br(htmlspecialchars($comment['comment_text'])) ?>
      <form method="post" action="delete-comment.php" class="d-inline float-end">
        <input type="hidden" name="comment_id" value="<?= $comment['id'] ?>">
        <input type="hidden" name="review_id" value="<?= $id ?>">
        <button class="btn btn-sm btn-danger">Delete</button>
      </form>
    </div>
  <?php endforeach; ?>

  <form action="save-comment.php" method="post" class="mt-4">
    <div class="mb-3">
      <textarea name="comment_text" class="form-control" rows="3" placeholder="Add a comment..." required></textarea>
      <input type="hidden" name="review_id" value="<?= $id ?>">
    </div>
    <button class="btn btn-primary">Submit Comment</button>
  </form>

  <hr>
  <form action="delete-review.php" method="post" onsubmit="return confirm('Are you sure you want to delete this review?');">
    <input type="hidden" name="id" value="<?= $id ?>">
    <button class="btn btn-danger mt-3">Delete This Review</button>
  </form>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
