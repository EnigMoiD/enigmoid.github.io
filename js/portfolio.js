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
	});

	isOpenBanner = function() {
		return $(".open")
	}

	posBanner = function(bgContainer, transition) {
		var h = bgContainer.children().first().height();
		var banner = bgContainer.parent();
		var bannerPosition = bgContainer.attr("bannerPosition");

		if (banner.hasClass("open"))
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
			var bgContainer = $(openBanner).find(".post-bg")
			var projContainer = $(openBanner).find(".proj-content").parent()
			
			// make it not modal before closing
			openBanner.removeClass("open")
			
			// reappear and reposition the bg image, hide content
			posBanner(bgContainer, true)
			$(openBanner).find(".proj-content").transition({"opacity": "0"}, 200)
			projContainer.removeClass("active")

			// close the banner
			$(openBanner).transition({"height": "auto"}, 200)
		}

		var openBanner = function(closedBanner, bannerOpen) {
			var bgImage = $(closedBanner).find(".post-bg").find("img")
			var bgHeight = $(bgImage).height()
			var projContainer = $(closedBanner).find(".proj-content").parent()

			// disappear the bg image
			bgImage.parent().transition({
				"opacity": 0,
				"margin-top": "0px"
			}, 200)
			// make the content visible and the right font size
			$(closedBanner).find(".proj-content").transition({"opacity": 1}, 200)
			projContainer.addClass("active")

			// open the banner
			$(closedBanner).transition({"height": $(window).height()}, 200)

			// handle the case where a banner below the open one is opened
			var offset = (window.oldOffset < $(closedBanner).offset().top && bannerOpen) ? $(window).height() - oldBannerHeight : 0

			$('html, body').animate({
				scrollTop: $(closedBanner).offset().top - offset
			}, 200, function() {
				// make modal once the banner is open
				closedBanner.addClass("open")
			})

			window.oldOpenBanner = closedBanner
			window.oldBannerHeight = $(closedBanner).height()
			window.oldOffset = $(closedBanner).offset().top
		}

		var selfWasOpen = $(this).hasClass("open")

		// close any open banners (there should only be one)
		var theOpenBanner = isOpenBanner()
		if (theOpenBanner.length > 0)
			closeBanner(theOpenBanner, $(this))

		if (selfWasOpen) return

		openBanner($(this), theOpenBanner.length > 0? true : false)
	})
})();
