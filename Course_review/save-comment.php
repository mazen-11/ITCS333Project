<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $text = $_POST['comment_text'];
    $review_id = $_POST['review_id'];

    $stmt = $pdo->prepare("INSERT INTO reviews_comments (comment_text, review_id, created_at)
                           VALUES (:text, :review_id, NOW())");
    $stmt->execute([
        ':text' => $text,
        ':review_id' => $review_id
    ]);
}

header("Location: review-detail.php?id=" . $review_id);
exit;
?>
