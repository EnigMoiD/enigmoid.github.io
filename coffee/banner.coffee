# cubic-bezier(.17, .67, .83, .67)
$.easing.nice = (t, millisecondsSince, startValue, endValue, totalDuration) ->
	x1 = .17
	y1 = .67
	x2 = .83
	y2 = .67

	# Bx = 3*Math.pow(1-t,2)*t*x1 + 3*(1-t)*Math.pow(t,2)*x2 + Math.pow(t,3)
	By = 3*Math.pow(1-t,2)*t*y1 + 3*(1-t)*Math.pow(t,2)*y2 + Math.pow(t,3)
	return By

# $.easing.nice = (t, millisecondsSince, startValue, endValue, totalDuration) ->
# 	return t/2

bannerImg = $("#post-banner")
banner = $("div.post.banner")
bannerClosed = true

$(bannerImg).load ->
	sizeBanner($(@), true, true)

$(window).resize ->
	sizeBanner(bannerImg, bannerClosed, false)

banner.click ->
	if bannerClosed
		banner.animate
			"height": bannerImg.height(),
			200, "nice"
		bannerImg.animate
			"margin-top": 0,
			200, "nice"
	else
		sizeBanner(bannerImg, true, true)

	bannerClosed = !bannerClosed

sizeBanner = (b, closed, animate) ->
	if closed
		h = b.height()

		if animate
			banner.animate
				"height": banner.width()/5,
				200, "nice"
			b.animate
				"margin-top": -h/3,
				200, "nice"
		else
			banner.height banner.width()/5
			b.css "margin-top", -h/3

	else
		if animate
			banner.animate
				"height": bannerImg.height(),
				200, "nice"
		else 
			banner.css "height", bannerImg.height()