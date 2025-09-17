CREATE DATABASE IF NOT EXISTS unipr;
USE unipr;

CREATE TABLE users (
	id INT AUTO_INCREMENT UNIQUE,
    user_id VARCHAR(64) UNIQUE,
	nome VARCHAR(32),
	cognome VARCHAR(32),
	email VARCHAR(64),
	password VARCHAR(64),
    PRIMARY KEY (id, user_id)
);

INSERT INTO users (user_id, nome, cognome, email, password) VALUES
('5548632771', 'nome_prof_1', 'cognome_prof_1', 'prof_1_nome_cognome@email.com', '$2y$10$Vh4B/3pdqaG7IIAZCfd0EOKjT7Hle8nE/zt/uURosQmnwvb48GP2y'),
('17588963', 'nome_prof_2', 'cognome_prof_2', 'prof_2_nome_cognome@email.com', '$2y$10$Vh4B/3pdqaG7IIAZCfd0EOKjT7Hle8nE/zt/uURosQmnwvb48GP2y'),
('1772368455', 'nome_prof_3', 'cognome_prof_3', 'prof_3_nome_cognome@email.com', '$2y$10$Vh4B/3pdqaG7IIAZCfd0EOKjT7Hle8nE/zt/uURosQmnwvb48GP2y'),
('36988571', 'nome_prof_4', 'cognome_prof_4', 'prof_4_nome_cognome@email.com', '$2y$10$Vh4B/3pdqaG7IIAZCfd0EOKjT7Hle8nE/zt/uURosQmnwvb48GP2y'),
('1937826450', 'nome_prof_5', 'cognome_prof_5', 'prof_5_nome_cognome@email.com', '$2y$10$Vh4B/3pdqaG7IIAZCfd0EOKjT7Hle8nE/zt/uURosQmnwvb48GP2y');

/* Password = 12345 */