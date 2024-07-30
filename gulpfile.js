const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')( require('sass') );
const purgecss = require('gulp-purgecss');
const glob = require('glob');

function buildStyles() {
   return src(['sass/**/*.scss', 'sass/**/*.sass'])
      .pipe( sass() )
      .pipe( purgecss({
         content: ['*.html', 'sass/_general.scss', 'js/**/*.js'],
         css: [
            'sass/_general.scss'
         ],
         safelist: {
         }
      }) )
      .pipe( dest('css') )
   ;
}

function watchStyles() {
   watch( ['sass/**/*.scss', 'sass/**/*.sass', '*.html', 'js/**/*.js'], buildStyles)
}

function watchJs() {
   watch('js/**/*.js', buildStyles);
}

exports.default = series(buildStyles, watchStyles, watchJs);