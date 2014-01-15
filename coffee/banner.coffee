bannerImg = $("#post-banner")
banner = $("div.post.banner")
isBannerClosed = true

###
Size the banner before the image has loaded
Because it doesn't depend on the image size
And it's jarring if this doesn't happen
###

banner.css "height": banner.width()/5

$(bannerImg).load ->
	sizeBanner($(@), true)

$(window).resize ->
	sizeBanner(bannerImg, isBannerClosed)

banner.click ->
	setTransition(true)
	setTimeout (-> setTransition(false)), 200

	if isBannerClosed
		banner.css "height": bannerImg.height()
		bannerImg.css "margin-top": 0
		banner.find(".banner-content").css "opacity": 0
	else
		sizeBanner(bannerImg, true)
		banner.find(".banner-content").css "opacity": 1

	isBannerClosed = !isBannerClosed

sizeBanner = (b, closed) ->
	h = b.height()

	bannerPosition = banner.attr("bannerPosition")

	if closed
		banner.css "height": banner.width()/5
		b.css "margin-top": -bannerPosition*h
	else
		banner.css "height": bannerImg.height()

setTransition = (enable) ->
	if enable
		banner.css
			"-webkit-transition": "height 200ms"
			"   -moz-transition": "height 200ms"
			"    -ms-transition": "height 200ms"
			"     -o-transition": "height 200ms"
			"        transition": "height 200ms"

		bannerImg.css
			"-webkit-transition": "margin-top 200ms"
			"   -moz-transition": "margin-top 200ms"
			"    -ms-transition": "margin-top 200ms"
			"     -o-transition": "margin-top 200ms"
			"        transition": "margin-top 200ms"
	else
		banner.css
			"-webkit-transition": "none"
			"   -moz-transition": "none"
			"    -ms-transition": "none"
			"     -o-transition": "none"
			"        transition": "none"

		bannerImg.css
			"-webkit-transition": "none"
			"   -moz-transition": "none"
			"    -ms-transition": "none"
			"     -o-transition": "none"
			"        transition": "none"