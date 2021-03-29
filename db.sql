create table user(id INTEGER AUTO_INCREMENT,
name VARCHAR(50) not null,
email VARCHAR(50) NOT NULL, 
password VARCHAR(200) NOT NULL, 
role VARCHAR(30),
primary key(id))ENGINE=InnoDB;

CREATE TABLE Mentors (
	`mid` INT NOT NULL,
	`firstname` VARCHAR(50) NOT NULL,
	`lastname` VARCHAR(50) NOT NULL,
	`Aoe` VARCHAR(150) NOT NULL,
	`Occupation` VARCHAR(150) NOT NULL,
	`Company` VARCHAR(150) NOT NULL,
	`Linkedin_url` VARCHAR(200) NOT NULL,
	`Profile_url` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`mid`)
) ENGINE=InnoDB;

create table user_info(
	user_id int, 
	Fname varchar(20),
	Lname varchar(20),
	dob date,status varchar(20),
	expertise varchar(40),
	occupation varchar(40),
	email varchar(20),
	linkedin varchar(40),
	profile_link varchar(40),
	wish varchar(40));