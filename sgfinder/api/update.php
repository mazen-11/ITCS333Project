<?php
require_once '../db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['CourseName'], $data['CourseCode'], $data['Department'], $data['date'], $data['College'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE study_groups SET CourseName = ?, CourseCode = ?, Department = ?, date = ?, College = ? WHERE id = ?");
    $stmt->execute([
        htmlspecialchars($data['CourseName']),
        htmlspecialchars($data['CourseCode']),
        htmlspecialchars($data['Department']),
        $data['date'],
        htmlspecialchars($data['College']),
        $data['id']
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
