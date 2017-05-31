var gulp = require('gulp'),
    // js min
    uglify = require('gulp-uglify'),
    // 文件合并
    // concat = require('gulp-concat'),
    // cssmin = require('gulp-clean-css'),
    // htmlmin = require('gulp-htmlmin'),
    // commonjs
    browserify = require("browserify"),
    // 生成source map
    sourcemaps = require("gulp-sourcemaps"),
    // gulp stream
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    // es6
    // babel = require('gulp-babel'),
    // ver文件
    rev = require('gulp-rev'),
    // html 版本号
    // revCollector = require('gulp-rev-collector'),
    // 重命名文件
    rename = require('gulp-rename'),
    
    babelify = require('babelify'),
    es = require('event-stream');

var entries = [
    './App.js'
]

gulp.task('react-compile', () => {
    
    //遍历入口文件
    var tasks = entries.map(function(entry, index) {
        var browser = browserify({
            entries: [entry]
        });
        
        // es6 transform; react transform
        return browser.transform('babelify', {presets: ['es2015', 'react']})
            .bundle()
            .pipe(source(entry))            
            .pipe(buffer())
            // .pipe(sourcemaps.init({ loadMaps: true }))
            // .pipe(uglify())
            // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    });

    //创建一个合并流
    return es.merge.apply(null, tasks);
});

// 第二个参数标识在此任务执行之前需要执行的task
gulp.task('react-dev', ['react-compile'], () => {
    gulp.watch('page/*', ['react-compile']);
});

gulp.task('default', ['react-dev'], function () {
    console.log('Gulp task done.')
});