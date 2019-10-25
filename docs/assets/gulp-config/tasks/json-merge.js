/**
 **@disc:描述文件
 **@date:2017/10/30 22:54
 **@author:zb
 **@method:
 **@params:
 */
var gulp = require('gulp'),
  less= require('gulp-less'),
  mergejson= require('gulp-merge-json');


gulp.task('lessToCss',function(){
  gulp.src('./src/styles/alain/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/styles/alain-css'))
})

/**
 * 合并各个子目录下的语言包文件，生成独立的语言包
 */
gulp.task('mergeJson',function(){
  gulp.src('./src/app/**/*.json')
    .pipe(mergejson({fileName:'zh-CN.json'
    }))
    .pipe(gulp.dest('./src/assets/i18n'));
})
