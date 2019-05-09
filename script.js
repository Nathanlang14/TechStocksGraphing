var clicks = 0;
d3.selectAll(".hardware-label").on("change", saveHard);
function saveHard() {
	var checkArrHardware = [];
	d3.selectAll(".hardware-label").each(function(d) {
		cb = d3.select(this);
		if (cb.property("checked")) {
			checkArrHardware.push(cb.property("value"));		
		}
	});
	d3.selectAll('.app-button').remove();
	clicks++;
	document.getElementById("clicks").innerHTML = clicks;
	console.log(clicks);
	changer(checkArrHardware);
	d3.selectAll('.app-button').remove();
	return checkArrHardware;
}	
d3.selectAll(".soft-label").on("change", saveSoft);
function saveSoft() {
	var checkArrSoftware = [];
	d3.selectAll(".soft-label").each(function(d) {
		cb = d3.select(this);
		if (cb.property("checked")) {
			checkArrSoftware.push(cb.property("value"));
		}
	});
	d3.selectAll('.app-button').remove();
	clicks++;
	document.getElementById("clicks").innerHTML = clicks;
	console.log(clicks);
	changer(checkArrSoftware);
	d3.selectAll('.app-button').remove();
	return checkArrSoftware;
}
d3.selectAll(".bigdata-label").on("change", saveBig);
function saveBig() {
	var checkArrBigdata = [];
	d3.selectAll(".bigdata-label").each(function(d) {
		cb = d3.select(this);
		if (cb.property("checked")) {
			checkArrBigdata.push(cb.property("value"));
		}
		
	});
	d3.selectAll('.app-button').remove();
	clicks++;
	document.getElementById("clicks").innerHTML = clicks;
	console.log(clicks);
	changer(checkArrBigdata);
	d3.selectAll('.app-button').remove();
	return checkArrBigdata;
}

var margin = {top: 20, right: 20, bottom: 35, left: 50},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);
	
var formatMillisecond = d3.time.format(".%L"),
    formatSecond = d3.time.format(":%S"),
    formatMinute = d3.time.format("%I:%M"),
    formatHour = d3.time.format("%I %p"),
    formatDay = d3.time.format("%a %d"),
    formatWeek = d3.time.format("%b %d"),
    formatMonth = d3.time.format("%B"),
    formatYear = d3.time.format("%Y");

// Define filter conditions
function multiFormat(date) {
  return (d3.time.second(date) < date ? formatMillisecond
    : d3.time.minute(date) < date ? formatSecond
    : d3.time.hour(date) < date ? formatMinute
    : d3.time.day(date) < date ? formatHour
    : d3.time.month(date) < date ? (d3.time.week(date) < date ? formatDay : formatWeek)
    : d3.time.year(date) < date ? formatMonth
    : formatYear)(date);
}


var xAxisFormat = d3.time.format.multi([
  ["%b.", function(d) { return d.getMonth(); }],
  ["%Y", function() { return true; }]
]);

var xAxis = d3.svg.axis()
    .scale(x)
	.tickFormat(multiFormat)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
	.interpolate("cardinal") 
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.price); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")");

svg.append("g")
	  .attr("class", "y axis");

svg.append("line")
	.attr("class","zeroAxis");


// Whenever we want to make a d3 chart update with new data, we need to put the
// elements of our chart that are going to change with the new data into a function.
// That way we can simply call it to redraw these elements.
// In our case, those elements will be the axes, lines and labels, all of which depend
// our data.

function changer( arr ){

	function draw(dataFile, axisFormat){
	
		d3.selectAll('.app-button').remove();
		yAxis.tickFormat(d3.format(axisFormat));
		
		
		d3.csv(dataFile, function(error, data) {
			data.forEach(function(d) {
				d.date = parseDate(d.date);
			});
			
		  var cutoffDate = new Date(2019,3,2);	  
		  cutoffDate.setDate(cutoffDate.getDate() - 7);
		  data_1w = data.filter(function(d) {return d.date > cutoffDate;})
		  cutoffDate = new Date(2019,3,2);
		  cutoffDate.setDate(cutoffDate.getDate() - 30);
		  data_1m = data.filter(function(d) {return d.date > cutoffDate;})
		  cutoffDate = new Date(2019,3,2);
		  cutoffDate.setDate(cutoffDate.getDate() - 90);
		  data_3m = data.filter(function(d) {return d.date > cutoffDate;})
		  cutoffDate = new Date(2019,3,2);
		  cutoffDate.setDate(cutoffDate.getDate() - 180);
		  data_6m = data.filter(function(d) {return d.date > cutoffDate;})
		  cutoffDate = new Date(2019,3,2);
		  cutoffDate.setDate(cutoffDate.getDate() - 270);
		  data_9m = data.filter(function(d) {return d.date > cutoffDate;})
		  cutoffDate = new Date(2019,3,2);
		  cutoffDate.setDate(cutoffDate.getDate() - 360);
		  data_1y = data.filter(function(d) {return d.date > cutoffDate;})
			
			var all_data = [
			{ 'name': '1 week', 'data': data_1w},
			{ 'name': '1 month', 'data': data_1m},
			{ 'name': '3 month', 'data': data_3m},
			{ 'name': '6 month', 'data': data_6m},
			{ 'name': '9 month', 'data': data_9m},
			{ 'name': '1 year', 'data': data_1y}
			];
			
			var buttons;
			
			buttons = d3.select('.button-area')
				.selectAll(null)
				.data(all_data);
			
			buttons.enter()
					.append('button')
					.attr('class', 'app-button')
					.html(function(d) { 
					  return d.name; })
					.on('click', function(d) {
					  clicks++;
					document.getElementById("clicks").innerHTML = clicks;
					console.log(clicks);
					  nd = d.data;
					  updateChart(nd,arr);
					});
					
			
		  function updateChart(data,arr){			  

		  // Our color scale domain is going to be the values in the header row of our CSV,
		  // excluding the "date" column.
		  
		  var color = d3.scale.category10();
		  color.domain( arr );


		  // Since we'll have multiple companies in our data, we need to create a data array 
		  // that has multiple objects, one for AHC and one for NWS. We'll use javascript's map
		  // function to relate all the price and date data to their respective companies.
		  var companies = color.domain().map(function(name) {
			return {
			  name: name,
			  values: data.map(function(d) {
				return {date: d.date, price: +d[name]};
			  })
			};
		  });
		  
		  var mouseG = svg.append("g")
			  .attr("class", "mouse-over-effects");

			mouseG.append("path") // this is the black vertical line to follow mouse
			  .attr("class", "mouse-line")
			  .style("stroke", "black")
			  .style("stroke-width", "1px")
			  .style("opacity", "0");
			  
			var lines = document.getElementsByClassName('line');

			var mousePerLine = mouseG.selectAll('.mouse-per-line')
			  .data(companies)
			  .enter()
			  .append("g")
			  .attr("class", "mouse-per-line");

			mousePerLine.append("circle")
			  .attr("r", 7)
			  .style("stroke", function(d) {
				return color(d.name);
			  })
			  .style("fill", "none")
			  .style("stroke-width", "1px")
			  .style("opacity", "0");

			mousePerLine.append("text")
			  .attr("transform", "translate(10,3)");

			mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
			  .attr('width', width) // can't catch mouse events on a g element
			  .attr('height', height)
			  .attr('fill', 'none')
			  .attr('pointer-events', 'all')
			  .on('mouseout', function() { // on mouse out hide line, circles and text
				d3.select(".mouse-line")
				  .style("opacity", "0");
				d3.selectAll(".mouse-per-line circle")
				  .style("opacity", "0");
				d3.selectAll(".mouse-per-line text")
				  .style("opacity", "0");
			  })
			  .on('mouseover', function() { // on mouse in show line, circles and text
				d3.select(".mouse-line")
				  .style("opacity", "1");
				d3.selectAll(".mouse-per-line circle")
				  .style("opacity", "1");
				d3.selectAll(".mouse-per-line text")
				  .style("opacity", "1");
			  })
			  .on('mousemove', function() { // mouse moving over canvas
				var mouse = d3.mouse(this);
				d3.select(".mouse-line")
				  .attr("d", function() {
					var d = "M" + mouse[0] + "," + height;
					d += " " + mouse[0] + "," + 0;
					return d;
				  });

				d3.selectAll(".mouse-per-line")
				  .attr("transform", function(d, i) {
					console.log(width/mouse[0])
					var xDate = x.invert(mouse[0]),
						bisect = d3.bisector(function(d) { return d.date; }).right;
						idx = bisect(d.values, xDate);
					
					var beginning = 0,
						end = lines[i].getTotalLength(),
						target = null;

					while (true){
					  target = Math.floor((beginning + end) / 2);
					  pos = lines[i].getPointAtLength(target);
					  if ((target === end || target === beginning) && pos.x !== mouse[0]) {
						  break;
					  }
					  if (pos.x > mouse[0])      end = target;
					  else if (pos.x < mouse[0]) beginning = target;
					  else break; //position found
					}
					
					d3.select(this).select('text')
					  .text(y.invert(pos.y).toFixed(2));
					  
					return "translate(" + mouse[0] + "," + pos.y +")";
				  });
			  });


		  // You can print the companies data to the console and take a look.
		  // console.log(companies);


		  x.domain(d3.extent(data, function(d) { return d.date; }));


		  // To get our Y domain, we'll take the min/max of each price for each company object in the companies array
		  // and then take the final min/max of all those mins/maxs.
		  y.domain([
			d3.min(companies, function(company) { return d3.min(company.values, function(value) { return value.price; }); }),
			d3.max(companies, function(company) { return d3.max(company.values, function(value) { return value.price; }); })
		  ]);

		  // Update our zero axis.
		  svg.select(".zeroAxis")
			.transition().duration(1000)
			.attr({
				x1:0,
				x2:width,
				y1:y(0),
				y2:y(0)
			});


		  // Company lines

		  // JOIN
		  var company = svg.selectAll(".company")
			  .data(companies);
			  

		  // ENTER
		  company.enter().append("path")
			  .attr("class", "company line")
			  .style("stroke", function(d) { return color(d.name); });

		  // UPDATE
		  company
			  .transition().duration(1000)
			  .attr("d", function(d) { return line(d.values); });
			  
		  company.exit().remove();

		  // D3 makes updating our axes REALLY easy. All we do is select the axis and call them again.
		  svg.select(".x.axis")
			  .transition().duration(1000)
			  .call(xAxis);
		  svg.select(".y.axis")
			  .transition().duration(1000)
			  .call(yAxis);

		  var labels = svg.selectAll(".labels")
				// Data is the array of headers in our CSV, excluding the date column.
				// Helpfully, we already have that array. It's our color domain!
				.data(color.domain());

			labels.enter()
				.append("g")
				.attr("class", "labels");
			
			labels.append("rect")
				.attr({
					fill: function(d){return color(d);},
					height: 20,
					width: 42,
					// A little math to automatically place our labeling.
					// Remember, "i" is the index number of the data element "d".
					// We can use it to space our labels! 
					x: function(d, i){return width - 23 - (42 * i) ;},
					y: -10
				});

			labels.append("text")
				.text(function(d){return d;})
				.attr({
					x: function(d, i){return width - 20 - (42 * i) ;},
					y: 5,
				});
		  }
		updateChart(data_1y, arr);
		});
	}

	// Draw the chart when the page loads.
	//d3.selectAll('.app-button').remove();
	draw("stockdata.csv","$");
	d3.selectAll('.app-button').remove();

	// Bind the draw function to our two buttons with the correct arguments.
	$("#priceBtn").click(function(){ 
		d3.selectAll('.app-button').remove();
		draw("stockdata.csv", "$" ); 
		
	});
	$("#changeBtn").click(function(){ 
		d3.selectAll('.app-button').remove();
		draw("pctchange.csv", "+%" ); 
		
	});
}
