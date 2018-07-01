/*
 Navicat Premium Data Transfer

 Source Server         : hero
 Source Server Type    : MySQL
 Source Server Version : 50505
 Source Host           : localhost
 Source Database       : yan_hao

 Target Server Type    : MySQL
 Target Server Version : 50505
 File Encoding         : utf-8

 Date: 06/21/2018 10:08:16 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `to_do`
-- ----------------------------
DROP TABLE IF EXISTS `to_do`;
CREATE TABLE `to_do` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `urgent` int(5) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `list_id` int(11) NOT NULL,
  `isdelete` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `to_do`
-- ----------------------------
BEGIN;
INSERT INTO `to_do` VALUES ('17', '完善WEB大作业', '1', '2018-06-20', '14', '0'), ('18', '复习概率统计', '2', '2018-06-21', '15', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
