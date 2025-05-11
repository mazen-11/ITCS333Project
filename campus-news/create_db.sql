-- create_db.sql
-- Run this in phpMyAdmin or MySQL CLI to initialize the database:

CREATE DATABASE IF NOT EXISTS campus_news;
USE campus_news;

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  date_posted DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
