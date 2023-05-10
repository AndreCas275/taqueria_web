drop DATABASE pedidos;
CREATE DATABASE pedidos;

USE pedidos;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

DESCRIBE users;

CREATE TABLE ordenes (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre_ordenes VARCHAR(60) NOT NULL,
  pedido_ordenes VARCHAR(60) NOT NULL,
  catidad_ordenes INT(11) NOT NULL,
  papas_ordenes VARCHAR(60) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  tiempoAtras INT(60),
  PRIMARY KEY(id),
  KEY user_idx (user_id)
);

DESCRIBE ordenes;
