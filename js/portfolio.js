(function() {
	var bgContainer, posBanner;

	bgContainer = $(".post-bg");

	$(bgContainer).find("img").load(function() {
		posBanner($($(this).parent()), false);
	});

	$(window).resize(function() {
		bgContainer.each(function() {
			posBanner($(this), false);
		});

		var opBanner = isOpenBanner()
		if (opBanner.length > 0) {
			opBanner.css({"height": $(window).height()})
		}
	});

	isOpenBanner = function() {
		return $("[open='open']")
	}

	posBanner = function(bgContainer, transition) {
		var h = bgContainer.children().first().height();
		var banner = bgContainer.parent();
		var bannerPosition = bgContainer.attr("bannerPosition");

		if (banner.attr("open") === "open")
			return
		if (transition)
			bgContainer.transition({
				"margin-top": -bannerPosition * h,
				"opacity": 1
			}, 200)
		else
			bgContainer.css("margin-top", -bannerPosition * h)
	};


	var banner = $('.project.snippet')

	window.oldOpenBanner = null
	window.oldBannerHeight = 0
	window.oldOffset = 1e6
	window.selfWasOpenLastTime = false

	banner.click(function() {
		var closeBanner = function(openBanner, newBanner) {
			openBanner.removeAttr("open")

			var bgContainer = $(openBanner).find(".post-bg")
			posBanner(bgContainer, true)

			var projContainer = $(openBanner).find(".proj-content").parent()
			projContainer.removeClass("active")

			$(openBanner).find(".proj-content").transition({"opacity": "0"}, 200)
			$(openBanner).transition({"height": "auto"}, 200)
		}

		var openBanner = function(closedBanner, bannerOpen) {
			closedBanner.attr("open", "true")

			var bgImage = $(closedBanner).find(".post-bg").find("img")
			var bgHeight = $(bgImage).height()

			var projContainer = $(closedBanner).find(".proj-content").parent()
			bgImage.parent().transition({
				"opacity": 0,
				"margin-top": "0px"
			}, 200)
			$(closedBanner).find(".proj-content").transition({"opacity": 1}, 200)
			projContainer.addClass("active")
			$(closedBanner).transition({"height": $(window).height()}, 200)

			var offset = (window.oldOffset < $(closedBanner).offset().top && bannerOpen) ? $(window).height() - oldBannerHeight : 0

			$('html, body').animate({
				scrollTop: $(closedBanner).offset().top - offset
			}, 200)

			window.oldOpenBanner = closedBanner
			window.oldBannerHeight = $(closedBanner).height()
			window.oldOffset = $(closedBanner).offset().top
		}

		var selfWasOpen = $(this).attr("open") === "open"

		// close any open banners (there should only be one)
		var theOpenBanner = isOpenBanner()
		if (theOpenBanner.length > 0)
			closeBanner(theOpenBanner, $(this))

		if (selfWasOpen) return

		openBanner($(this), theOpenBanner.length > 0? true : false)
	})
})();
