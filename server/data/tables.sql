create database bank;
use bank;
create table users(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    balance int
);
create table categories(name varchar(255) PRIMARY KEY);
create table transactions(
    transaction_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    amount int,
    category_name varchar(255),
    details varchar(512),
    vendor varchar(255),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_name) REFERENCES categories(name)
);