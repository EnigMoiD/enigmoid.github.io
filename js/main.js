(function() {
	window.accentColor = "#1194CE"

	window.whichTransitionEvent = function() {
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		}

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	}

	// elsProps is a dict {elementName: {el: el, props: [prop0, prop1, ...]}}
	window.setTransition = function(enable, elsProps) {
		for (var i in elsProps) {
			var entry = elsProps[i]

			var baseString = ""
			for (var j in entry.props)
				baseString += entry.props[j] + " 200ms, "

			baseString = baseString.slice(0, -2)
			if (enable) {
				$(entry.el).css({
					"-webkit-transition": baseString,
					"   -moz-transition": baseString,
					"    -ms-transition": baseString,
					"     -o-transition": baseString,
					"        transition": baseString
				})
			}
			else {
				$(entry.el).css({
					"-webkit-transition": "none",
					"   -moz-transition": "none",
					"    -ms-transition": "none",
					"     -o-transition": "none",
					"        transition": "none"
				})
			}
		}
	};

})()