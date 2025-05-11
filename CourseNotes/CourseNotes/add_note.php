<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add Note</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-4">
<div class="container">
  <h2>Add a New Note</h2>
  <form action="save_note.php" method="post">
    <div class="mb-3">
      <label class="form-label">Note Title</label>
      <input type="text" name="noteTitle" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Department</label>
      <select name="noteDept" class="form-select" required>
        <option value="cs">Computer Science</option>
        <option value="ce">Computer Engineering</option>
        <option value="cy">Cybersecurity</option>
        <option value="ne">Network Engineering</option>
        <option value="is">Information Systems</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea name="noteDesc" class="form-control" required></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">File Link </label>
      <input type="text" name="noteFile" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">Save Note</button>
  </form>
</div>
</body>
</html>
