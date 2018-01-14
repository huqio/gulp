// task 创建一个任务
// src 请求一个地址的文件
// dest 处理完成以后输出的目录
// watch 监听一个文件, 在它改动的时候再次运行任务
// run 运行一个task任务

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    cssnano = require("gulp-cssnano"),
    less = require("gulp-less"),
    cheerio = require("gulp-cheerio"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin")
//压缩js
gulp.task("script", function() {
    gulp.src("./js/*.js").pipe(uglify()).pipe(gulp.dest("./build/js"));
})
//压缩css
gulp.task("css", function() {
    gulp.src("./css/*.less").pipe(less()).pipe(cssnano()).pipe(gulp.dest("./build/css"))

})
//压缩html
gulp.task("html", function() {
    gulp.src("./*.html").pipe(cheerio(function($) {
        for (var key in $("link")) {
            if (isNaN(key)) break;
            $("link")[key].attribs["rel"] = $("link")[key].attribs["rel"].replace('/less', "");
            $("link")[key].attribs["href"] = $("link")[key].attribs["href"].replace('less', "css");
        }
        $("script[src='js/less.js']").remove();
    })).pipe(htmlmin({ collapseWhitespace: true, removeComments: true })).pipe(gulp.dest("./build"))

})
//压缩图片
gulp.task("img", function() {
    gulp.src("./images/*.*").pipe(imagemin()).pipe(gulp.dest("./build/images"));
})

//搬运字体
gulp.task("font", function() {
    gulp.src("./fonts/*.*").pipe(gulp.dest("./build/fonts"));
})

gulp.task("default", ["script", "css", "html", "img", "font"], function() {
    gulp.watch(['./js/*.js'], ["script"])
    gulp.watch(['./css/*.less'], ["css"])
    gulp.watch(['./*.html'], ["html"])
    gulp.watch(['./images/*.*'], ["img"])
    gulp.watch(['./fonts/*.*'], ["font"])
})