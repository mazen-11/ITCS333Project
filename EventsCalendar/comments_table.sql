-- SQL to create the comments table for event-specific comments
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
