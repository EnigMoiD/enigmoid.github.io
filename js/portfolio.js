(function() {
	var bannerImg, sizeBanner;

	bannerImg = $(".post-banner");

	$(bannerImg).load(function() {
		return sizeBanner($(this));
	});

	$(window).resize(function() {
		return bannerImg.each(function() {
			return sizeBanner($(this));
		});
	});

	sizeBanner = function(b) {
		var bannerPosition, h;
		h = b.height();
		bannerPosition = b.attr("bannerPosition");

		return b.css("margin-top", -bannerPosition * h)
	};

	window.oldOpenBanner = null

	var banner = $('.project.snippet')
	var impToSize = function(imp) {
		return 2 - imp
	}

	banner.click(function() {
		var closeBanner = function(openBanner) {
			var oldHeight = 5 * (impToSize(openBanner.attr("imp")))+"em"
			openBanner.css("height", oldHeight)
			openBanner.removeAttr("open")
		}

		var selfWasOpen = $(this).attr("open") === "open"

		if (oldOpenBanner)
			closeBanner(oldOpenBanner)

		if (selfWasOpen) return

		$(this).css("height", "15em")
		$(this).attr("open", "true")
		window.oldOpenBanner = $(this)
	})

})();
