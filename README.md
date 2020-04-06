# bulk-image-optim

## Bulk optimize images with imagemin via a gulp script

_*NOTE:* currently only `.png` and `.jpg` images will be optimized. With small changes you can also make it work with `.gif` and `.svg` images too._ 

The `default` gulp task will do the following:
1. clean the `dist/content`
2. go through ALL directories and subdirectories in the `src/content` folder and look for images
3. resize them, ONLY if the current image is greater than the specified `wirth` and `height` _see below #5_
4. oprimize them
5. output resized/optimized images in the `dist/content` folder, in the saem directory the came from

### How to use

1. clone this `repo` by navigating to the folder you want and running in the terminal: `git clone https://github.com/ApoGouv/bulk-image-optim.git`
2. navigate from teminal to the newly created folder: `cd bulk-image-optim`
3. install dependancies by running the `npm install` from terminal
4. put your images into the `src/content` folder
5. If you need to change the resize settings, open the `gulpfile.js` and change the `wifth` and/or `height` values in the `resize_settings` object: 
```
const resize_settings = {
	width: 1500,
	height: 1000,
	crop: false,
	noProfile: true,
	// never increase image dimensions
	upscale : false
}
```
6. Finally, run `gulp` from your terminal and relax!

