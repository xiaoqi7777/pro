/**
 * 1、严格区分大小写
 * 2、所有内容都以文件形式保存
 * 3、不依靠拓展名区分类型,靠权限来区分(带后缀的都是给管理员看的)
 *    压缩包 .gz .bz2 .tar .bz2 .tgz
 *    二进制文件 .rpm
 *    网页文件 .html .php
 *    脚本文件 .sh
 *    配置文件 .conf
 * 
 * mount -t iso9660 /dev/dvd  /mnt/test
 * 将/dev/dvd文件挂载到/mnt/test目录
 * -t 指定文件类型
 * 
 * 文件夹存放命令
 * /bin 普通
 * /sbin 命令保存目录，级用户才可以执行的命令
 * /usr/bin 系统软件资源目录 面向普通用户的系统命令
 * /usr/sbin 系统软件资源目录 面向超级用户的系统命令
 * 
 * su 切换到 root  su - name 切换到 其他用户
 * hostname sg 更换主机名
 * pwd 查看当前目录
 * 提示符 管理员是#，普通用户是$
 * 
 * ls 显示文件
 * ls -a . 显示所有文件(包括隐藏)
 * ls -l . 显示文件的详细信息
 * ls -lh . 同上(人性化点)
 * ls -lhi . 比上面都一个节点数
 * ls -dl test  -d显示文件夹本身
 * 
 * d rwx r-x r-x
 * d 文件类型
 * rwx 所有者 可读写执行 (u)
 * r-x 所属者 可读执行 不可写 (g)
 * r-x 其他人 (o)
 *   
 * d directory目录
 * - 文件
 * I 连接
 * 
 * r read    4  => 2^2
 * w write   2  => 2^1
 * x execute 1  => 2^0
 * rwx 对应的数字 7
 * r-x 对应的数字 5
 * rw- 对应的数字 6
 * 
 * 更改文件的权限
 * touch test.txt
 * 创建的文件 默认是6 4 4
 * chmod 766 test.txt 将文件修改为 766
 * chmod g+x text.txt 给文件所属组(g)添加执行文件(x)
 * chmod g-x text.txt 给文件所属组(g)减掉执行文件(x)
 * 
 * mkdir -p b/b 创建子目录 父目录必须存在 加-p就可以处理了
 */