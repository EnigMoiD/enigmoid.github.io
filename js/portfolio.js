$(document).ready(function() {
	$.each($('img.project'), function() {
		$(this).parent().mouseover(function() {
			Pixastic.revert($(this).find(':first-child')[0]);
		});
		$(this).parent().mouseout(function() {
			$(this).find(':first-child').pixastic("desaturate");
		});
		if ($(this)[0].complete)
			$(this).pixastic("desaturate");
	});
})