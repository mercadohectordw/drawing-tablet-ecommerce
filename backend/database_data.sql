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
    `description` VARCHAR(2047),
    `price` DECIMAL(8, 2) NOT NULL,
    `main_image` VARCHAR(511),
    `category_id` INT NOT NULL,
    `inventory` INT NOT NULL,
    `sales` INT NOT NULL DEFAULT 0,
    `active` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)    
);

CREATE TABLE `product_image`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(511) NOT NULL,
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

INSERT INTO `users` VALUES
(1, "Admin", "Example", "admin@gmail.com", "25f9e794323b453885f5181f1b624d0b", "2023-01-05 13:51:30"),
(2, "User", "Example", "user@gmail.com", "25f9e794323b453885f5181f1b624d0b", "2023-01-06 15:51:30"),
(3, "Josh", "Johnson", "josh@gmail.com", "25f9e794323b453885f5181f1b624d0b", "2023-03-05 11:25:10"),
(4, "Evelyn", "Degennaro", "evelyn@gmail.com", "25f9e794323b453885f5181f1b624d0b", "2023-03-20 10:15:35");

INSERT INTO `admin` VALUES
(1),(4);

INSERT INTO `category` VALUES
(1, "Pen Tablet", "desc"),
(2, "Pen Display", "desc"),
(3, "Accessory", "desc");

INSERT INTO `product` VALUES
(1, "Huion Inspiroy H1060p", "HUION H1060P with 16 Customized Soft Keys and 12 Customized Press Keys, producing a variety of different combinations of shortcuts; You can set any function for them according to your operating habit and preference. ", 54.00, "https://www.huion.com/statics/hw/site/img/h1060p-header-pic.jpg", 1, 100, 0, 1),
(2, "Huion Inspiroy H640P", "Bundle includes the Huion drawing glove. This easy-to-use pen tablet is perfect for kids and beginners for drawing，animation，photo-editing or design work in most programs including Adobe Photoshop, paint tool sai, illustrator, corel draw, corel painter, sketchbook, manga studio, clip studio paint, OSD and more. ", 45.00, "https://mz-image.s3.sa-east-1.amazonaws.com/catalog/Imagenes-Site/Sin_Marca/HUION/H640P/Inspiroy_H640P_1.jpg", 1, 49, 1, 1),
(3, "Wacom Intuos Small", "Customize Your Creative Process: The 4 ExpressKeys on the tablet are customizable to fit your style so you can program your favorite keyboard shortcuts and unlock your process and creativity.", 60.00, "https://wcm-cdn.wacom.com/-/media/images/products/pen-tablets/wacom-intuos/media-gallery/wacom-intuos-g7.jpg?h=640&iar=0&w=960&rev=fd981706cb8b4dcdaa7a6ef44d993764&hash=7CDE1DE862B3CE20E78AE2D12812446B", 1, 50, 0, 1),
(4, "Wacom Intuos Pro Medium", "Precision Graphics Tablet: Our professional Wacom Intuos utilizes trusted Pro Pen technology to allow for hours of image editing, illustration or design work.", 300.00, "https://www.lpnk.com.ar/Temp/App_WebSite/App_PictureFiles/Items/PTH660_800.jpg", 1, 50, 0, 0),
(5, "Wacom One Tablet", "Advanced Electro-Magnetic Pen Technology: Bring Your project and presentations to life with precision with pen technology matching your movement with precision for control and accuracy.", 45.00, "https://www.laeditorial.com.ar/16903-large_default/tablet-wacom-one-small-ctl472k1a.jpg", 1, 50, 0, 1),
(6, "Huion Kamvas Pro 24 4K UHD", "Pro-level Picture Quality: Enjoy the 4K UHD (3840x2160) resolution in a large 23.8 inch screen, which can effectively reduce the frequency of zoom in and out of the canvas and switch windows to highly increase the efficiency. Combined with full-laminated screen and 178° viewing angle, HUION Kamvas Pro 24 4K monitor can present you with clearer images and more details. ", 1200.00, "https://mytabletguide.com/wp-content/uploads/2021/08/huion-kamvas-pro-24-4k.jpg", 2, 50, 0, 1),
(7, "Huion Kamvas Pro 13", "Huion KAMVAS Pro 13 with 120% sRGB Color Gamut - Comes with 266 PPS Report Rate, you can have better performance and quicker response when working on the pen display; The drawing monitor cannot only provide users with a wider field of view, but also offering richer colors and more natural transition. ", 300.00, "https://www.huion.com/statics/hw/site/img/pro13_5_12.png", 2, 50, 0, 1),
(8, "Huion Kamvas 12", "Kamvas 12 is a creative pen display featuring a full-laminated and 1920x1080 full HD screen with vibrant color(16.7 million colors&120%s RGB), so you can see every detail of your creation clearly and vividly. The anti-glare film can provide you the most natural paper-feeling surface and prevents any unwanted distracting reflection.", 220.00, "https://www.huion.com/statics/hw/site/img/Kamvas12/kamvas12-canvas1-pic.png", 2, 50, 0, 1),
(9, "Wacom One 13.3", "High definition creative pen display designed for creative hobbyists, visual thinkers, and anyone needing a second screen or bigger digital canvas for work or play.", 320.00, "https://media.ldlc.com/r1600/ld/products/00/05/56/23/LD0005562372_2.jpg", 2, 50, 0, 1),
(10, "Wacom Cintiq Pro 16", " Wacom's most natural and advanced pen performance with 8,192 levels of pressure sensitivity, eraser and virtually lag free tracking. 4K resolution (3840 x 2160 pixels) is packed into a 16” LCD display with superb color accuracy (98% Adobe RGB).", 1600.00, "https://estorewacom.com.ar/136-large_default/wacom-cintiq-16.jpg", 2, 50, 0, 1),
(11, "Xp-pen Artist12", "XP-PEN’s latest smallest 1920x1080 HD display paired with 72% NTSC(100%SRGB) Color Gamut, presenting vivid images, vibrant colors and extreme detail for a stunning display of your artwork. Features a slim touch bar that can be programmed to zoom in and out on your canvas, scroll up and down, and more.", 180.00, "https://http2.mlstatic.com/D_NQ_NP_2X_797136-MLA40366073003_012020-V.webp", 2, 48, 2, 1),
(12, "Wacom Drawing Glove", "Exposed fingertip design allows user to access touchscreen capabilities and type with ease on a keyboard.", 9.99, "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71d3QN911ML.jpg", 3, 50, 0, 1),
(13, "Wacom Cintiq Adjustable Stand", " Variety of tilt angles from 19-68°. Anti-slip base for stability in use. Includes VESA FDMI (mis-d75) for use with a Display arm. Compatible with Wacom Cintiq 16 (DTK1660K0A), not compatible with Wacom Cintiq Pro 13 (DTH1320), Cintiq Pro 16 (DTH1620 / DTH167K0A), Cintiq Pro 24 (DTH2420K0 / DTK2420K0) or Cintiq 22 (DTK2200).", 75.50, "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/713OlgRB7TL.jpg", 3, 50, 0, 1),
(14, "Huion Adjustable Tablet Stand", "Universal Tablet Stand: Huion ST200 adjustable graphics tablet stand is suitable for Huion Kamvas Pro 16/Pro 12/Pro 13，Kamvas 16 and GT156HD V2. It also supports most tablet or laptops devices (for 15.6 inches and under), such as Wacom Cintiq 16, iPad Pro, Samsung notebook and so on.", 35.00, "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51B-FQ6hQSL._AC_UF894,1000_QL80_.jpg", 3, 50, 0, 1);

INSERT INTO `product_image` VALUES
(1, "https://www.huion.com/statics/hw/site/img/h1060p-visible-pic.jpg", 1),
(2, "https://ar.oneclickstore.com/wp-content/uploads/2022/11/H1060P_Inspiroy_Huion_Lifestyle2-1.jpg", 1),
(3, "https://images-na.ssl-images-amazon.com/images/I/31psVEnJsZL._AC_SX569_.jpg", 2),
(4, "https://http2.mlstatic.com/D_NQ_NP_957947-MLA52368064595_112022-O.jpg", 3),
(5, "https://www.huion.com/statics/hw/site/img/Kamvas-Pro-24(4K)/pro24-4k-ingenious-pic.png", 6),
(6, "https://www.huion.com/statics/hw/site/img/Kamvas-Pro-24(4K)/mobile/pro24-4k-especially-pic-mobile.jpg", 6),
(7, "https://ar.oneclickstore.com/wp-content/uploads/2022/11/Pro12_GT-116_Kamvas_Huion_Lifestyle_2-800x800.jpg", 8),
(8, "https://www.sintagmatecnologia.com.ar/Temp/App_WebSite/App_PictureFiles/Items/753218985491_800.jpg", 9);

INSERT INTO `cart` VALUES
(2, "2023-01-07 18:32:12");

INSERT INTO `cart_item` VALUES
(1, 2, 3, 1),
(2, 2, 12, 2);

INSERT INTO `order` VALUES
(1, 2, 43.00, "2023-01-06 20:16:12", 1),
(2, 3, 360.00, "2023-03-19 06:15:30", 0);

INSERT INTO `order_item` VALUES
(1, 1, 2, 1, 43.00),
(2, 2, 11, 2, 180.00);

INSERT INTO `shipping_address` VALUES
(1,"Street Example 123", "City Ex", "State", "Country 1", "Postal", "704-602-1414"),
(2,"4933 Snyder Avenue", "Charlotte", "North Carolina", "United States", "NC 28202", "704-602-1414");












