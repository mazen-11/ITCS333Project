<?php
include 'db.php';

$sql = "INSERT INTO notes (title, department, description, file_link)
        VALUES (:title, :dept, :desc, :file)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':title' => $_POST['noteTitle'],
    ':dept'  => $_POST['noteDept'],
    ':desc'  => $_POST['noteDesc'],
    ':file'  => $_POST['noteFile']
]);

header("Location: index.php");
?>