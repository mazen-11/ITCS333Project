<?php
// Enable errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = '127.0.0.1';
$db   = 'campus_news';
$user = 'root';    // XAMPP default
$pass = '';        // XAMPP default
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
} catch (PDOException $e) {
    die("MySQL Connection failed: " . $e->getMessage());
}
?>