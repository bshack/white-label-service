(() => {

    'use strict';

    // ## Load Modules

    const yargs = require('yargs').argv;

    // ## Environment Config

    let isProduction;
    if (yargs.production) {
        isProduction = yargs.production;
    } else {
        isProduction = false;
    }

    // ## paths
    module.exports = {
        // ## Path Variables
        path: {
            // is this a production build?
            isProduction: isProduction,
            // ### script
            script: {
                // glob of all js files including gulp and application
                all: [
                    '*.js',
                    'gulp/tasks/*.js',
                    'gulp/*.js',
                    'app/*.js',
                    'app/**/*.js'
                ],
                // glob of only gulp js files for documentation task
                gulp: [
                    '*.js',
                    'gulp/tasks/*.js',
                    'gulp/*.js'
                ],
                // glob of only application files for documentation task
                source: [
                    'app/*.js',
                    'app/**/*.js'
                ]
            }
        }
    };

})();
