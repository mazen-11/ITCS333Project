<?php
// First, include the deleteData function
require_once("PHPMySql/deleteData.php");

// Process form submission
if (isset($_POST['BTN'])) {
    try {
        require_once("PHPMySql/databaseConn.php");
        
        $userInputArray = [
            "id" => $_POST['id'] // Make sure this matches your form field name
        ];
        
        // Call the deleteData function
        if (DeletePro($userInputArray)) {
            echo "<script>console.log('Data deleted successfully!');</script>";
        } else {
            echo "<script>console.log('Data deletion failed. Please check if ID exists.');</script>";
        }
    } catch (PDOException $e) {
        echo "<script>console.log('Connection failed: " . $e->getMessage() . "');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Delete service or product</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../style.css" rel="stylesheet">
</head>
<body>

<!-- Content Section -->
<main class="services-section container">
  
  <div class="container mt-5">
    <h2>Delete Service Form</h2>
    <form method="POST">
        <!-- Product ID -->
        <div class="mb-3">
            <label for="ProductServiceName" class="form-label">Product ID to delete</label>
            <input type="number" name="id" class="form-control" id="ProductServiceName" placeholder="Product ID to delete">
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
            <button type="submit" name="BTN" class="btn btn-primary" value="submit">Delete</button>
        </div>
    </form>
</div>

</main>

<!-- Bootstrap Script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="main.js"></script>
</body>
</html>