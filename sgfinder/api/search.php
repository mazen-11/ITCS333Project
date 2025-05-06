<?php
require_once '../db.php';


$query = $_GET['q'] ?? '';
if (!$query) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing search term']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM study_groups WHERE CourseName LIKE ? OR CourseCode LIKE ? OR Department LIKE ? OR College LIKE ?");
$search = "%$query%";
$stmt->execute([$search, $search, $search, $search]);

$results = $stmt->fetchAll();
echo json_encode($results);
?>