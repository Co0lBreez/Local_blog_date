---
title: Git笔记
top: false
cover: false
toc: true
mathjax: false
date: 2022-08-10 12:46:36
author:
img:
coverImg:
password:
summary: 一些Git相关的笔记
tags: Git
categories: 笔记
---
# Git笔记

[ProGit中文版](https://www.ycmbcd.com/doc/progit/)

## 常见操作

### Git的基本操作


```batch
git init	# 初始化（创建本地库）
git add README.md	# 添加 README.md
git commit -m "我是提交备注"	# 备注，提交
git branch -M main	# 创建 main 分支（branch）；如无此命令，默认为 master 分支
git remote add origin git@github.com:Co0lBreez/Local_blog_date.git	# 添加远程源`origin`
git push -u origin main	# 推送；无第4步，本地是 master 就把 main 换成 master
```

`git add .`可以添加当前目录下的所有文件。

### 远程源相关操作

**当我们想更换远程源推送时，我们可能会想到使用`添加远程源`命令：**

```batch
git remote add origin git@github.com:Co0lBreez/Co0lBreez.github.io.git
```

但这时就会报错：

```batch
$ git remote add origin git@github.com:Co0lBreez/Co0lBreez.github.io.git
error: remote origin already exists.	# 远程源`origin`已存在
```

我们使用`git remote -v`命令查看远程库的信息：

```batch
$ git remote -v
origin  git@github.com:Co0lBreez/Local_blog_date.git (fetch)	
origin  git@github.com:Co0lBreez/Local_blog_date.git (push)	
```

我们需要先删除原有连接，它的命令是：

```batch
git remote rm origin	# 删除`origin`远程源
```

之后就可以继续操作了。  

<br>

其实也可以不用删除连接，直接创建不同的源，比如`origin1` `test`之类的，名字可以自己取：

```batch
git remote add test git@github.com:Co0lBreez/Co0lBreez.github.io.git
```

使用`git remote -v`查看：

```batch
$ git remote -v
origin  git@github.com:Co0lBreez/Local_blog_date.git (fetch)
origin  git@github.com:Co0lBreez/Local_blog_date.git (push)
test    git@github.com:Co0lBreez/Co0lBreez.github.io.git (fetch)
test    git@github.com:Co0lBreez/Co0lBreez.github.io.git (push)
```

这时我们的推送命令就可以这样写：

```batch
git push -u test master
```

但显然不如`git push`直接方便。不知道2个及以上的源，`git push`命令会不会有冲突。
