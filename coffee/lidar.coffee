imageBox = $(".images-box")

imageBox.each ->
	box = $(@)
	w = box.width()
	i = box.find("img")
	i.load ->
		scaleRects box.width(), $(i[0]), $(i[1])

		$(window).resize ->
			scaleRects box.width(), $(i[0]), $(i[1])

scaleRects = (w, a, b) ->
	s1 = w*a.height()/(a.width()*b.height() + b.width()*a.height())
	s0 = b.height()*s1/a.height()

	a.height(a.height()*s0-1)
	b.height(b.height()*s1-1)