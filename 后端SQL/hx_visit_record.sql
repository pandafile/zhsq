-- ============================================================
-- 社区走访工作记录表 hx_visit_record
-- 用于 gfast 代码生成器导入（先执行此建表语句，再在后台导入）
-- ============================================================
DROP TABLE IF EXISTS `hx_visit_record`;
CREATE TABLE `hx_visit_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `visit_type` tinyint(4) DEFAULT NULL COMMENT '走访类型：1-入户走访 2-宣传 3-风险排查 4-慰问 5-核实情况 6-矛盾调解 7-其他',
  `visitor_ids` varchar(255) DEFAULT NULL COMMENT '走访人员ID列表（逗号分隔，关联hx_person.id）',
  `visit_time` datetime DEFAULT NULL COMMENT '走访时间',
  `location_desc` varchar(300) DEFAULT NULL COMMENT '走访地点/门牌号描述',
  `person_id` bigint(20) DEFAULT NULL COMMENT '走访对象ID（关联hx_person.id）',
  `room_id` bigint(20) DEFAULT NULL COMMENT '房屋ID（关联hx_room）',
  `content` text COMMENT '走访内容/记录',
  `result` varchar(500) DEFAULT NULL COMMENT '走访结果（如：已解决、待跟进、上报等）',
  `follow_up` tinyint(4) DEFAULT '0' COMMENT '是否需要跟进：0-否 1-是',
  `follow_up_deadline` date DEFAULT NULL COMMENT '跟进截止日期',
  `attachment_urls` json DEFAULT NULL COMMENT '附件/图片URL列表（JSON数组）',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `hx_status` tinyint(4) DEFAULT '1' COMMENT '状态：1-正常 2-停用',
  `created_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_visit_type` (`visit_type`) USING BTREE COMMENT '走访类型索引',
  KEY `idx_visit_time` (`visit_time`) USING BTREE COMMENT '走访时间索引',
  KEY `idx_person_id` (`person_id`) USING BTREE COMMENT '走访对象ID索引',
  KEY `idx_follow_up` (`follow_up`) USING BTREE COMMENT '跟进标记索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='社区走访工作记录表';
