<?php
require_once '../db.php';


$id = $_GET['id'] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

if (!$id || empty($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$fields = [];
$params = [];
foreach ($data as $key => $value) {
    $fields[] = "$key = ?";
    $params[] = htmlspecialchars($value);
}
$params[] = $id;

$sql = "UPDATE study_groups SET " . implode(', ', $fields) . " WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(['success' => true]);
?>
