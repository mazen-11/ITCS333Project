<?php
include 'db.php';
$title = $_POST['title'];
$category = $_POST['category'];
$content = $_POST['content'];
$image_url = $_POST['image_url'];
$sql = "INSERT INTO news (title, category, content, image_url)
        VALUES (:title, :category, :content, :image_url)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':title'=>$title, ':category'=>$category, ':content'=>$content, ':image_url'=>$image_url]);
header("Location: index.php");
?>