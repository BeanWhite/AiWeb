CREATE TABLE `ai_test_result` (
`ai_user_id` char(20) NOT NULL,
`ai_scale_id` int(20) NOT NULL,
`ai_test_name` varchar(255) NULL,
PRIMARY KEY (`ai_user_id`, `ai_scale_id`) 
);
CREATE TABLE `ai_test_img` (
`ai_img_id` char(20) NOT NULL,
`ai_img_src` varchar(1000) NOT NULL,
`ai_img_content` mediumtext NULL,
`ai_report_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
`ai_scale_id` int(11) NOT NULL,
PRIMARY KEY (`ai_img_id`, `ai_img_src`, `ai_report_time`) 
);
CREATE TABLE `ai_test_html` (
`ai_report_text_id` char(20) NOT NULL,
`ai_report_text_html` mediumtext NULL,
`ai_report_text_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
`ai_doc_id` char(20) NULL,
`ai_doc_name` char(20) NULL,
`ai_scale_id` int(20) NULL,
PRIMARY KEY (`ai_report_text_time`, `ai_report_text_id`) 
);
CREATE TABLE `ai_test_history` (
`ai_user_id` char(20) NOT NULL,
`ai_scale_id` int(20) NOT NULL,
`ai_test_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
`ai_scale_name` char(100) NULL,
`ai_doc_id` char(20) NULL,
`ai_doc_name` char(20) NULL,
PRIMARY KEY (`ai_user_id`, `ai_scale_id`, `ai_test_time`) 
);

ALTER TABLE `ai_test_img` ADD CONSTRAINT `ai_img_id` FOREIGN KEY (`ai_img_id`) REFERENCES `ai_test_result` (`ai_user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `ai_test_html` ADD CONSTRAINT `ai_report_text_id` FOREIGN KEY (`ai_report_text_id`) REFERENCES `ai_test_result` (`ai_user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `ai_test_history` ADD CONSTRAINT `ai_user_id` FOREIGN KEY (`ai_user_id`) REFERENCES `ai_test_result` (`ai_user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `ai_test_history` ADD CONSTRAINT `ai_scale_id` FOREIGN KEY (`ai_scale_id`) REFERENCES `ai_test_result` (`ai_scale_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `ai_test_html` ADD CONSTRAINT `scale_id1` FOREIGN KEY (`ai_scale_id`) REFERENCES `ai_test_result` (`ai_scale_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `ai_test_img` ADD CONSTRAINT `scale_id2` FOREIGN KEY (`ai_scale_id`) REFERENCES `ai_test_result` (`ai_scale_id`) ON DELETE CASCADE ON UPDATE CASCADE;

