$(document).ready(function() {
	processImages();
});

function processImages() {
	var images = $('img');

	images.each(function(i, image) {
		var $img = $(image);

		centerImage($img);
	});
}

function centerImage(img) {
	var w = img.width();
	var h = img.height();

	var offset = (w - h)/2;
	img.css('margin-left', -offset);
}