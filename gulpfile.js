var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ngConstant = require('gulp-ng-constant');
var jeditor = require("gulp-json-editor");
var gp_concat = require('gulp-concat');
var removeCode = require('gulp-remove-code');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path');
var imagemin = require('gulp-imagemin');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');


var libFilePath = [
    './src/lib/ionic/**/ionic.min.css',
    './src/lib/ionic/**/*.eot',
    './src/lib/ionic/**/*.svg',
    './src/lib/ionic/**/*.ttf',
    './src/lib/ionic/**/*.woff',
    './src/assets/**/*.jpg',
    './src/assets/**/*.png'
];

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', ['sass'], function () {
    gulp.watch(paths.sass, ['sass']);
});

//复制发布环境的图片样式文件
gulp.task('copy-asset', function () {
    return gulp.src(libFilePath)
        .pipe(gulp.dest('www/assets'));
});

//合并压缩css文件
gulp.task('sass', function () {
    return gulp.src(['src/theme/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('www/assets/css'));
});

/**
 * 把www/scripts目录下的所有html文件合并成js代码,由于直接合并时生成的路径需要带上scripts,
 * 所以不直接取www/scripts目录,而是取www目录,再忽略除了scripts的其他目录
 */
gulp.task('templatecache', function (done) {
    gulp.src(['./src/**/*.html', '!./www/index.html', '!./www/lib/**/*.html'])
        .pipe(templateCache({standalone: false, module: 'myApp'}))
        .pipe(gulp.dest('./src/pages'))
        .on('end', done);
});


//合并压缩丑化Js
gulp.task('scripts', function () {
    return gulp.src(['./src/pages/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('www/build')) // write source file for debug
});

// 添加templates.js的引用到index.html
gulp.task('inject-templates', function (done) {
    gulp.src('./www/index.html')
        .pipe(inject(gulp.src('./www/scripts/templates.js', {read: false}), {relative: true}))
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

// 合并index.html中引用的需要合并的js文件
gulp.task('useref', function (done) {
    var assets = useref.assets();
    gulp.src('./src/index.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

// 严格依赖注入
gulp.task('annotate', function () {
    return gulp.src(['./www/build/vendor.js', './www/build/app.js'])
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest('./www/build'));
});

// js代码压缩混淆
gulp.task('js-uglify', function () {
    gulp.src(['./www/build/vendor.js', './www/build/app.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./www/build'));
});

// 压缩图片
gulp.task('image-min', function () {
    gulp.src(['./www/img/*', './www/img/**/*'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('./www/img'));
});

//清除自动生成的目录文件
gulp.task('clean', function () {
    return gulp.src(['www/build/*', 'www/assets/*']).pipe(clean());
});


gulp.task('run', function (callback) {
    runSequence('clean', 'copy-asset', 'sass', 'templatecache', 'useref', 'scripts', 'useref', 'annotate', 'js-uglify', callback);
});

