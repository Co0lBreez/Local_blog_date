---
title: Python笔记
top: false
cover: false
toc: true
mathjax: false
date: 2022-08-08 21:42:40
author:
img:
coverImg:
password:
summary: 一些Python相关的笔记
tags: Python
categories: 笔记
---
# Python笔记
[Python官方中文文档](https://docs.python.org/zh-cn/3/index.html)
## Python的简单应用

### 图片质量压缩

```python

from PIL import Image
import os

# 要使用此代码，需导入`Image`模块：`pip install Image`

# 欲处理的图片的目录，注意结尾一定要以`/`结束
# file_in = "S:/Projects/Python/app/input/"
file_in = "S:/Pictures/1/"

# `os.path.splitext`：从路径中拆分扩展名。`suffix`：后缀。
# `suffix`只能处理单个文件，因为文件夹没有后缀
# path, suffix = os.path.splitext(file_in)

# 打印当前工作目录
# print("当前工作目录：", os.getcwd())


# 压缩质量（0~100，全损-无损），最好保持50以上，画质无太大损失。
pic_quality = 60
# 获取`file_in`内的文件列表
workdir = os.listdir(file_in)

# 在`workdir`内的文件（file）执行以下命令：
for file in workdir:
    # 文件名（路径）,后缀。
    path, suffix = os.path.splitext(file)
    # `file_in + file` ：路径名 + 文件名
    img = Image.open(file_in + file)
    # 文件名（路径）_`pic_quality`,后缀
    file_out = "{}_{}{}".format(path, pic_quality, suffix)
    # 文件路径+`file_out`,质量
    img.save(file_in + file_out, quality=pic_quality)
    print("完成了对 " + file + " 的压缩")

print("输出目录为：" + file_in)
```
这段代码对jpeg格式的图片有效，但对PNG格式的图片无效。如果想要处理PNG格式的图片，我们需要改2个地方：
1. 把图片转化为jpg格式：
   ```python
   file_out = "{}_{}{}".format(path, quality, '.jpg')
   ```
2. 将`RGBA`转化为`RGB`，在`img`行下新增：
   ```python
   img2 = img.convert('RGB')
    ```

逻辑上实现起来很简单，那就是加个`if` `else`条件判断，判断图片的后缀是否为`.jpg`。

如果……那么执行……；否则……

它的代码应该是这样的：

```python
from PIL import Image
import os

# 要使用此代码，需导入`Image`模块：`pip install Image`

# 欲处理的图片的目录，注意结尾一定要以`/`结束
# file_in = "S:/Projects/Python/app/input/"
file_in = "S:/Pictures/1/"

# `os.path.splitext`：从路径中拆分扩展名。`suffix`：后缀。
# `suffix`只能处理单个文件，因为文件夹没有后缀
# path, suffix = os.path.splitext(file_in)

# 打印当前工作目录
# print("当前工作目录：", os.getcwd())


# 压缩质量（0~100，全损-无损），最好保持50以上，画质无太大损失。
pic_quality = 60
# 获取`file_in`内的文件列表
workdir = os.listdir(file_in)

# 在`workdir`内的文件（file）执行以下命令：
for file in workdir:
    # 文件名（路径）,后缀。
    path, suffix = os.path.splitext(file)
    # 判断文件后缀是否为`.jpg`，因为这段代码只能处理`jpg`格式的图片
    if suffix == ".jpg":
        # `file_in + file` ：路径名 + 文件名
        img = Image.open(file_in + file)
        # 文件名（路径）_`pic_quality`,后缀
        file_out = "{}_{}{}".format(path, pic_quality, suffix)
        # 文件路径+`file_out`,质量
        img.save(file_in + file_out, quality=pic_quality)
        print("完成了对 " + file + " 的压缩")
    # 新增2处改动，得以处理非`jpg`格式的图片
    else:
        img = Image.open(file_in + file)
        # 更改`RGBA`为`RBG`（删除透明通道）
        img_not_jpg = img.convert("RGB")
        # 转换为`jpg`格式的图片
        file_out = "{}_{}{}".format(path, pic_quality, ".jpg")
        img_not_jpg.save(file_in + file_out, quality=pic_quality)
        print("完成了对 " + file + " 的压缩")

print("输出目录为：" + file_in)
```

这时你可能想要完善一下它的功能，比如处理出来的图片都是和未处理的图片放在一个目录下的，也就是放在一起的。你可能想要把它们单独存放一个目录，方便Copy，而不是按住Ctrl用鼠标一个个点选……

这时我们需要新增两行代码，新建文件夹`os.makedirs()`，以及判断它是否已经存在`os.path.exists()`；还有一些必要的逻辑判断。这时它的代码应该是这样的：

```python
from PIL import Image
import os

# 要使用此代码，需导入`Image`模块：`pip install Image`

# 欲处理的图片的目录，注意结尾一定要以`/`结束
# file_in = "S:/Projects/Python/app/input/"
file_in = "S:/Pictures/1/"

# `os.path.splitext`：从路径中拆分扩展名。`suffix`：后缀。
# `suffix`只能处理单个文件，因为文件夹没有后缀
# path, suffix = os.path.splitext(file_in)

# 打印当前工作目录
# print("当前工作目录：", os.getcwd())


# 压缩质量（0~100，全损-无损），最好保持50以上，画质无太大损失。
pic_quality = 40

# 获取`file_in`内的文件列表
workdir = os.listdir(file_in)
# 输出文件夹名，仍旧以`/`结尾，以便拼接
out_path_name = "new_" + str(pic_quality) + "/"
# 输出路径
pic_out = file_in + out_path_name
# 判断`pic_out`目录是否已存在
if os.path.exists(pic_out):
    print("文件目录已存在，跳过创建……")
else:
    os.makedirs(pic_out)
# 在`workdir`内的文件（file）执行以下命令：
for file in workdir:
    # 文件名（路径）,后缀。
    path, suffix = os.path.splitext(file)
    # 判断文件是否有后缀（有后缀就是文件，无后缀就是文件夹。`Image.open`打开非文件的文件目录时会报错）
    if suffix:
        # 判断文件后缀是否为`.jpg`，因为这段代码只能处理`jpg`格式的图片
        if suffix == ".jpg":
            # `file_in + file` ：路径名 + 文件名
            img = Image.open(file_in + file)
            # 文件名（路径）_`pic_quality`,后缀
            file_out = "{}_{}{}".format(path, pic_quality, suffix)
            # 原名保存（如果你不喜欢上方的命名方式）
            file_out_original_name = "{}{}".format(path, suffix)
            # 文件路径+`file_out`,质量
            img.save(pic_out + file_out_original_name, quality=pic_quality)
            print("完成了对 " + file + " 的压缩")
        # 新增2处改动，得以处理非`jpg`格式的图片
        else:
            img = Image.open(file_in + file)
            # 更改`RGBA`为`RBG`（删除透明通道）
            img_not_jpg = img.convert("RGB")
            # 转换为`jpg`格式的图片
            file_out = "{}_{}{}".format(path, pic_quality, ".jpg")
            # 原名保存（如果你不喜欢上方的命名方式）
            file_out_original_name = "{}{}".format(path, ".jpg")
            img_not_jpg.save(pic_out + file_out_original_name, quality=pic_quality)
            print("完成了对 " + file + " 的压缩")
# 上述流程完成时输出的文字：
print("输出目录为：" + pic_out)

```
### 图片按比例缩放

上面的代码只是实现了对图像品质的压缩，而非尺寸。

`resize`可以调整图片的尺寸，但需要定义宽高的值，如：

```python
img.resize((1920,1080))
```
我想的是有没有一种函数能按比例缩放，就是像在PS里面一样，只要勾选 `保持比例` ，那么在调整宽高的一个值时，另一个值就会自动改变。换到Python里就是定义其中的一个值就行了，但我试了，会报错……

搜了一下没有现成能用的，但还是有一种解决方法，那就是定义两个变量（即长和宽），首先是确定分辨率，比如720或1080（这个值可以自定义），这是第一个变量，高度（也可以是宽度，后面同理）；然后计算缩放比，缩放比乘以宽度就是第二个变量。

光说可能有点抽象……下面的代码一看就明白：

```python
# 设置你要缩放的分辨率（高度）
size = 1080
# 获取宽高
width, height = img.size[0], img.size[1]
# 缩放率
scale = size / height
# 缩放后的宽度
width_size = int(width * scale)
# resize
img_resize = img.resize((width_size, size))
# 文件路径+`file_out`,质量
img_resize.save(pic_out file_out_original_name, quality=pic_quality)
```
>`img.size` 的值是一个列表，如`print(img.size)` 会返回一个 `(1920,1080)`的值。 `img.size[0]` 的意思就是取其中的第一个值，也就是宽。

代码的一些地方可以优化，比如重复的代码、代码块太多，可以自定义函数，然后调用，不过我还不会这些……但这里还可以这样优化一下：

```python
if os.path.exists(pic_out):
    print("文件目录已存在，跳过创建……")
else:
    os.makedirs(pic_out)
```
优化为：

```python
if not os.path.exists(pic_out):
    os.makedirs(pic_out)
```
由 `if` `else` 优化为了 `if` 。主要是不知道 `if not` 这种用法……

## OS模块


判断是否是文件目录（输出布尔值〔True、False〕）

```python
os.path.isdir('S:/test')
```
判断目录是否存在（输出布尔值）

```python
os.path.exists('S:/test')
```

获取文件所在目录

```python
os.path.dirname()
```

获取文件大小（字节数)

```python
os.path.getsize()
```

获取文件名和后缀（完整文件名）

```python
os.path.basename()
```



