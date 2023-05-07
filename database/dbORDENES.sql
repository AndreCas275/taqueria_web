drop DATABASE pedidos;
CREATE DATABASE pedidos;

USE pedidos;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

SELECT * FROM users;

DESCRIBE users;

CREATE TABLE ordenes (
  id INT(11) NOT NULL,
  nombre_ordenes VARCHAR(60) NOT NULL,
  pedido_ordenes VARCHAR(60) NOT NULL,
  catidad_ordenes INT(11) NOT NULL,
  papas_ordenes VARCHAR(60) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  tiempoAtras INT(60),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE ordenes ADD PRIMARY KEY (id);
ALTER TABLE ordenes MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

DESCRIBE ordenes;

CREATE TABLE thinks(
    id_thi int(11) NOT NULL,
    created_at_thi TIMESTAMP NOT NULL DEFAULT current_timestamp,
    description_thi text,
    user_id_thi int(11),
    CONSTRAINT fk_user_thi FOREIGN KEY(user_id_thi) REFERENCES users(id)
);

ALTER TABLE thinks ADD PRIMARY KEY(id_thi);
ALTER TABLE thinks MODIFY id_thi int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

describe thinks;

SELECT 
  CASE 
    WHEN id = (SELECT MIN(id) FROM ordenes) THEN "Es el primer elemento"
    ELSE "No es el primer elemento"
  END as es_primer_elemento
FROM ordenes;

SELECT NULLIF(COUNT(*), 0) as tabla_vacia FROM ordenes;

INSERT INTO thinks (description_thi, user_id_thi) 
VALUES ('lalalalala', 1);
INSERT INTO ordenes (nombre_ordenes, pedido_ordenes, catidad_ordenes, papas_ordenes, user_id) 
VALUES ('Esteban', 'Tostadas de Cochinita', 5, 'Con papas', 1);
INSERT INTO ordenes (id, nombre_ordenes, pedido_ordenes, catidad_ordenes, papas_ordenes, user_id) 
VALUES (7, 'Esteban', 'Tostadas de Cochinita', 5, 'Con papas', 1);
INSERT INTO ordenes (id, nombre_ordenes, pedido_ordenes, catidad_ordenes, papas_ordenes, user_id) 
VALUES (8, 'Esteban', 'Tostadas de Cochinita', 5, 'Con papas', 1);
INSERT INTO ordenes (id, nombre_ordenes, pedido_ordenes, catidad_ordenes, papas_ordenes, user_id) 
VALUES (9, 'Esteban', 'Tostadas de Cochinita', 5, 'Con papas', 1);
INSERT INTO ordenes (id, nombre_ordenes, pedido_ordenes, catidad_ordenes, papas_ordenes, user_id) 
VALUES (10, 'Esteban', 'Tostadas de Cochinita', 5, 'Con papas', 1);

SELECT id AS id_tiempo,TIMESTAMPDIFF(SECOND, created_at, NOW()) AS time_diff_seconds FROM ordenes WHERE user_id=1;
SELECT * FROM ordenes WHERE user_id=1 LIMIT 1;
SELECT * FROM ordenes WHERE user_id=1 LIMIT 1, 1;

UPDATE ordenes SET tiempoAtras =  WHERE id=;

SELECT * FROM ordenes WHERE user_id = 1 ORDER BY created_at DESC LIMIT 1;

UPDATE ordenes SET tiempoAtras=? WHERE user_id =? ORDER BY created_at DESC LIMIT 1;

UPDATE ordenes SET tiempoAtras = TIMESTAMPDIFF(SECOND, created_at, NOW()) where id=? AND id_user=?;
