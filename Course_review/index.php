<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

// Get search and sort input
$search = $_GET['search'] ?? '';
$sort = $_GET['sort'] ?? '';

// Build SQL query
$sql = "SELECT * FROM Reviews WHERE 1";
$params = [];

if ($search) {
    $sql .= " AND (course_name LIKE :search OR course_id LIKE :search)";
    $params[':search'] = "%$search%";
}

switch ($sort) {
    case 'highest':
        $sql .= " ORDER BY rating DESC";
        break;
    case 'lowest':
        $sql .= " ORDER BY rating ASC";
        break;
    case 'recent':
        $sql .= " ORDER BY created_at DESC";
        break;
    default:
        $sql .= " ORDER BY created_at DESC";
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Course Reviews</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="style.css" rel="stylesheet">
  <style>
.hover-shadow {
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}
</style>

</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.html">Campus Hub</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="../EventsCalendar/eventsPage.html">Event Calendar</a></li>
        <li class="nav-item"><a class="nav-link" href="../sgfinder/sgfinder.html">Study Group Finder</a></li>
        <li class="nav-item"><a class="nav-link active" href="index.php">Course Reviews</a></li>
        <li class="nav-item"><a class="nav-link" href="../CourseNotes/index.html">Course Notes</a></li>
        <li class="nav-item"><a class="nav-link" href="../campus-news/index.php">Campus News</a></li>
        <li class="nav-item"><a class="nav-link" href="../StudentMarketPlace/index.html">Student Marketplace</a></li>
      </ul>
    </div>
  </div>
</nav>

<main class="container my-5">

  <!-- Search and Sort Controls -->
  <form method="get" id="filterForm" class="review-controls mb-4 p-3 bg-white rounded shadow-sm">
    <div class="row align-items-center">
      <div class="col-md-4 mb-2 mb-md-0">
        <input type="text" class="form-control" name="search" placeholder="Search courses..." value="<?= htmlspecialchars($search) ?>" id="searchInput">
      </div>
      <div class="col-md-4 mb-2 mb-md-0">
        <select class="form-select" name="sort" id="sortSelect">
          <option value="">Sort by</option>
          <option value="highest" <?= ($sort === 'highest') ? 'selected' : '' ?>>Highest Rating</option>
          <option value="lowest" <?= ($sort === 'lowest') ? 'selected' : '' ?>>Lowest Rating</option>
          <option value="recent" <?= ($sort === 'recent') ? 'selected' : '' ?>>Most Recent</option>
        </select>
      </div>
      <div class="col-md-4 text-md-end">
        <a href="add-review.php" class="btn btn-success">+ Add Review</a>
      </div>
    </div>
  </form>

  <!-- Review Cards -->
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <?php if (count($reviews) === 0): ?>
      <p class="text-center">No reviews found. Try a different search or sort option.</p>
    <?php else: ?>
      <?php foreach ($reviews as $review): ?>
        <div class="col">
          <div class="card h-100 position-relative hover-shadow">
            <div class="card-body">
              <h5 class="card-title"><?= htmlspecialchars($review['course_name']) ?></h5>
              <h6 class="card-subtitle mb-2 text-muted"><?= htmlspecialchars($review['course_id']) ?></h6>
              <p class="card-text"><?= htmlspecialchars(substr($review['review_text'], 0, 100)) ?>...</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <small class="text-muted"><?= str_repeat("★", $review['rating']) . str_repeat("☆", 5 - $review['rating']) ?></small>
              <small class="text-muted"><?= date('M j, Y', strtotime($review['created_at'])) ?></small>
            </div>
            <a href="review-detail.php?id=<?= $review['id'] ?>" class="stretched-link"></a>
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</main>

<!-- Auto Submit Script -->
<script>
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      document.getElementById('filterForm').submit();
    }, 300); // wait for typing to stop
  });

  sortSelect.addEventListener('change', () => {
    document.getElementById('filterForm').submit();
  });
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
