<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
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
  <title>News Detail</title>
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
  <h2 class="news-detail-title"><?= htmlspecialchars($news['title']) ?></h2>
  <p class="text-muted">Category: <?= htmlspecialchars($news['category']) ?> | <?= date('F j, Y', strtotime($news['date_posted'])) ?></p>
  <img src="<?= htmlspecialchars($news['image_url']) ?>" class="img-fluid rounded my-3" alt="News Image">
  <p><?= nl2br(htmlspecialchars($news['content'])) ?></p>
  <div class="mt-4">
    <a href="edit_news.php?id=<?= $news['id'] ?>" class="btn btn-warning">Edit</a>
    <a href="delete_news.php?id=<?= $news['id'] ?>" class="btn btn-danger" onclick="return confirm('Delete this news?')">Delete</a>
  </div>
  <div class="mt-5">
    <h4>Comments</h4>
    <div class="bg-light p-3 rounded mb-2 comment-box">Great update! – Student A</div>
    <div class="bg-light p-3 rounded mb-2 comment-box">Much needed. – Student B</div>
    <textarea class="form-control mt-3" rows="3" placeholder="Write a comment..."></textarea>
  </div>
  <a href="index.php" class="btn btn-link mt-3">← Back to news listing</a>
</div>
<footer class="bg-dark text-light pt-5 mt-5">
  <div class="container">
      <div class="row">
          <div class="col-md-4">
              <h3>ITCS333</h3>
              <p>G6-Sec. 5 PROJECT</p>
              <p>Dr. Abdulla Subah</p>
          </div>
          <div class="col-md-4">
              <h4>Menu</h4>
              <ul class="list-unstyled">
                  <li><a href="../index.html" class="text-light">Home</a></li>
                  <li><a href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/" class="text-light">About</a></li>
                  <li><a href="https://github.com/mazen-11/ITCS333Project/tree/main" class="text-light">Contact</a></li>
              </ul>
          </div>
          <div class="col-md-4">
              <h4>More</h4>
              <ul class="list-unstyled">
                  <li><a href="#" class="text-light">Landing Pages</a></li>
                  <li><a href="#" class="text-light">FAQs</a></li>
              </ul>
          </div>
      </div>
      <hr>
      <div class="d-flex justify-content-between py-1">
          <p>G6 Project. All Rights Reserved.</p>
          <p>
              <a href="#" class="text-light">Terms of Use</a>
              <a href="#" class="text-light ms-3">Privacy Policy</a></p>
      </div>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
