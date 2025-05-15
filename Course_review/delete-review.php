<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id'])) {
    $id = $_POST['id'];

    // Delete comments first (optional if foreign key cascade not set)
    $stmt = $pdo->prepare("DELETE FROM reviews_comments WHERE review_id = :id");
    $stmt->execute([':id' => $id]);

    // Then delete the review
    $stmt = $pdo->prepare("DELETE FROM Reviews WHERE id = :id");
    $stmt->execute([':id' => $id]);
}

header("Location: index.php");
exit;
?>
