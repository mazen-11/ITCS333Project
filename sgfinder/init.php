<?php
require_once 'db.php';

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS study_groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            CourseName TEXT NOT NULL,
            CourseCode TEXT NOT NULL,
            Department TEXT NOT NULL,
            date TEXT NOT NULL,
            College TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");
    echo "✅ Table 'study_groups' created successfully.";
} catch (PDOException $e) {
    echo "❌ Failed to create table: " . $e->getMessage();
}
