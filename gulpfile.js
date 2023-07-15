var gulp = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    // cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: "sass/**/*.scss",
    dest: "./"
  }
}
// Define tasks after requiring dependencies

function style() {

    return (

        gulp
            .src(paths.styles.src)
            // .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'}))
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );

}
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

function reload(done) {
    browserSync.reload();
    done();
}
  function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.styles.src, style);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("*.html", reload);
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change

}
// Don't forget to expose the task!
exports.watch = watch
