images = $("#post-container img")

images.each ->
	$(@).wrap "<div class='image-box'></div>"
	$(@).parent().append "<div class='caption'>#{$(@).attr 'alt'}</div>"
	width = $(@).attr "box-width"
	if width
		$(@).parent().attr "style", "width:#{width}"