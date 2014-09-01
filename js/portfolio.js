(function() {
	var bgContainer, sizeBanner;

	bgContainer = $(".post-bg");

	$(bgContainer).find("img").load(function() {
		sizeBanner($($(this).parent()));
	});

	$(window).resize(function() {
		bgContainer.each(function() {
			sizeBanner($(this));
		});
	});

	sizeBanner = function(bgContainer) {
		var h = bgContainer.children().first().height();
		var banner = bgContainer.parent();
		var bannerPosition = bgContainer.attr("bannerPosition");

		if (banner.attr("open") === "open")
			banner.css("height", h)
		else
			bgContainer.css("margin-top", -bannerPosition * h)
	};

	window.oldOpenBanner = null

	var banner = $('.project.snippet')
	var impToSize = function(imp) {
		return 2 - imp
	}

	banner.click(function() {
		var closeBanner = function(openBanner) {
			var oldHeight = 5 * (impToSize(openBanner.attr("imp")))+"em"
			openBanner.animate({"height": oldHeight}, 200)
			openBanner.removeAttr("open")

			var bgContainer = $(openBanner).find(".post-bg")
			var height = bgContainer.height()
			var bannerPosition = bgContainer.attr("bannerPosition")
			bgContainer.animate({"margin-top": -bannerPosition * height}, 200)
			$(openBanner).find(".post-banner-color").animate({"opacity": "0"}, 200)

			$(openBanner).find(".proj-content").animate({"height": "0px"}, 200)
			$(openBanner).find(".proj-content").parent().removeClass("active")
			$(openBanner).find(".proj-content").parent().css({"background-color": "transparent"})
		}

		var openBanner = function(closedBanner) {
			var bgContainer = $(closedBanner).find(".post-bg")

			closedBanner.animate({"height": bgContainer.find("img").height()+100+"px"}, 200)
			closedBanner.attr("open", "true")
			window.oldOpenBanner = closedBanner

			bgContainer.animate({"margin-top": "100px"}, 200)
			$(closedBanner).find(".post-banner-color").animate({"opacity": "1"}, 200)

			$(closedBanner).find(".proj-content").animate({"height": "100%"}, 200)
			$(closedBanner).find(".proj-content").parent().addClass("active")
			$(closedBanner).find(".proj-content").parent().css({"background-color": window.darkDarkGrayColor})
		}

		var selfWasOpen = $(this).attr("open") === "open"

		if (oldOpenBanner)
			closeBanner(oldOpenBanner)

		if (selfWasOpen) return

		openBanner($(this))
	})
})();
