// populate the D3 population demo
function buildPopulationApp(populations) {
	console.log('building populationApp')
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
	console.log('building planetApp');
	var app = new Vue({
		el: '#planetApp',
		data: {
				planets: planetData,
				weight: 100
			},
		methods: {
			scaleRatio : function(planet) {
				return (1/planet.relative_equatorial_diameter);
			},
			axialRotation : function(planet) {
				return planet.axial_tilt_degrees;
			},
			earthAxialRotation : function(planet) {
				return planets[2].axial_tilt_degrees;
			}
		},
		filters: {
			capitalize: function (value) {
				if (!value) return ''
				value = value.toString()
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		}
	});
}

// build nobel laureate Chart.js demo
function buildNobelApp(nobel) {
	console.log('building nobelApp');
	var labels = nobel.laureates.map(function(e) {
	   return e.bornCountry;
	});
	var data = [];

	function countLabels(labels) {
	    var a = [], b = [], prev;
	    
	    labels.sort();
	    for ( var i = 0; i < labels.length; i++ ) {
	        if ( labels[i] !== prev ) {
	            a.push(labels[i]);
	            b.push(1);
	        } else {
	            b[b.length-1]++;
	        }
	        prev = labels[i];
	    }
	    
	    return [a, b];
	}

	var chartData = countLabels(labels);
	// chartData[0] = labels, [1] = data

    colorArray = [];
    for (var z = 0; z < chartData[0].length; z++) {
    	var letters = '0123456789ABCDEF'.split('');
    	var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    colorArray.push(color);
	}
	console.log('colorArray ' + colorArray);

	var ctx = document.getElementById('nobelChart').getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: chartData[0],
	        datasets: [{
	            label: '# of Laureates',
	            data: chartData[1],
	            backgroundColor: colorArray,
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}

$(function() {
	// initialize populations / D3.js demo
	$.getJSON('data/us-population-1960-2019.json', function(data) {
		buildPopulationApp(data);
	});

	//initialize planetary Vue demo
	$.getJSON('data/celestial-bodies.json', function(data) {
		buildPlanetApp(data);
	});

	// initialize nobel / chart.js demo
	$.getJSON('data/nobel-laureates.json', function(data) {
		console.log('getting json');
		buildNobelApp(data);
	});

	// jqueryUI, etc.
	$(".content").tabs();
	$(".widget input[type=submit], .widget a, .widget button").button();
	$("button, input, a").click(function(event) {
		event.preventDefault();
	});
});