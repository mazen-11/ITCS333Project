<?php
require_once '../db.php';
header('Content-Type: application/json');

// Get the ID from the query string
$id = $_GET['id'] ?? '';

// Validate ID
if (!$id || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing ID']);
    exit;
}

try {
    // Prepare and execute the delete query
    $stmt = $pdo->prepare("DELETE FROM study_groups WHERE id = ?");
    $stmt->execute([$id]);

    // Check if a row was deleted
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No group found with this ID']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'details' => $e->getMessage()
    ]);
}
