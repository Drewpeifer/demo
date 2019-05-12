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
				pop = parseInt(d.value);
				popRatio = (pop/maxPop);
				newSize = "" + ((popRatio * popRatio) + .8) + "em";
				return newSize;
			})
			.text(function(d) {return "(" + d.date + ") - Pop: " + parseInt(d.value).toLocaleString('en');});
}

// build planetary gravity demo
function buildGravity(gravities) {

}

$(function() {
	// initialize populations / D3.js demo
	$.getJSON('data/us-population-1960-2019.json', function(data) {
		var populations = data;
		buildPopulations(populations);
	});

	// jqueryUI, etc.
	$(".content").tabs();
	$(".widget input[type=submit], .widget a, .widget button").button();
	$("button, input, a").click(function(event) {
		event.preventDefault();
	});
});