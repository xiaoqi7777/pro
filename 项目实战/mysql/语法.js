/*
  SQL 语句
	-- DDL 数据定义语言 data define language
	CREATE TABLE `student`
    (
      id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50),
      age int(11),
      city VARCHAR(50)
    );
		-- 增加一列
		ALTER TABLE student ADD COLUMN idcard VARCHAR(20) NULL AFTER age;
		-- 修改一列
		ALTER TABLE student MODIFY COLUMN idcard VARCHAR(30)
		-- 删除一列
		ALTER TABLE student DROP COLUMN idcard
		
		-- 主键约束
		ALTER TABLE student ADD PRIMARY KEY(id)
		-- 增加唯一索引
		ALTER TABLE student ADD UNIQUE uq_idcard(idcard)
		-- 增加默认值
		ALTER TABLE student MODIFY COLUMN city VARCHAR DEFAULT 'beijing'
		
		CREATE TABLE course(
			id int(11) PRIMARY KEY AUTO_INCREMENT,
			name VARCHAR(50)
		)
		
		CREATE TABLE score(
			student_id int(11),
			course_id int(11),
			grade float
		)
		-- 主外键约束
		ALTER TABLE score ADD CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES student(id);
		-- 删除外键
		ALTER TABLE score DROP FOREIGN KEY fk_student_id
 
  -- DML 数据操作语言
    -- 增加
    INSERT [INTO] 表名 [(列名)] VALUES (值列表)
  	SELECT * FROM student;
    
    INSERT INTO student(name,age,idcard,city) VALUES('张三',1,'1','北京')
    
    INSERT INTO student(name,age,idcard,city) VALUES('李四',2,'2','北京')
    
    每次插入一行数据 不能只插入一部分数据, 不能为表示符指定值
    要按照当时建表的约束进行插入
    
    -- 更新
    UPDATE student SET name='李思思',age=22 WHERE id=2;

    多列时用逗号隔开，一定要加更新条件(不加条件更新所有的) 以免错误更新，
    多个联合条件使用AND/OR  id=7 AND idcard=='123'
    判断某字段是否为空 email is null OR email=''

    -- 删除
      DELETE FROM student WHERE id = 6
      
      -- 截断表 
      TRUNCATE student;
      -- 删除表
      DELETE FROM student;
      区别: 截断表 表所有的东西删除 不会写入日志 索引等全部删除，不能恢复数据
           删除表 当前数据删除 会写入日志 增加的时候索引接着上一个来，能恢复数据
    
    -- 查询
      select 列名
      FROM  表名
      WHERE 查询条件表达式
      ORDER BY 排序的列名 ID ASC或者DESC

      	// as 是别名 2 '和' 是常量列
      SELECT id as '主键',name as '姓名',2 '和'
      FROM student
      WHERE city = '北京'
      ORDER BY id DESC

      -- 分页 LIMIT offset(跳过的条数),limit
      SELECT *
      FROM student 
      LIMIT 2,2

      -- 相同的记录只会出现一次
      SELECT DISTINCT city
      FROM student

      -- 字符串默认都是0  '数字' =>数字
      SELECT 1+'1'
      SELECT 1+'XDSA' 



-- 返回字符串的长度
SELECT LENGTH('abcde')
-- 拼接字符 
SELECT  CONCAT('aa','ss')
SELECT CONCAT_WS('aaa','#','qq','@')

-- 转大写
SELECT UPPER('ss')
SELECT LOWER('SS')


-- 截取字符串 前面为索引 后面为长度
SELECT SUBSTR('zfpx' FROM 2 FOR 2)
SELECT SUBSTR('zfpx',2,2)
SELECT * FROM student

-- 查询的结果转化成=> 第一个首字母大写 后面都小写
SELECT CONCAT(UPPER(SUBSTR(name,1,1)),LOWER(SUBSTR(name,2))) FROM student

-- 去首尾空格 特殊的只能是首尾
SELECT TRIM(' sd sd ')
SELECT TRIM('@' FROM '@21322@@')


-- 函数
CREATE FUNCTION SADD(num1 INT,num2 INT) RETURNS INT
RETURN num1+num2;

SELECT SADD(2,3);



-- 整理数据 新建数据 
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `idcard` varchar(18) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `city` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
);

CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `score` (
  `student_id` int(11) NOT NULL DEFAULT '0',
  `course_id` int(11) NOT NULL DEFAULT '0',
  `grade` float DEFAULT NULL,
  PRIMARY KEY (`student_id`,`course_id`),
  KEY `fk_courseid` (`course_id`),
  CONSTRAINT `fk_courseid` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `fk_stuid` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 新键表
ALTER TABLE `student`
ADD COLUMN `province`  varchar(50) NULL AFTER `city`,
ADD COLUMN `birthday`  date NULL AFTER `province`,
ADD COLUMN `gender`   int(11) NULL AFTER `birthday`,
ADD COLUMN `email`  varchar(50) NULL AFTER `gender`;

-- 增加数据
INSERT INTO `student` VALUES ('1', '郭靖', '1', '1', '济南', '山东省', '1982-09-03', 1, '1@qq.com');
INSERT INTO `student` VALUES ('2', '黄蓉', '2', '2', '济南', '山东省', '1982-09-03', 0, '2@qq.com');
INSERT INTO `student` VALUES ('3', '杨过', '3', '3', '终南山', '陕西省', '1979-09-03', 1, '3@qq.com');
INSERT INTO `student` VALUES ('4', '小龙女', '4', '4', '终南山', '陕西省', '1970-09-03', 0, '4@qq.com');
INSERT INTO `student` VALUES ('5', '欧阳锋', '5', '5', '白驼山', '新疆', '1989-09-09', 1, '5@qq.com');


INSERT INTO `course` VALUES ('1', '语文');
INSERT INTO `course` VALUES ('2', '数学');
INSERT INTO `course` VALUES ('3', '英语');

INSERT INTO `score` VALUES ('1', '1', '100');
INSERT INTO `score` VALUES ('1', '2', '90');
INSERT INTO `score` VALUES ('1', '3', '70');
INSERT INTO `score` VALUES ('2', '1', '100');
INSERT INTO `score` VALUES ('2', '2', '90');
INSERT INTO `score` VALUES ('2', '3', '80');
INSERT INTO `score` VALUES ('3', '1', '100');
INSERT INTO `score` VALUES ('3', '2', '90');
INSERT INTO `score` VALUES ('3', '3', '80');



-- 聚合函数
对一组值进行计算，并返回计算后的值，一般用来统计数据

-- 计算ID=1的学生的总分

-- 所有值的合
SELECT SUM(grade) FROM score WHERE student_id = 1;
SELECT MAX(grade) FROM score WHERE student_id = 1;
SELECT MIN(grade) FROM score WHERE student_id = 1;
SELECT AVG(grade) FROM score WHERE student_id = 1;
-- 总条数
SELECT COUNT(grade) FROM score WHERE student_id = 1;

-- 如果分组的花SELECT后面只能跟分组的列的聚合函数
SELECT  student_id,MIN(grade) 
FROM score
WHERE grade > 0 -- 是用来过滤分组前的记录
GROUP BY student_id
HAVING MIN(grade)<80 -- 是用来过滤分组的记录
ORDER BY MIN(grade) -- HAVING 和ORDER BY 只能放集合函数 
LIMIT 2,2 -- 前面跳过2个数据  后面返回的记录条数







1：12：43

  SQL组成
    DDL 数据定义语言 :改变数据表的结构 建表时候用的

    DML 数据操作语言 :增删改查

    DCL 数据控制语言 :用来设置或更改数据库用户权限的


    uuid 全球唯一 根据电脑mac地址 时间戳 等算出来的一个





*/