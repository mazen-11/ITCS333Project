<?php
// Enable errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';
$stmt = $pdo->query("SELECT * FROM notes ORDER BY id DESC");
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Course Notes</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
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
        <li class="nav-item"><a class="nav-link" href="index.php">Course Notes</a></li>
        <li class="nav-item"><a class="nav-link" href="../campus-news/index.php">Campus News</a></li>
        <li class="nav-item"><a class="nav-link" href="../StudentMarketPlace/index.php">Student Marketplace</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-4">
  <input class="form-control mb-3" id="searchInput" type="text" placeholder="Search for a subject..." />
  <select class="form-select" id="departmentFilter">
    <option value="all">All Departments</option>
    <option value="cs">Computer Science</option>
    <option value="ce">Computer Engineering</option>
    <option value="cy">Cybersecurity</option>
    <option value="ne">Network Engineering</option>
    <option value="is">Information Systems</option>
  </select>
  <a href="add_note.php" class="btn btn-success mt-3">Add New Note</a>
</div>

<main class="services-section container">
  <div class="row" id="notesContainer">
    <?php if(empty($notes)): ?>
      <p class="text-center mt-4">No notes found. Click "Add New Note" to create one.</p>
    <?php endif; ?>
    <?php foreach($notes as $row): ?>
    <div class="col-md-4 card-item <?= htmlspecialchars($row['department']) ?>">
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title"><?= htmlspecialchars($row['title']) ?></h5>
          <p class="card-text"><?= htmlspecialchars($row['description']) ?></p>
          <a href="<?= htmlspecialchars($row['file_link']) ?>" class="btn btn-primary" download>Download Notes</a>
          <a href="edit_note.php?id=<?= $row['id'] ?>" class="btn btn-secondary">Edit</a>
          <a href="delete_note.php?id=<?= $row['id'] ?>" class="btn btn-danger" onclick="return confirm('Confirm delete?')">Delete</a>
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
          <li><a href="../index.html" class="text-light text-decoration-none">Home</a></li>
          <li><a href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/" class="text-light text-decoration-none">About</a></li>
          <li><a href="https://github.com/mazen-11/ITCS333Project/tree/main" class="text-light text-decoration-none">Contact</a></li>
        </ul>
      </div>
      <div class="col-md-4">
        <h4>More</h4>
        <ul class="list-unstyled">
          <li><a href="#" class="text-light text-decoration-none">Landing Pages</a></li>
          <li><a href="#" class="text-light text-decoration-none">FAQs</a></li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-between py-1">
      <p>G6 Project. All Rights Reserved.</p>
      <p>
        <a href="#" class="text-light text-decoration-none">Terms of Use</a>
        <a href="#" class="text-light text-decoration-none ms-3">Privacy Policy</a>
      </p>
    </div>
  </div>
</footer>

<script>
  const searchInput = document.getElementById('searchInput');
  const departmentFilter = document.getElementById('departmentFilter');
  const cards = document.querySelectorAll('.card-item');
  function filterCards() {
    const searchVal = searchInput.value.toLowerCase();
    const department = departmentFilter.value;
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const matchesSearch = title.includes(searchVal);
      const matchesDept = department === 'all' || card.classList.contains(department);
      card.style.display = matchesSearch && matchesDept ? 'block' : 'none';
    });
  }
  searchInput.addEventListener('input', filterCards);
  departmentFilter.addEventListener('change', filterCards);
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
