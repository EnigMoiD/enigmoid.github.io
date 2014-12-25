(function() {
	var bgContainer, posBanner;

	bgContainer = $(".post-bg");

	$(bgContainer).find("img").load(function() {
		posBanner($($(this).parent()));
	});

	$(window).resize(function() {
		bgContainer.each(function() {
			posBanner($(this));
		});
	});

	posBanner = function(bgContainer) {
		var h = bgContainer.children().first().height();
		var banner = bgContainer.parent();
		var bannerPosition = bgContainer.attr("bannerPosition");

		if (banner.attr("open") === "open")
			return

		bgContainer.css("margin-top", -bannerPosition * h)
	};

	window.oldOpenBanner = null

	var banner = $('.project.snippet')

	banner.click(function() {
		var closeBanner = function(openBanner, newBanner, sameWasOpen) {
			openBanner.removeAttr("open")

			var bgContainer = $(openBanner).find(".post-bg")
			posBanner(bgContainer)

			var projContainer = $(openBanner).find(".proj-content").parent()
			projContainer.removeClass("active")

			$(openBanner).find(".proj-content").css({"max-height": "0px"})

			if (sameWasOpen) return
			$('html, body').animate({
				scrollTop: $(newBanner).offset().top
			})
		}

		var openBanner = function(closedBanner, bannerOpen) {
			closedBanner.attr("open", "true")
			window.oldOpenBanner = closedBanner

			var bgImage = $(closedBanner).find(".post-bg").find("img")
			var bgHeight = $(bgImage).height()
			bgImage.parent().css("margin-top", "0px")

			var projContainer = $(closedBanner).find(".proj-content").parent()
			$(closedBanner).find(".proj-content").css({"max-height": bgHeight})
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
