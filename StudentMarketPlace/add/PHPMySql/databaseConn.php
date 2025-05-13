<?php
// Database connection settings
try {
    $pdo = new PDO('mysql:host=localhost;dbname=add_project;charset=utf8', 'root', ''); // Update with your credentials
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $GLOBALS['pdo'] = $pdo; // Make PDO instance globally accessible
} catch (PDOException $e) {
    error_log('Database connection failed: ' . $e->getMessage());
    die("Database connection failed. Please try again later.");
}
?>