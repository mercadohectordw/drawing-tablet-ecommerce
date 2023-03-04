CREATE DATABASE drawing_tablet_ecommerce;

USE drawing_tablet_ecommerce;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `admin`(
	`user_id` INT NOT NULL,
    PRIMARY KEY (`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `category`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(511),
    PRIMARY KEY (`id`)
);

CREATE TABLE `product`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(1023),
    `price` DECIMAL(10, 0) NOT NULL,
    `main_image` VARCHAR(255),
    `category_id` INT NOT NULL,
    `inventory` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)    
);

CREATE TABLE `product_image`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `url` INT NOT NULL,
    `product_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);
