<?php
include 'db.php';
$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM news WHERE id=:id");
$stmt->execute([':id'=>$id]);
$news = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edit News</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="index.php">Campus News</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="container mt-5">
  <h2 class="mb-4">Edit News</h2>
  <form action="update_news.php" method="post">
    <input type="hidden" name="id" value="<?= $news['id'] ?>">
    <div class="mb-3">
      <label class="form-label">Title *</label>
      <input type="text" name="title" class="form-control" value="<?= htmlspecialchars($news['title']) ?>" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Category *</label>
      <select name="category" class="form-select" required>
        <option value="">Select...</option>
        <option <?= $news['category']=='Event'?'selected':''?>>Event</option>
        <option <?= $news['category']=='Announcement'?'selected':''?>>Announcement</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Content *</label>
      <textarea name="content" class="form-control" rows="5" required><?= htmlspecialchars($news['content']) ?></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Image URL *</label>
      <input type="text" name="image_url" class="form-control" value="<?= htmlspecialchars($news['image_url']) ?>" required>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
    <a href="index.php" class="btn btn-secondary">Cancel</a>
  </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
