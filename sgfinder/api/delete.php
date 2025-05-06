<?php
require_once '../db.php';


$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM study_groups WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(['success' => true]);
?>