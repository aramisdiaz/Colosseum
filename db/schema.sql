--drop db if exists, create db, use db
DROP DATABASE IF EXISTS colosseum_db;
CREATE DATABASE colosseum_db;
USE colosseum_db;

-- create weapon and accessories table with id/primary key
CREATE TABLE Weapons (id SERIAL PRIMARY KEY, name varchar(100), attribute varchar(100), element varchar(100));
CREATE TABLE Accessories(id SERIAL PRIMARY KEY, name varchar(100), attribute varchar(100), element varchar(100));

