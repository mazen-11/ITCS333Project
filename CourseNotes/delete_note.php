<?php
include 'db.php';

$stmt = $pdo->prepare("DELETE FROM notes WHERE id = :id");
$stmt->execute([':id' => $_GET['id']]);

header("Location: index.php");
?>