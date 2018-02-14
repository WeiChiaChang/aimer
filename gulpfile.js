const gulp = require("gulp");
const pkg = require("./package.json");

const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const header = require("gulp-header");
const size = require("gulp-size");
const stylus = require("gulp-stylus");

const comment = `/**
 * Aimer v${pkg.version}
 * Copyright 2018 WeiChiaChang
 * Released under the MIT License
 * http://github.com/WeiChiaChang/aimer
 */\r\n`;

gulp.task("build", function () {
  return gulp.src(["./src/config.styl", "./src/base.styl"])
    .pipe(concat("aimer.styl"))
    .pipe(stylus())
    .pipe(header(comment + "\r\n"))
    .pipe(size())
    .pipe(gulp.dest("./dist/"));
});

gulp.task("minify", ["build"], function() {
  return gulp.src(["./dist/aimer.css"])
    .pipe(minifyCSS())
    .pipe(header(comment))
    .pipe(size())
    .pipe(size({
      gzip: true
    }))
    .pipe(concat("aimer.min.css"))
    .pipe(gulp.dest("./dist/"));
});


gulp.task("watch", function() {
  gulp.watch(["src/*.css"], ["default"]);
});


gulp.task("default", ["build", "minify"]);