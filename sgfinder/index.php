<?php
header('Content-Type: text/html');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Study Group Finder API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 40px;
      color: #333;
    }
    h1 {
      color: #2c3e50;
    }
    .endpoint {
      background: white;
      border: 1px solid #ccc;
      border-left: 4px solid #3498db;
      margin: 20px 0;
      padding: 15px 20px;
      border-radius: 6px;
    }
    .endpoint code {
      display: block;
      margin-top: 5px;
      font-family: monospace;
      background: #f0f0f0;
      padding: 8px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Study Group Finder API</h1>
  <p>Welcome! Use the following endpoints to interact with the backend:</p>

  <div class="endpoint">
    <strong>📄 List all groups (paginated):</strong>
    <code><a href="api/list.php?limit=5&offset=0">GET /api/list.php?limit=5&offset=0</a></code>
  </div>

  <div class="endpoint">
    <strong>🔍 Search groups:</strong>
    <code><a href="api/search.php?q=math">GET /api/search.php?q=math</a></code>
  </div>

  <div class="endpoint">
    <strong>➕ Create a group:</strong>
    <code>POST /api/create.php<br>
    Body (JSON): { "title": "Algebra Study", "description": "Group for Algebra", "subject": "Math", "date": "2025-05-10 14:00:00", "location": "Library" }</code>
  </div>

  <div class="endpoint">
    <strong>✏️ Update a group:</strong>
    <code>PUT /api/update.php?id=1<br>
    Body (JSON): { "title": "Updated Title" }</code>
  </div>

  <div class="endpoint">
    <strong>❌ Delete a group:</strong>
    <code>DELETE /api/delete.php?id=1</code>
  </div>

</body>
</html>
