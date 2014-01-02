Date.prototype.timeSince = (date) ->
	delta = @getTime() - date.getTime()

	date = new Date delta

	date: date
	seconds: date.getSeconds()
	minutes: date.getMinutes()
	hours: date.getHours()
	months: date.getMonth()
	days: date.getDate()
	years: date.getFullYear()-1970


yearText = (years, id) -> 
	if id isnt 'graduation'
		"<span class='number'>" + years + "</span> year" + if years > 1 then "s" else ""
	else "<span class='number'>" + yearTitles[years] + "</span>"

yearTitles =
	'-4': 'Freshman'
	'-3': 'Sophomore'
	'-2': 'Junior'
	'-1': 'Senior'
###
For those viewing source, remember that js 0-indexes months
###

dates =
	birth: new Date(1994, 1, 26)
	graduation: new Date(2016, 4, 20)
	programming: new Date(2009, 10, 22)
	violin: new Date(2003, 9, 0)
	fire: new Date(2012, 10, 11)

now = new Date

for title, date of dates
	interval = now.timeSince(date).years
	document.getElementById(title).innerHTML = yearText interval, title