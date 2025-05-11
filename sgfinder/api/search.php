<?php
require_once '../db.php';
header('Content-Type: application/json');

$filter = $_GET['filter'] ?? '';
$keyword = $_GET['keyword'] ?? '';

$allowedFields = ['CourseName', 'CourseCode', 'College', 'Department'];

if (!in_array($filter, $allowedFields)) {
    echo json_encode([]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM study_groups WHERE $filter LIKE ?");
    $stmt->execute(["%$keyword%"]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
