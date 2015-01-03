(function() {
	var bgContainer, posBanner

	bgContainer = $(".post-bg")

	$(bgContainer).find("img").load(function() {
		posBanner($(this).parent(), false)
	})

	$(window).resize(function() {
		bgContainer.each(function() {
			posBanner($(this), false)
		})
	})

	var isOpenBanner = function() {
		return $(".open")
	}

	var posBanner = function(bgContainer, transition) {
		var banner = bgContainer.parent()
		var bannerPosition = bgContainer.attr("bannerPosition")
		var bgImg = bgContainer.find("img")
		var h = bgImg.height()

		if (banner.hasClass("open"))
			return
		if (transition)
			bgImg.transition({"margin-top": -bannerPosition * h}, 200)
		else
			bgImg.css("margin-top", -bannerPosition * h)
	}

	window.isBannerClosed = true

	var openImageBanner = function(banner) {
		banner.find(".post-bg").addClass("active")
		banner.transition({"height": banner.find("img").height()}, 200)
		banner.find("img").transition({"margin-top": 0}, 200)
		banner.find(".banner-content").transition({"opacity": 0}, 200)
	}

	var closeImageBanner = function(banner, setHeight) {
		if (setHeight)
			banner.transition({"height": "10em"}, 200)
		banner.find(".banner-content").transition({"opacity": 1}, 200)
		posBanner(banner.find(".post-bg"), true)
		banner.find(".post-bg").removeClass("active")
	}

	$(".project.banner").click(function() {
		var banner = $(this)

		if (!banner.parent().hasClass("open"))
			return

		if (isBannerClosed)
			openImageBanner(banner)
		else
			closeImageBanner(banner, true)

		return isBannerClosed = !isBannerClosed;
	});

	window.oldOpenBannerHeight = null

	var closeBanner = function(openBanner, newBanner) {
		var bgContainer = openBanner.find(".post-bg")
		var projContainer = openBanner.find(".proj-content").parent()
		var bannerBanner = openBanner.find(".banner")
		var bContent = openBanner.find(".banner-content")
		
		// make it not modal before closing
		openBanner.removeClass("open")
		
		// close the image if it's open
		if (bgContainer.hasClass("active"))
			closeImageBanner(bannerBanner, false)

		// hide the content
		openBanner.find(".proj-content").animate({"opacity": "0"}, 200)

		// correct for scrolling that might have occurred
		window.location.hash = ""
		$(window).scrollTop(openBanner.offset().top)

		// close the banner
		bannerBanner.animate({"height": oldOpenBannerHeight}, 200, function() {
			bannerBanner.css({"height": "auto"})
		})
		openBanner.animate({"height": oldOpenBannerHeight}, 200, function() {
			openBanner.css({"height": "auto"})
		})

		// once it's closed, no longer active
		openBanner.removeClass("active")
	}

	var openBanner = function(closedBanner, bannerOpen) {
		var bgImage = closedBanner.find(".post-bg").find("img")
		var bgHeight = bgImage.height()
		var projContainer = closedBanner.find(".proj-content").parent()
		var bannerBanner = closedBanner.find(".banner")
		
		// make it active to style it before it opens
		closedBanner.addClass("active")

		// make the content visible and the right font size
		closedBanner.find(".proj-content").animate({"opacity": 1}, 200)

		// open the banner
		closedBanner.animate({"height": $(window).height()}, 200)
		bannerBanner.animate({"height": "10em"}, 200)

		// scroll the page to the top of the banner as it opens
		$('html, body').animate({
			scrollTop: closedBanner.offset().top
		}, 200, function() {
			// make modal once the banner is open
			closedBanner.addClass("open")
			window.location.hash = closedBanner.attr("short")
		})

		window.oldOpenBannerHeight = closedBanner.height()
	}

	// focusing targeted banner
	if (window.location.hash)
		openBanner($(window.location.hash), false)

	// banner click handling
	var handleBannerClick = function(thisBanner) {
		var selfWasOpen = $(thisBanner).hasClass("open")

		// close any open banners (there should only be one)
		var theOpenBanner = isOpenBanner()
		if (theOpenBanner.length > 0)
			closeBanner(theOpenBanner, $(thisBanner))

		if (selfWasOpen) return

		openBanner($(thisBanner), theOpenBanner.length > 0? true : false)	
	}

	window.oldCloseColor = $(".close-button").css("color")
	$('.project.snippet').click(function() {
		if ($(this).hasClass("open") && ! $(arguments[0].target).hasClass("close-button") ) {
			var closeButton = $(this).find(".close-button")
			closeButton.css({"color": window.accentColor})
			setTimeout(function() {
				closeButton.css({"color": window.oldCloseColor})
			}, 200)

			return
		}
		handleBannerClick(this)
	})
})()
