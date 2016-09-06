'use strict';

// ## Load Modules

const gulp = require('gulp');
const server = require('gulp-express');

// ## Environment Config

const config = require('../config');

// ## Watch Task
gulp.task('watch', ['server'], () => {

    //watch js
    gulp.watch(
        config.path.script.all,
        ['script']
    );

    gulp.watch(['app/app.js', 'app/routes/**/*.js'], [server.run]);

});

gulp.task('server', function() {
    // Start the server at the beginning of the task
    server.run(['app/app.js']);
});
