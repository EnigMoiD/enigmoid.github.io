bannerImg = $(".post-banner")

$(bannerImg).load ->
	sizeBanner $(@)

$(window).resize ->
	bannerImg.each ->
		sizeBanner $(@)

sizeBanner = (b) ->
	h = b.height()

	bannerPosition = b.attr "bannerPosition"

	console.log "image height for #{$(b).attr 'src'}"
	console.log h
	console.log bannerPosition

	b.css "margin-top": -bannerPosition*h