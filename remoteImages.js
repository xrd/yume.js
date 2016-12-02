function getP5ImageGTL( url, p5 ) {
    if (url != null) {
	console.log('getting p5 image from: ' + url);
	p5Img = loadImage(url, functio() {
	    p5.redraw();
	}, loadImageErrorOverride);
	p5.image(p5Img, 60, 60);
    } else {
	console.log('no Url or invalid');
    }
}


function loadImageErrorOverride(errEvt) {
    const pic = errEvt.target;

    if (pic.crossOrigin == null) return print('Failed to reload ' + pic.src + '!');

    print('Attempting to reload it as a tainted image now...');
    pic.crossOrigin = null, pic.src = pic.src;
}
