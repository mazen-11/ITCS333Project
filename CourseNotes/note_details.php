<?php
include 'db.php';

// Validate ID
if (!isset($_GET['id'])) {
    echo "Note ID is missing.";
    exit;
}
$id = intval($_GET['id']);

// Handle new comment first (so reload shows it)
if(isset($_POST['submit_comment']) && !empty(trim($_POST['comment']))) {
    $comment = trim($_POST['comment']);
    $insert = $pdo->prepare("INSERT INTO comments (note_id, comment) VALUES (?, ?)");
    $insert->execute([$id, $comment]);
}

// Get note
$stmt = $pdo->prepare("SELECT * FROM notes WHERE id = ?");
$stmt->execute([$id]);
$note = $stmt->fetch();

if (!$note) {
    echo "Note not found.";
    exit;
}

// Get comments
$commentsStmt = $pdo->prepare("SELECT * FROM comments WHERE note_id = ? ORDER BY created_at DESC");
$commentsStmt->execute([$id]);
$comments = $commentsStmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($note['title']) ?></title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
  <a href="index.php" class="btn btn-link mb-3">&larr; Back to notes</a>
  <h2 class="mb-3"><?= htmlspecialchars($note['title']) ?></h2>

  <?php if(!empty($note['file_link'])): ?>
    <img src="<?= htmlspecialchars($note['file_link']) ?>" class="img-fluid mb-4" alt="Note image">
  <?php endif; ?>

  <div class="card mb-5">
    <div class="card-body">
      <p class="card-text"><?= nl2br(htmlspecialchars($note['description'])) ?></p>
      <a href="<?= htmlspecialchars($note['file_link']) ?>" class="btn btn-primary" download>Download File</a>
    </div>
  </div>

  <h4 class="mb-3">Comments</h4>
  <form method="POST" class="mb-4">
    <div class="mb-3">
      <textarea name="comment" class="form-control" rows="3" placeholder="Add a comment..."></textarea>
    </div>
    <button type="submit" name="submit_comment" class="btn btn-primary">Post Comment</button>
  </form>

  <?php if(empty($comments)): ?>
    <p class="text-muted">No comments yet.</p>
  <?php else: ?>
    <?php foreach($comments as $c): ?>
      <div class="border rounded p-3 mb-2">
        <p class="mb-1"><?= htmlspecialchars($c['comment']) ?></p>
        <small class="text-muted"><?= $c['created_at'] ?></small>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
