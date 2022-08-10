---
title: ffmpeg笔记
top: false
cover: false
toc: true
mathjax: false
date: 2022-08-10 11:13:39
author:
img:
coverImg:
password:
summary: 一些ffmpeg相关的笔记
tags: ffmpeg
categories: 笔记
---
# ffmpeg笔记

[ffmpeg官方文档（英文）](https://ffmpeg.org/documentation.html)

### 基本格式

（对单个视频）基本格式为 ffmpeg -i input.mp4 「命令」 output.mp4

指定输入输出，然后中间是命令。

注意：
1. 在没有 `-c copy` 命令的情况下，所有处理都会默认给视频再编码一次。（在视频文件较大和不需要重复编码时，请使用 `copy` 命令）
2. `input` `output` 前面都可以有路径名，如 `S:\Videos\input.mp4` 。前面没有路径名的话，输入输出都在同一目录（文件夹）下；默认的工作目录就是当前CMD或PowerShell所在的目录（光标前的那一串： `S:\Videos>` ）。

### 基本转码

```batch
ffmpeg -i input.mkv output.mp4
ffmpeg -i sound.wav sound.mp3
ffmpeg -i test.png test.jpg
# 基本转码；视频、音频、图片（转码时字幕会消失）……
```
### 剪切视频

```batch
ffmpeg -i input.mp4 -ss 00:00:10 -t0 00:00:15 output.mp4
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 output.mp4
# 剪切00:00:10到00:00:15的片段
# 两条命令相等
```
### 制作GIF动图

```batch
ffmpeg -i input.mp4 -ss 00:02:27 -to 00:02:41 -filter_complex [0:v]fps=15,scale=-1:256,split[a][b];[a]palettegen[p];[b][p]paletteuse output.gif
# 制作gif动图（会忽略字幕）
```
### 删除音/视频轨

```batch
ffmpeg -i input.mp4 -an output.mp4
#「-an」删除音频轨
#「-vn」删除视频轨
#「-sn」删除字幕
#「-dn」删除数据流
```

### 提取音/视频

```batch
ffmpeg -i input.mp4 -vcodec copy -an output.mp4
# 提取视频
# 「-vcodec copy」保留源编码格式（视频）
# 「-an」删除音频轨（删1存1等于提取视频轨）
```

```batch
ffmpeg -i input.mp4 -vcodec libx264 -an output.mp4
# 提取视频
# 「-vcodec libx264」强制编码格式为libx264（视频）
```

```batch
ffmpeg -i input.mp4 -acodec copy -vn output.aac
# 提取音频
# 「-acodec copy 」保留源编码格式（音频）
# 「-vn」删除视频轨
```

```batch
ffmpeg -i input.mp4 -acodec libmp3lame -vn output.mp3
ffmpeg -i input.mp4 -vn output.mp3
# 提取音频，强制编码
# -acodec=-codec:c=-c:a【存疑】
# -vcodec=-codec:v=-c:v【存疑】
# -c:=-c=-codec=-c:v+-c:a（包含视频轨和音频轨）【存疑】
```
### 合并多个同类视频

```batch
ffmpeg -f concat -i mylist.txt -c copy
# 合并多个同类视频（需同目录下有「mylist.txt」文本文件）
```

「mylist.txt」内容格式如下：

>file 'chapter1.mp4'
>file 'chapter2.mp4'
>file 'chapter3.mp4'

### 抓取视频缩略图

```batch
ffmpeg -i input.mp4 -vf "fps=2/1" test-%03d.jpg
ffmpeg -i input.mp4 -vf "fps=2/1,scale=1080:720" test-%03d.jpg
ffmpeg -i input.mp4 -vf "fps=2/1,scale=-1:720" test-%03d.jpg
# 抓取缩略图
# 「fps=2/1」：1秒2帧
# 「%03d」：按序生成数字（001...002...）
# 「test-」：前缀
# 「scale=1080:720」：限定图片输出分辨率为720P
# 「scale=-1:720」：同上。「-1」：ffmpeg以后面的数字自动识别、自动补齐（720P，1080P）。（「-1」也有可能是保持比例？）
```
### 录屏

```batch
ffmpeg -hide_banner -loglevel error -stats -f gdigrab -framerate 60 -offset_x 0 -offset_y 0 -video_size 1920x1080 -draw_mouse 1 -i desktop -c:v libx264 -r 60 -preset ultrafast -pix_fmt yuv420p -y S:\Videos\Screen_record\out.mp4
# 录屏，1080P 60FPS（无法录制声音）
# 按Q终止
# 「-y」：覆盖同名文件
# 「S:\Videos\Screen_record\out.mp4」：指定输出目录与文件名
```