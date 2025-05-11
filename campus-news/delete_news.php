<?php
include 'db.php';
$stmt = $pdo->prepare("DELETE FROM news WHERE id=:id");
$stmt->execute([':id'=>$_GET['id']]);
header("Location: index.php");
?>