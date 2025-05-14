<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

$name = $_POST['eventName'] ?? '';
$start_time = $_POST['eventTime'] ?? '';
$end_time = $_POST['eventFinishTime'] ?? '';
$event_date = $_POST['eventDate'] ?? '';
$location = $_POST['EventPlace'] ?? '';
$description = $_POST['eventDescription'] ?? '';
$image_url = '';

if (isset($_FILES['imageInput']) && $_FILES['imageInput']['error'] === UPLOAD_ERR_OK) {
    $target_dir = 'uploads/';
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $filename = uniqid('event_', true) . '_' . basename($_FILES['imageInput']['name']);
    $target_file = $target_dir . $filename;
    if (move_uploaded_file($_FILES['imageInput']['tmp_name'], $target_file)) {
        $image_url = $filename; // Store only the filename
    }
}

$stmt = $conn->prepare("INSERT INTO events (name, start_time, end_time, event_date, location, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param('sssssss', $name, $start_time, $end_time, $event_date, $location, $description, $image_url);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add event']);
}

$stmt->close();
$conn->close();
