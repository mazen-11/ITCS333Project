<?php
include 'db.php';

// Get data from form
$title = $_POST['title'];
$code = strtoupper(trim($_POST['code']));
$rating = intval($_POST['rating']);
$description = $_POST['description'];

// Prepare SQL
$sql = "INSERT INTO Reviews (course_name, course_id, rating, review_text, created_at)
        VALUES (:title, :code, :rating, :description, NOW())";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':title' => $title,
    ':code' => $code,
    ':rating' => $rating,
    ':description' => $description
]);

// Redirect back to main page
header("Location: index.php");
exit;
?>
