-- create_db.sql
-- Run this in phpMyAdmin or MySQL CLI to initialize the database:

CREATE DATABASE IF NOT EXISTS course_notes;
USE course_notes;

CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  file_link VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
