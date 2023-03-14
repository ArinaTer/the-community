import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./app`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		img: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		files: `${buildFolder}/files/`,
		video: `${buildFolder}/video/`,
		fonts: `${buildFolder}/fonts/`
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/app.sass`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		video: `${srcFolder}/video/**/*.*`,
		fonts: `${srcFolder}/fonts/**/*.*`
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
		scss: `${srcFolder}/scss/**/*.sass`,
		html: `${srcFolder}/**/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		video: `${srcFolder}/video/**/*.*`,
		fonts: `${srcFolder}/fonts/**/*.*`
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}