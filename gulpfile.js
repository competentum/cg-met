
'use strict';

var gulp = require('gulp');
var args   = require('yargs').argv;
var gutil = require("gulp-util");
var path = require('path');
var file = require('gulp-file');
var fs = require( 'vinyl-fs' );
var ftp = require( 'vinyl-ftp' );
var models = require('./models.json');


var webpack = require('webpack');
var webpackDevServer = require( 'webpack-dev-server' );
var webpackDevConfig = require( './webpack.config.js' );
var webpackConfig = require('./webpack.config2.js');
var ftpConf = {
    host:     'devdemo.competentum.com',
    user:     'manager',
    password: '1nv@d3r$mu$td13',
    parallel: 10,
    log: gutil.log
};

gulp.task( 'server', function() {
    var server = new webpackDevServer( webpack( webpackDevConfig ) );

    server.listen( 3535 );
} );

gulp.task('build', function (callback) {
    var wpConfig = Object.create(webpackConfig);

    // run webpack
    webpack(wpConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('build', err);
        }
        gutil.log('[build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('deploy', ['copy', 'build'], function () {
    var conn = ftp.create(ftpConf);
    gulp.src(['./build/models/**'])
        .pipe(conn.newer('/CL_STEC_Conv/models'))
        .pipe(conn.dest('./CL_STEC_Conv/models'));
    gulp.src(['./build/index.html'])
        .pipe(conn.newer('/CL_STEC_Conv'))
        .pipe(conn.dest('./CL_STEC_Conv'));;
});

gulp.task('copy', function () {
    //gulp.src(['./models/**/index.html', './models/**/tex/**', './models/**/sound/**']).pipe(gulp.dest('./build/models/'));
    var modelsListHTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Models</title>
        </head>
        <body>
            <ul>`;
    models.forEach(function(model){
        modelsListHTML += `<li><a href="models/${model.name}">${model.name}: ${model.title}</a></li>`;
        gulp.src(`./models/${model.name}/tex/**`).pipe(gulp.dest(`./build/models/${model.name}/tex`));
        gulp.src(`./models/${model.name}/tex/**`).pipe(gulp.dest(`./build/models/${model.name}/tex`));
        gulp.src(`./models/${model.name}/sound/**`).pipe(gulp.dest(`./build/models/${model.name}/sound`));
        file('index.html', `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${model.title}</title>
            <link rel="stylesheet" href="../common/bundle.css"/>
            <link rel="stylesheet" href="bundle.css"/>
        </head>
        <body id="body">
            <script src="../common/bundle.js"></script>
            <script src="bundle.js"></script>
        </body>
        </html>`)
            .pipe(gulp.dest(`./build/models/${model.name}/`));
    });
    modelsListHTML += `</ul>
        </body>
        </html>`;
    file('index.html', modelsListHTML).pipe(gulp.dest(`./build/`));;
});

gulp.task('default', ['build', 'copy', 'deploy']);