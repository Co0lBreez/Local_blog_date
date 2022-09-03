---
title: 搭建个人Blog的一些代码指令集
date: 2022-07-31 05:39:06
tags: 代码指令集
summary: 本文主要是些命令（Git、Hexo）的集合，并不起指导作用，只是事后整理出来，供个人备忘
password: 
categories: 笔记
---

# 搭建个人Blog的一些代码指令集

## 写在前面

本博客系统基于 GitHub Pages+Hexo 搭建。

本文主要是些命令（Git、Hexo）的集合，并不起指导作用，只是事后整理出来，供个人备忘。

## 基本流程

| 配置 Git | 创建库（GitHub） | 连接库 | 配置 Hexo | 部署 Hexo | 自定义 | 完成 |
| -------- | ---------------- | ------ | --------- | --------- | ------ | ---- |
| ->       | ->               | ->     | ->        | ->        | ->     |      |

上述流程又可简化为两步

| Git 与 GitHub 库的连接 | Hexo 的配置与部署 |
| ---------------------- | ----------------- |
| ->                     |                   |

## 代码命令行

```batch
# 本地用户名
git config --global user.name "Co0lBreez"
# 本地用户邮箱
git config --global user.email  "asmortal@qq.com"
# 密钥
ssh-keygen -t rsa -C "asmortal@qq.com"
# 验证连接
ssh -T git@github.com
```



```batch
# Git 初始化
git init
# 提交文件（非上传）
git add README.md	# git add . (add 当前目录下所有文件)
#对提交进行备注
git commit -m "备注内容"
#连接到远程仓库
git remote add origin git@github.com:Co0lBreez/Co0lBreez.github.io.git
# 上传提交的文件
git push -u origin master
```



```batch
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

在本地部署OK后（`hexo server` 命令访问http://localhost:4000/ 没有问题）

1.安装 hexo-deployer-git（部署插件）

   ```batch
   npm install hexo-deployer-git --save
   ```

2.修改_config.yml文件（为了能让 Hexo 能部署到 GitHub Pages 上）

 ```yaml
   deploy:  
     type: git
     repo: https://github.com/Co0lBreez/Co0lBreez.github.io.git	# 库（repository）的地址
     branch: master	#分支（branch）名
     message: 我崩溃了(〃￣︶￣): {{ now('YYYY-MM-DD HH:mm:ss') }})	# 自定义提交信息
 ```

   3.更新与部署

```batch
hexo clean	# hexo c 清除缓存文件 (db.json) 和已生成的静态文件 (public)
hexo generate	# hexo g 生成静态文件
hexo deploy	# hexo d 部署网站	
```

## 常见报错的处理

> error: failed to push some refsto '远程仓库地址'

执行以下命令

```batch
git pull --rebase origin master	# 拉取
git push -u origin master	#	推送
```

## 一些帮助文档

https://github.com/blinkfox/hexo-theme-matery/blob/develop/README_CN.md

https://hexo.io/zh-cn/docs/