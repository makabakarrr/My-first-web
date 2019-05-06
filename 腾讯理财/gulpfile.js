/*****gulp的所有任务要放在这个文件内部，名称不能改变****/
/*var gulp = require('gulp');//声明依赖的加载项，为gulp本身

gulp.task('hello',function(){
    //js代码
    console.log('Hello World!');
});//用gulp，定义一个任务（任务名称，任务方法）*/
var gulp = require('gulp');
var rev = require('gulp-rev'); //为每个文件添加版本号，版本号是根据每个文件的内容算出来的哈希码，内容发生改变，哈希码也跟着改变
var revReplace = require('gulp-rev-replace');//更新引用
var useref = require('gulp-useref');//根据html文件里的注释来合并相关的文件（.css,.js）
var filter = require('gulp-filter');//相关于过滤器，筛选和恢复
var uglify = require('gulp-uglify');//压缩Js文件
var csso = require('gulp-csso');//压缩css文件

gulp.task('default',function(){   //default任务在用gulp执行的时候可以不输入任务名称
    var jsFilter = filter('**/*.js',{restore: true});
    var cssFilter = filter('**/*.css',{restore: true});
    var indexHtmlFiter = filter(['**/*','!**/index.html'],{restore: true});//'**/*'所有文件，'!**/index.html'不包括index.html文件

    return gulp.src('src/index.html')//将要处理的文件拿出来  .pipe()对文件流进行处理
        .pipe(useref())//根据html文件内部的注释来对相关文件进行合并
        .pipe(jsFilter)//取出js文件
        .pipe(uglify())//压缩js文件
        .pipe(jsFilter.restore)//将处理后的js文件放回置文件流
        .pipe(cssFilter)//取出css文件
        .pipe(csso())//对css文件进行压缩
        .pipe(cssFilter.restore)//将处理后的css文件放回至文件流
        .pipe(indexHtmlFiter)//取出除index.html之外的所有文件
        .pipe(rev())//为这些文件添加版本号
        .pipe(indexHtmlFiter.restore)//恢复至文件流
        .pipe(revReplace())//对文件里的引用进行更新，因为添加了版本号改变了文件名
        .pipe(gulp.dest('dist'));//对文件的处理结束，将文件流送到dist的目录下
});