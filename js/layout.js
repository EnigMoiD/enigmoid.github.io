$(document).ready(function() {
	window.contactShowing = false;
	window.contact = new OriDomi($("div#contact")[0]);

	$('li#contact').click(toggleContact);
});

function toggleContact() {
	console.log('CINTAODSOAJFADS');
	console.log(contactShowing);
	if (contactShowing)
		contact.foldUp();
	else
		contact.unfold();
	contactShowing = !contactShowing;
}

// function centerImage(img) {
// 	var w = img.width();
// 	var h = img.height();

// 	var offset = (w - h)/2;
// 	img.css('margin-left', -offset);
// }

// function processImages() {
// 	var images = $('img');

// 	images.each(function(i, image) {
// 		var $img = $(image);

// 		centerImage($img);
// 	});
// }