/**
 **@disc:将中文json文件翻译为其他语言json文件
 **@date:2017/10/30 23:00
 **@author:zb
 **@method:
 **@params:
 */

var gulp = require('gulp'),
    i18n = require('../functions/i18n'),
    rename = require('gulp-rename') ;

gulp.task('i18nJson',function() {
      var languges=['en'

          ,'yue','wyw','jp','kor','fra','spa','th','ara','ru','pt','de',
      'it','el','nl','pl','bul','est','dan','fin','cs','rom','slo','swe','hu','cht','vie'

      ];
      for(var languge in languges){
        gulp.src('./src/assets/i18n/zh-CN.json')
          .pipe(
            i18n('',languges[languge])
          )
          .pipe(rename({
            dirname: "i18n",
            basename: languges[languge],
            extname: ".json"
          }))
          .pipe(gulp.dest('./src/assets/'));
      }
  })



