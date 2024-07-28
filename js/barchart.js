const margin = {top: 200, right: 100, bottom: 300, left: 100};
const height = 800;
const width = 1000;
var offsetX = 0;
var interval = 0.6;

var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

function renderBarChart(male, female) {

	var x = d3.scaleBand()
		.domain(male.map(d => d.Year))
		.range([margin.left, width - margin.right])
		.padding(interval);

	var y = d3.scaleLinear()
		.domain([0, d3.max(male, d => Number(d.Value) / 1000)]).nice()
		.range([height - margin.bottom, margin.top]);

	svg
		.selectAll(".bar1")
		.data(male)
		.enter().append("rect")
		.attr("class", "bar1")
		.attr("x", function(d) { return x(d.Year); })
		.attr("y", function(d) { return y(Number(d.Value) / 1000); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - margin.bottom - y(Number(d.Value) / 1000); })

	svg
		.selectAll(".bar2")
		.data(female)
		.enter().append("rect")
		.attr("class", "bar2")
		.attr("x", function(d) { return x(d.Year); })
		.attr("y", function(d) { return y(Number(d.Value) / 1000); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - margin.bottom - y(Number(d.Value) / 1000); })

	svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x))
		.selectAll("text")
		.attr("transform", "rotate(-45)")
		.attr("text-anchor", "end");

	svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y));

}

function renderLineChart(fertility, maleMortality, femaleMortality) {
	
	var x = d3.scaleBand()
		.domain(fertility.map(d => d.Year))
		.range([margin.left, width - margin.right])
		.padding(interval);
	var yLine = d3.scaleLinear()
		.domain([0, d3.max(fertility, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, margin.top]);

	var line = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => yLine(d.Value));

	svg.append("path")
		.datum(fertility)
		.attr("fill", "none")
		.attr("stroke", "green")
		.attr("stroke-width", 1.5)
		.attr("d", line);

	svg.selectAll(".dot1")
		.data(fertility)
		.enter().append("circle")
		.attr("class", "dot1")
		.attr("cx", d => x(d.Year) + x.bandwidth() / 2)
		.attr("cy", d => yLine(d.Value))
		.attr("r", 3)
		.attr("fill", "white")
		.attr("stroke", "green")
		.attr("stroke-width", 1);

	svg.append("g")
		.attr("transform", `translate(${width - margin.right},0)`)
		.call(d3.axisRight(yLine));

	yLine = d3.scaleLinear()
		.domain([0, d3.max(maleMortality, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, height - margin.bottom / 2]);

	line = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => yLine(d.Value));

	svg.append("path")
		.datum(maleMortality)
		.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-width", 1.5)
		.attr("d", line);

	svg.selectAll(".dot2")
		.data(maleMortality)
		.enter().append("circle")
		.attr("class", "dot2")
		.attr("cx", d => x(d.Year) + x.bandwidth() / 2)
		.attr("cy", d => yLine(d.Value))
		.attr("r", 3)
		.attr("fill", "white")
		.attr("stroke", "black")
		.attr("stroke-width", 1);

	yLine = d3.scaleLinear()
		.domain([0, d3.max(femaleMortality, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, height - margin.bottom / 2]);

	line = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => yLine(d.Value));

	svg.append("path")
		.datum(femaleMortality)
		.attr("fill", "none")
		.attr("stroke", "grey")
		.attr("stroke-width", 1.5)
		.attr("d", line);

	svg.selectAll(".dot3")
		.data(femaleMortality)
		.enter().append("circle")
		.attr("class", "dot3")
		.attr("cx", d => x(d.Year) + x.bandwidth() / 2)
		.attr("cy", d => yLine(d.Value))
		.attr("r", 3)
		.attr("fill", "white")
		.attr("stroke", "grey")
		.attr("stroke-width", 1);

	svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(yLine));

}
