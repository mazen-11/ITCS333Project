<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $event_id = isset($_GET['event_id']) ? intval($_GET['event_id']) : 0;
    $stmt = $conn->prepare('SELECT id, event_id, comment, created_at FROM comments WHERE event_id = ? ORDER BY created_at DESC');
    $stmt->bind_param('i', $event_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode($comments);
    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $event_id = isset($_POST['event_id']) ? intval($_POST['event_id']) : 0;
    $comment = isset($_POST['comment']) ? trim($_POST['comment']) : '';
    if ($event_id > 0 && $comment !== '') {
        $stmt = $conn->prepare('INSERT INTO comments (event_id, comment, created_at) VALUES (?, ?, NOW())');
        $stmt->bind_param('is', $event_id, $comment);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add comment']);
        }
        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
    }
}
$conn->close();
