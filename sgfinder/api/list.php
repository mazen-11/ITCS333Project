<?php
require_once '../db.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM study_groups ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll());
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
