<?php

try {
    require_once("add/PHPMySql/databaseConn.php");
    require_once("add/PHPMySql/UploadSqlComment.php");

    // Handle the form submission
    if (isset($_POST['BTN'])) {
        // Get the form input values with fallbacks for ID and Date
        $productId = $_POST['ID'] ?? ($_GET['id'] ?? null);
        $date = $_POST['Date'] ?? date("Y-m-d");
        $comment = $_POST['Comment'] ?? '';

        // Prepare the input array
        $UserInputArray = [
            "ID" => $productId,
            "Date" => $date,
            "Comment" => $comment
        ];

        // Try adding the product and show appropriate message
        if (AddPro($UserInputArray)) {
            echo "<script>alert('data uploaded');</script>";
        } else {
            echo "<script>alert('data is not uploaded, might there some error');</script>";
        }
    }
} catch (PDOException $e) {
    echo "<script>alert('there might some error with the database');</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Add service or product to the student marketplace</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet"> <!-- Fixed CSS path -->
</head>
<body>
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Student Marketplace</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" id="PrePage">go back</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- Content Section -->
<main class="services-section container" id="CommentDiv">
    <h2>Add Service or Product Form</h2>
    <form method="POST" action="">

        <!-- Product ID -->
        <div class="mb-3">
            <input type="number" name="ID" style="display:none;" class="form-control Name" id="ProductServiceName" value="<?php echo htmlspecialchars($_GET['id'] ?? ''); ?>" required>
        </div>

        <div class="mb-3">
            <input type="date" name="Date" style="display:none;" class="form-control Date" id="ProductServiceName" value="<?php echo date('Y-m-d'); ?>" required>
        </div>

        <!-- Comment -->
        <div class="mb-3">
            <label for="shortDescription" class="form-label">Enter your comments</label>
            <textarea class="form-control" name="Comment" id="shortDescription" rows="3" placeholder="Enter your comments" required></textarea>
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
          <button type="submit" name="BTN" class="btn btn-primary" value="submit">Submit</button>
        </div>
    </form>
</main>

<!-- Bootstrap Script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Select inputs more specifically
    const idInput = document.querySelector('input[name="ID"]');
    const dateInput = document.querySelector('input[name="Date"]');
    const commentLink = document.getElementById('PrePage');

    // Set product ID if exists
    if (productId && idInput) {
        idInput.value = productId;
    }

    // Set current date
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Set link behavior
    if (commentLink) {
        commentLink.addEventListener('click', function(e) {
            e.preventDefault();
            let targetUrl = productId ? `product-page.php?id=${productId}` : 'commentTry.php';
            window.location.href = targetUrl;
        });
    }
});
</script>

</body>
</html>
