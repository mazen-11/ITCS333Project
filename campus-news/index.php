<?php
// Enable errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';
$stmt = $pdo->query("SELECT * FROM news ORDER BY date_posted DESC");
$all_news = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Campus News</title>
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
            <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="../EventsCalendar/eventsPage.html">Event Calendar</a></li>
            <li class="nav-item"><a class="nav-link" href="../sgfinder/sgfinder.html">Study Group Finder</a></li>
            <li class="nav-item"><a class="nav-link" href="../Course_review/index.html">Course Reviews</a></li>
            <li class="nav-item"><a class="nav-link" href="../CourseNotes/index.php">Course Notes</a></li>
            <li class="nav-item"><a class="nav-link active" href="index.php">Campus News</a></li>
            <li class="nav-item"><a class="nav-link" href="../StudentMarketPlace/index.php">Student Marketplace</a></li>
          </ul>
      </div>
  </div>
</nav>
<header class="bg-dark text-white text-center p-3">
  <h1 class="page-title">📢 Campus News</h1>
</header>
<main class="news-list-container container my-4">
  <div class="d-flex justify-content-between mb-4">
    <input type="search" id="searchInput" class="form-control w-75" placeholder="Search news by title...">
    <a href="add_news.php" class="btn btn-primary ms-3">+ Add News</a>
  </div>
  <div class="row news-cards-wrapper" id="newsContainer">
    <?php foreach($all_news as $news): ?>
    <div class="col-md-4 mb-4 news-item">
      <div class="card h-100">
        <img src="<?= htmlspecialchars($news['image_url']) ?>" class="card-img-top" alt="Thumbnail">
        <div class="card-body d-flex flex-column">
          <h5 class="news-title"><?= htmlspecialchars($news['title']) ?></h5>
          <p class="news-summary"><?= htmlspecialchars(substr($news['content'],0,100)) ?>...</p>
          <div class="mt-auto">
            <a href="news_detail.php?id=<?= $news['id'] ?>" class="btn btn-outline-primary btn-sm">Read more</a>
            <a href="edit_news.php?id=<?= $news['id'] ?>" class="btn btn-secondary btn-sm">Edit</a>
            <a href="delete_news.php?id=<?= $news['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete this news?')">Delete</a>
          </div>
        </div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</main>
<footer class="bg-dark text-light pt-5">
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
<script>
document.getElementById('searchInput').addEventListener('input', function(){
    const val = this.value.toLowerCase();
    document.querySelectorAll('.news-item').forEach(item=>{
        item.style.display = item.querySelector('.news-title').textContent.toLowerCase().includes(val) ? 'block' : 'none';
    });
});
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
