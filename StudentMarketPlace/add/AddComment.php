
<?php

try {
    require_once("PHPMySql/databaseConn.php");
    require_once("PHPMySql/UploadSql.php");
    require_once("PHPMySql/RandomID.php");

    if (isset($_POST['BTN'])) {
        $ID = generateRandomNumber();
        $UserInputArray = [
            "ID" => $ID,
            "name" => $_POST['name'],
            "ProductType" => $_POST['ProductType'],
            "price" => $_POST['price'],
            "shortDescription" => $_POST['shortDescription'],
            "detailedDescription" => $_POST['detailedDescription']
        ];
        
     if(AddPro($UserInputArray)){
        echo "<script>console.log('data uploaded');</script>";
       

     }else{
        echo "<script>console.log('data is not uploaded, might there some error');</script>";

     }
        
    }
} catch (PDOException $e) {
    echo "<script>console.log('there might some error with the database');</script>";
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

<!-- Content Section -->
<main class="services-section container">
  
  <div class="container mt-5">
    <h2>Add Service or Product Form</h2>
    
    <form method="POST" action="">
        <!-- Product Name -->
        <div class="mb-3">
            <label for="ProductServiceName" class="form-label">Product or service name</label>
            <input type="text" name="name" class="form-control" id="ProductServiceName" placeholder="Enter product name" required>
        </div>

        <!-- Service Options Dropdown -->
        <div class="mb-3">
            <label for="serviceOptions" class="form-label">Product Service Options</label>
            <select class="form-select" name="ProductType" id="ProductServiceOptions" required>
                <option selected disabled>Select an option</option>
                <option value="service">Service</option>
                <option value="product">Product</option>
                <option value="notesforsale">Notes for sale</option>
                <option value="Privateteacher">Private teacher</option>
            </select>
        </div>

        <!-- Price -->
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" name="price" class="form-control" id="price" placeholder="Enter price" required>
        </div>

        <!-- Short Description -->
        <div class="mb-3">
            <label for="shortDescription" class="form-label">Short Description</label>
            <textarea class="form-control" name="shortDescription" id="shortDescription" rows="3" placeholder="Enter a short description" required></textarea>
        </div>

        <!-- Detailed Description -->
        <div class="mb-3">
            <label for="detailedDescription" class="form-label">Detailed Description</label>
            <textarea class="form-control" name="detailedDescription" id="detailedDescription" rows="5" placeholder="Enter a detailed description" required></textarea>
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
          <button type="submit" name="BTN" class="btn btn-primary" value="submit">Submit</button>
        </div>
    </form>
  </div>
</main>

<!-- Bootstrap Script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>


</body>
</html>