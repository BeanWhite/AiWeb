create table service(
	service_id int not null primary key auto_increment,
	service_type char(20) not null,
	creator_id int not null,
	creator_name char(50) not null,
	customer_id int not null,
	customer_name char(50) not null,
	create_time date not null,
	belong int,
	dispatch_time date,
	service_status char(20)
);