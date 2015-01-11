(function() {
	var date, dates, interval, now, title, yearText, yearTitles

	Date.prototype.timeSince = function(date) {
		var delta = this.getTime() - date.getTime()
		date = new Date(delta)
		return {
			date: date,
			seconds: date.getSeconds(),
			minutes: date.getMinutes(),
			hours: date.getHours(),
			months: date.getMonth(),
			days: date.getDate(),
			years: date.getFullYear() - 1970
		}
	}

	yearText = function(years, id) {
		if (id !== 'graduation')
			return "<span class='number'>" + years + "</span> year" + (years > 1 ? "s" : "")
		else
			return "<span class='number'>" + yearTitles[years] + "</span>"
	}

	yearTitles = {
		'-4': 'Freshman',
		'-3': 'Sophomore',
		'-2': 'Junior',
		'-1': 'Senior'
	}

	dates = {
		birth: new Date(1994, 1, 26),
		graduation: new Date(2016, 4, 20),
		programming: new Date(2009, 10, 22),
		violin: new Date(2003, 9, 0),
		fire: new Date(2012, 10, 11),
		origami: new Date(1998, 7, 10)
	}

	now = new Date

	for (title in dates) {
		date = dates[title]
		interval = now.timeSince(date).years
		document.getElementById(title).innerHTML = yearText(interval, title)
	}

}).call(this)
