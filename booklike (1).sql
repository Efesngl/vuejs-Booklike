-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 10 Eyl 2023, 23:17:16
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `booklike`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bookmarks`
--

CREATE TABLE `bookmarks` (
  `ID` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `category` int(2) NOT NULL,
  `creator` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `bookmarks`
--

INSERT INTO `bookmarks` (`ID`, `title`, `description`, `url`, `created_at`, `category`, `creator`) VALUES
(19, 'php', 'php', 'https://www.php.net', '2023-09-10', 3, 1),
(20, 'vuejs', 'vuejs', 'https://vuejs.org/', '2023-09-10', 2, 1),
(21, 'nuxtjs', 'nuxt', 'https://nuxt.com', '2023-09-10', 2, 1),
(22, 'axios', 'axios', 'https://axios-http.com/docs/intro', '2023-09-10', 2, 1),
(24, 'bun js', 'bun', 'https://bun.sh', '2023-09-10', 3, 1),
(25, 'node js', 'nodejs', 'https://nodejs.org/tr', '2023-09-10', 3, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`ID`, `category`) VALUES
(2, 'frontend'),
(3, 'backend'),
(4, 'web');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `faved_bookmarks`
--

CREATE TABLE `faved_bookmarks` (
  `ID` int(11) NOT NULL,
  `user_id` int(2) NOT NULL,
  `bookmark_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `faved_bookmarks`
--

INSERT INTO `faved_bookmarks` (`ID`, `user_id`, `bookmark_id`) VALUES
(15, 1, 20),
(16, 1, 19),
(17, 1, 24),
(18, 1, 25),
(19, 1, 22),
(21, 2, 20);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`ID`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'Efe', 'Şengül', 'efe20041@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(2, 'Cemal', 'Mustafaoğlu', 'dag@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(21, 'asd', 'asd', 'asd@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `category` (`category`),
  ADD KEY `creator` (`creator`);

--
-- Tablo için indeksler `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Tablo için indeksler `faved_bookmarks`
--
ALTER TABLE `faved_bookmarks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `faved_bookmarks_ibfk_1` (`bookmark_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Tablo için AUTO_INCREMENT değeri `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `faved_bookmarks`
--
ALTER TABLE `faved_bookmarks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`ID`),
  ADD CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`creator`) REFERENCES `users` (`ID`);

--
-- Tablo kısıtlamaları `faved_bookmarks`
--
ALTER TABLE `faved_bookmarks`
  ADD CONSTRAINT `faved_bookmarks_ibfk_1` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmarks` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `faved_bookmarks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
