-- 创建管理员表	8
CREATE TABLE ai_admin (
	ai_admin_id VARCHAR ( 11 ),
	ai_admin_pwd VARCHAR ( 16 ),
	ai_admin_unit VARCHAR ( 40 ),
	ai_admin_department VARCHAR ( 40 ),
	ai_admin_name VARCHAR ( 12 ),
	ai_admin_limit INTEGER,
	ai_user_type VARCHAR ( 12 ),
	ai_id_card VARCHAR ( 20 ),
	PRIMARY KEY ( ai_admin_id, ai_admin_department ) 
);--
-- 创建医生账户表	13
CREATE TABLE ai_doc (
	ai_doc_id VARCHAR ( 11 ),
	ai_doc_pwd VARCHAR ( 16 ),
	ai_doc_age INTEGER,
	ai_doc_sex VARCHAR ( 2 ) CHECK ( ai_doc_sex = '男' OR ai_doc_sex = '女' ),
	ai_doc_name VARCHAR ( 12 ),
	ai_doc_unit VARCHAR ( 40 ),
	ai_doc_department VARCHAR ( 40 ),
	ai_doc_phone VARCHAR ( 12 ),
	ai_doc_superior_id VARCHAR ( 11 ),
	ai_doc_patient_num INTEGER,
	ai_doc_photo VARCHAR ( 60 ),
	ai_user_type VARCHAR ( 12 ),
	ai_id_card VARCHAR ( 20 ),
	PRIMARY KEY ( ai_doc_id ),
	FOREIGN KEY ( ai_doc_superior_id, ai_doc_department ) REFERENCES ai_admin ( ai_admin_id, ai_admin_department ) ON DELETE 
	SET NULL ON UPDATE CASCADE 
	);
--
create table ai_user(
ai_user_id varchar(11) primary key,
ai_user_pwd varchar(16),
ai_user_type varchar(16)
)


--
--
create table ai_user_msg(
ai_user_id varchar(11) PRIMARY KEY,
ai_user_patient_number varchar(20),
ai_user_department varchar(40),
ai_user_photo varchar(60),
ai_doc_name varchar(12),
ai_user_id_num varchar(20),
ai_user_office varchar(40),
ai_user_from varchar(40),
ai_user_qq varchar(14),
ai_user_phone varchar(14),
ai_user_email varchar(24),
ai_user_emergency_con_phone varchar(14),
ai_user_home varchar(40),
ai_user_address varchar(40),
ai_user_emergency_con_name varchar(12),
ai_user_age INTEGER,
ai_user_sex varchar(8),
ai_user_name varchar(12),
ai_user_nation varchar(8),
ai_user_native_place varchar(40),
ai_user_edu_bg varchar(12),
ai_user_politics_status varchar(12),
ai_user_health_con varchar(12),
ai_user_height float,
ai_user_weight FLOAT,
ai_user_birth date,
ai_user_unit varchar(40),
ai_user_marriage varchar(8),
ai_user_profession varchar(14),
ai_user_trade varchar(20),
ai_user_duty varchar(16),
ai_user_ai_user_abilityname varchar(16),
ai_user_blood_type varchar(8),
ai_user_children varchar(8),
ai_user_parents varchar(8),

FOREIGN KEY ( ai_user_id ) REFERENCES ai_user ( ai_user_id ) on delete cascade on update cascade
)

