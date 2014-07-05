(function() {
	window.onload = function() {
		function expsOverlap(exp1, exp2) {
			// console.log('TESTING');
			var dates1 = expDates(exp1)
			var dates2 = expDates(exp2)

			// console.log(exp1);
			// console.log(exp2);
			// console.log('dates1.end');
			// console.log(dates1.end);
			// console.log('dates2.start');
			// console.log(dates2.start);
			// console.log('dates1.start');
			// console.log(dates1.start);
			// console.log('dates2.end');
			// console.log(dates2.end);

			var overlap = (dates1.end > dates2.start && dates1.start < dates2.end)

			// console.log(overlap);
			// console.log('========');

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

		var experiences = $('.experience.snippet')

		var intervals = []

		var end, start, interval
		var container = $($(experiences[0]).parent())

		var tracks = []
		experiences.each(function() {
			tracks.push($(this).attr("track"))
		})
		tracks = _.uniq(tracks)

		var trackCount = tracks.length

		experiences.each(function() {
			var exp = $(this)

			var needsContainer = true
			var track

			var children = container.children()

			children.each(function() {
				if ($(this).attr("class") === "track")
					if ($(this).attr("track-name") === exp.attr("track")) {
						needsContainer = false
						track = $(this)
					}
			})

			if (needsContainer) {
				track = $("<div class='track' track-name='"+exp.attr("track")+"'></div>")

				container.append(track)
			}

			var dates = expDates(exp)
			var today = Date.parse(new Date())/1000/3600/24

			exp.css({
				height: dates.interval+"px",
				top: (today-dates.end)+"px"
			})
			intervals.push(interval)

			track.append(exp)
			track.css("width", 100.0/trackCount+"%")
		})
		
		for (var i in tracks) {
			track = tracks[i]

			var trackChildren = $("[track="+track+"]")

			var maxOverlaps = 0
			for (var i = 0; i < trackChildren.length-1; i++) {
				var trackChild = $(trackChildren[i])

				for (var j = i+1; j < trackChildren.length; j++) {
					var trackChildInner = $(trackChildren[j])
					if (expsOverlap(trackChild, trackChildInner)) { // there's one more overlap for each
						var newOverlaps = parseInt(trackChild.attr("overlaps"))+1
						var newInnerOverlaps = parseInt(trackChildInner.attr("overlaps"))+1
						trackChildInner.attr("overlaps", newInnerOverlaps)
						trackChild.attr("overlaps", newOverlaps)
					}
				}
			}
		}
		experiences.each(function() {
			$(this).css("width", 100.0/parseInt($(this).attr("overlaps"))+"%")
		})
	}
})()