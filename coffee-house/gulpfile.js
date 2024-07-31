import gulp from 'gulp';
import browserSync from 'browser-sync';
import concatFile from 'gulp-concat';
import clean from 'gulp-clean';
import htmlmin from 'gulp-htmlmin';
import autoprefixer from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import compressCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify-es';
import babel from 'gulp-babel';
import avif from 'gulp-avif';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

const { src, dest, watch, parallel, series } = gulp;
const browserSyncInstance = browserSync.create();

const staticFiles = () => {
    return src('src/*.{json,png,ico,webmanifest}').pipe(dest('dist/'));
};

const staticAssets = () => {
    return src(['src/assets/video/coffee.mp4']).pipe(dest('dist/assets/video'));
};

const html = () => {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
};

const sassCompiler = gulpSass(sass);

const mainStyles = () => {
    return src(['src/css/main.scss'])
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: false }))
        .pipe(compressCSS({ compatibility: 'ie8' }))
        .pipe(concatFile('main.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSyncInstance.stream());
};

const menuStyles = () => {
    return src(['src/css/menu.scss'])
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: false }))
        .pipe(compressCSS({ compatibility: 'ie8' }))
        .pipe(concatFile('menu.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSyncInstance.stream());
};

const sliderJs = () => {
    return src('src/js/slider.js')
        .pipe(concatFile('slider.min.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify.default())
        .pipe(dest('dist/js'))
        .pipe(browserSyncInstance.stream());
};

const menuJs = () => {
    return src('src/js/menu.js')
        .pipe(concatFile('menu.min.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify.default())
        .pipe(dest('dist/js'))
        .pipe(browserSyncInstance.stream());
};

const burgerJs = () => {
    return src('src/js/burger.js')
        .pipe(concatFile('burger.min.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify.default())
        .pipe(dest('dist/js'))
        .pipe(browserSyncInstance.stream());
};

const modalJs = () => {
    return src('src/js/modal.js')
        .pipe(concatFile('modal.min.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify.default())
        .pipe(dest('dist/js'))
        .pipe(browserSyncInstance.stream());
};

const menuDataJs = () => {
    return src('src/js/menu-data.js')
        .pipe(concatFile('menu-data.min.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify.default())
        .pipe(dest('dist/js'))
        .pipe(browserSyncInstance.stream());
};

const script = series(sliderJs, menuJs, burgerJs, modalJs, menuDataJs);

const images = () => {
    return src(['src/assets/images/*.*', '!src/assets/images/*.svg'])
        .pipe(newer('dist/assets/images'))
        .pipe(avif({ quality: 50 }))
        .pipe(src(['src/assets/images/*.*']))
        .pipe(newer('dist/assets/images'))
        .pipe(webp())
        .pipe(src(['src/assets/images/*.*']))
        .pipe(newer('dist/assets/images'))
        .pipe(imagemin())
        .pipe(dest('dist/assets/images'));
};

const watching = () => {
    browserSyncInstance.init({
        server: {
            baseDir: 'dist/',
        },
    });
    watch(['src/css/*.{css,scss}', 'src/css/components/*.{css,scss}'], series(mainStyles, menuStyles));
    watch(['src/js/slider.js'], series(sliderJs));
    watch(['src/js/menu.js'], series(menuJs));
    watch(['src/js/burger.js'], series(burgerJs));
    watch(['src/js/modal.js'], series(modalJs));
    watch(['src/*.html'], series(html));
    watch(['src/assets/images'], series(images));
};

const cleanDir = () => {
    return src(['dist/*']).pipe(clean());
};

const fonts = () => {
    return src('src/fonts/*.{ttf,otf}')
        .pipe(fonter({ formats: ['woff'] }))
        .pipe(dest('dist/fonts'))
        .pipe(src('src/fonts/*.{ttf,otf}'))
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts'));
};

export { cleanDir, images, watching, script, staticFiles };
export const build = series(cleanDir, html, mainStyles, menuStyles, script, fonts, images, staticFiles, staticAssets);

export default parallel(html, mainStyles, menuStyles, script, staticFiles, staticAssets, watching);
