const margin = {top: 200, right: 100, bottom: 300, left: 100};
const height = 800;
const width = 1000;
var offsetX = 0;
var interval = 0.6;

var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

function renderBarChart(male, female) {

	//比例尺
	var x = d3.scaleBand()
		.domain(male.map(d => d.Year))
		.range([margin.left, width - margin.right])
		.padding(interval);

	var y = d3.scaleLinear()
		.domain([0, d3.max(male, d => Number(d.Value) / 1000)]).nice()
		.range([height - margin.bottom, margin.top]);

	//条形图
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

	//x轴
	var xAxis = d3.axisBottom(x);
		// .tickSize(0);
	
	svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(xAxis)
		.selectAll("text")
		.attr("transform", `translate(0,${-200})`)
		.attr("transform", "rotate(-45)")
		.attr("text-anchor", "end");

	//y轴
	var yAxis = d3.axisLeft(y);

	svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.call(yAxis);
	svg.append("text")
		.attr("class", "axis-title")
		.attr("transform", `translate(${margin.left + 30},${margin.top - 15})`)
		.style("text-anchor", "end")
		.text("新生儿(千人)");

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
	svg.append("text")
		.attr("class", "axis-title")
		.attr("transform", `translate(${width - margin.right + 50},${margin.top - 15})`)
		.style("text-anchor", "end")
		.text("新生儿(平均每个妇女)");

	yLine = d3.scaleLinear()
		.domain([0, d3.max(maleMortality, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, height - margin.bottom / 2]);

	line = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => yLine(d.Value));

	svg.append("path")
		.datum(maleMortality)
		.attr("fill", "none")
		.attr("stroke", "rgb(81, 3, 176)")
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
		.attr("stroke", "rgb(81, 3, 176)")
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
		.attr("stroke", "rgb(163, 4, 123)")
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
		.attr("stroke", "rgb(163, 4, 123)")
		.attr("stroke-width", 1);

	//y轴
	svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(yLine));
	svg.append("text")
		.attr("class", "axis-title")
		.attr("transform", `translate(${margin.left + 30},${height - margin.bottom / 2 + 30})`)
		.style("text-anchor", "end")
		.text("死亡率(每千人)");

}

function tag() {

	svg.append("g")
		.attr("class", "legend")
		.attr("transform", "translate(20, 30)"); // 图例的位置

	// 添加图标
	svg.append("rect")
		.attr("x", width -  margin.right - 100)
		.attr("y", margin.top)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", "#9db8f3");
	svg.append("rect")
		.attr("x", width - margin.right - 100)
		.attr("y", margin.top + 20)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", "#feb032");
	svg.append("line")
		.attr("x1", width - margin.right - 120)
		.attr("y1", margin.top + 50)
		.attr("x2", width - margin.right - 100)
		.attr("y2", margin.top + 50)
		.attr("stroke", "green")
		.attr("stroke-width", 2);

	svg.append("line")
		.attr("x1", width - margin.right - 110)
		.attr("y1", height - margin.bottom / 2 - 20)
		.attr("x2", width - margin.right - 90)
		.attr("y2", height - margin.bottom / 2 - 20)
		.attr("stroke", "rgb(81, 3, 176)")
		.attr("stroke-width", 2);
	svg.append("line")
		.attr("x1", width - margin.right - 110)
		.attr("y1", height - margin.bottom / 2)
		.attr("x2", width - margin.right - 90)
		.attr("y2", height - margin.bottom / 2)
		.attr("stroke", "rgb(163, 4, 123)")
		.attr("stroke-width", 2);

	// 添加图例标签
	svg.append("text")
		.attr("x", width - margin.right - 80)
		.attr("y", margin.top + 5)
		.attr("dy", ".35em")
		.text("男性新生儿");
	svg.append("text")
		.attr("x", width - margin.right - 80)
		.attr("y", margin.top + 25)
		.attr("dy", ".35em")
		.text("女性新生儿");
	svg.append("text")
		.attr("x", width - margin.right - 95)
		.attr("y", margin.top + 50)
		.attr("dy", ".35em")
		.text("平均生育数量");
	svg.append("text")
		.attr("x", width - margin.right - 80)
		.attr("y", height - margin.bottom / 2)
		.attr("dy", ".35em")
		.text("男性死亡率");
	svg.append("text")
		.attr("x", width - margin.right - 80)
		.attr("y", height - margin.bottom / 2 - 20)
		.attr("dy", ".35em")
		.text("女性死亡率");

}