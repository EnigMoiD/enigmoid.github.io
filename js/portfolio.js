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
		var banner = bgContainer.parent();
		var bannerPosition = bgContainer.attr("bannerPosition");
		var bgImg = bgContainer.find("img")
		var h = bgImg.height();

		if (banner.hasClass("open"))
			return
		if (transition)
			bgImg.transition({"margin-top": -bannerPosition * h}, 200)
		else
			bgImg.css("margin-top", -bannerPosition * h)
	};


	var banners = $('.project.snippet')

	window.oldOpenBanner = null

	banners.click(function() {
		var closeBanner = function(openBanner, newBanner) {
			var bgContainer = $(openBanner).find(".post-bg")
			var projContainer = $(openBanner).find(".proj-content").parent()
			var bannerBanner = $(openBanner).find(".banner")
			
			// make it not modal before closing
			openBanner.removeClass("open")
			
			// hide the content
			$(openBanner).find(".proj-content").transition({"opacity": "0"}, 200)

			// correct for scrolling that might have occurred
			$(window).scrollTop($(openBanner).offset().top)

			// close the banner
			$(openBanner).transition({"height": "auto"}, 200)
			$(bannerBanner).transition({"height": "auto"}, 200)

			// once it's closed, no longer active
			openBanner.removeClass("active")
		}

		var openBanner = function(closedBanner, bannerOpen) {
			var bgImage = $(closedBanner).find(".post-bg").find("img")
			var bgHeight = $(bgImage).height()
			var projContainer = $(closedBanner).find(".proj-content").parent()
			var bannerBanner = $(closedBanner).find(".banner")
			
			// make it active to style it before it opens
			closedBanner.addClass("active")

			// make the content visible and the right font size
			$(closedBanner).find(".proj-content").transition({"opacity": 1}, 200)

			// open the banner
			$(closedBanner).transition({"height": $(window).height()}, 200)
			$(bannerBanner).transition({"height": "15em"}, 200)

			// scroll the page to the top of the banner as it opens
			$('html, body').animate({
				scrollTop: $(closedBanner).offset().top
			}, 200, function() {
				// make modal once the banner is open
				closedBanner.addClass("open")
			})

			window.oldOpenBanner = closedBanner
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
