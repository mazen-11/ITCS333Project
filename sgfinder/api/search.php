<?php
require_once '../db.php';
header('Content-Type: application/json');

$term = $_GET['term'] ?? '';

try {
    if ($term === '') {
        $stmt = $pdo->query("SELECT * FROM study_groups ORDER BY created_at DESC");
    } else {
        $stmt = $pdo->prepare("SELECT * FROM study_groups WHERE CourseName LIKE ? OR CourseCode LIKE ? OR Department LIKE ? OR College LIKE ? ORDER BY created_at DESC");
        $searchTerm = "%$term%";
        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
    }

    echo json_encode($stmt->fetchAll());
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
