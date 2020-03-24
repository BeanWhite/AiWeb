CREATE TABLE ai_scale (
	ai_scale_id INTEGER,
	ai_scale_name VARCHAR ( 40 ) ,
	ai_scale_overview VARCHAR ( 5000 ),
	ai_scale_notice varchar(5000),
	PRIMARY KEY ( ai_scale_id ) 
);
CREATE TABLE ai_test (
	ai_scale_id INTEGER,
	ai_question_id INTEGER,
	ai_question_content VARCHAR ( 8000 ) ,
	ai_question_option VARCHAR ( 1000 ),
	ai_question_answer VARCHAR ( 500 ),
	ai_question_img mediumblob,
	ai_question_type VARCHAR ( 100 ) ,
	ai_question_score VARCHAR ( 100 ),
	ai_question_notice varchar(1000),
	ai_question_guid varchar(1000),
	ai_question_answer_describe varchar(1000),
	ai_score_method_name varchar(40),
	ai_score_method varchar(2000),
	ai_scale_name varchar(255)
	FOREIGN KEY ( ai_scale_id) REFERENCES ai_scale ( ai_scale_id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	primary key (ai_scale_id,ai_question_id,ai_score_method_name)
);
