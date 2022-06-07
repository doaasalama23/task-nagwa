const gulp = require('gulp'),

    del                       = require('del'),
    sourcemaps                = require('gulp-sourcemaps'),
    plumber                   = require('gulp-plumber'),
    sass                      = require('gulp-sass'),
    autoprefixer              = require('gulp-autoprefixer'),
    minifyCss                 = require('gulp-clean-css'),
    purge                     = require('gulp-purgecss'),
    webpack                   = require('webpack-stream'),
    uglify                    = require('gulp-uglify'),
    concat                    = require('gulp-concat'),
    imagemin                  = require('gulp-imagemin'),
    browserSync               = require('browser-sync').create(),
    dependents                = require('gulp-dependents'),
    nunjucksRender            = require('gulp-nunjucks-render'),
    headerComment             = require('gulp-header-comment'),
    rename                    = require('gulp-rename'),
    rtlcss                    = require('gulp-rtlcss'),
    javascriptObfuscator      = require('gulp-javascript-obfuscator'),
//     data                      = require('gulp-data'),


    src_folder                = './src/',
    src_assets_folder         = src_folder + 'assets/',
    dist_folder               = './dist/',
    dist_assets_folder        = dist_folder + 'assets/',
    node_modules_folder       = './node_modules/',
    dist_node_modules_folder  = dist_folder + 'node_modules/',

    node_dependencies         = Object.keys(require('./package.json').dependencies || {}),

    jsSRC = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        './node_modules/apexcharts/dist/apexcharts.min.js',
        './src/assets/js/app.js'
    ];


gulp.task('clear', () => del([ dist_folder ]));

gulp.task('html', () => {
    return gulp.src([ src_folder + 'pages/' + '**/*.html' ], {
        base: src_folder + 'pages/',
        // since: gulp.lastRun('html')
    })
        .pipe(nunjucksRender({
            path: src_folder + 'template/',
            watch: true
        }))
        .pipe(gulp.dest(dist_folder))
        .pipe(browserSync.stream());
});

gulp.task('fontAwesome', () => {
    return gulp.src([
        node_modules_folder + '@fortawesome/fontawesome-free/webfonts/**/*.+(eot|svg|ttf|woff|woff2)'
    ], { since: gulp.lastRun('fontAwesome') })
        .pipe(gulp.dest(dist_assets_folder + 'webfonts'))
});

gulp.task('fonts', () => {
    return gulp.src([
        src_assets_folder + 'fonts/**/*.+(eot|svg|ttf|woff|woff2)'
    ], { since: gulp.lastRun('fonts') })
        .pipe(gulp.dest(dist_assets_folder + 'fonts'))
});


gulp.task('sass', () => {
    return gulp.src([
        src_assets_folder + 'scss/**/*.scss'
    ], { since: gulp.lastRun('sass') })
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(dependents())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(headerComment(`
            Generated on <%= moment().format('YYYY-MM-DD') %>
            Author: <%= _.capitalize(pkg.author) %>
            Credits: <%= _.capitalize(pkg.credit) %>
        `))
        .pipe(gulp.dest(dist_assets_folder + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('sass-rtl', () => {
    return gulp.src([
        src_assets_folder + 'scss/**/*.scss'
    ], { since: gulp.lastRun('sass-rtl') })
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(dependents())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(rtlcss())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(rename({suffix: '-rtl'})) // Append "-rtl" to the filename.
        .pipe(sourcemaps.write('.'))
        .pipe(headerComment(`
            Generated on <%= moment().format('YYYY-MM-DD') %>
            Author: <%= _.capitalize(pkg.author) %>
            Credits: <%= _.capitalize(pkg.credit) %>
        `))
        .pipe(gulp.dest(dist_assets_folder + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('purge', () => {
    return gulp.src( [
        dist_assets_folder + 'css/**/*.css'
    ], { since: gulp.lastRun('purge') })
        .pipe(purge({
            content: [ dist_folder + '/**/*.html']
        }))
        .pipe(gulp.dest( dist_assets_folder + 'css'))
});


gulp.task('js', () => {
    return gulp.src(jsSRC)
        .pipe(plumber())
        // .pipe(webpack({
        //     mode: 'production'
        // }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(javascriptObfuscator({
            compact:true,
            sourceMap: true
        }))
        .pipe(headerComment(`
            Generated on <%= moment().format('YYYY-MM-DD') %>
            Author: <%= _.capitalize(pkg.author) %>
            Credits: <%= _.capitalize(pkg.credit) %>
        `))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_folder + 'js'))
        .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src([
        src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico|webmanifest)'
    ], { since: gulp.lastRun('images') })
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(dist_assets_folder + 'images'))
        .pipe(browserSync.stream());
});

gulp.task('browser-config', () => {
    return gulp.src([
        src_assets_folder + 'images/favicon/**/*.xml'
    ], { since: gulp.lastRun('browser-config') })
        .pipe(gulp.dest(dist_folder))
});

// gulp.task('util', () => {
//     return gulp.src([
//         node_modules_folder + 'intl-tel-input/build/js/utils.js'
//     ], { since: gulp.lastRun('util') })
//         .pipe(gulp.dest(dist_assets_folder + 'js'))
// });

// gulp.task('vendor', () => {
//     if (node_dependencies.length === 0) {
//         return new Promise((resolve) => {
//             console.log("No dependencies specified");
//             resolve();
//         });
//     }
//
//     return gulp.src(node_dependencies.map(dependency => node_modules_folder + dependency + '/**/*.*'), {
//         base: node_modules_folder,
//         since: gulp.lastRun('vendor')
//     })
//         .pipe(gulp.dest(dist_node_modules_folder))
//         .pipe(browserSync.stream());
// });


gulp.task('build', gulp.series('clear', 'html', 'sass', 'sass-rtl', 'js', 'images', 'fontAwesome','fonts', 'browser-config'));
gulp.task('dev', gulp.series('html', 'sass', 'sass-rtl', 'js'));

gulp.task('serve', () => {
    return browserSync.init({
        server: {
            baseDir: [ 'dist' ]
        },
        port: 3000
    });
});


gulp.task('watch', () => {
    const watchImages = [
        src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)'
    ];

    // const watchVendor = [];
    //
    // node_dependencies.forEach(dependency => {
    //     watchVendor.push(node_modules_folder + dependency + '/**/*.*');
    // });

    const watch = [
        src_folder + '**/*.+(html|js|scss|css)',
    ];

    gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
    gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
    // gulp.watch(watchVendor, gulp.series('vendor')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));