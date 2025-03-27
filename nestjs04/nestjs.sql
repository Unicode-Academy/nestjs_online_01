-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.6.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table nestjs_migrations.actions
CREATE TABLE IF NOT EXISTS `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.actions: ~6 rows (approximately)
INSERT INTO `actions` (`id`, `key`, `name`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'create', 'Thêm', 1, '2025-03-12 13:25:34', '2025-03-12 13:25:34'),
	(2, 'update', 'Cập nhật', 1, '2025-03-12 13:25:53', '2025-03-12 13:25:53'),
	(3, 'destroy', 'Xóa', 1, '2025-03-12 13:26:12', '2025-03-12 13:26:12'),
	(4, 'read', 'Xem', 1, '2025-03-12 13:26:20', '2025-03-12 13:26:20'),
	(5, 'permission', 'Phân quyền', 1, '2025-03-12 13:26:36', '2025-03-12 13:26:36'),
	(6, 'export', 'Xuất', 1, '2025-03-12 13:26:52', '2025-03-12 13:26:52');

-- Dumping structure for table nestjs_migrations.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` double(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.courses: ~0 rows (approximately)

-- Dumping structure for table nestjs_migrations.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.migrations: ~18 rows (approximately)
INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
	(1, 1739196760456, 'CreateUserTable1739196760456'),
	(2, 1739363714262, 'CreatePhoneTable1739363714262'),
	(3, 1739364449949, 'CreatePostsTable1739364449949'),
	(4, 1739364662599, 'CreateCoursesTable1739364662599'),
	(5, 1739367771580, 'CreateUsersCoursesTable1739367771580'),
	(6, 1739368100136, 'ChangeColumnUsersTable1739368100136'),
	(7, 1739368576319, 'DropUniqueUsersTable1739368576319'),
	(8, 1739370292937, 'CreateIndexPhonesTable1739370292937'),
	(9, 1740748427036, 'CreateSettingsTable1740748427036'),
	(10, 1741350856361, 'CreateRolesTable1741350856361'),
	(11, 1741351033306, 'CreateUsersRolesTable1741351033306'),
	(12, 1741351217800, 'CreatePermissionsTable1741351217800'),
	(13, 1741351356790, 'CreateRolesPermissionsTable1741351356790'),
	(14, 1741351675815, 'CreateUsersPermissionsTable1741351675815'),
	(16, 1741784192889, 'AddColumnRolesTable1741784192889'),
	(17, 1741785636681, 'CreateModuleTable1741785636681'),
	(18, 1741785840003, 'CreateActionsTable1741785840003'),
	(19, 1741786033054, 'CreateModulesActionsTable1741786033054');

-- Dumping structure for table nestjs_migrations.modules
CREATE TABLE IF NOT EXISTS `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.modules: ~2 rows (approximately)
INSERT INTO `modules` (`id`, `key`, `name`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'users', 'Người dùng', 1, '2025-03-12 13:23:21', '2025-03-12 13:23:21'),
	(2, 'products', 'Sản phẩm', 1, '2025-03-12 13:23:40', '2025-03-12 13:23:40');

-- Dumping structure for table nestjs_migrations.modules_actions
CREATE TABLE IF NOT EXISTS `modules_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `modules_actions_module_id_foreign` (`module_id`),
  KEY `modules_actions_action_id_foreign` (`action_id`),
  CONSTRAINT `modules_actions_action_id_foreign` FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `modules_actions_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.modules_actions: ~4 rows (approximately)
INSERT INTO `modules_actions` (`id`, `module_id`, `action_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, '2025-03-12 13:31:07', '2025-03-12 13:31:07'),
	(2, 1, 2, '2025-03-12 13:31:18', '2025-03-12 13:31:18'),
	(3, 1, 3, '2025-03-12 13:31:25', '2025-03-12 13:31:25'),
	(4, 1, 4, '2025-03-12 13:31:33', '2025-03-12 13:31:33');

-- Dumping structure for table nestjs_migrations.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.permissions: ~12 rows (approximately)
INSERT INTO `permissions` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
	(11, 'posts.create', 1, '2025-03-07 14:00:57', '2025-03-07 14:00:57'),
	(12, 'posts.delete', 1, '2025-03-07 14:00:57', '2025-03-07 14:00:57'),
	(13, 'posts.read', 1, '2025-03-07 14:00:57', '2025-03-07 14:00:57'),
	(14, 'posts.update', 1, '2025-03-07 14:00:57', '2025-03-07 14:00:57'),
	(15, 'products.create', 1, '2025-03-07 14:04:52', '2025-03-07 14:04:52'),
	(16, 'users.create', 1, '2025-03-07 14:28:22', '2025-03-07 14:28:22'),
	(17, 'users.destroy', 1, '2025-03-07 14:28:22', '2025-03-07 14:28:22'),
	(18, 'users.update', 1, '2025-03-07 14:28:22', '2025-03-07 14:28:22'),
	(19, 'products.update', 1, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(20, 'products.read', 1, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(21, 'products.delete', 1, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(22, 'users.read', 1, '2025-03-12 12:39:00', '2025-03-12 12:39:00');

-- Dumping structure for table nestjs_migrations.phones
CREATE TABLE IF NOT EXISTS `phones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(15) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `phones_user_id_foreign` (`user_id`),
  KEY `phones_phone_index` (`phone`),
  CONSTRAINT `phones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.phones: ~1 rows (approximately)
INSERT INTO `phones` (`id`, `phone`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, '0111', 32, '2025-02-15 13:23:13', '2025-02-15 13:23:14');

-- Dumping structure for table nestjs_migrations.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.posts: ~0 rows (approximately)

-- Dumping structure for table nestjs_migrations.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `is_root` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `status`, `is_root`, `created_at`, `updated_at`) VALUES
	(21, 'Administrator', 1, 0, '2025-03-07 14:28:22', '2025-03-07 14:28:22'),
	(22, 'Manager', 1, 0, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(23, 'Super Admin', 1, 1, '2025-03-12 13:03:12', '2025-03-12 13:03:12');

-- Dumping structure for table nestjs_migrations.roles_permissions
CREATE TABLE IF NOT EXISTS `roles_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `roles_permissions_permission_id_foreign` (`permission_id`),
  KEY `roles_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `roles_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `roles_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.roles_permissions: ~8 rows (approximately)
INSERT INTO `roles_permissions` (`id`, `permission_id`, `role_id`, `created_at`, `updated_at`) VALUES
	(26, 18, 21, '2025-03-07 14:28:22', '2025-03-07 14:28:22'),
	(27, 17, 21, '2025-03-07 14:28:22', '2025-03-07 14:28:22'),
	(28, 15, 22, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(29, 19, 22, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(30, 21, 22, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(31, 20, 22, '2025-03-07 14:52:48', '2025-03-07 14:52:48'),
	(32, 22, 21, '2025-03-12 12:39:00', '2025-03-12 12:39:00'),
	(33, 16, 21, '2025-03-12 12:41:41', '2025-03-12 12:41:41');

-- Dumping structure for table nestjs_migrations.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opt_key` text NOT NULL,
  `opt_value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.settings: ~1 rows (approximately)
INSERT INTO `settings` (`id`, `opt_key`, `opt_value`, `created_at`, `updated_at`) VALUES
	(1, 'register_email_template', '<p>Chào bạn: <b>{fullname}</b>, {email}</p>\r\n<p>Vui lòng khám phá những tính năng tại đây</p>\r\n<p>Link kích hoạt của bạn là: {active_link}</p>\r\n<p>Thời hạn kích hoạt là 1 giờ</p>\r\n<p>Trân trọng!</p>', '2025-02-28 13:16:09', '2025-02-28 13:16:11');

-- Dumping structure for table nestjs_migrations.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `verify_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.users: ~53 rows (approximately)
INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `status`, `verify_at`, `created_at`, `updated_at`) VALUES
	(32, 'admin', 'admin@gmail.com', '$2b$10$8VIhz8k70zk/qzuelFeK7OZFK8IEmyZMFd3RT40ZV2odJAUcc.BZm', 1, '2025-02-15 13:09:03', '2025-02-15 13:09:03', '2025-02-15 13:09:03'),
	(33, 'Sabryna Rogahn', 'Annamae.Fritsch1@hotmail.com', '$2b$10$n0pTMQWYWKdNZKsbCcHNie9PMol9jXk0atcJiqpo5QLqr8Q0TSUjS', 0, '2025-02-15 13:09:03', '2025-02-15 13:09:03', '2025-02-15 13:09:03'),
	(34, 'Samantha Luettgen', 'Arthur_Olson@yahoo.com', '$2b$10$I820ojFe6rmNjfzun7X6k.AzdrOMSvsCENGYoeZPgM3LQZSPoYE6O', 0, '2025-02-15 13:09:03', '2025-02-15 13:09:03', '2025-02-15 13:09:03'),
	(35, 'Ebba Sanford', 'Cleve.Monahan@yahoo.com', '$2b$10$WA3zQOS3vIm0C6W6edjMG.A.4xj836W9JFYgp9wL9ZvSKrPBbcsbe', 1, '2025-02-15 13:09:03', '2025-02-15 13:09:03', '2025-02-15 13:09:03'),
	(36, 'Roberta Shields', 'Keshawn94@hotmail.com', '$2b$10$NV2ktdKknLQxF82w1TNRsuQgXGpZsFHR41KX24VaCwJyVmQj5HJoG', 0, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(37, 'Consuelo Steuber', 'Carmella45@hotmail.com', '$2b$10$KQgfKVMMsl/hdb3rW3.fjOELXZwTY.JtcoZxp2OdvXu0/rY0OBJ2C', 1, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(38, 'Leopoldo Von', 'Saul.Grimes94@gmail.com', '$2b$10$B.9bvTkPIAKoUxwIlb5p5e5quVl1.DenZtOA.n8i6U.Dt2c1Y7vnq', 1, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(39, 'Jermaine Kunze', 'Meghan.Dickens44@yahoo.com', '$2b$10$UmdWDz8JxkgqlR0I2UTQd.YRodkizdSJX0KcFTyY3yYZNq138ePSe', 0, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(40, 'Esther Mertz', 'Aurore78@yahoo.com', '$2b$10$dBEWI47r57o2SZopKczkW.74zk2rrothMYnjZTBrT1UBH/hzmVcLW', 1, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(41, 'Lilly Kirlin', 'Alysha_Toy62@yahoo.com', '$2b$10$gLKqz7AVwn6esv2Y9Hd8ZeMO8lRYeyhS4GiW6sQq6zRIvPtubbEeO', 1, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(42, 'Pete Dare', 'Elbert91@hotmail.com', '$2b$10$ku4byibOOrmxS2BJJxS6leXn/qfqgJ44XUDFmeoaLzuzfET/eJ3C.', 0, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(43, 'Oleta Goodwin', 'Carleton.Carroll@gmail.com', '$2b$10$gQvWrle37s9UxLDjBj8UQeQDKTHC9sOTQmoGpKISf2FzyFSjioZ3K', 0, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(44, 'Kaitlyn Runte', 'Bryon.Hammes@hotmail.com', '$2b$10$Imri2CIgHtbOgb6TnK3gcubRczNHr8.dk0HDqt9BtwSr29n8S.KtC', 1, '2025-02-15 13:09:04', '2025-02-15 13:09:04', '2025-02-15 13:09:04'),
	(45, 'Destinee Borer', 'Margarete_Balistreri@yahoo.com', '$2b$10$kF42D1KolUfSM.rX.N2OWuYSe72AGi7RGEud0c0KXC.kZ/7WreLLa', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(46, 'Friedrich Gusikowski', 'Elijah_Hauck@gmail.com', '$2b$10$q8qG/S2T4ub9dWKnQukCmOQbtuadL7SuCFds7B20.veQ8OWd2WHl2', 0, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(47, 'Sheridan Mann', 'Greg.Boyle58@yahoo.com', '$2b$10$VpUOzTlHd5GTV5SIb94QmOhoYGxEjUzbGaIIP6JxvJNps/y45GUXq', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(48, 'Daija Crooks', 'Nayeli_Gleichner@gmail.com', '$2b$10$/AqLeFvVr8veAcPRyrBOXuABexqK.qfaz25zYA3sqTt0VAjIGhHaW', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(49, 'Kathryne Hirthe', 'Diego.Konopelski19@gmail.com', '$2b$10$ARngVUof2iDhqRSD1CRRYOhUJD4OK5bHR5dsrTdcbzJMmO2VT2gmy', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(50, 'Niko Weimann', 'Troy.Medhurst@gmail.com', '$2b$10$M6/J5EP.FQ6vBML4EeCDweawIH5XKR.H6Z1iniea2RBKYKSJiGViC', 0, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(51, 'Gerardo Stracke', 'Greyson.Schroeder37@gmail.com', '$2b$10$HGUrf1Yw2eKZt8j9k10kheJXEGnpy8YBwygOqNWM/ZgVl3TdycaRS', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(52, 'Keara Berge', 'Andre64@gmail.com', '$2b$10$Zw6efp1Dx939.neiH9tnVex67WaoQ7b5YxIDnJxPwl/1FK1yM5QjK', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(53, 'Estel Durgan', 'Delmer_Reilly82@hotmail.com', '$2b$10$gHieGns2lwieARdwYNIbbuCo6r8mewdDNeWG8z0qYyOk/9FYLnMne', 0, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(54, 'Jacinthe Feest', 'Tressie_Zboncak@gmail.com', '$2b$10$AF996bEAOIiDuxgEuHKiVOnnnb1.v2BS/SkGBz8OZOUbroZ943aAe', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(55, 'Aimee Block', 'Hailie56@hotmail.com', '$2b$10$AImcSEJ7G/PGr5QJYsM5yuDyZdPxDkJwIXShMfPZwc79ixOyyJBFG', 0, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(56, 'Henri West', 'Foster_Lehner@gmail.com', '$2b$10$BLqcf/qaksu1/BdL9PshBuHHGIJ1F1IFljG.b7MT2duxKdWOXsEsi', 1, '2025-02-15 13:09:05', '2025-02-15 13:09:05', '2025-02-15 13:09:05'),
	(57, 'Kailee Johnson', 'Sister.Boyer74@gmail.com', '$2b$10$nwfmuAyHlTHHizv5JHzCdOslReGwVhfeYpBcwv5EoTc0nQORpxLUq', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(58, 'Tyrese Stoltenberg', 'Liana.Stehr13@gmail.com', '$2b$10$haH617vfbmxwMQsJWhd7weGhiMuRaJHSCamNXjY4SbcJSHekePYdy', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(59, 'Aiyana Lockman', 'Bethany_Zieme@hotmail.com', '$2b$10$pxNGJ20IefZttW/6zu5eZ.8qKBh2.pp5o.zTZuHO6O1e9l/ukDlxW', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(60, 'Julian Mohr', 'Jacques42@gmail.com', '$2b$10$CZWJWlP3VwTTiyATFeksrOBPPgfUJzNzZjzTw/FSS5QEq7f8Wbcvu', 1, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(61, 'Remington Considine', 'Isac_Pacocha37@yahoo.com', '$2b$10$ZDaY4p4XQbtNwbd3HUkfbeCs3P6FEg8rKz4nHZsKTvam/yt9JNPti', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(62, 'Aurelia Upton', 'Tom.Romaguera37@yahoo.com', '$2b$10$uadquD1DSH88.GZ/R3e2hOn.RT.sbT84VEGSW/mXuiKwVuRBupKZS', 1, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(63, 'Garett Ziemann', 'Merl_Wilkinson@yahoo.com', '$2b$10$/mah8.e3coQHiLy.dlBgMOHjwGcqf5bAROG1kchHfq5JVLJkZoAqG', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(64, 'Kenneth Thompson', 'Rod.Haley87@gmail.com', '$2b$10$0Kar4ZjENmPwJXqkv.bjCOyN0BFELgUYCciAXEZRd1MItMiv.6Jm2', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(65, 'Mae Cremin', 'Brayan.Hane@yahoo.com', '$2b$10$hy5CNuO6NeQZ.jUy2AtOLuDxZ8rnCt8ku2Ydd/CkSpEv4FsT5.fbS', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(66, 'Terrence Skiles', 'Eliseo.Gutmann@hotmail.com', '$2b$10$8aEXeEzApMllO.yk7FFG3ufqjmiaFFivbHF0mgWuJHUJrD4QqgE5e', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(67, 'Romaine Morissette', 'Amalia.Cole51@yahoo.com', '$2b$10$SS3mBJOZr0ucxbz55k3ET.2NQiccH6uSFID66pOn/u.a1FKhqGGAe', 0, '2025-02-15 13:09:06', '2025-02-15 13:09:06', '2025-02-15 13:09:06'),
	(68, 'Asia Spencer', 'Daphnee_Sauer@hotmail.com', '$2b$10$2yKTbaI.Q1U2PUiA6U6cXeq9.gQdH2KkYkYwXSWCbjX5ddRcf/xQK', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(69, 'Selina Schmeler', 'Alex74@yahoo.com', '$2b$10$fQ5idq5Z6dzgEsUhBWcZx.GupPFitwD/7DrebLq0Gc3ApcDHdczHC', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(70, 'Paige Considine', 'Jude.Nicolas71@hotmail.com', '$2b$10$nYBdfjqJww9d1w.xbpjKuOHR3tUBwDpwi6v26uAXUwoR/4MmP3Jmu', 1, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(71, 'Kayleigh Stiedemann', 'Rick_Smitham@yahoo.com', '$2b$10$w7NF5LD5O6tPP4qepKnGROtya8knqVEzTyY58OgBJ75SdbPPV9aMe', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(72, 'Santiago Purdy', 'Stuart11@hotmail.com', '$2b$10$vHggXpdjCoBlwms3q8uKA.jTSKSXMirXSvrmsR1viFuTl2s/uEbqe', 1, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(73, 'Jocelyn Shanahan', 'Terence25@yahoo.com', '$2b$10$14L7kSkpJWlToEgFYmsIzu7fFxdpwbcHeNi3/aXcTmZzJRCoCEqxW', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(74, 'Angeline Russel', 'Beryl_Langworth39@hotmail.com', '$2b$10$m00RD/iDv.5YwFEZZxutL.wsYvecsnwefRguPxgK.yJIPE1Xl6Cwq', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(75, 'Vance Koch', 'Mandy_Smitham@yahoo.com', '$2b$10$PA6Kw07N10U/Rb06Tmf/ru8mSg6vARUYpQdCD3GnNQa47yO86uuNq', 1, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(76, 'Kallie Morissette', 'Stephan.Parker@hotmail.com', '$2b$10$VhT5R3cEV9DR58Z7CUUYmuxz1ipB8b9Brxr/wwBDRO.3EWs5zKMo.', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(77, 'Ally Johnson', 'Johnson_McCullough94@yahoo.com', '$2b$10$/ZytuCgWi7gLw2ET/9Ahtu9HFxl81a1tmrDq1xVeOSJMQvuY8dD36', 0, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(78, 'Meghan Hartmann', 'Yoshiko.Jaskolski31@gmail.com', '$2b$10$3a.O024ANkYAOnfg6uzzw.Fsjbuxdwxqjk/SdUtKmskLfOWCu7iXu', 1, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(79, 'Audrey Ledner', 'Hayden_Gorczany@gmail.com', '$2b$10$SAMl0wouNSwQwrlSTapR4uuKJydGETyqVW8pDUh8a/x/bMWcMXLhi', 1, '2025-02-15 13:09:07', '2025-02-15 13:09:07', '2025-02-15 13:09:07'),
	(80, 'Reyes West', 'Della5@hotmail.com', '$2b$10$uxeIlUy6Qis0Wieq/63ElOVHno9FFzGRzqj4fw7Sxrp2vkFwV5Rfa', 0, '2025-02-15 13:09:08', '2025-02-15 13:09:08', '2025-02-15 13:09:08'),
	(81, 'Jeanie Cummings', 'Omer_Graham22@yahoo.com', '$2b$10$BtD6mrNGKIoojy9xKobDrO0AULzshhvViQ2x7Ceboj2YNSMr9oDJG', 0, '2025-02-15 13:09:08', '2025-02-15 13:09:08', '2025-02-15 13:09:08'),
	(82, 'Magnolia Denesik', 'Korey.Volkman@hotmail.com', '$2b$10$95tufabAL7RKtc8cGBwNg.P4t.oGDTgFcxab6YE4AYX6jHKgIWzeC', 0, '2025-02-15 13:09:08', '2025-02-15 13:09:08', '2025-02-15 13:09:08'),
	(84, 'Hoàng An Unicode', 'hoangan.web@gmail.com', NULL, 1, '2025-02-21 13:44:44', '2025-02-21 13:44:44', '2025-02-21 13:44:44'),
	(85, 'Unicode Academy', 'contact@unicode.vn', NULL, 1, '2025-02-21 14:24:18', '2025-02-21 14:24:19', '2025-02-21 14:24:19');

-- Dumping structure for table nestjs_migrations.users_courses
CREATE TABLE IF NOT EXISTS `users_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `users_courses_user_id_foreign` (`user_id`),
  KEY `users_courses_course_id_foreign` (`course_id`),
  CONSTRAINT `users_courses_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_courses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.users_courses: ~0 rows (approximately)

-- Dumping structure for table nestjs_migrations.users_permissions
CREATE TABLE IF NOT EXISTS `users_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `users_permissions_permission_id_foreign` (`permission_id`),
  KEY `users_permissions_user_id_foreign` (`user_id`),
  CONSTRAINT `users_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.users_permissions: ~0 rows (approximately)

-- Dumping structure for table nestjs_migrations.users_roles
CREATE TABLE IF NOT EXISTS `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `users_role_user_id_foreign` (`user_id`),
  KEY `users_role_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_role_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table nestjs_migrations.users_roles: ~2 rows (approximately)
INSERT INTO `users_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
	(2, 32, 21, '2025-03-07 14:49:56', '2025-03-07 14:49:56'),
	(3, 32, 22, '2025-03-07 14:53:04', '2025-03-07 14:53:04');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
