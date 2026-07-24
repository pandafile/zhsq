/*
==========================================================================
GFast自动生成菜单SQL
生成日期：2026-07-24
生成路径: resource/data/gen_sql/hx/hx_visit_record_menu.sql
生成人：gfast
==========================================================================
*/

-- 删除原有数据
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/list';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/get';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/add';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/edit';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/delete';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/export';
DELETE FROM `sys_auth_rule` WHERE `name` = 'api/v1/hx/hxVisitRecord/import';
-- 删除副表菜单数据
-- 当前日期
select @now := now();
-- 菜单父目录ID（162 = hx模块主菜单）
SELECT @parentId := 162;
-- 菜单 SQL
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/list','走访记录管理列表','ele-Fold','','走访记录管理列表',1,0,1,0,'/hx/hxVisitRecord/list','','hx/hxVisitRecord/list/index',0,'sys_admin',0,@now,@now);
-- 按钮父目录ID
SELECT @parentId := LAST_INSERT_ID();
-- 按钮 SQL
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/get','走访记录管理查询','','','走访记录管理查询',2,0,1,0,'','','',0,'sys_admin',0,@now,@now);
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/add','走访记录管理添加','','','走访记录管理添加',2,0,1,0,'','','',0,'sys_admin',0,@now,@now);
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/edit','走访记录管理修改','','','走访记录管理修改',2,0,1,0,'','','',0,'sys_admin',0,@now,@now);
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/delete','走访记录管理删除','','','走访记录管理删除',2,0,1,0,'','','',0,'sys_admin',0,@now,@now);
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/export','走访记录管理导出','','','走访记录管理导出',2,0,1,0,'','','',0,'sys_admin',0,@now,@now);
INSERT INTO `sys_auth_rule` (`pid`,`name`,`title`,`icon`,`condition`,`remark`,`menu_type`,`weigh`,`is_cached`,`is_hide`,`path`,`link_url`,`component`,`is_iframe`,`module_type`,`model_id`,`created_at`,`updated_at`)
VALUES(@parentId,'api/v1/hx/hxVisitRecord/import','走访记录管理导入','','','走访记录管理导入',2,0,1,0,'','','',0,'sys_admin',0,@now,@now);
-- 副表按钮数据
