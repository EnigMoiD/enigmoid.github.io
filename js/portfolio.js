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

	posBanner = function(bgContainer, transition) {
		var h = bgContainer.children().first().height();
		var banner = bgContainer.parent();
		var bannerPosition = bgContainer.attr("bannerPosition");

		if (banner.attr("open") === "open")
			return
		if (transition)
			bgContainer.transition({"margin-top": -bannerPosition * h}, 200)
		else
			bgContainer.css("margin-top", -bannerPosition * h)
	};

	window.oldOpenBanner = null

	var banner = $('.project.snippet')

	banner.click(function() {
		var closeBanner = function(openBanner, newBanner, sameWasOpen) {
			openBanner.removeAttr("open")

			var bgContainer = $(openBanner).find(".post-bg")
			posBanner(bgContainer, true)

			var projContainer = $(openBanner).find(".proj-content").parent()
			projContainer.removeClass("active")

			$(openBanner).find(".proj-content").transition({"height": "0px"}, 200)
		}

		var openBanner = function(closedBanner, bannerOpen) {
			closedBanner.attr("open", "true")
			window.oldOpenBanner = closedBanner

			var bgImage = $(closedBanner).find(".post-bg").find("img")
			var bgHeight = $(bgImage).height()
			bgImage.parent().transition({"margin-top": "0px"}, 200)

			var projContainer = $(closedBanner).find(".proj-content").parent()
			$(closedBanner).find(".proj-content").transition({"height": "auto"}, 200)
			projContainer.addClass("active")

			setTimeout(function() {
				$('html, body').animate({
					scrollTop: $(closedBanner).offset().top
				}, 200)
			}, 200)
		}

		var selfWasOpen = $(this).attr("open") === "open"

		if (oldOpenBanner)
			closeBanner(oldOpenBanner, $(this), selfWasOpen)

		if (selfWasOpen) return

		openBanner($(this), oldOpenBanner? true : false)
	})
})();
