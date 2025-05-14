<?php
// event_image.php: Serves event images securely from the uploads directory
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$uploads_dir = __DIR__ . '/uploads/';
if (!isset($_GET['file'])) {
    http_response_code(400);
    echo 'No file specified.';
    exit();
}

$filename = basename($_GET['file']);
$filepath = $uploads_dir . $filename;

if (!file_exists($filepath)) {
    http_response_code(404);
    echo 'File not found.';
    exit();
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$contentType = finfo_file($finfo, $filepath);
finfo_close($finfo);

header('Content-Type: ' . $contentType);
header('Content-Length: ' . filesize($filepath));
readfile($filepath);
exit();
