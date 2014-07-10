(function() {
	window.onload = function() {
		function expsOverlap(exp1, exp2) {
			var dates1 = expDates(exp1)
			var dates2 = expDates(exp2)

			var overlap = (dates1.end > dates2.start && dates1.start < dates2.end)

			return overlap
		}

		function expDates(exp) {
			var today = Date.parse(new Date())/1000/3600/24
			var end = Date.parse(exp.attr("end"))/1000/3600/24 || today
			var start = Date.parse(exp.attr("start"))/1000/3600/24

			return {
				start: start,
				end: end,
				interval: end-start
			}
		}

		// Customized for headers in .textbox divs
		function intersect(header1, header2) {
			header1 = $(header1)
			header2 = $(header2)

			var h1offset = header1.offset()
			var h2offset = header2.offset()

			var r1 = {
				x1: h1offset.left,
				y1: h1offset.top,
				x2: h1offset.left+header1.width(),
				y2: h1offset.top+header1.parent().height()
			}

			var r2 = {
				x1: h2offset.left,
				y1: h2offset.top,
				x2: h2offset.left+header2.width(),
				y2: h2offset.top+header2.parent().height()
			}

			var offset = r1.y2 - r2.y1
			return ((r1.x1 < r2.x2) && (r1.x2 > r2.x1) && (r1.y1 < r2.y2) && (r1.y2 > r2.y1) )? offset : 0
		}

		var experiences = $('.experience.snippet')

		var maxOffset = 0
		experiences.each(function() {
			var dates = expDates($(this))
			var today = Date.parse(new Date())/1000.0/3600/24

			maxOffset = _.max([maxOffset, 2*dates.interval+2*(today-dates.end)])

			$(this).css({
				height: 2*dates.interval+"px",
				top: 2*(today-dates.end)+"px"
			})
		})
		$("#container").css("height", maxOffset+"px")

		var titles = $('.title')

		titles.each(function() {
			$(this).parent().css("top", "0px")
		})

		function moveOutTitles() {
			for (var i = 0; i < titles.length-1; i++) {
				for (var j = i+1; j < titles.length; j++) {
					var intersection = intersect(titles[i], titles[j])
					if (intersection !== 0) {
						$(titles[i]).css("color", "blue")
						$(titles[j]).css("color", "red")
					}
					$(titles[j]).parent().css({
						top: "+="+intersection
					})
				}
			}
		}

		var tracks = $('.track')

		window.openTrack = false

		tracks.click(function() {
			if (openTrack === true) {
				tracks.css("width", window.trackWidth)
				$(this).css("width", window.trackWidth)
				$(this).removeClass("selected")

				openTrack = false
			}
			else {
				tracks.css("width", "0%")
				$(this).css("width", "100%")
				$(this).addClass("selected")

				openTrack = true
			}
		})

		moveOutTitles()
		window.onresize = moveOutTitles
	}
})()