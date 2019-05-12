// populate the D3 population demo
function buildPopulations(populations) {
	maxPop = parseInt(populations[0].value);

	d3.select("#populations")
		.selectAll("span")
		.data(populations)
		.enter()
		.append("span")
			.style("width", function(d) {
				// set first entry to 100%, make following
				// entries scale size by relative value
				pop = parseInt(d.value);
				newSize = "" + ((pop/maxPop) * 100)+ "%";
				return newSize;
			})
			.style("font-size", function(d) {
				// scale font-size similar to width
				pop = parseInt(d.value);
				popRatio = (pop/maxPop);
				newSize = "" + ((popRatio * popRatio) + .8) + "em";
				return newSize;
			})
			.text(function(d) {return "" + d.date + " - Pop: " + parseInt(d.value).toLocaleString('en');});
}

// build planetary gravity Vue demo
function buildPlanetApp(planetData) {
	var app = new Vue({
		el: '#planetApp',
		data() {
			console.log(planetData);
			return {
				planets: planetData
			}
		},
	});
}

$(function() {
	// initialize populations / D3.js demo
	$.getJSON('data/us-population-1960-2019.json', function(data) {
		buildPopulations(data);
	});

	//initialize planetary Vue demo
	$.getJSON('data/celestial-bodies.json', function(data) {
		buildPlanetApp(data);
	});

	// jqueryUI, etc.
	$(".content").tabs();
	$(".widget input[type=submit], .widget a, .widget button").button();
	$("button, input, a").click(function(event) {
		event.preventDefault();
	});
});