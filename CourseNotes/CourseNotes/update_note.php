<?php
include 'db.php';

$sql = "UPDATE notes SET title = :title, department = :dept, description = :desc, file_link = :file
        WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':title' => $_POST['noteTitle'],
    ':dept'  => $_POST['noteDept'],
    ':desc'  => $_POST['noteDesc'],
    ':file'  => $_POST['noteFile'],
    ':id'    => $_POST['id']
]);

header("Location: index.php");
?>