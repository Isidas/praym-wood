const { src, dest, series, parallel, watch } = require("gulp");
const beautify = require("gulp-beautify");
const del = require("del");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const merge = require("merge-stream");
const include = require("gulp-file-include");
const cleanCSS = require("gulp-clean-css");
const webpackStream = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const appFolder = "app/";
const distFolder = "dist/";
const foldersCopy = ["js", "parts"];
const foldersCopy2 = ["images"];

function html() {
  return src(`${appFolder}**/*.+(php|html)`)
    .pipe(include({ prefix: "@@" }))
    .pipe(beautify.html({ indent_size: 4 }))
    .pipe(dest(distFolder))
    .pipe(browserSync.stream());
}

function images() {
  return src(`${appFolder}images/**/*.+(png|jpg|gif|ico|svg|webp)`)
    .pipe(newer(`${distFolder}images`))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(`${distFolder}images`))
    .pipe(browserSync.stream());
}

function fonts() {
  return merge(
    src(`${appFolder}fonts/*`)
      .pipe(ttf2woff())
      .pipe(dest(`${distFolder}fonts`)),
    src(`${appFolder}fonts/*`)
      .pipe(ttf2woff2())
      .pipe(dest(`${distFolder}fonts`))
  );
}

function css() {
  return src(`${appFolder}scss/all.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.min.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write())
    .pipe(dest(`${distFolder}css`))
    .pipe(browserSync.stream());
}

function copy() {
  const tasks = foldersCopy.map((folder) =>
    src(`${appFolder}${folder}/**`).pipe(dest(`${distFolder}${folder}`))
  );
  return merge(tasks);
}

function moveImages() {
  const tasks = foldersCopy2.map((folder) =>
    src(`${appFolder}${folder}/**`).pipe(dest(`${distFolder}${folder}`))
  );
  return merge(tasks);
}

function clear() {
  return del(distFolder);
}
const scripts = () => {
  return src(`${appFolder}js/main.js`)
    .pipe(
      plumber(
        notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpackStream({
        // mode: isProd ? "production" : "development",
        output: {
          filename: "main.js",
        },
        module: {
          // rules: [{
          //   test: /\.m?js$/,
          //   exclude: /node_modules/,
          //   use: {
          //     loader: 'babel-loader',
          //     options: {
          //       presets: [
          //         ['@babel/preset-env', {
          //           targets: "defaults"
          //         }]
          //       ]
          //     }
          //   }
          // }]
        },
        // devtool: !isProd ? "source-map" : false,
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(dest(`${distFolder}js`))
    .pipe(browserSync.stream());
};
function watchFiles() {
  watch(`${appFolder}**/*.+(php|html)`, html);
  watch(`${appFolder}images/**/*.+(png|jpg|gif|ico|svg|webp)`, images);
  watch(`${appFolder}fonts/*`, fonts);
  watch(`${appFolder}scss/**/*.scss`, css);
  watch(`${appFolder}js/**/*.js`, scripts);
  watch(
    foldersCopy.map((folder) => `${appFolder}${folder}/**`),
    copy
  );
  watch(
    foldersCopy2.map((folder) => `${appFolder}${folder}/**`),
    moveImages
  );
}

function serve() {
  browserSync.init({
    server: {
      baseDir: distFolder,
    },
  });

  watchFiles();
}

exports.build = series(
  clear,
  parallel(html, images, fonts, css, copy, moveImages, scripts),
  serve
);
