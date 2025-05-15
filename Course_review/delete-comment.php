<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['comment_id'];
    $review_id = $_POST['review_id'];

    $stmt = $pdo->prepare("DELETE FROM reviews_comments WHERE id = :id");
    $stmt->execute([':id' => $id]);
}

header("Location: review-detail.php?id=" . $review_id);
exit;
?>
