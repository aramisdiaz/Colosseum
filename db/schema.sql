CREATE DATABASE colosseum;
USE colosseum;

    CREATE TABLE weapon (
    id INT AUTO_INCREMENT NOT NULL,
    weapon_name VARCHAR(45) NOT NULL,
    attribute VARCHAR(45) NOT NULL,
    element VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);

    CREATE TABLE accessory (
    id INT AUTO_INCREMENT NOT NULL,
	accessory_name VARCHAR(45) NOT NULL,
    attribute VARCHAR(45) NOT NULL,
    element VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

    CREATE TABLE attributes (
    id INT AUTO_INCREMENT NOT NULL,
    attack INT(10) NOT NULL,
    defense INT(10) NOT NULL,
    vigor INT(10) NOT NULL,
    agility INT(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE characters (
    id INT NOT NULL AUTO_INCREMENT,
    character_name VARCHAR(45) NOT NULL,
    pic VARCHAR(999) NOT NULL,
    attributes_id INT NOT NULL,
    weapon_id INT NOT NULL,
    accessory_id INT NOT NULL,
    champ BOOLEAN DEFAULT FALSE NOT NULL,

    PRIMARY KEY(id),
    INDEX (attributes_id),
    INDEX (weapon_id),
    INDEX (accessory_id),

    FOREIGN KEY (attributes_id)
      REFERENCES attributes(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,

    FOREIGN KEY (weapon_id)
      REFERENCES weapon(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
      
	FOREIGN KEY (accessory_id)
      REFERENCES accessory(id)
      ON UPDATE CASCADE ON DELETE RESTRICT
);

