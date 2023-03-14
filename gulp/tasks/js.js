import webpack from 'webpack-stream';

export const js = () => {
	return app.gulp.src(app.path.src.js, { soursemaps: app.isDev })
	.pipe(app.plugins.plumber(
		{
			errorHandler: app.plugins.notify.onError("Error: <%= error.message %>")
		}
	))
	.pipe(webpack({
		mode: app.isBuild ? 'production' : 'development',
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: ['babel-plugin-root-import']
						}
					}
				}
			]
		},
		output: {
			filename: 'app.min.js',
		}
	}))
	.pipe(app.gulp.dest(app.path.build.js))
	.pipe(app.plugins.browsersync.stream())
}