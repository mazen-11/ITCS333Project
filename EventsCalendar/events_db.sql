-- SQL to create the events database and events table
CREATE DATABASE IF NOT EXISTS events_calendar;
USE events_calendar;

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    event_date DATE NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255)
);
