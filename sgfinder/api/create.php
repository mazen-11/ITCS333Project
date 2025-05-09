<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['CourseName'], $data['CourseCode'], $data['Department'], $data['date'], $data['College'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO study_groups (CourseName, CourseCode, Department, date, College) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['CourseName'],
        $data['CourseCode'],
        $data['Department'],
        $data['date'],
        $data['College']
    ]);

    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
