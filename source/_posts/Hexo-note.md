---
title: Hexo笔记
top: false
cover: false
toc: true
mathjax: false
date: 2022-08-10 12:40:34
author:
img:
coverImg:
password:
summary: 一些Hexo相关的笔记
tags: Hexo
categories: 笔记
---

# Hexo笔记

[Hexo官方中文档](https://hexo.io/zh-cn/docs/index.html)

## 常用操作

**Hexo 的基本操作有4步：**

```batch
hexo clean	# 清理
hexo generate	# 生成
hexo server	# 生成本地服务器预览
hexo deploy	# 本地预览没有问题后部署（部署至云端）
```

可简写为：

```batch
hexo clean && hexo generate && hexo server
```
这样写也是没毛病的：

```batch
hexo c && hexo g && hexo s
```

`hexo deploy`只能单独部署（不能跟在其他命令后面）……好像

<br>

### 基于 gulp 插件的压缩优化

```batch
hexo clean && hexo generate && gulp && hexo generate
```

多了一步`压缩再生成`的步骤。完成后使用`hexo deploy`部署。

### 更新Hexo与插件

```batch
npm update
cnpm update
```
用国内镜像源的可使用`cnmp update`命令

### 查看已安装插件列表

```batch
npm list
cnpm list
```
### 卸载插件

```batch
npm uninstall hexo-qiniu-sync@1.4.7
cnpm uninstall hexo-qiniu-sync@1.4.7
```