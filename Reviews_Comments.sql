-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 15, 2025 at 09:08 AM
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
-- Table structure for table `Reviews_Comments`
--

CREATE TABLE `Reviews_Comments` (
  `id` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `review_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reviews_Comments`
--

INSERT INTO `Reviews_Comments` (`id`, `comment_text`, `review_id`, `created_at`) VALUES
(2, 'Totally agree — the Python projects were intense but super rewarding!', 155, '2025-05-15 03:42:35'),
(5, 'The instructor was very supportive and kept pushing us to learn beyond the slides.', 155, '2025-05-15 03:43:30'),
(7, 'Didn’t learn anything useful.', 154, '2025-05-15 03:45:03'),
(8, 'Assignments didn’t match what was taught.', 154, '2025-05-15 03:45:11'),
(9, 'Felt more lost after every class.', 154, '2025-05-15 03:45:18'),
(10, 'Really enjoyed learning about ethical hacking.', 153, '2025-05-15 03:45:42'),
(11, 'Loved the mix of theory and real-world cases.\r\n', 153, '2025-05-15 03:45:48'),
(12, 'Good course, but some slides were outdated.\r\n', 153, '2025-05-15 03:45:57'),
(13, 'The firewall demo was my favorite part.', 153, '2025-05-15 03:46:03'),
(16, 'The projects were time-consuming but worth it', 151, '2025-05-15 03:46:52'),
(17, 'Really enjoyed this course overall', 151, '2025-05-15 03:46:58'),
(18, 'Lectures were sometimes too fast', 151, '2025-05-15 03:47:04'),
(19, 'This course helped me understand the topic deeply', 148, '2025-05-15 03:47:15'),
(20, 'I loved how practical the assignments were', 148, '2025-05-15 03:47:23'),
(21, 'Grading was fair and transparent', 147, '2025-05-15 03:47:35'),
(22, 'Material was up-to-date and relevant', 147, '2025-05-15 03:47:44'),
(23, 'Didn’t expect to enjoy it this much', 147, '2025-05-15 03:47:50'),
(24, 'Tough but rewarding', 147, '2025-05-15 03:47:55'),
(25, 'Some topics were rushed near the end', 143, '2025-05-15 03:48:09'),
(26, 'Class discussions were actually helpful', 143, '2025-05-15 03:48:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Reviews_Comments`
--
ALTER TABLE `Reviews_Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK` (`review_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Reviews_Comments`
--
ALTER TABLE `Reviews_Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Reviews_Comments`
--
ALTER TABLE `Reviews_Comments`
  ADD CONSTRAINT `FK` FOREIGN KEY (`review_id`) REFERENCES `Reviews` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
