-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 07:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smcc_research_hub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL,
  `admin_user` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `admin_user`, `full_name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'System Administrator', 'admin@smccnasipit.edu.ph', '$2y$10$XCWKivmgtlgTEPCoJsVcceIbwfLUHmxOjzSxEM30ih69dJvecnaUK', '2024-11-15 11:45:13', '2024-11-15 11:45:13');

-- --------------------------------------------------------

--
-- Table structure for table `adminlogs`
--

CREATE TABLE `adminlogs` (
  `id` bigint(20) NOT NULL,
  `admin_id` bigint(20) NOT NULL,
  `activity` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminlogs`
--

INSERT INTO `adminlogs` (`id`, `admin_id`, `activity`, `created_at`, `updated_at`) VALUES
(1, 1, 'Logged in at ::1', '2024-11-15 11:46:28', '2024-11-15 11:46:28'),
(2, 1, 'Uploaded Journal ID 1: adawd by Olaop,Aoli,Doli year 2024 url /journal?filename=journal_673735217068a', '2024-11-15 11:48:49', '2024-11-15 11:48:49'),
(3, 1, 'Personnel ID: 12, fullname: brian timogan has newly been registered', '2024-11-15 11:50:17', '2024-11-15 11:50:17'),
(4, 1, 'Admin ID 1 has Logged out at ::1', '2024-11-15 11:50:24', '2024-11-15 11:50:24'),
(5, 1, 'Logged in at ::1', '2024-11-15 12:13:32', '2024-11-15 12:13:32'),
(6, 1, 'Uploaded Thesis ID 1: sjfksj by sdfsefsdf year 2024 url /thesis?filename=thesis_67373b259d597', '2024-11-15 12:14:29', '2024-11-15 12:14:29'),
(7, 1, 'Admin ID 1 has Logged out at ::1', '2024-11-15 12:14:39', '2024-11-15 12:14:39'),
(8, 1, 'Logged in at ::1', '2024-11-19 07:14:27', '2024-11-19 07:14:27'),
(9, 1, 'Admin ID 1 has Logged out at ::1', '2024-11-19 07:19:41', '2024-11-19 07:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `downloadables`
--

CREATE TABLE `downloadables` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ext` varchar(15) NOT NULL,
  `url` varchar(255) NOT NULL,
  `downloadable` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journal`
--

CREATE TABLE `journal` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `department` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `abstract` text NOT NULL,
  `is_public` tinyint(1) DEFAULT 0,
  `published_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journal`
--

INSERT INTO `journal` (`id`, `title`, `author`, `year`, `department`, `course`, `url`, `abstract`, `is_public`, `published_date`, `created_at`, `updated_at`) VALUES
(1, 'adawd', 'Olaop,Aoli,Doli', '2024', 'College of Computing Information Sciences', 'Bachelor of Science in Information Technology', '/journal?filename=journal_673735217068a', 'asdawda', 1, '2024-11-15', '2024-11-15 11:48:49', '2024-11-15 11:48:53');

-- --------------------------------------------------------

--
-- Table structure for table `journalfavorites`
--

CREATE TABLE `journalfavorites` (
  `id` bigint(20) NOT NULL,
  `journal_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journalpersonnelfavorites`
--

CREATE TABLE `journalpersonnelfavorites` (
  `id` bigint(20) NOT NULL,
  `thesis_id` bigint(20) NOT NULL,
  `personnel_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journalpersonnelreads`
--

CREATE TABLE `journalpersonnelreads` (
  `id` bigint(20) NOT NULL,
  `journal_id` bigint(20) NOT NULL,
  `personnel_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journalpersonnelreads`
--

INSERT INTO `journalpersonnelreads` (`id`, `journal_id`, `personnel_id`, `created_at`, `updated_at`) VALUES
(1, 1, '12', '2024-11-15 12:10:52', '2024-11-15 12:10:52');

-- --------------------------------------------------------

--
-- Table structure for table `journalreads`
--

CREATE TABLE `journalreads` (
  `id` bigint(20) NOT NULL,
  `journal_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personnel`
--

CREATE TABLE `personnel` (
  `personnel_id` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personnel`
--

INSERT INTO `personnel` (`personnel_id`, `full_name`, `email`, `password`, `department`, `created_at`, `updated_at`) VALUES
('12', 'brian timogan', 'example@gmail.com', '$2y$10$eKdjEW6E8DswID.xzUjZhuu/npb/Tcp6T4uyuQAEjBrtj/uDSIUF.', 'College of Computing Information Sciences', '2024-11-15 11:50:17', '2024-11-15 11:50:17');

-- --------------------------------------------------------

--
-- Table structure for table `personnellogs`
--

CREATE TABLE `personnellogs` (
  `id` bigint(20) NOT NULL,
  `personnel_id` varchar(255) NOT NULL,
  `activity` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personnellogs`
--

INSERT INTO `personnellogs` (`id`, `personnel_id`, `activity`, `created_at`, `updated_at`) VALUES
(1, '12', 'Personnel ID: 12, fullname: brian timogan has newly been registered', '2024-11-15 11:50:17', '2024-11-15 11:50:17'),
(2, '12', 'Logged in at ::1', '2024-11-15 11:51:02', '2024-11-15 11:51:02'),
(3, '12', 'Personnel ID 12 has Logged out at ::1', '2024-11-15 12:13:07', '2024-11-15 12:13:07'),
(4, '12', 'Logged in at ::1', '2024-11-15 12:16:20', '2024-11-15 12:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `publishedthesisjournal`
--

CREATE TABLE `publishedthesisjournal` (
  `id` bigint(20) NOT NULL,
  `journal_id` bigint(20) NOT NULL,
  `thesis_id` bigint(20) NOT NULL,
  `is_public` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` bigint(20) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `ip_address` varchar(64) NOT NULL,
  `user_agent` varchar(512) NOT NULL,
  `token` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `session_id`, `ip_address`, `user_agent`, `token`, `created_at`, `updated_at`) VALUES
(1, 'eeb0150d49882be33dce7297b800211a', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', NULL, '2024-11-15 11:45:14', '2024-11-15 11:45:14'),
(2, '2d82b10347ff2a03cc36532d8d302462', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', NULL, '2024-11-15 11:45:15', '2024-11-15 11:45:15'),
(3, '758b0066ed237fafe59914f2135c6db5', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', NULL, '2024-11-15 11:45:16', '2024-11-15 11:45:16'),
(7, '5c8d7152a45aeac7673b7223caee03c9', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGQ3MTUyYTQ1YWVhYzc2NzNiNzIyM2NhZWUwM2M5IiwiaWF0IjoxNzMxNjcyOTc5LCJleHAiOjE3MzE3MDE3NzksImRhdGEiOnsiYWNjb3VudCI6InBlcnNvbm5lbCIsImlkIjoiMTIiLCJmdWxsX25hbWUiOiJicmlhbiB0aW1vZ2FuIn19.uj6VbXVdYv5RtDUybGx054FWt1XPZvbT9cNZ1rfwo8s', '2024-11-15 12:14:40', '2024-11-15 12:16:20'),
(8, 'b59a7c808a3f5cc9665ba3f03ad53b76', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', NULL, '2024-11-16 02:28:55', '2024-11-16 02:28:55'),
(9, '50866b101ec34c06225105d7ea61c499', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', NULL, '2024-11-19 06:35:32', '2024-11-19 06:35:32'),
(11, '91e842e7fd7c92d4a8b2cdf372bf047f', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', NULL, '2024-11-19 07:19:42', '2024-11-19 07:19:42'),
(12, 'a1a6a0f13f1ff95e290cebab35f7e06a', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExYTZhMGYxM2YxZmY5NWUyOTBjZWJhYjM1ZjdlMDZhIiwiaWF0IjoxNzMyMDYzOTI3LCJleHAiOjE3MzIwOTI3MjcsImRhdGEiOnsiYWNjb3VudCI6InN0dWRlbnQiLCJpZCI6MjAyMTUwMDY4LCJmdWxsX25hbWUiOiJCUklBTiBFVkFOIFMuIFRJTU9HQU4ifX0.BpO65Su0HsfrWxi6UA2xyXChBDMTZPYOKg3K6fvQo6U', '2024-11-20 00:50:44', '2024-11-20 00:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `year` enum('1','2','3','4') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `full_name`, `password`, `email`, `department`, `course`, `year`, `created_at`, `updated_at`) VALUES
(202150068, 'BRIAN EVAN S. TIMOGAN', '$2y$10$6bnoycH2f45YkvL981vAI.3.dhpAZbdkrOm2.bBUbY5BJvhSOZfmq', 'example@gmail.com', 'College of Computing Information Sciences', 'Bachelor of Science in Information Technology', '4', '2024-11-20 00:51:48', '2024-11-20 00:51:48');

-- --------------------------------------------------------

--
-- Table structure for table `studentlogs`
--

CREATE TABLE `studentlogs` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `activity` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentlogs`
--

INSERT INTO `studentlogs` (`id`, `student_id`, `activity`, `created_at`, `updated_at`) VALUES
(1, 202150068, 'Student ID: 202150068, fullname: BRIAN EVAN S. TIMOGAN has newly been registered', '2024-11-20 00:51:48', '2024-11-20 00:51:48'),
(2, 202150068, 'Logged in at ::1', '2024-11-20 00:52:08', '2024-11-20 00:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `thesis`
--

CREATE TABLE `thesis` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `department` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `adviser` varchar(255) DEFAULT '',
  `url` text NOT NULL,
  `abstract` text NOT NULL,
  `is_public` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thesis`
--

INSERT INTO `thesis` (`id`, `title`, `author`, `year`, `department`, `course`, `adviser`, `url`, `abstract`, `is_public`, `created_at`, `updated_at`) VALUES
(1, 'sjfksj', 'sdfsefsdf', '2024', 'College of Computing Information Sciences', 'Bachelor of Science in Information Technology', 'dsfdsfsedf', '/thesis?filename=thesis_67373b259d597', 'sdfsefsf', 1, '2024-11-15 12:14:29', '2024-11-15 12:14:33');

-- --------------------------------------------------------

--
-- Table structure for table `thesisfavorites`
--

CREATE TABLE `thesisfavorites` (
  `id` bigint(20) NOT NULL,
  `thesis_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thesisfavorites`
--

INSERT INTO `thesisfavorites` (`id`, `thesis_id`, `student_id`, `created_at`, `updated_at`) VALUES
(1, 1, 202150068, '2024-11-20 00:52:27', '2024-11-20 00:52:27');

-- --------------------------------------------------------

--
-- Table structure for table `thesispersonnelfavorites`
--

CREATE TABLE `thesispersonnelfavorites` (
  `id` bigint(20) NOT NULL,
  `thesis_id` bigint(20) NOT NULL,
  `personnel_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thesispersonnelfavorites`
--

INSERT INTO `thesispersonnelfavorites` (`id`, `thesis_id`, `personnel_id`, `created_at`, `updated_at`) VALUES
(1, 1, '12', '2024-11-15 12:16:41', '2024-11-15 12:16:41');

-- --------------------------------------------------------

--
-- Table structure for table `thesispersonnelreads`
--

CREATE TABLE `thesispersonnelreads` (
  `id` bigint(20) NOT NULL,
  `thesis_id` bigint(20) NOT NULL,
  `personnel_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thesispersonnelreads`
--

INSERT INTO `thesispersonnelreads` (`id`, `thesis_id`, `personnel_id`, `created_at`, `updated_at`) VALUES
(1, 1, '12', '2024-11-15 12:16:43', '2024-11-15 12:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `thesisreads`
--

CREATE TABLE `thesisreads` (
  `id` bigint(20) NOT NULL,
  `thesis_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thesisreads`
--

INSERT INTO `thesisreads` (`id`, `thesis_id`, `student_id`, `created_at`, `updated_at`) VALUES
(1, 1, 202150068, '2024-11-20 00:52:30', '2024-11-20 00:52:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_user` (`admin_user`);

--
-- Indexes for table `adminlogs`
--
ALTER TABLE `adminlogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_adminlogs_admin_id` (`admin_id`);

--
-- Indexes for table `downloadables`
--
ALTER TABLE `downloadables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `journal`
--
ALTER TABLE `journal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`,`author`,`year`);

--
-- Indexes for table `journalfavorites`
--
ALTER TABLE `journalfavorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_journalfavorites_journal_id` (`journal_id`),
  ADD KEY `fk_journalfavorites_student_id` (`student_id`);

--
-- Indexes for table `journalpersonnelfavorites`
--
ALTER TABLE `journalpersonnelfavorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_journalpersonnelfavorites_thesis_id` (`thesis_id`),
  ADD KEY `fk_journalpersonnelfavorites_personnel_id` (`personnel_id`);

--
-- Indexes for table `journalpersonnelreads`
--
ALTER TABLE `journalpersonnelreads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_journalpersonnelreads_journal_id` (`journal_id`),
  ADD KEY `fk_journalpersonnelreads_personnel_id` (`personnel_id`);

--
-- Indexes for table `journalreads`
--
ALTER TABLE `journalreads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_journalreads_journal_id` (`journal_id`),
  ADD KEY `fk_journalreads_student_id` (`student_id`);

--
-- Indexes for table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`personnel_id`),
  ADD UNIQUE KEY `personnel_id` (`personnel_id`);

--
-- Indexes for table `personnellogs`
--
ALTER TABLE `personnellogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_personnellogs_personnel_id` (`personnel_id`);

--
-- Indexes for table `publishedthesisjournal`
--
ALTER TABLE `publishedthesisjournal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `thesis_id` (`thesis_id`),
  ADD UNIQUE KEY `journal_id` (`journal_id`,`thesis_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`,`ip_address`,`user_agent`) USING HASH;

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`full_name`,`course`);

--
-- Indexes for table `studentlogs`
--
ALTER TABLE `studentlogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_studentlogs_student_id` (`student_id`);

--
-- Indexes for table `thesis`
--
ALTER TABLE `thesis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `thesisfavorites`
--
ALTER TABLE `thesisfavorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_thesisfavorites_thesis_id` (`thesis_id`),
  ADD KEY `fk_thesisfavorites_student_id` (`student_id`);

--
-- Indexes for table `thesispersonnelfavorites`
--
ALTER TABLE `thesispersonnelfavorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_thesispersonnelfavorites_thesis_id` (`thesis_id`),
  ADD KEY `fk_thesispersonnelfavorites_personnel_id` (`personnel_id`);

--
-- Indexes for table `thesispersonnelreads`
--
ALTER TABLE `thesispersonnelreads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_thesispersonnelreads_thesis_id` (`thesis_id`),
  ADD KEY `fk_thesispersonnelreads_personnel_id` (`personnel_id`);

--
-- Indexes for table `thesisreads`
--
ALTER TABLE `thesisreads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_thesisreads_thesis_id` (`thesis_id`),
  ADD KEY `fk_thesisreads_student_id` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adminlogs`
--
ALTER TABLE `adminlogs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `downloadables`
--
ALTER TABLE `downloadables`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journal`
--
ALTER TABLE `journal`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `journalfavorites`
--
ALTER TABLE `journalfavorites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `journalpersonnelfavorites`
--
ALTER TABLE `journalpersonnelfavorites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journalpersonnelreads`
--
ALTER TABLE `journalpersonnelreads`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `journalreads`
--
ALTER TABLE `journalreads`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnellogs`
--
ALTER TABLE `personnellogs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `publishedthesisjournal`
--
ALTER TABLE `publishedthesisjournal`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `studentlogs`
--
ALTER TABLE `studentlogs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `thesis`
--
ALTER TABLE `thesis`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thesisfavorites`
--
ALTER TABLE `thesisfavorites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thesispersonnelfavorites`
--
ALTER TABLE `thesispersonnelfavorites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thesispersonnelreads`
--
ALTER TABLE `thesispersonnelreads`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thesisreads`
--
ALTER TABLE `thesisreads`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adminlogs`
--
ALTER TABLE `adminlogs`
  ADD CONSTRAINT `fk_adminlogs_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `journalfavorites`
--
ALTER TABLE `journalfavorites`
  ADD CONSTRAINT `fk_journalfavorites_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_journalfavorites_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `journalpersonnelfavorites`
--
ALTER TABLE `journalpersonnelfavorites`
  ADD CONSTRAINT `fk_journalpersonnelfavorites_personnel_id` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_journalpersonnelfavorites_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `journalpersonnelreads`
--
ALTER TABLE `journalpersonnelreads`
  ADD CONSTRAINT `fk_journalpersonnelreads_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_journalpersonnelreads_personnel_id` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `journalreads`
--
ALTER TABLE `journalreads`
  ADD CONSTRAINT `fk_journalreads_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_journalreads_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `personnellogs`
--
ALTER TABLE `personnellogs`
  ADD CONSTRAINT `fk_personnellogs_personnel_id` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `publishedthesisjournal`
--
ALTER TABLE `publishedthesisjournal`
  ADD CONSTRAINT `fk_publishedthesisjournal_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_publishedthesisjournal_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `thesis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentlogs`
--
ALTER TABLE `studentlogs`
  ADD CONSTRAINT `fk_studentlogs_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thesisfavorites`
--
ALTER TABLE `thesisfavorites`
  ADD CONSTRAINT `fk_thesisfavorites_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_thesisfavorites_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `thesis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thesispersonnelfavorites`
--
ALTER TABLE `thesispersonnelfavorites`
  ADD CONSTRAINT `fk_thesispersonnelfavorites_personnel_id` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_thesispersonnelfavorites_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `thesis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thesispersonnelreads`
--
ALTER TABLE `thesispersonnelreads`
  ADD CONSTRAINT `fk_thesispersonnelreads_personnel_id` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_thesispersonnelreads_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `thesis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thesisreads`
--
ALTER TABLE `thesisreads`
  ADD CONSTRAINT `fk_thesisreads_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_thesisreads_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `thesis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
