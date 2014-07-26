(function() {
	window.onload = function() {
		window.months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]

		function expsOverlap(exp1, exp2) {
			var dates1 = expDates(exp1)
			var dates2 = expDates(exp2)

			var overlap = (dates1.end > dates2.start && dates1.start < dates2.end)

			return overlap
		}

		var daysPerMillis = 1/1000/3600/24
		window.today = new Date()
		today = Date.parse(new Date(today.getYear()+1900, today.getMonth()+1, today.getDate()))
		today *= daysPerMillis
		
		function expDates(exp) {
			var end = Date.parse(exp.attr("end"))*daysPerMillis || today
			var start = Date.parse(exp.attr("start"))*daysPerMillis

			return {
				start: start,
				end: end,
				interval: end-start
			}
		}

		// Adds yOffset to the header and sees if it fits
		function isAcceptable(yOffset, header, exps) {
			var headers = []
			$(exps).each(function() {
				headers.push($(this).children().first()[0])
			})

			var offsetRect = headerRect(header)
			offsetRect.y1 += yOffset
			offsetRect.y2 += yOffset

			$(headers).each(function() {
				if ($(header) !== $(this))
					if (intersect(offsetRect, headerRect($(this))))
						return false
			})
			return true
		}

		function elRect(el) {
			el = $(el)
			var elOffset = el.offset()

			return {
				x: elOffset.left,
				y: elOffset.top,
				w: el.width(),
				h: el.height(),
				x2: elOffset.left+el.width(),
				y2: elOffset.top+el.height()
			}
		}

		function headerRect(header) {
			header = $(header)
			var hOffset = header.offset()

			return {
				x1: hOffset.left,
				y1: hOffset.top,
				x2: hOffset.left+header.width(),
				y2: hOffset.top+header.parent().height()
			}
		}

		function headersIntersect(header1, header2) {
			var r1 = headerRect(header1)
			var r2 = headerRect(header2)

			var offset = r1.y2 - r2.y1
			return intersect(r1, r2)? offset : 0
		}

		function intersect(r1, r2) {
			return (r1.x1 < r2.x2) && (r1.x2 > r2.x1) && (r1.y1 < r2.y2) && (r1.y2 > r2.y1)
		}

		function moveOutTitles() {
			for (var i = 0; i < titles.length-1; i++) {
				for (var j = i+1; j < titles.length; j++) {
					var intersection = headersIntersect(titles[i], titles[j])
					if (intersection !== 0)
						oldExpOffsets[$(titles[j]).parent().parent().attr("short")].push(intersection)

					$(titles[j]).parent().css({
						top: "+="+intersection
					})
				}
			}
		}

		function horizOffsetTitles() {
			var rightBound = elRect($("#exp-container")).x2

			var offset
			$(".textbox").each(function() {
				$(this).css("left", "0px")
				offset = elRect($(this).children().first()).x2 - rightBound + parseInt($(this).children().first().css("padding-right"))

				if (offset > 0) {
					$(this).css("left", -offset+"px")
				}
			})
		}

		function handleResize() {
			if (openTrack) return
			moveOutTitles()
			horizOffsetTitles()
		}

		var experiences = $('.experience.snippet')

		var maxOffset = 0, earliestDate
		var pixelsPerDay = 2
		// Define the height of the page based on the earliest date
		experiences.each(function() {
			var dates = expDates($(this))

			if (maxOffset < pixelsPerDay * (dates.interval+(today-dates.end))) {
				maxOffset = pixelsPerDay * (dates.interval+(today-dates.end))
				earliestDate = dates.end
			}

			$(this).css({
				height: 2*dates.interval+"px",
				top: 2*(today-dates.end)+"px"
			})
		})
		$("#container").css("height", maxOffset+"px")
		$("#exp-container").css("height", maxOffset+"px")
		$("#time-container").css("height", maxOffset+"px")

		var titles = $('.title')

		// This is necessary for jQuery's "+=" to work
		titles.each(function() {
			$(this).parent().css("top", "0px")
		})

		// Gathering information for future "snap-back"
		// title positioning behavior
		var tracks = $('.track')
		var exps = []

		window.openTrack = false
		window.oldExpOffsets = {}

		tracks.each(function() {
			$(this).children().each(function() {
				oldExpOffsets[$(this).attr("short")] = [0]
				exps.push($(this))
			})
		})

		// Handles title display when detail display
		// transitions begin and end
		$("#container")[0].addEventListener(whichTransitionEvent(), function() {
			handleResize()
		});

		tracks.click(function() {
			var self = $(this)
			if (openTrack === true) {
				tracks.css("width", window.trackWidth)
				self.css("width", window.trackWidth)
				self.removeClass("selected")

				var $content = self.find('.exp-content')
				$content.css("height", "0px")

				openTrack = false
			}
			else {
				tracks.css("width", "0%")
				self.css("width", "100%")
				self.addClass("selected")

				self.children().each(function() {
					$(this).children().first().css({
						"top": "0px",
						"left": "0px"
					})
				})

				var $content = self.find('.exp-content')
				var height = 0
				$content.each(function() {
					height = $(this).parent().height() - $(this).parent().children().first().height()
					$(this).css("height", height)
				})

				openTrack = true
			}
		})

		// Sidebar setup

		// Loop back in time until the earliest time

		var month = new Date().getMonth()
		var year = 1900+new Date().getYear()

		var monthsElapsed = month - new Date(earliestDate).getMonth()

		var monthEl, monthDate, i = 0, offset=0, yearEl

		yearEl = $("<div class='year'>"+year+"</div>")

		$("#time-container").append(yearEl)
		do {
			monthEl = $("<div class='month'>"+months[month]+"</div>")
			monthDate = new Date() - new Date(year, month)
			offset = monthDate*daysPerMillis*pixelsPerDay
			monthEl.css("top", offset+"px")
			$("#time-container").append(monthEl)
			month = (month-1)%12
			if (month < 0) {
				month = 11
				year--
				yearEl = $("<div class='year'>"+year+"</div>")
				yearEl.css("top", offset-monthEl.height()+"px")
				$("#time-container").append(yearEl)
			}
			i++
		} while (offset+monthEl.height() < maxOffset)

		handleResize()
		moveOutTitles()
		window.onresize = handleResize
	}
})()