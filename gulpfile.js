var gulp = require('gulp'),
    runsequence = require('run-sequence'),
    requireDir = require('require-dir');

requireDir('./src/assets/gulp-config', { recurse: true });

gulp.task('default', function() {
    runsequence('mergeJson');
})
/**
 *  将一种
 */

gulp.watch('./src/app/**/*.json', ['mergeJson']);
