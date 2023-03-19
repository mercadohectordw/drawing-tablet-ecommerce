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
    `price` DECIMAL(8, 2) NOT NULL,
    `main_image` VARCHAR(255),
    `category_id` INT NOT NULL,
    `inventory` INT NOT NULL,
    `sales` INT NOT NULL DEFAULT 0,
    `active` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)    
);

CREATE TABLE `product_image`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `product_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

CREATE TABLE `cart` (
    `user_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `cart_item` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `cart_id` INT NOT NULL, 
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL, 
    PRIMARY KEY (`id`),
    FOREIGN KEY (`cart_id`) REFERENCES `cart` (`user_id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

CREATE TABLE `order` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `total` DECIMAL(8, 2) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `shipped` BOOLEAN NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `order_item` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL, 
	`product_id` INT NOT NULL, 
    `quantity` INT NOT NULL,
    `price_per_unit` DECIMAL(8, 2) NOT NULL,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

CREATE TABLE `shipping_address` (
	`order_id` INT NOT NULL,
    `address_line` VARCHAR(255) NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `province` VARCHAR(200) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `postal_code` VARCHAR(8) NOT NULL,
	`mobile` VARCHAR(14) NOT NULL,
	PRIMARY KEY (`order_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
);
