
<?php

try {
    require_once("add/PHPMySql/databaseConn.php");
    require_once("add/PHPMySql/UploadSqlComment.php");

    if (isset($_POST['BTN'])) {
        $UserInputArray = [
            "ID" => $_POST['ID'],
            "Date" => $_POST['Date'],
            "Comment" => $_POST['Comment']
        
        ];
        
     if(AddPro($UserInputArray)){
        echo "<script>alert('data uploaded');</script>";
       

     }else{
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
    <title>Product | book for sale</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../style.css" rel="stylesheet">

</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Course Notes</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Course Reviews</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Study Group Finder</a></li>
                <li class="nav-item"><a class="nav-link" id="Comment">Add Comment</a></li>
            </ul>
        </div>
    </div>
</nav>


<div class="container mt-5" id="ProductPage">
    <div class="row" ></div>
</div>


<main class="services-section container" id="CommentDiv" style="margin-bottom:100px;"></main>


<!-- Content Section -->
<main class="services-section container">
    <!-- Add g-4 for spacing -->
       <div class="row g-4" id="product-list"></div>
  </main>


<!-- Footer -->
<footer class="bg-dark text-light pt-5">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h3>Coding Yaar</h3>
                <p>321, Lorem ipsum dolor sit amet.</p>
                <p>0987654321</p>
            </div>
            <div class="col-md-4">
                <h4>Menu</h4>
                <ul class="list-unstyled">
                    <li><a href="#" class="text-light text-decoration-none">Home</a></li>
                    <li><a href="#" class="text-light text-decoration-none">About</a></li>
                    <li><a href="#" class="text-light text-decoration-none">Contact</a></li>
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
            <p>2023 © Coding Yaar. All Rights Reserved.</p>
            <p>
                <a href="#" class="text-light text-decoration-none">Terms of Use</a>
                <a href="#" class="text-light text-decoration-none ms-3">Privacy Policy</a>
            </p>
        </div>
    </div>
</footer>

<!-- Bootstrap Script  
 <script src="UseFetchedData.js"></script>
-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="JSONFetch_forwarded.js"></script>
<script src="js/GetProduct.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const commentLink = document.getElementById('Comment');
    
    if (commentLink) {
        commentLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            let targetUrl = 'comment.php';
            if (productId) {
                targetUrl += `?id=${productId}`;
            }
            
            window.location.href = targetUrl;
        });
    }
});
</script>
</body>
</html>
