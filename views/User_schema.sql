CREATE TABLE `usermanagement_t`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `First_Namr` VARCHAR(45) NOT NULL ,
    `Last_name` VARCHAR(45) NOT NULL , 
    `Email` VARCHAR(45) NOT NULL , 
    `Git_link` VARCHAR(45) NOT NULL , 
    `comments` TEXT NOT NULL , 
    `status` VARCHAR(10) NOT NULL DEFAULT 'active' 
    ) ENGINE = InnoDB;