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

	// elsProps is a dict {elementName: {el: el, prop: property}}
	window.setTransition = function(enable, elsProps) {
		for (var i in elsProps) {
			var entry = elsProps[i]
			if (enable) {
				$(entry.el).css({
					"-webkit-transition": entry.prop + " 200ms",
					"   -moz-transition": entry.prop + " 200ms",
					"    -ms-transition": entry.prop + " 200ms",
					"     -o-transition": entry.prop + " 200ms",
					"        transition": entry.prop + " 200ms"
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