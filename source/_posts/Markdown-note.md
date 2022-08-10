---
title: Markdown笔记
top: false
cover: false
toc: true
mathjax: false
date: 2022-08-10 12:34:04
author:
img:
coverImg:
password:
summary: 一些Markdown相关的笔记
tags: Markdown
categories: 笔记
---
# Markdown笔记
官方文档：
1. [Markdown基本语法](https://markdown.com.cn/basic-syntax/)
2. [Markdown扩展语法](https://markdown.com.cn/extended-syntax/)
## 基本语法

**换行但不分段（*不留空行*）**

在句末敲一下按回车即可，例：

```markdown
醉里偶摇桂树， 
人间换作凉风。
```
>醉里偶摇桂树， 
>人间换作凉风。

**分段换行（*留空一行*）**

句末敲两下回车：
```markdown
醉里偶摇桂树，

人间唤作凉风。
```
>醉里偶摇桂树，
>
>人间唤作凉风。

<font size=2>_代码页留空多行不会有额外的效果，如有需要，可使用换行符`<br>`_</font>

### 强调

>\*\***加粗**\**
>**\_\_加粗\_\_**

>\**斜体*\*
>_\_斜体_\_

加粗和斜体在VS Code内也可以`Ctrl+B`和`Ctrl+I` 实现（需要VS Code内的 `Markdown All in One` 插件）。
<!-- <font size=2>*某些浏览器好像不支持下划线 _ 渲染，所以用星号 \* 比较好一点，星号 \* 可以套娃使用。*</font> -->

`Markdown All in One`：*All in One*
`Markdown Preview Enhanced`：_实时预览_
`Paste Image`：_插入图片_

~~“所见即所得”~~    ✗
“实时预览”  ✓

### 列表

输入`1.`按空格自动生成列表，输入内容后敲回车自动生成序号`2.`。可以按`TAB`缩进生成子列表，如：

>   1. 第一行
>   2. 第二行
>        1. 第二行1
>        2. 第二行2

### 插入图片

![我是图片下方的注释](/medias/logo.png "我是鼠标移动到图片上方时所显示的内容")

使用`![]()`命令：
```markdown
![我是图片下方的注释](/medias/logo.png)

![我是图片下方的注释](/medias/logo.png "我是鼠标移动到图片上方时所显示的内容")
```
<font size=2>*Markdown All in One 插件会在输入()后自动弹出当前工作区内的图片列表以供选择*</font>

`[]`内是注释，`()`内是图片链接，它可以是本地、站内路径，也可以是网络链接。链接后可以接空格+双引号` ""`，再写注释：

```markdown
![兔子](https://hddesktopwallpapers.in/wp-content/uploads/2015/08/little-bunny-sweet-picture.jpg "Bunny")
```

![兔子](https://hddesktopwallpapers.in/wp-content/uploads/2015/08/little-bunny-sweet-picture.jpg "Bunny")


### 表格
```markdown
| 表头1  | 表头2  |  表头3 |
| ------ | :----: | -----: |
| 1.0212 | 1.0154 | 1.0578 |
| 1.0854 | 1.1132 | 1.0587 |
```
两侧的竖线可以不用加，格式化文档后VS Code会帮我们自动补齐；`_`下划线输3个就够了。第二行 `___|___|___` 是对齐方式，默认左对齐。可以通过添加冒号`:`的方式改变对齐方式。`___|:___:|___:`。两个冒号`:`是居中对齐，右冒号`:`是右对齐。
<font size=2>*作用不大，而且我这里浏览器预览好像也没有按我想的那样渲染出来，仍旧是左对齐……*</font>

| 表头1  | 表头2  |  表头3 |
| ------ | :----: | -----: |
| 1.0212 | 1.0154 | 1.0578 |
| 1.0854 | 1.1132 | 1.0587 |

<br>

### 为文字添加链接

1. 选中欲添加链接的文字
<div style="background-color:hsl(190,100%,40%,0.4);width:2.6em;color:hsl(255,100%,100%)">bilibili</div>

2. 将复制好的链接按`Ctrl+V`粘贴，`Markdown All in One` 会自动帮我们生成： 
```markdown
[bilibili](https://www.bilibili.com/)
```

[bilibili](https://www.bilibili.com/)

### 代码块

>\```python
>msg = "Hello world"
>print(msg)
>\```

```python
msg = "Hello world"
print(msg)
```

