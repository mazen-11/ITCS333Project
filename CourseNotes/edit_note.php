<?php
include 'db.php';
$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM notes WHERE id = :id");
$stmt->execute([':id' => $id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edit Note</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-4">
<div class="container">
  <h2>Edit Note</h2>
  <form action="update_note.php" method="post">
    <input type="hidden" name="id" value="<?= $row['id'] ?>">
    <div class="mb-3">
      <label class="form-label">Note Title</label>
      <input type="text" name="noteTitle" class="form-control" value="<?= htmlspecialchars($row['title']) ?>" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Department</label>
      <select name="noteDept" class="form-select" required>
        <option value="cs" <?= $row['department'] == 'cs' ? 'selected' : '' ?>>Computer Science</option>
        <option value="ce" <?= $row['department'] == 'ce' ? 'selected' : '' ?>>Computer Engineering</option>
        <option value="cy" <?= $row['department'] == 'cy' ? 'selected' : '' ?>>Cybersecurity</option>
        <option value="ne" <?= $row['department'] == 'ne' ? 'selected' : '' ?>>Network Engineering</option>
        <option value="is" <?= $row['department'] == 'is' ? 'selected' : '' ?>>Information Systems</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea name="noteDesc" class="form-control" required><?= htmlspecialchars($row['description']) ?></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">File Link (PDF)</label>
      <input type="text" name="noteFile" class="form-control" value="<?= htmlspecialchars($row['file_link']) ?>" required>
    </div>
    <button type="submit" class="btn btn-primary">Update Note</button>
  </form>
</div>
</body>
</html>
