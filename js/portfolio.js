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

		b.css("margin-top", -bannerPosition * h)
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

			var bannerImg = $(openBanner).find(".post-banner")
			var height = bannerImg.height()
			var bannerPosition = bannerImg.attr("bannerPosition")
			bannerImg.css("margin-top", -bannerPosition * height)
		}

		var openBanner = function(closedBanner) {
			var bannerImg = $(closedBanner).find(".post-banner")

			closedBanner.css("height", bannerImg.height()+"px")
			closedBanner.attr("open", "true")
			window.oldOpenBanner = closedBanner

			$(closedBanner).find(".post-banner").css("margin-top", "0px")
		}

		var selfWasOpen = $(this).attr("open") === "open"

		if (oldOpenBanner)
			closeBanner(oldOpenBanner)

		if (selfWasOpen) return

		openBanner($(this))
	})
})();
