const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const bs = require('browser-sync');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const path = {
    css: {
        input: './assets/src/scss/**/*.scss',
        output: './assets/dist/css/'
    },
    js: {
        input: './assets/src/js/**/*.js',
        output: './assets/dist/js/'
    }
}

function scss() {
    src(path.css.input)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))

    .pipe(dest(path.css.output))
}

function js() {
    return src(path.js.input)
        .pipe(dest(path.js.output))
}

function browserSync() {
    bs({
        server: {
            baseDir: './'
        },
        notify: true
    });
}

// BrowserSync reload 
function browserReload() {
    return bs.reload;
}

function watchFiles() {
    watch(path.css.output, parallel(scss))
        .on('change', browserReload());

    watch(path.js.output, parallel(js))
        .on('change', browserReload());;
}

const watching = parallel(scss, js, watchFiles, browserSync);

exports.js = js;
exports.css = scss;
exports.default = watching;