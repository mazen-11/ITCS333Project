<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

$sql = "SELECT * FROM events ORDER BY event_date DESC, start_time DESC";
$result = $conn->query($sql);
$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}

header('Content-Type: application/json');
echo json_encode($events);

$conn->close();
