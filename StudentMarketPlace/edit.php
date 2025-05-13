
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
        echo "<script>alert('data uploaded');</script>";
       

     }else{
      //  echo "<script>alert('data is not uploaded, might there some error');</script>";

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
    <link href="../../style.css" rel="stylesheet">

</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Student Marketplace</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
      </ul>
    </div>
  </div>
</nav>
<!-- Content Section -->
<main class="services-section container" id="EditDiv"></main>



<!-- Bootstrap Script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="main.js"></script>
<script src="EditProduct.js"></script>

</body>
</html>
