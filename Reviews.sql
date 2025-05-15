-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 15, 2025 at 06:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Course reviews`
--

-- --------------------------------------------------------

--
-- Table structure for table `Reviews`
--

CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL,
  `course_id` varchar(7) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `review_text` text NOT NULL,
  `rating` tinyint(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reviews`
--

INSERT INTO `Reviews` (`id`, `course_id`, `course_name`, `review_text`, `rating`, `created_at`) VALUES
(143, 'ITCS555', 'new computer technology', 'I really like this course. It had too much knowledge to me as a commuter science.', 3, '2025-05-15 03:10:19'),
(147, 'ITCS333', 'Internet software development', 'I really learned a lot from this course by learning HTML, CSS, JavaScript, and PHP. Also great instructor', 5, '2025-05-15 03:20:56'),
(148, 'ITCS301', 'Database Systems', 'Good introduction to SQL and ER diagrams. Could use more hands-on projects.', 3, '2025-05-15 03:29:31'),
(151, 'ITCS347', 'Software Engineering', 'Group work was chaotic. Not enough guidance on documentation. But overall, a necessary course to learn how to work on big projects and version control.', 3, '2025-05-15 03:38:07'),
(153, 'ITCS426', 'Cybersecurity Basics', 'Very interesting — learned about encryption, firewalls, and ethical hacking. Would love more hands-on activities though.', 2, '2025-05-15 03:38:55'),
(154, 'ITCS113', 'Introduction to Java', 'I really like the subject, but it was so hard to learn especially a new language in this short time, too much assignments and too much work', 1, '2025-05-15 03:39:54'),
(155, 'ITCS452', 'Machine Learning', 'The best course I’ve taken so far. The assignments were tough but rewarding. We trained real models using Python and scikit-learn. You\'ll need strong math basics.\r\n', 5, '2025-05-15 03:40:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
