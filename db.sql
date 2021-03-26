create table user(id INTEGER AUTO_INCREMENT,
name VARCHAR(50) not null,
email VARCHAR(50) NOT NULL, 
password VARCHAR(200) NOT NULL, 
role VARCHAR(30),
primary key(email))ENGINE=InnoDB;