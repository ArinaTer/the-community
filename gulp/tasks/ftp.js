import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.cleate(configFTP);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
	.pipe(app.plugins.plumber(
		{
			errorHandler: app.plugins.notify.onError("Error: <%= error.message %>")
		}
	))
	.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
}