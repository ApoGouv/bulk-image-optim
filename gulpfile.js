const del         = require('del');
const gulp        = require('gulp');
const notify      = require('gulp-notify');
const newer       = require('gulp-newer');
const imagemin    = require('gulp-imagemin');
const imageresize = require('gulp-image-resize');
const mozjpeg     = require('imagemin-mozjpeg');
const pngquant    = require('imagemin-pngquant');

// const jpegtran    = require('imagemin-jpegtran');
// const optipng     = require('imagemin-optipng');
// const gifsicle    = require('imagemin-gifsicle');

const resize_settings = {
	width: 1500,
	height: 1000,
	crop: false,
	noProfile: true,
	// never increase image dimensions
	upscale : false
}

// Source and build folders
const dir = {
    src         : './src',
    dist        : './dist'
};

// Image settings
const images = {
	// *.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,svg,SVG}
	src         : dir.src + '/content/**/*.+(jpeg|jpg|png|gif|svg)',// Source folder of images which should be resized and optimized
	dist        : dir.dist + '/content/' // Destination folder for resized and optimized images.
};


// fn to delete target build folder
function clean() {
	return del([images.dist + '/**', images.dist]);	
}


function minifyItNow() {
	return gulp
		// grab all images from the folder
		.src( images.src )

		// any new or updated images
		// .pipe(newer(images.dist))

		// resize them according to the width/height settings
        .pipe(imageresize(resize_settings))

		// optimize the images
  		.pipe(
  			imagemin(
  				/*
  				[	// Build in plugins
					imagemin.mozjpeg({quality: 75, progressive: true}),
					imagemin.optipng({optimizationLevel: 5})
  				],
  				*/
  				{
		    		verbose: true,
		    		plugins: [ // Custom plugins
			  			mozjpeg({
			  				quality: 75, 
			  				progressive: true
			  			}),
			  			pngquant({
			  				quality: [0.7,0.9], // When used more then 70 the image wasn't saved
			  				strip: true,
						    speed: 1, // The lowest speed of optimization with the highest quality
						    dithering: 1 // Controls level of dithering (0 = none, 1 = full).
			  			}),
	  				],
				}
			)// End imagemin // https://github.com/sindresorhus/gulp-imagemin#readme
		)
  		.pipe( gulp.dest( images.dist ) )
  		.pipe( notify( { message: 'DONE: Images Optimized! 💯', onLast: true } ) );
}

gulp.task("clean", clean);
gulp.task("imgmin", minifyItNow);
gulp.task("default",gulp.series("clean","imgmin"));