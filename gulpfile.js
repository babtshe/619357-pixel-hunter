const del = require(`del`);
const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const mqpacker = require(`css-mqpacker`);
const minify = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const svgstore = require(`gulp-svgstore`);
const sourcemaps = require(`gulp-sourcemaps`);
const mocha = require(`gulp-mocha`);
const uglify = require(`gulp-uglify`);
const browserify = require(`browserify`);
const source = require(`vinyl-source-stream`);
const tsify = require(`tsify`);
const buffer = require(`vinyl-buffer`);
const babelify = require(`babelify`);

gulp.plumbedSrc = (path) => {
  return gulp.src(path)
  .pipe(plumber());
};

gulp.task(`style`, () => {
  return gulp.plumbedSrc(`sass/style.scss`).
    pipe(sass()).
    pipe(postcss([
      autoprefixer({
        browsers: [
          `last 1 version`,
          `last 2 Chrome versions`,
          `last 2 Firefox versions`,
          `last 2 Opera versions`,
          `last 2 Edge versions`
        ]
      }),
      mqpacker({sort: true})
    ])).
    pipe(gulp.dest(`build/css`)).
    pipe(server.stream()).
    pipe(minify()).
    pipe(rename(`style.min.css`)).
    pipe(gulp.dest(`build/css`));
});

gulp.task(`sprite`, () => {
  return gulp.src(`img/sprite/*.svg`)
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename(`sprite.svg`))
  .pipe(gulp.dest(`build/img`));
});

gulp.task(`scripts`, () => {
  return browserify({
    basedir: `.`,
    debug: true,
    entries: [`ts/main.ts`],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .transform(babelify, {
    presets: [`@babel/preset-env`],
    extensions: [`.ts`],
    exclude: `node_modules/**`
  })
  .bundle()
    .pipe(plumber())
  .pipe(source(`main.js`))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`build/js`));
});

gulp.task(`imagemin`, [`copy`], () => {
  return gulp.src(`build/img/**/*.{jpg,png,gif}`).
    pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ])).
    pipe(gulp.dest(`build/img`));
});

gulp.task(`copy-html`, () => {
  return gulp.src(`*.{html,ico}`).
    pipe(gulp.dest(`build`)).
    pipe(server.stream());
});

gulp.task(`copy`, [`copy-html`, `scripts`, `style`, `sprite`], () => {
  return gulp.src([
    `fonts/**/*.{woff,woff2}`,
    `img/*.*`
  ], {base: `.`}).
    pipe(gulp.dest(`build`));
});

gulp.task(`clean`, () => {
  return del(`build`);
});

gulp.task(`js-watch`, [`scripts`], (done) => {
  server.reload();
  done();
});

gulp.task(`serve`, [`assemble`], () => {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`sass/**/*.{scss,sass}`, [`style`]);
  gulp.watch(`*.html`).on(`change`, (e) => {
    if (e.type !== `deleted`) {
      gulp.start(`copy-html`);
    }
  });
  gulp.watch(`ts/**/*.ts`, [`js-watch`]);
});

gulp.task(`assemble`, [`clean`], () => {
  gulp.start(`copy`, `style`);
});

gulp.task(`build`, [`assemble`], () => {
  gulp.start(`imagemin`);
});

gulp.task(`test`, function () {
  return gulp
  .plumbedSrc([`ts/**/*.test.ts`])
  .pipe(mocha({
    reporter: `spec`,
    require: [`ts-node/register`]
  }));
});
