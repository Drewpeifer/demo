// add commas to long numbers
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

function populateD3(data) {
	var populations = data;

	d3.select("#tab-1")
		.selectAll("p")
		.data(populations)
		.enter()
		.append("p")
			.style("width", function(d) { newWidth = d.value/500000 + "px"; return newWidth; })
			.style("background-image","linear-gradient(to left, orange, red)")
			.text(function(d) {
				newValue = d.value.toLocaleString('en');
				return "("+d.date+") - "+newValue });
}

$(function() {
	// initialize d3.js demo
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