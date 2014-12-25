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

	banner.click(function() {
		var closeBanner = function(openBanner, newBanner, sameWasOpen) {
			openBanner.animate({"height": "auto"}, 200)
			openBanner.removeAttr("open")

			var bgContainer = $(openBanner).find(".post-bg")
			var height = bgContainer.height()
			var bannerPosition = bgContainer.attr("bannerPosition")
			bgContainer.animate({"margin-top": -bannerPosition * height}, 200)

			var projContainer = $(openBanner).find(".proj-content").parent()
			projContainer.removeClass("active")
			projContainer.css({"background-color": "transparent"})

			$(openBanner).find(".proj-content").animate({"height": "0px"}, 200, function() {
				if (sameWasOpen) return
				$('html, body').animate({
					scrollTop: $(newBanner).offset().top
				})
			})

		}

		var openBanner = function(closedBanner, bannerOpen) {
			var bgContainer = $(closedBanner).find(".post-bg")

			closedBanner.animate({"max-height": bgContainer.find("img").height()}, 200)
			closedBanner.attr("open", "true")
			window.oldOpenBanner = closedBanner

			bgContainer.animate({"margin-top": "0px"}, 200)

			var projContainer = $(closedBanner).find(".proj-content").parent()
			$(closedBanner).find(".proj-content").animate({"height": "100%"}, 200)
			projContainer.addClass("active")

			if (!bannerOpen) {
				$('html, body').animate({
					scrollTop: $(closedBanner).offset().top
				})
			}
		}

		var selfWasOpen = $(this).attr("open") === "open"

		if (oldOpenBanner)
			closeBanner(oldOpenBanner, $(this), selfWasOpen)

		if (selfWasOpen) return

		openBanner($(this), oldOpenBanner? true : false)
	})
})();
