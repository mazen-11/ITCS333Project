
<?php

try {
    require_once("add/PHPMySql/databaseConn.php");
    require_once("add/PHPMySql/EditPro.php");
    

    if (isset($_POST['BTN'])) {
        $UserInputArray = [
            "id" => $_POST['id'],
            "name" => $_POST['name'],
            "price" => $_POST['price'],
            "shortDescription" => $_POST['shortDescription'],
            "detailedDescription" => $_POST['detailedDescription']
        ];
        
     if(EditPro($UserInputArray)){
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
    <link href="../../style.css" rel="stylesheet">

</head>
<body>


<!-- Content Section -->
<main class="services-section container">
  
  <div class="container mt-5">
    <h2>edit Service Form</h2>
    <form method="POST" action="">

    <!-- Product ID -->
    <div class="mb-3">
            <label for="ProductServiceName" class="form-label">Product ID to update</label>
            <input type="number"  name="id" class="form-control" id="ProductServiceName" placeholder="Product ID to update">
        </div>

        <!-- Product Name -->
        <div class="mb-3">
            <label for="ProductServiceName" class="form-label">Product or service name</label>
            <input type="text" name="name" class="form-control" id="ProductServiceName" placeholder="Enter product name" >
        </div>

        <!-- Price -->
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" name="price" class="form-control" id="price" placeholder="Enter price" >
        </div>

        <!-- Short Description -->
        <div class="mb-3">
            <label for="shortDescription" class="form-label">Short Description</label>
            <textarea class="form-control" name="shortDescription" id="shortDescription" rows="3" placeholder="Enter a short description" ></textarea>
        </div>

        <!-- Detailed Description -->
        <div class="mb-3">
            <label for="detailedDescription" class="form-label">Detailed Description</label>
            <textarea class="form-control" name="detailedDescription" id="detailedDescription" rows="5" placeholder="Enter a detailed description" ></textarea>
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
<script src="main.js"></script>
<script src="EditProduct.js"></script>

</body>
</html>
