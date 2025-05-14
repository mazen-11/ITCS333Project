<?php
include 'db.php';
$sql = "UPDATE news SET title=:title, category=:category, content=:content, image_url=:image_url WHERE id=:id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':title'=>$_POST['title'], ':category'=>$_POST['category'], ':content'=>$_POST['content'], ':image_url'=>$_POST['image_url'], ':id'=>$_POST['id']]);
header("Location: index.php");
?>