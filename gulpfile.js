import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

import { copy } from './gulp/tasks/copy.js';
import { video } from './gulp/tasks/video.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { fonts } from './gulp/tasks/fonts.js';

function watcher() {
	gulp.watch(path.watch.files, { usePolling: true }, copy);
	gulp.watch(path.watch.video, { usePolling: true }, video);
	gulp.watch(path.watch.html, { usePolling: true }, html); // gulp.series(html, ftp)
	gulp.watch(path.watch.scss, { usePolling: true }, scss);
	gulp.watch(path.watch.js, { usePolling: true }, js);
	gulp.watch(path.watch.img, { usePolling: true }, img);
	gulp.watch(path.watch.fonts, { usePolling: true }, fonts);
}

const mainTasks = gulp.parallel(copy, video, html, scss, js, img, fonts);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks, ftp);

export { dev }
export { build }
export { deployZip }
export { deployFtp }

gulp.task('default', dev);