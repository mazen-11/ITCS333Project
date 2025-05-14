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

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$name = $_POST['eventName'] ?? '';
$start_time = $_POST['eventTime'] ?? '';
$end_time = $_POST['eventFinishTime'] ?? '';
$event_date = $_POST['eventDate'] ?? '';
$location = $_POST['EventPlace'] ?? '';
$description = $_POST['eventDescription'] ?? '';
$image_url = '';

// If a new image is uploaded, handle it
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

if ($id > 0) {
    // If a new image is uploaded, update image_url, else keep the old one
    if ($image_url !== '') {
        $stmt = $conn->prepare("UPDATE events SET name=?, start_time=?, end_time=?, event_date=?, location=?, description=?, image_url=? WHERE id=?");
        $stmt->bind_param('sssssssi', $name, $start_time, $end_time, $event_date, $location, $description, $image_url, $id);
    } else {
        $stmt = $conn->prepare("UPDATE events SET name=?, start_time=?, end_time=?, event_date=?, location=?, description=? WHERE id=?");
        $stmt->bind_param('ssssssi', $name, $start_time, $end_time, $event_date, $location, $description, $id);
    }
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update event']);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid event ID']);
}
$conn->close();
