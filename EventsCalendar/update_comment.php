<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = 'localhost';
$db = 'events_calendar';
$user = 'root'; // Change if needed
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$comment_id = isset($_POST['comment_id']) ? intval($_POST['comment_id']) : 0;
$comment = isset($_POST['comment']) ? trim($_POST['comment']) : '';

if ($comment_id > 0 && $comment !== '') {
    $stmt = $conn->prepare('UPDATE comments SET comment = ? WHERE id = ?');
    $stmt->bind_param('si', $comment, $comment_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update comment']);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
}
$conn->close();
