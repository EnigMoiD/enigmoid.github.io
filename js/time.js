(function() {

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

	var yearText = function(years, id) {
		if (id !== 'graduation')
			return "<span class='number'>" + years + "</span> year" + (years > 1 ? "s" : "")
		else
			return "<span class='number'>" + yearTitles[years] + "</span>"
	}

	var updateDOM = function(title, interval, age) {
		console.log("=====================")
		console.log(title)
		console.log("interval")
		console.log(interval)
		console.log("age")
		console.log(age)
		var percent = interval/age*100
		console.log("percent")
		console.log(percent)
		$("#"+title).css({"width": percent+"%"})
	}

	var yearTitles = {
		'-4': 'Freshman',
		'-3': 'Sophomore',
		'-2': 'Junior',
		'-1': 'Senior'
	}

	var dates = {
		birth: new Date(1994, 1, 26),
		graduation: new Date(2016, 4, 20),
		programming: new Date(2009, 10, 22),
		violin: new Date(2003, 9, 0),
		fire: new Date(2012, 10, 11),
		origami: new Date(1998, 7, 10)
	}

	var now = new Date

	var age = now.timeSince(dates.birth)

	for (var title in dates) {
		var date = dates[title]
		var interval = now.timeSince(date).years
		updateDOM(title, interval, age.years)
	}

})()
