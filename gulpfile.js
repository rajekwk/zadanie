var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    del = require("del"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    gulpif = require("gulp-if"),
    imagemin = require("gulp-imagemin"),
    ftp = require("vinyl-ftp"),
    argv = require("yargs").argv;

gulp.task("css", function(done) {
    return gulp.src("src/sass/main.scss")
        .pipe(plumber())
        .pipe(sass.sync({
            outputStyle: "expanded" //może być też compressed
        }))
        .pipe(autoprefixer({
            browsers: ["last 5 version", "IE 9"]
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
    done();
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.scss", gulp.series("css"));
    gulp.watch(["src/*.html", "src/**/*.js"]).on('change', browserSync.reload);
});

gulp.task("html", function(done) {
    gulp.src("src/*.html")
        .pipe(useref())
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulp.dest("dist/"));
    done();
});

gulp.task("copy", function(done) {
    return gulp.src(["src/css/**/*css", "src/images/*", "src/uploads/*"], {
        base: "src/"
    })
    .pipe(gulp.dest("dist/"));
    done();
});

gulp.task("images", function(done) {
    return gulp.src("dist/images/*", {
            base: "dist/"
        })
        .pipe(imagemin())
        .pipe(gulp.dest("dist/"));
    done();
});

gulp.task("build", gulp.series("html", "copy", "images", function(done) {
    done();
}));