/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.53 : Database - lingvist
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`lingvist` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `lingvist`;

/*Table structure for table `ling_admin` */

DROP TABLE IF EXISTS `ling_admin`;

CREATE TABLE `ling_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机',
  `nickname` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `sex` varchar(11) DEFAULT '男',
  `role` varchar(255) DEFAULT '系统管理员',
  `status` int(11) DEFAULT '1' COMMENT '是否启用',
  `IsDeleted` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `ling_admin` */

insert  into `ling_admin`(`id`,`adminname`,`password`,`email`,`mobile`,`nickname`,`remark`,`sex`,`role`,`status`,`IsDeleted`) values (1,'admin','$2a$10$.sYBGi6R7ciOMQLVE.DzJuh0g9ZeSvtyG.aXCkeYLigegCM3PKf2q','1353115324@qq.com','15766694534','going','开心每一天','女','超级管理员',1,0),(2,'test','$2a$10$SNu0o/BvDisTmojXXADSDuisbaWAfT6dsanUjy930rEMX/2F/SgPi','142924523423@qq.com','15766602408','byebye~','也无风雨也无晴','男','超级管理员',0,0),(3,'amdin2','$2a$10$zF3dyXJwi/Q5DNRLdP6CeupZoHcV.nF9hZb8dfgLxetTOxiYF1Z66','2995228701@qq.com','15766639432','往事随云走','努力成为优秀的人','女','超级管理员',0,0);

/*Table structure for table `ling_foreign_courses` */

DROP TABLE IF EXISTS `ling_foreign_courses`;

CREATE TABLE `ling_foreign_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '外语名称',
  `introduce` varchar(255) DEFAULT NULL COMMENT '外语简介',
  `imgurl` varchar(255) DEFAULT NULL COMMENT '外语图片地址',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  `IsDeleted` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `ling_foreign_courses` */

insert  into `ling_foreign_courses`(`id`,`name`,`introduce`,`imgurl`,`status`,`IsDeleted`) values (1,'美语','用 中文学','America.jpg',1,0),(2,'日语','用 中文（繁体）学','Japen.jpg',1,0),(3,'法语','用 中文（简体）学','French.jpg',1,0),(4,'西班牙语','用 中文（简体）学','Spanish.jpg',1,0),(5,'巴西语','用中文（简体）学','Portuguese(BR).jpg',1,0),(6,'德语','用中文（简体）学','German.jpg',1,0),(7,'俄语','用中文（简体）学','Russian.jpg',1,0),(8,'爱沙尼亚语','用中文（简体）学','Essential_Estonian.jpg',1,0),(9,'意大利语','用英文学','Italian.jpg',1,1);

/*Table structure for table `ling_plan` */

DROP TABLE IF EXISTS `ling_plan`;

CREATE TABLE `ling_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_complete` int(11) DEFAULT '10' COMMENT '计划完成数',
  `complete` int(11) DEFAULT '0' COMMENT '实际完成数',
  `timeStamp` varchar(255) DEFAULT NULL COMMENT '时间戳（用于更新complete）',
  `sentence_plan` int(11) DEFAULT '5' COMMENT '句子_计划完成数',
  `sentence_complete` int(11) DEFAULT '0' COMMENT '句子_实际完成数',
  `sentence_timeStamp` varchar(255) DEFAULT NULL COMMENT '句子_时间戳（用于更新sentence_complete）',
  `belongs_user` int(11) DEFAULT NULL COMMENT '所属用户id',
  PRIMARY KEY (`id`),
  KEY `belongs_user` (`belongs_user`),
  CONSTRAINT `belongs_user` FOREIGN KEY (`belongs_user`) REFERENCES `ling_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `ling_plan` */

insert  into `ling_plan`(`id`,`plan_complete`,`complete`,`timeStamp`,`sentence_plan`,`sentence_complete`,`sentence_timeStamp`,`belongs_user`) values (1,10,0,'1661993178.758',5,0,'1660977220.31',1),(2,50,0,'1681362754.889',5,0,'1660977225.368',2),(3,45,0,'1660977202.395',5,0,NULL,3),(4,30,0,'1660977205.2',5,0,NULL,4),(5,10,8,'1660977187.814',5,0,NULL,5),(6,10,5,NULL,5,0,NULL,6),(7,10,7,'1660620831.367',5,0,NULL,7),(8,10,0,NULL,0,0,NULL,8),(9,10,0,NULL,5,0,NULL,9),(10,10,0,NULL,5,0,NULL,10),(12,10,5,'1660964823.44',5,0,NULL,11),(13,10,0,NULL,5,0,NULL,12),(14,10,0,NULL,5,0,NULL,13),(15,10,0,NULL,5,0,NULL,14),(17,10,0,NULL,5,0,NULL,15),(18,10,1,'1660973686.486',5,0,NULL,16),(19,10,0,NULL,5,0,NULL,17),(20,10,7,'1677918083.079',5,0,NULL,18);

/*Table structure for table `ling_sentence` */

DROP TABLE IF EXISTS `ling_sentence`;

CREATE TABLE `ling_sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `En_sentence` varchar(255) DEFAULT NULL,
  `Ch_sentence` varchar(255) DEFAULT NULL,
  `confusion_En` varchar(255) DEFAULT NULL COMMENT '用于混淆的英语单词选项',
  `confusion_Ch` varchar(255) DEFAULT NULL COMMENT '用于混淆的中文选项',
  `category` int(11) DEFAULT '1' COMMENT '句子主题课程类别外键',
  `IsDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `foreign` (`category`),
  CONSTRAINT `foreign` FOREIGN KEY (`category`) REFERENCES `ling_subject_courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `ling_sentence` */

insert  into `ling_sentence`(`id`,`En_sentence`,`Ch_sentence`,`confusion_En`,`confusion_Ch`,`category`,`IsDeleted`) values (1,'I like Chinese','我 喜欢 中文','English','英语',2,0),(2,'I like English','我 喜欢 英语','Chinese','中文',3,0),(3,'I like you','我 喜欢 你','your','的',1,0),(4,'You like English','你 喜欢 英语','Chinese','中文',1,0),(5,'You like Chinese','你 喜欢 中文','English','英语',1,0),(6,'I like my book','我 喜欢 我的 书','you your','你',1,0),(7,'I like my English teacher','我 喜欢 我的 英语 老师','Chinese','你 学生',1,0),(8,'I like your student','我 喜欢 你 的 学生','you teacher','老师',1,0),(9,'I like juice','我 喜欢 果汁','juicer nice','你',1,0),(10,'I like my red phone','我 喜欢 我的 红色 的 手机','blue their our teacher','他 蓝色 我们',2,0),(11,'Thank you for your help','谢谢 你的 帮忙','my thing of in with','我',1,0),(12,'I is a descendant of Confucius','我 是 孔子 的 后裔','descent undercover hello','困惑 哈哈',1,1);

/*Table structure for table `ling_subject_courses` */

DROP TABLE IF EXISTS `ling_subject_courses`;

CREATE TABLE `ling_subject_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '课程名称',
  `price` float DEFAULT NULL COMMENT '课程价格',
  `number` int(11) DEFAULT NULL COMMENT '课程单词数',
  `description` varchar(255) DEFAULT NULL COMMENT '课程描述',
  `category` int(11) DEFAULT NULL COMMENT '课程外语类别id 外键',
  `level` float DEFAULT '2.5' COMMENT '等级',
  `status` int(11) DEFAULT '1' COMMENT '是否显示',
  `IsDeleted` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `ling_foreign_courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `ling_subject_courses` */

insert  into `ling_subject_courses`(`id`,`name`,`price`,`number`,`description`,`category`,`level`,`status`,`IsDeleted`) values (1,'一般课程',0,5563,'通过实用的句子，教你最高频词汇',1,2.5,1,0),(2,'大学英语四级高频词汇',10,4019,'最新高频词汇总结，助你轻松过四级！',1,2.5,1,0),(3,'旅游',5,530,'旅途中轻松学习，帮你快速上旅游词汇',2,2.5,1,0),(4,'美食',5,753,'别让看不懂的单词阻碍你的美食之路！',1,2.5,1,0),(5,'商务英语',29,1445,'增强你的与外商合作伙伴及客户的沟通能力',1,2.5,1,0),(6,'常见500编程单词',26,500,'java、python、C++等常见编程语言单词',2,3.5,1,0),(7,'小学英语',10,603,'小学英语三年级至六年级英语单词和句子',1,3,1,0),(8,'大学英语六级',20,1000,'为你提供大学英语六级考试的必备词汇、短语和句子',1,5,0,1);

/*Table structure for table `ling_user_sentence` */

DROP TABLE IF EXISTS `ling_user_sentence`;

CREATE TABLE `ling_user_sentence` (
  `user_id` int(11) NOT NULL,
  `sentence_id` int(11) NOT NULL,
  `proficiency` int(11) DEFAULT '0' COMMENT '熟练程度：0-5',
  `islearned` int(11) DEFAULT '0' COMMENT '是否学会 0：未学会 1：已学会',
  PRIMARY KEY (`user_id`,`sentence_id`),
  KEY `juzi` (`sentence_id`),
  CONSTRAINT `juzi` FOREIGN KEY (`sentence_id`) REFERENCES `ling_sentence` (`id`),
  CONSTRAINT `yonhu` FOREIGN KEY (`user_id`) REFERENCES `ling_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ling_user_sentence` */

insert  into `ling_user_sentence`(`user_id`,`sentence_id`,`proficiency`,`islearned`) values (1,1,3,1),(1,2,1,0),(1,3,4,0),(1,4,1,0),(1,5,4,1),(1,6,4,1),(1,7,4,1),(1,8,4,0),(1,9,1,0),(2,1,3,0),(2,2,1,0),(2,3,1,0),(2,4,0,0),(3,3,5,1),(5,1,0,0),(5,3,0,0),(5,4,0,0),(5,5,0,0),(5,6,0,0),(5,7,0,0),(5,8,0,0),(5,9,0,0),(5,10,0,0),(5,11,0,0),(6,11,NULL,NULL),(11,3,0,0),(11,4,0,0),(11,5,0,0),(11,6,0,0),(11,7,0,0),(11,8,0,0),(11,9,0,0),(11,11,0,0),(16,3,2,0),(16,4,1,0),(16,5,1,0),(16,6,1,0),(16,7,1,0),(16,8,1,0),(16,9,1,0),(16,11,1,0),(18,3,0,0),(18,4,0,0),(18,5,0,0),(18,6,0,0),(18,7,0,0),(18,8,0,0),(18,9,0,0),(18,11,0,0);

/*Table structure for table `ling_user_subject` */

DROP TABLE IF EXISTS `ling_user_subject`;

CREATE TABLE `ling_user_subject` (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `subject_id` int(11) NOT NULL COMMENT '主题课程id',
  PRIMARY KEY (`user_id`,`subject_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_id` FOREIGN KEY (`subject_id`) REFERENCES `ling_subject_courses` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `ling_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ling_user_subject` */

insert  into `ling_user_subject`(`user_id`,`subject_id`) values (1,1),(2,1),(3,1),(4,1),(5,1),(11,1),(16,1),(18,1),(1,2),(2,2),(3,2),(4,2),(5,2),(2,3),(3,3),(2,4),(2,5),(5,7);

/*Table structure for table `ling_user_word` */

DROP TABLE IF EXISTS `ling_user_word`;

CREATE TABLE `ling_user_word` (
  `user_id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,
  `iscollect` int(11) DEFAULT '0' COMMENT '是否收藏 0：未收藏 1：已收藏',
  `islearned` int(11) DEFAULT '0' COMMENT '是否学会 0：未学会 1：已学会',
  PRIMARY KEY (`user_id`,`word_id`),
  KEY `word_id` (`word_id`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `ling_users` (`id`),
  CONSTRAINT `word_id` FOREIGN KEY (`word_id`) REFERENCES `ling_word` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ling_user_word` */

insert  into `ling_user_word`(`user_id`,`word_id`,`iscollect`,`islearned`) values (1,1,1,1),(1,2,0,0),(1,3,0,1),(1,4,0,1),(1,5,0,0),(1,6,0,1),(1,7,0,1),(1,8,1,1),(1,9,0,1),(1,10,0,1),(1,11,0,0),(1,12,0,1),(1,13,0,1),(1,14,0,0),(1,15,1,1),(1,16,0,1),(1,17,0,0),(1,18,0,0),(1,19,0,1),(1,20,1,1),(1,21,0,1),(1,58,0,1),(2,1,0,1),(5,1,0,0),(5,2,0,0),(5,3,0,0),(5,4,0,0),(5,5,0,0),(5,6,0,0),(5,7,0,0),(5,8,0,0),(5,9,0,0),(5,10,0,0),(5,11,0,0),(5,12,0,0),(5,13,0,0),(5,14,0,0),(5,15,0,0),(5,16,0,0),(5,17,0,0),(5,18,0,0),(5,19,0,0),(5,20,0,0),(5,21,0,0),(5,22,0,0),(5,23,0,0),(5,24,0,0),(5,25,0,0),(5,26,0,0),(5,27,0,0),(5,28,0,0),(5,29,0,0),(5,30,0,0),(5,31,0,0),(5,32,0,0),(5,33,0,0),(5,34,0,0),(5,35,0,0),(5,36,0,0),(5,37,0,0),(5,38,0,0),(5,39,0,0),(5,40,0,0),(5,41,0,0),(5,42,0,0),(5,43,0,0),(5,44,0,0),(5,45,0,0),(5,46,0,0),(5,47,0,0),(5,48,0,0),(5,49,0,0),(5,50,0,0),(5,51,0,0),(5,52,0,0),(5,53,0,0),(5,54,0,0),(5,55,0,0),(5,56,0,0),(5,57,0,0),(5,58,0,0),(5,59,0,0),(5,60,0,0),(5,61,0,0),(5,62,0,0),(5,63,0,0),(5,64,0,0),(5,65,0,0),(5,66,0,0),(5,67,0,0),(5,68,0,0),(5,69,0,0),(5,70,0,0),(5,71,0,0),(5,72,0,0),(5,73,0,0),(5,74,0,0),(5,75,0,0),(5,76,0,0),(5,77,0,0),(5,78,0,0),(5,79,0,0),(5,80,0,0),(5,81,0,0),(5,82,0,0),(11,61,0,0),(11,62,0,1),(11,63,0,0),(11,64,0,1),(11,65,0,1),(11,66,0,0),(11,67,0,1),(11,68,0,0),(11,69,0,0),(11,70,0,0),(11,71,0,0),(11,72,0,0),(11,73,0,0),(11,74,0,0),(11,75,0,0),(11,76,0,0),(11,77,0,0),(11,78,0,0),(11,79,0,0),(11,80,0,0),(11,81,0,1),(11,82,0,0),(16,61,1,1),(16,62,0,0),(16,63,0,1),(16,64,0,1),(16,65,0,1),(16,66,0,1),(16,67,0,0),(16,68,0,0),(16,69,0,0),(16,70,1,1),(16,71,0,1),(16,72,0,0),(16,73,0,0),(16,74,0,1),(16,75,0,0),(16,76,0,0),(16,77,0,1),(16,78,0,0),(16,79,0,0),(16,80,0,0),(16,81,1,1),(16,82,0,0),(18,61,0,0),(18,62,0,0),(18,63,0,1),(18,64,0,0),(18,65,0,1),(18,66,0,0),(18,67,0,0),(18,68,0,1),(18,69,0,1),(18,70,0,0),(18,71,0,1),(18,72,0,1),(18,73,0,0),(18,74,0,0),(18,75,0,0),(18,76,0,0),(18,77,0,0),(18,78,0,1),(18,79,0,0),(18,80,0,0),(18,81,0,0),(18,82,0,0);

/*Table structure for table `ling_users` */

DROP TABLE IF EXISTS `ling_users`;

CREATE TABLE `ling_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(2) DEFAULT '男',
  `introduce` varchar(255) DEFAULT NULL COMMENT '用户简介',
  `user_pic` varchar(255) DEFAULT 'avatar.jpg' COMMENT '用户头像',
  `foreign_courses` int(11) DEFAULT '1' COMMENT '用户所选外语课程id',
  `register_date` varchar(255) DEFAULT NULL COMMENT '注册时间',
  `collect_words` int(11) DEFAULT '0' COMMENT '重难点单词数',
  `learned_words` int(11) DEFAULT '0' COMMENT '已学会单词数',
  `status` int(11) DEFAULT '1',
  `IsDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `foreign_courses` (`foreign_courses`),
  CONSTRAINT `foreign_courses` FOREIGN KEY (`foreign_courses`) REFERENCES `ling_foreign_courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `ling_users` */

insert  into `ling_users`(`id`,`username`,`password`,`nickname`,`email`,`gender`,`introduce`,`user_pic`,`foreign_courses`,`register_date`,`collect_words`,`learned_words`,`status`,`IsDeleted`) values (1,'hhh','$2a$10$kHPvE63PwpMJ57JDLHiO7OhpVJbnnSySRtmwCsIwSVYWCdjtPFayO','小李','12345678910@qq.com','女','一个脱离高级趣味的用户','1660730144724.jpg',1,'2022年03月29日',4,16,1,0),(2,'hjb','$2a$10$knhtKz9YjkZD1qZu2mIXZ.n1gk/7s4N6lQmo6.JPFPbEyPHEOI9Cy','黄俊彬','1345223421@qq.com','男','我孤独的飘游，像云在山丘和谷地飘荡','1677917969900.jpg',1,'2022年04月04日',0,1,1,0),(3,'yhq','$2a$10$BaICevASu28JeNZqR3WMnui6xnYaT1/LKjcxBh4sQMKvFkU5qbXC6','哈哈','2991553452@qq.com','男','白衣苍狗 五色交辉','avatar.jpg',6,'2022年04月12日',0,0,1,0),(4,'lye','$2a$10$TD0kQB8qx49QyCF8RDiLUuw2vtKiemsLLLTN78DVOhHbU1LRccvOy','7JpTNc0d','1246345324@qq.com','男','','avatar.jpg',3,'2022年04月12日',0,0,1,0),(5,'sss','$2a$10$qXLmeHwdfwZbjUBB0Kb/aOpKTy5NbBHMN2nBjRtwkW065GMCgUeeC','q4qxjWZi','1246345@qq.com','男','','avatar.jpg',1,'2022年05月10日',0,0,1,0),(6,'ccc','$2a$10$rErltx7wgZjCCzCNEsq47ORH8cBVXlFPLwqgCVRZoCale9ha2DUba','9V6B08Ax','14538598912@qq.com','女','心绪漠然，年岁渐长','avatar.jpg',1,'2022年05月10日',0,0,1,0),(7,'abc','$2a$10$N8ZfHeoPhJuqHI7aVzx9v.6glLME7R7QRl.TfpyxX0x9xxouLwLny','AeJJRNxY','1353115324@qq.com','女',NULL,'avatar.jpg',1,'2022年05月10日',0,0,1,0),(8,'hzx','$2a$10$kK5.ef69niDryUIKj6n/EesG.mUcuOEvTtcWEUGY58namFC4IFbNW','PnEI2W09','24419257231@qq.com','男',NULL,'avatar.jpg',1,'2022年05月10日',0,0,1,0),(9,'ccz','$2a$10$hbPbKyGf8cpeSES8tYYFQ.V3X8upMxhzdAxanPPDpyIvsA7duDg86','0tKMEgKe','14538598912@qq.com','男','','avatar.jpg',5,'2022年05月14日',0,0,1,0),(10,'yesterday','$2a$10$I31oU.xO7OwEViGANgm7x./rrbMfbrP6CMBlvQXS/v0Co5e05EA3C','3YwE8egP','142442429@qq.com','男',NULL,'avatar.jpg',1,'2022年05月25日',0,0,1,0),(11,'mytext','$2a$10$KBEusLNh.qWQlz5GvFGlYOSoZBV9J0B/.4OHHNqgsnHox85m8v6.C','DpVVD8nc','1353115324@qq.com','男',NULL,'avatar.jpg',1,'2022年06月02日',0,0,1,0),(12,'huang','$2a$10$oxXkg/dqAwNW3Hv7QtheKu/ftCRj918wt5xIxA7YKDFTD5I7TKMPK','小黄','1525392234@qq.com','男','test','avatar.jpg',6,'2022年08月01日',0,0,1,0),(13,'user','$2a$10$kdCmH.nS9UFeQYhoW4GxPeLYHw8ncON.3EyZA2UHzLB7WFusTIKaG','rXPBiM5i','1353115324@qq.com','男',NULL,'avatar.jpg',6,'2022年08月20日',0,0,1,0),(14,'jun','$2a$10$e729mW1v/9y9rV5osJzAHeml4wyK4Vi1GRVfDiGCdlGx8YKmybFUK','6dStkx6o','1456665456@qq.com','男',NULL,'avatar.jpg',1,'2022年08月20日',0,0,1,0),(15,'bin','$2a$10$fYDFglu4si5sWd75MDNMDOgy2JffZrN1Vbgblp75ePNp9b7q5MBNu','xMfspWSE','14538598912@qq.com','男',NULL,'avatar.jpg',1,'2022年08月20日',0,0,1,0),(16,'bing','$2a$10$zSxquDJ7.Au7nnFZu07CDORlt6CLxL423pcCPEmjHC6UGuk9tjD6m','往事随云走','14538598912@qq.com','女','努力成为优秀的人','1660974406845.jpg',3,'2022年08月20日',3,10,1,0),(17,'hello','$2a$10$KjAoZS2zunkhG5GQuy/v5.LqZmJMw5ptLX6svPutohzCSSIQc0w3q','小黄','1432442345@qq.com','男','如风般自由','avatar.jpg',1,'2022年08月20日',0,0,0,0),(18,'test','$2a$10$7DY5NcZ5TgWK6jhkpqPB8e/2IVT5VGERri4WoVpeYCUFpHVDNJBKK','CmwxygVB','1353115324@qq.com','男',NULL,'avatar.jpg',1,'2023年03月04日',0,7,1,0);

/*Table structure for table `ling_word` */

DROP TABLE IF EXISTS `ling_word`;

CREATE TABLE `ling_word` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `words` varchar(255) DEFAULT NULL,
  `translation` varchar(255) DEFAULT NULL COMMENT '单词翻译',
  `phonetic` varchar(255) DEFAULT NULL COMMENT '单词音标',
  `otherforms` varchar(255) DEFAULT NULL COMMENT '单词其他形式',
  `notes` varchar(255) DEFAULT NULL COMMENT '单词注释',
  `category` int(11) DEFAULT NULL COMMENT '单词主题课程类别外键',
  `IsDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `subject` (`category`),
  CONSTRAINT `subject` FOREIGN KEY (`category`) REFERENCES `ling_subject_courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

/*Data for the table `ling_word` */

insert  into `ling_word`(`id`,`words`,`translation`,`phonetic`,`otherforms`,`notes`,`category`,`IsDeleted`) values (1,'abandon','放弃','英 [əˈbændən]　美 [əˈbændən]','第三人称单数：abandons,现在分词：abandoning,过去分词：abandoned,过去式：abandoned','及物动词:放弃，抛弃; 离弃，丢弃; 使屈从; 停止进行，终止,名词:放任，放纵; 完全屈从于压制',2,0),(2,'ability','能力','英 [əˈbɪləti]　美 [əˈbɪlɪti]','第三人称复数：abilities','名词:能力，资格; 能耐，才能',2,0),(3,'able','能够的','英 [ˈeɪbl]　美 [ˈebəl]','比较级：abler,最高级：ablest','形容词:能够的; 有能力的; 有才干的; 干练的',2,0),(4,'aboard','上车','英 [əˈbɔ:d]　美 [əˈbɔ:rd]','同义词：on board,反义词：ashore','介词:上车; 在（船、飞机、车）上，上（船、飞机、车）,副词:在船（或飞机、车）上，上船（或飞机、车）; 靠船边; 在船上; 在火车上',2,0),(5,'about','关于','英 [əˈbaʊt]　美 [əˈbaʊt]',NULL,'介词:关于; 大约; 在…周围,副词:大约; 在附近; 在四周; 几乎,形容词:在附近的; 四处走动的; 在起作用的; 在流行中的',2,0),(6,'above','超过','英 [əˈbʌv]　美 [əˈbʌv]','同义词：upon、up、aloft、on、overhead,反义词：below','介词:（表示程度）超过; （表示等级）在…之上; （表示位置）在…正上方; （表示比较）优于,副词:以上; 上述; 在上面,名词:上述,形容词:上述的',2,0),(7,'abroad','到国外','英 [əˈbrɔ:d]　美 [əˈbrɔd]','同义词：overseas、away、overseas,反义词：home','副词:到国外，在海外; 广为流传地,形容词:往国外的,名词:海外，异国',2,0),(8,'absence','缺席','英 [ˈæbsəns]　美 [ˈæbsəns]','第三人称复数：absences','名词:缺席，缺勤; 缺乏，缺少，无; 心不在焉，不注意',2,0),(9,'absent','缺席的','英 [ˈæbsənt]　美 [ˈæbsənt]','第三人称单数：absents,现在分词：absenting,过去分词：absented,过去式：absented','形容词:缺席的，不在场的; 缺少的，缺乏的; 不在意的，茫然的,及物动词:缺席，不参加; 不在',2,0),(10,'absolute','绝对的','英 [ˈæbsəlu:t]　美 [ˈæbsəˌlut]','第三人称复数：absolutes','形容词:绝对的，完全的; 不受任何限制[约束]的; 无条件的; 有无上权力或权威的,名词:绝对; 绝对事物',2,0),(11,'absorb','吸收','英 [əbˈsɔ:b]　美 [əbˈsɔ:rb]','第三人称单数：absorbs,现在分词：absorbing,过去分词：absorbed,过去式：absorbed','及物动词:吸收（液体、气体等）; 吸引（注意）; 吞并，合并; 忍受，承担（费用）',2,0),(12,'baby','宝贝','英 [ˈbeɪbi]　美 [ˈbeɪbi]','比较级：babier,最高级：babiest,第三人称单数：babies,第三人称复数：babies,现在分词：babying,过去分词：babied,过去式：babied','名词:婴儿; 婴孩; 幼崽; 宝贝,及物动词:把…当作婴孩看待，娇养; 纵容,形容词:孩子的; 小孩似的; 小型的',2,0),(13,'back','背','英 [bæk]　美 [bæk]','第三人称单数：backs,第三人称复数：backs,现在分词：backing,过去分词：backed,过去式：backed','名词:背，背部; 背面，反面; 后面，后部; （椅子等的）靠背,及物动词:使后退; 支持; 加背书于; 下赌注于,不及物动词:后退; 倒退,形容词:后面的; 背部的; 以前的; 拖欠的,副词:以前; 向后地',2,0),(14,'background','背景','英 [ˈbækgraʊnd]　美 [ˈbækˌɡraʊnd]','第三人称复数：backgrounds','名词:（画等的）背景; 底色; 背景资料; 配乐',2,0),(15,'backward','落后的','英 [ˈbækwəd]　美 [ˈbækwərd]','同义词：rearward、back、backwards,反义词：forward、ahead','形容词:落后的; 向后的; 反向的; 怯生生的,副词:向后地; 相反地; 回溯地',2,0),(16,'bacon','培根','英 [ˈbeɪkən]　美 [ˈbekən]',NULL,'名词:培根; 腊肉; 熏猪肉; 咸猪肉',2,0),(17,'bacteria','细菌','英 [bækˈtɪəriə]　美 [bækˈtɪriə]','原级：bacterium','名词:细菌(bacterium的名词复数)',2,0),(18,'bad','坏的','英 [bæd]　美 [bæd]','比较级：worse,最高级：worst','形容词:坏的，不好的; 严重的; 不舒服的; 低劣的，有害的,名词:坏人，坏事,副词:不好地，非常地',2,0),(19,'badly','非常','英 [ˈbædli]　美 [ˈbædli]','比较级：worse,最高级：worst','副词:非常，在很大程度上; 坏，拙劣地; 不利地，有害地',2,0),(20,'abstract','抽象的','英 [ˈæbstrækt]　美 [ˈæbˌstrækt]','第三人称单数：abstracts,第三人称复数：abstracts,现在分词：abstracting,过去分词：abstracted,过去式：abstracted','形容词:抽象的，理论上的; 难解的; 抽象派的; 茫然的,名词:摘要; 抽象概念; 抽象派艺术作品; [化]萃取物,及物动词:提取，分离; 转移（注意等）; 概括，摘录; <婉辞>剽窃',2,0),(21,'abundant','大量的','英 [əˈbʌndənt]　美 [əˈbʌndənt]','同义词：abounding,反义词：short、scarce','形容词:大量的，充足的; 丰富的，富有的; 丰足; 阜',2,0),(22,'abuse','滥用','英 [əˈbju:s]　美 [əˈbjuz]','第三人称单数：abuses,第三人称复数：abuses,现在分词：abusing,过去分词：abused,过去式：abused','名词:滥用; 恶习; 侮辱; 恶言,及物动词:滥用; 虐待; 辱骂',2,0),(23,'academic','学院的','英 [ˌækəˈdemɪk]　美 [ˌækəˈdɛmɪk]','第三人称复数：academics','形容词:学院的，大学的，学会的，（学术，文艺）协会的; 学究的，学理上的，空谈的，非实用的; 〈美〉文科的，文学的; 柏拉图学派的,名词:学者; 大学教师，大学生，学会会员; 纸上空论，空论; [A-]柏拉图哲学信奉者',2,0),(24,'academy','专科学校','英 [əˈkædəmi]　美 [əˈkædəmi]','第三人称复数：academies','名词:专科学校; 学会，学院; 一般的高等教育; 私立学校，学术团体',2,0),(25,'accelerate','促进','英 [əkˈseləreɪt]　美 [ækˈsɛləˌret]','第三人称单数：accelerates,现在分词：accelerating,过去分词：accelerated,过去式：accelerated','及物动词:促进; （使）加快，（使）增速; 加速，催促; 速度增加,不及物动词:加快，加速',2,0),(26,'accent','口音','英 [ˈæksent]　美 [ˈækˌsɛnt]','第三人称单数：accents,第三人称复数：accents,现在分词：accenting,过去分词：accented过去式：accented','名词:口音; 重音; 腔调; 重音符号（标在字母上）,及物动词:重读; 标注重音; 集中注意力',2,0),(27,'accept','承认','英 [əkˈsept]　美 [ækˈsɛpt]','第三人称单数：accepts,现在分词：accepting,过去分词：accepted,过去式：accepted','不及物动词:承认; 同意; 承兑,及物动词:接受; 承认; 承担; 承兑',2,0),(28,'access','入口','英 [ˈækses]　美 [ˈæksɛs]','第三人称单数：accesses,现在分词：accessing,过去分词：accessed,过去式：accessed','名词:入口，出口; 接近，进入; 增长; 爆发,及物动词:接近，进入; 使用，接近，获取',2,0),(29,'accurate','精确的','英 [ˈækjərət]　美 [ˈækjərɪt]','比较级：more accurate,最高级：most accurate','形容词:精确的，准确的; 正确无误的',2,0),(30,'account','账','英 [əˈkaʊnt]　美 [əˈkaʊnt]','第三人称单数：accounts,第三人称复数：accounts,现在分词：accounting,过去分词：accounted,过去式：accounted','名词:账，账目; 存款; 记述，报告; 理由,不及物动词:解释; 导致; 报账,及物动词:认为; 把…视作',2,0),(31,'accident','事故','英 [ˈæksɪdənt]　美 [ˈæksɪdənt, -ˌdɛnt]','第三人称复数：accidents','名词:事故; 意外事件; 机遇，偶然; 附属品',2,0),(32,'accidental','意外的','英 [ˌæksɪˈdentl]　美 [ˌæksɪˈdɛntl]','第三人称复数：accidentals','形容词:意外的，偶然（发生）的; 附属的,名词:偶然; 次要方面',2,0),(33,'accommodation','住处','英 [əˌkɒməˈdeɪʃn]　美 [əˌkɑ:məˈdeɪʃn]','第三人称复数：accommodations','名词:住处; 适应; 和解; 便利',2,0),(34,'accompany','陪伴','英 [əˈkʌmpəni]　美 [əˈkʌmpəni, əˈkʌmpni]','第三人称单数：accompanies,现在分词：accompanying,过去分词：accompanied,过去式：accompanied','及物动词:陪伴，陪同; 附加，补充; 与…共存; 为…伴奏,不及物动词:伴奏',2,0),(35,'accomplish','完成','英 [əˈkʌmplɪʃ]　美 [əˈkɑ:mplɪʃ]','第三人称单数：accomplishes,现在分词：accomplishing,过去分词：accomplished,过去式：accomplished','及物动词:完成; 达到（目的）; 走完（路程、距离等）; 使完美',2,0),(36,'accord','协议','英 [əˈkɔ:d]　美 [əˈkɔ:rd]','第三人称单数：accords,现在分词：according,过去分词：accorded,过去式：accorded','名词:协议; 条约; （色彩的）协调; 和解协议,及物动词:给予; 使和谐一致; 使符合; 使适合,不及物动词:符合; 一致',2,0),(37,'accordance','一致','英 [əˈkɔ:dns]　美 [əˈkɔ:rdns]　',NULL,'名词:一致; 和谐; 给予',2,0),(38,'accordingly','因此','英 [əˈkɔ:dɪŋli]　美 [əˈkɔ:rdɪŋli]　',NULL,'副词:因此，于是; 依据; 照着，相应地',2,0),(39,'accountant','会计人员','英 [əˈkaʊntənt]　美 [əˈkaʊntənt]','第三人称复数：accountants','名词:会计人员，会计师',2,0),(40,'accumulate','堆积','英 [əˈkju:mjəleɪt]　美 [əˈkjumjəˌlet]','第三人称单数：accumulates,现在分词：accumulating,过去分词：accumulated,过去式：accumulated','及物/不及物动词:堆积，积累,不及物动词:（数量）逐渐增加，（质量）渐渐提高',2,0),(41,'accident','事故','英 [ˈæksɪdənt]　美 [ˈæksɪdənt, -ˌdɛnt]','第三人称复数：accidents','名词:事故; 意外事件; 机遇，偶然; 附属品',2,0),(42,'accidental','意外的','英 [ˌæksɪˈdentl]　美 [ˌæksɪˈdɛntl]','第三人称复数：accidentals','形容词:意外的，偶然（发生）的; 附属的,名词:偶然; 次要方面',2,0),(43,'accommodation','住处','英 [əˌkɒməˈdeɪʃn]　美 [əˌkɑ:məˈdeɪʃn]','第三人称复数：accommodations','名词:住处; 适应; 和解; 便利',2,0),(44,'accompany','陪伴','英 [əˈkʌmpəni]　美 [əˈkʌmpəni, əˈkʌmpni]','第三人称单数：accompanies,现在分词：accompanying,过去分词：accompanied,过去式：accompanied','及物动词:陪伴，陪同; 附加，补充; 与…共存; 为…伴奏,不及物动词:伴奏',2,0),(45,'accomplish','完成','英 [əˈkʌmplɪʃ]　美 [əˈkɑ:mplɪʃ]','第三人称单数：accomplishes,现在分词：accomplishing,过去分词：accomplished,过去式：accomplished','及物动词:完成; 达到（目的）; 走完（路程、距离等）; 使完美',2,0),(46,'accord','协议','英 [əˈkɔ:d]　美 [əˈkɔ:rd]','第三人称单数：accords,现在分词：according,过去分词：accorded,过去式：accorded','名词:协议; 条约; （色彩的）协调; 和解协议,及物动词:给予; 使和谐一致; 使符合; 使适合,不及物动词:符合; 一致',2,0),(47,'accordance','一致','英 [əˈkɔ:dns]　美 [əˈkɔ:rdns]',NULL,'名词:一致; 和谐; 给予',2,0),(48,'accumulate','堆积','英 [əˈkju:mjəleɪt]　美 [əˈkjumjəˌlet]','第三人称单数：accumulates,现在分词：accumulating,过去分词：accumulated,过去式：accumulated','及物/不及物动词:堆积，积累,不及物动词:（数量）逐渐增加，（质量）渐渐提高',2,0),(49,'accuracy','精确（性）','英 [ˈækjərəsi]　美 [ˈækjərəsi]','第三人称复数：accuracies','名词:精确（性），准确（性）,',2,0),(50,'accustomed','习惯的','英 [əˈkʌstəmd]　美 [əˈkʌstəmd]','原级：accustom,第三人称单数：accustoms,现在分词：accustoming','形容词:习惯的; 通常的; 独有的; 适应的,动词:使习惯于(accustom的过去式和过去分词)',2,0),(51,'achieve','实现','英 [əˈtʃi:v]　美 [əˈtʃiv]','第三人称单数：achieves,现在分词：achieving,过去分词：achieved,过去式：achieved','及物动词:实现; 取得; 获得; 成功,不及物动词:达到预期的目的，实现预期的结果，如愿以偿',2,0),(52,'acid','酸的','英 [ˈæsɪd]　美 [ˈæsɪd]','第三人称复数：acids','形容词:酸的; 酸性的; 酸味的; 尖刻的,名词:<化>酸; 酸味物质',2,0),(53,'acknowledge','承认','英 [əkˈnɒlɪdʒ]　美 [əkˈnɑ:lɪdʒ]','第三人称单数：acknowledges,现在分词：acknowledging,过去分词：acknowledged,过去式：acknowledged','及物动词:承认; 鸣谢; 对…打招呼; 告知已收到',2,0),(54,'acquaintance','相识','英 [əˈkweɪntəns]　美 [əˈkwentəns]','第三人称复数：acquaintances','名词:相识; 相识的人，熟人; 对…有了解; 知识，心得',2,0),(55,'acquire','学到','英 [əˈkwaɪə(r)]　美 [əˈkwaɪr]','第三人称单数：acquires,现在分词：acquiring,过去分词：acquired,过去式：acquired','及物动词:学到; 获得，取得',2,0),(56,'acre','英亩','英 [ˈeɪkə(r)]　美 [ˈekɚ]','第三人称复数：acres','名词:英亩; 土地，耕地; [口]大量',2,0),(57,'across','穿过','英 [əˈkrɒs]　美 [əˈkrɔ:s]','同义词：crosswise、crossways,反义词：along、through','介词:穿过; 横穿，横过; 与…交叉; 在…对面,副词:横过，越过; 在对面; 交叉; 斜对面',2,0),(58,'act','表演','英 [ækt]　美 [ækt]','第三人称单数：acts,第三人称复数：acts,现在分词：acting,过去分词：acted,过去式：acted','动词:行动; 表演; 表现; 起作用,名词:行为; 行动; 法案，法令; 短节目',2,0),(59,'action','行动','英 [ˈækʃn]　美 [ˈækʃən]','第三人称单数：actions,第三人称复数：actions,现在分词：actioning,过去式：actioned','名词:行动，活动; 功能，作用; 手段; [法]诉讼',2,0),(60,'activity','活动','英 [ækˈtɪvəti]　美 [ækˈtɪvɪti]　','第三人称复数：activities','名词:活动; 活跃，敏捷; 活动力; 教育活动',2,0),(61,'certain','某一','英 [ˈsɜ:tn]　美 [ˈsɜ:rtn]','比较级：more certain,最高级：most certain','形容词:某一; 必然的; 已确定的,代词:[动词用复数]某些',1,0),(62,'violent','剧烈的','英 [ˈvaɪələnt]　美 [ˈvaɪələnt]','比较级：more violent,最高级：most violent','形容词:暴力引起的; 剧烈的，（风，爆炸等）猛烈的，狂暴的; 感情强烈的; 颜色强烈的',1,0),(63,'still','仍然','英 [stɪl]　美 [stɪl]','比较级：stiller,最高级：stillest,第三人称单数：stills,第三人称复数：stills,现在分词：stilling,过去分词：stilled,过去式：stilled','副词:仍然; 更，还要; 静静地,形容词:不动的，静止的; 不狂暴的，温柔的; 没有活力的,名词:平静; 剧照,及物/不及物动词:（使某物）平静下来，安静;蒸馏,连词:但是; 然而',1,0),(64,'different','不同的','英 [ˈdɪfrənt]　美 [ˈdɪfrənt]','同义词：assorted、unlike、varied、contrary,反义词：same、similar','形容词:不同的; 各式各样的; 个别的; 不平常',1,0),(65,'long','长的','英 [lɒŋ]　美 [lɔ:ŋ]','比较级：longer,最高级：longest,第三人称单数：longs,现在分词：longing,过去分词：longed,过去式：longed','形容词:长的; 长时间的; 冗长的,副词:长久地; 始终; 遥远地,名词:长时间，长时期; 长尺寸,不及物动词:渴望，极想',1,0),(66,'alone','单独的','英 [əˈləʊn]　美 [əˈloʊn]','比较级：aloneer,最高级：aloneest','形容词:单独的; 独一无二的; 独自的,副词:单独地; 独自地; 孤独地; 只，只有',1,0),(67,'electronic','电子的','英 [ɪˌlekˈtrɒnɪk]　美 [ɪˌlekˈtrɑ:nɪk]',NULL,'形容词:电子的; 电子操纵的; 用电子设备生产的; 用电子设备完成的',1,0),(68,'delighted','高兴的','英 [dɪˈlaɪtɪd]　美 [dɪˈlaɪtɪd]','原级：delight,第三人称单数：delights,第三人称复数：delights,现在分词：delighting','形容词:高兴的; 欣喜的,动词:使高兴; 使欣喜( delight的过去式和过去分词)',1,0),(69,'personal','个人的','英 [ˈpɜ:sənl]　美 [ˈpɜ:rsənl]','第三人称复数：personals','形容词:个人的，私人的; 身体的; 亲自的; 人身攻击的,名词:（报刊上的）人事栏，分类人事广告版; 人称代名词; 关于个人的简讯',1,0),(70,'afraid','恐怕','英 [əˈfreɪd]　美 [əˈfred]','同义词：cowardly、scared、frightened、fearful,反义词：bold、brave、fearless、confident、assured','形容词:恐怕; 害怕的; 担心的; 畏惧，害怕',1,0),(71,'curious','好奇的','英 [ˈkjʊəriəs]　美 [ˈkjʊriəs]','同义词：unusual、queer、inquisitive、strange、odd、peculiar,反义词：uninterested、indifferent、unconcerned、incurious、nonchalant','形容词:好奇的; 奇妙的; 好求知的; 稀奇的',1,0),(72,'alive','活着的','英 [əˈlaɪv]　美 [əˈlaɪv]','相关词组：alive with : 充满着','形容词:活着的; 活泼的; 有生气的; 敏感的',1,0),(73,'anxious','焦急的','英 [ˈæŋkʃəs]　美 [ˈæŋkʃəs]','比较级：more anxious,最高级：most anxious,相关词组：be kept on the anxious seat : 被弄得焦急不安','形容词:焦急的; 渴望的; 令人焦虑的; 流露出忧虑的',1,0),(74,'less','较小的','英 [les]　美 [lɛs]','原级：little,最高级：least','形容词:较小的; 较少的（little的比较级）; 较次的，较劣的; 较不重要的,副词:较少地，较小地,介词:减去; 少掉; 不足,名词:较少，较小',1,0),(75,'nervous','焦虑的','英 [ˈnɜ:vəs]　美 [ˈnɜ:rvəs]','比较级：more nervous,最高级：most nervous','形容词:神经质的; 紧张不安的; 焦虑的',1,0),(76,'constant','不断的','英 [ˈkɒnstənt]　美 [ˈkɑ:nstənt]','第三人称复数：constants','形容词:不断的，持续的; 永恒的，始终如一的; 坚定; 忠实的,名词:[数]常数，常量; 不变的事物; 永恒值',1,0),(77,'exact','准确的','英 [ɪgˈzækt]　美 [ɪɡˈzækt]','比较级：exacter; more exact,最高级：exactest; most exact,第三人称单数：exacts,现在分词：exacting,过去分词：exacted,过去式：exacted','形容词:准确的; 严密的; 精密的，精确的,及物动词:要求; 苛求; 迫使; 强求',1,0),(78,'reliable','可靠的','英 [rɪˈlaɪəbl]　美 [rɪˈlaɪəbəl]','比较级：more reliable,最高级：most reliable','形容词:可靠的; 可信赖的; 真实可信的,名词:可靠的人',1,0),(79,'optimistic','乐观的','英 [ˌɒptɪˈmɪstɪk]　美 [ˌɑ:ptɪˈmɪstɪk]','同义词：bright、pleasant、glad、carefre、radiant、cheerful、jaunty、lighthearted,反义词：pessimistic','形容词:乐观的，乐观主义的',1,0),(80,'either','（两者之中）任何一个','英 [ˈaɪðə(r)]　美 [ˈiðɚ, ˈaɪðɚ]','反义词：neither','代词:（两者之中）任何一个,形容词:（两者中）任一的; 非此即彼的，两者择一的,副词:（否定句中）也; [用于否定句或否定词组后]也（不…），亦，而且; [口语] [用于否定句或否定词组后以加强语气]根本; 当然,连词:[通常用于“either…or…”结构中]或者，要么[在“either…or…”结构中，动词的人称和数一般与离得最近的主动响应，但有时用第三人称单数，在口语中也有把两个主语合在一起用作复数的]',1,0),(81,'apple','苹果','英 [ˈæpl]　美 [ˈæpəl]','第三人称复数：apples','名词苹果; 苹果公司; 苹果树',1,0),(82,'damp','微湿的','英 [dæmp]　美 [dæmp]　','比较级：damper,最高级：dampest,第三人称单数：damps,现在分词：damping,过去分词：damped过去式：damped','形容词:微湿的，潮湿的; 消沉的，沮丧的; 沉闷的; 情绪低落的,名词:潮湿; 消沉，失望; 矿井瓦斯; 有毒气体,及物动词:使潮湿; 使泄气，使沮丧; 抑制，阻抑; 使减弱,不及物动词[物]:阻尼; 减幅',1,0),(83,'descendants','后代','英 [dɪˈsendənt]　美 [dɪˈsɛndənt]','第三人称复单数：descendant','名词：后裔; 后代; （由过去类似物发展来的）派生物; 弟子，形容词：下降',7,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
