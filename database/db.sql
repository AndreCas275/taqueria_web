DROP DATABASE database_links;
CREATE DATABASE database_links;
use database_links;

CREATE TABLE users(
    id_use int(11) NOT NULL,
    username_use VARCHAR(16) NOT NULL,
    password_use VARCHAR(60) NOT NULL,
    fullname_use VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY(id_use);
ALTER TABLE users MODIFY id_use int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

describe users;

CREATE TABLE links(
    id_lin int(11) NOT NULL,
    title_lin VARCHAR(160) NOT NULL,
    url_lin VARCHAR(255) NOT NULL,
    description_lin text,
    user_id_lin int(11),
    created_at_lin TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user_lin FOREIGN KEY(user_id_lin) REFERENCES users(id_use)
);

ALTER TABLE links ADD PRIMARY KEY(id_lin);
ALTER TABLE links MODIFY id_lin int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

describe links;

CREATE TABLE thinks(
    id_thi int(11) NOT NULL,
    created_at_thi TIMESTAMP NOT NULL DEFAULT current_timestamp,
    description_thi text,
    user_id_thi int(11),
    CONSTRAINT fk_user_thi FOREIGN KEY(user_id_thi) REFERENCES users(id_use)
);

ALTER TABLE thinks ADD PRIMARY KEY(id_thi);
ALTER TABLE thinks MODIFY id_thi int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

describe thinks;