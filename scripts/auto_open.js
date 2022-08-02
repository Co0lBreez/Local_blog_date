// 新建文章自动打开本地Markdown编辑器

var spawn = require('child_process').exec;

hexo.on('new', function (data) {
    spawn('start  "S:\Program Files\Typora\Typora.exe" ' + data.path);
});
// 需设置默认打开.md文件的应用为Typora
// 执行hexo cl && hexo g -d，部署到GitHub