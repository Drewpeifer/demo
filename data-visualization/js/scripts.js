// add commas to long numbers
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

// populate the D3 population demo
function populateD3(data) {
	var populations = data;
	console.log(populations[0].value);
	maxPop = populations[0].value;

	d3.select("#populations")
		.selectAll("p")
		.data(populations)
		.enter()
		.append("p")
			.style("width", function(d) {
				// set top entry to 100%, make following
				// entries scale size by relative value
				newWidth = ""+((d.value/maxPop)*100) + "%"; return newWidth;
			})
			.style("background-image","linear-gradient(to right, orange, gold)")
			.text(function(d) {
				newValue = d.value.toLocaleString('en');
				return "("+d.date+") - "+newValue });
}

$(function() {
	// initialize D3.js demo
	$.getJSON('data/us-population-1960-2019.json', function(data) {
		var populations = data;
		populateD3(populations);
	});
	
	$('#tab-1 p').digits();

	// jqueryUI, etc.
	$(".content").tabs();
	$(".widget input[type=submit], .widget a, .widget button").button();
	$("button, input, a").click(function(event) {
		event.preventDefault();
	});
});