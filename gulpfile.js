const fileinclude = require("gulp-file-include");
const staticI18nHtml = require("gulp-static-i18n-html");
const gulp = require("gulp");
const watch = require("gulp-watch");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const exec = require("gulp-exec");
const replace = require("gulp-replace");
const filter = require("gulp-filter");
const moment = require("moment");

gulp.task("copydata", function () {
  return gulp.src("src/**/*.json").pipe(gulp.dest("compiled"));
});

const formattedDate = moment().format("DD/MM/YY hh:mm");

gulp.task("fileinclude", function () {
  return gulp
    .src(["src/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(replace("$$DATE$$", formattedDate))
    .pipe(gulp.dest("compiled"));
});

gulp.task("i18n", function () {
  return gulp
    .src("compiled/*.html")
    .pipe(
      staticI18nHtml({
        locale: "fr",
        locales: ["en", "fr"],
        allowHtml: true,
      })
    )
    .pipe(gulp.dest("."));
});

gulp.task("babel", function () {
  return gulp
    .src("src/components/*.jsx")
    .pipe(
      babel({
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-syntax-jsx"],
      })
    )
    .pipe(gulp.dest("assets/js/"));
});

gulp.task("convert", function () {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true, // default = true, false means don't write stdout
  };
  return gulp
    .src("./docs/*.pdf")
    .pipe(filter((file) => !file.path.endsWith("wb.pdf")))
    .pipe(
      exec(
        (file) =>
          `convert -density 150 ${file.path} -quality 90 ${file.path.replace(
            "pdf",
            "jpeg"
          )}`,
        options
      )
    )
    .pipe(exec.reporter(reportOptions));
});

exports.default = gulp.series("copydata", "fileinclude", "i18n", "babel");

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch(
    [
      "./assets/sass/*.scss",
      "src/**/*.html",
      "src/**/*.json",
      "src/components/*",
    ],
    exports.default
  );
});
