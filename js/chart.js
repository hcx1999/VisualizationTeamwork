


const margin = {top: 100, right: 0, bottom: 200, left: 50};
const height = 600;
const width = 700;
var offsetX = 0;
var interval = 0.6;

var barPositions, scaleMappedData, x;

var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

function renderBarChart(male, female) {

	// console.log(male.map(d => d.Year));
	// 比例尺
	x = d3.scaleBand()
		.domain(male.map(d => d.Year))
		.range([margin.left, (width - margin.right)*63/64])
		.padding(interval);
	
	// 记录年份与比例尺之间的反映射
	scaleMappedData = male.reduce((map, d) => {
			map[x(d.Year).toFixed(2)] = d.Year;
			return map;
		  }, {});
	// console.log(scaleMappedData);

	var y = d3.scaleLinear()
		.domain([0, d3.max(male, d => Number(d.Value) / 1000)]).nice()
		.range([height - margin.bottom, margin.top]);

	// 条形图
	var bar1 = svg
		.selectAll(".bar1")
		.data(male)
		.enter().append("rect")
		.attr("class", "bar1")
		.attr("fill", "#90a9b0")
		.attr("x", function(d) { return x(d.Year); })
		.attr("y", function(d) { return y(Number(d.Value) / 1000); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - margin.bottom - y(Number(d.Value) / 1000); })

	svg
		.selectAll(".bar2")
		.data(female)
		.enter().append("rect")
		.attr("class", "bar2")
		.attr("fill", "#e1d0d1")
		.attr("x", function(d) { return x(d.Year); })
		.attr("y", function(d) { return y(Number(d.Value) / 1000); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - margin.bottom - y(Number(d.Value) / 1000); })

	// 记录每个矩形的位置，供侦测鼠标位置使用
	barPositions = bar1.nodes().map(bar => {
		var rect = bar.getBoundingClientRect();
		return {
		left: rect.left + margin.left,
		top: rect.top + margin.top,
		width: rect.width,
		height: rect.height,
		};
	});
	// console.log(barPositions);

	// y轴
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
	
	// 比例尺
	var x = d3.scaleBand()
		.domain(fertility.map(d => d.Year))
		.range([margin.left, (width - margin.right)*62/64])
		.padding(interval);
	var yLine = d3.scaleLinear()
		.domain([0, d3.max(fertility, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, margin.top]);

	// 折线比例尺
	var line = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => yLine(d.Value));

	// 折线图
	svg.append("path")
		.datum(fertility)
		.attr("fill", "none")
		.attr("stroke", "#637077")
		.attr("stroke-width", 1.5)
		.attr("d", line);

	// 转折点
	svg.selectAll(".dot1")
		.data(fertility)
		.enter().append("circle")
		.attr("class", "dot1")
		.attr("cx", d => x(d.Year) + x.bandwidth() / 2)
		.attr("cy", d => yLine(d.Value))
		.attr("r", 3)
		.attr("fill", "white")
		.attr("stroke", "#637077")
		.attr("stroke-width", 1);

	// 右面的y轴及图例
	svg.append("g")
		.attr("transform", `translate(${width - margin.right},0)`)
		.call(d3.axisRight(yLine));
	svg.append("text")
		.attr("class", "axis-title")
		.attr("transform", `translate(${width - margin.right + 50},${margin.top - 15})`)
		.style("text-anchor", "end")
		.text("新生儿(平均每个妇女)");

/*
	// 下面的两条折线
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

	// 下面的y轴
	svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(yLine));
	svg.append("text")
		.attr("class", "axis-title")
		.attr("transform", `translate(${margin.left + 30},${height - margin.bottom / 2 + 30})`)
		.style("text-anchor", "end")
		.text("死亡率(每千人)");
*/

}

function renderRateChart(BirthRate, DeathRate) {

	var x = d3.scaleBand()
		.domain(BirthRate.map(d => d.Year))
		.range([margin.left, width - margin.right])
		.padding(interval);

	var Birth = d3.scaleLinear()
		.domain([0, d3.max(BirthRate, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, height - margin.bottom / 2]);

	var Line_birth = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => Birth(d.Value));
	
	svg.append("path")
		.datum(BirthRate)
		.attr("fill", "none")
		.attr("stroke", "#b87c4c")
		.attr("stroke-width", 2)
		// .style("opacity", "0.5")
		.attr("d", Line_birth);

	svg.selectAll(".dot2")
		.data(BirthRate)
		.enter().append("circle")
		.attr("class", "dot2")
		.attr("cx", d => x(d.Year) + x.bandwidth() / 2)
		.attr("cy", d => Birth(d.Value))
		.attr("r", 2)
		.attr("fill", "#b87c4c")
		.attr("stroke", "#b87c4c")
		// .style("opacity", "0.5")
		.attr("stroke-width", 1);

	// console.log(DeathRate);
	var Death = d3.scaleLinear()
		.domain([0, d3.max(DeathRate, d => Number(d.Value))]).nice()
		.range([height - margin.bottom, height - margin.bottom + margin.bottom / 2*25.43/43.6]);

	var Line_death = d3.line()
		.x(d => x(d.Year) + x.bandwidth() / 2)
		.y(d => Number(Death(d.Value)));
	
	svg.append("path")
		.datum(DeathRate)
		.attr("fill", "none")
		.attr("stroke", "#f4e0b7")
		.attr("stroke-width", 2)
		// .style("opacity", "0.5")
		.attr("d", Line_death);

	svg.selectAll(".dot3")
		.data(DeathRate)
		.enter().append("circle")
		.attr("class", "dot2")
		.attr("cx", d => x(d.Year) + x.bandwidth() / 2)
		.attr("cy", d => Death(d.Value))
		.attr("r", 2)
		.attr("fill", "#f4e0b7")
		.attr("stroke", "#f4e0b7")
		// .style("opacity", "0.5")
		.attr("stroke-width", 1);

	// 记录birth.year和death之间的映射
	birth_darth_map = DeathRate.reduce((map, d) => {
		map[d.Year] = d.Value;
		return map;
	  }, {});

/*
	// renderGrowthRateArea
	var area = d3.area()
		.x(function(d) { return x(d.Year); })
		.y0(function(d) { return Death(birth_darth_map[d.Year]); })
		.y1(function(d) { return Birth(d.Value); });

	svg.append("path")
		.datum(BirthRate)
		.attr("fill", "green")
		.attr("d", area);
*/

	// x轴
	var xAxis = d3.axisBottom(x);
		// .tickSize(0); // 取消刻度

	svg.append("g")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(xAxis)
		.selectAll("text")
		.attr("transform", `translate(0,${-200})`)
		.attr("transform", "rotate(-45)")
		.attr("text-anchor", "end");

	// 下面的y轴
	svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(Birth));
	svg.append("text")
		.attr("class", "axis-title")
		.attr("transform", `translate(${margin.left + 50},${height - margin.bottom / 2 + 30})`)
		.style("text-anchor", "end")
		.text("出生/死亡率(‰)");

}

function renderTags() {

	svg.append("g")
		.attr("class", "legend")
		.attr("transform", "translate(20, 30)"); // 图例的位置

	// 添加图例的图标
	svg.append("rect")
		.attr("x", width -  margin.right - 100)
		.attr("y", margin.top)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", "#90a9b0");
	svg.append("rect")
		.attr("x", width - margin.right - 100)
		.attr("y", margin.top + 20)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", "#e1d0d1");
	svg.append("line")
		.attr("x1", width - margin.right - 120)
		.attr("y1", margin.top + 50)
		.attr("x2", width - margin.right - 100)
		.attr("y2", margin.top + 50)
		.attr("stroke", "#637077")
		.attr("stroke-width", 2);

	svg.append("line")
		.attr("x1", width - margin.right - 110)
		.attr("y1", height - margin.bottom / 2 - 20)
		.attr("x2", width - margin.right - 90)
		.attr("y2", height - margin.bottom / 2 - 20)
		.attr("stroke", "#b87c4c")
		.attr("stroke-width", 2);
	svg.append("line")
		.attr("x1", width - margin.right - 110)
		.attr("y1", height - margin.bottom / 2)
		.attr("x2", width - margin.right - 90)
		.attr("y2", height - margin.bottom / 2)
		.attr("stroke", "#f4e0b7")
		.attr("stroke-width", 2);

	// 添加图例的文本
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
		.attr("y", height - margin.bottom / 2 - 20)
		.attr("dy", ".35em")
		.text("出生率(‰)");
	svg.append("text")
		.attr("x", width - margin.right - 80)
		.attr("y", height - margin.bottom / 2)
		.attr("dy", ".35em")
		.text("死亡率(‰)");

}

function renderColomnShow(BirthRate) {

	var x = d3.scaleBand()
		.domain(BirthRate.map(d => d.Year))
		.range([margin.left, width - margin.right])
		.padding(interval);

	col = svg.selectAll(".col")
		.data(BirthRate)
		.enter().append("line")
		.attr("class", "col")
		.attr("x1", function(d) { return x(d.Year)+x.bandwidth()/2-1; })
		.attr("y1", margin.top)
		.attr("x2", function(d) { return x(d.Year)+x.bandwidth()/2-1; })
		.attr("y2", height-margin.bottom/2)
		.style("stroke", "rgb(247, 235, 60)")
		.style("stroke-width", 12)
		.style("opacity", 0.0);

	col.on("mouseover", function(){
			d3.select(this).style("opacity", "0.5");
			renderDetail(d3.select(this).data()[0].Year);
			// document.getElementById('img').innerHTML='<img src="img/2.jpg" alt="img/2.jpg" width="200" height="300">';
			// console.log(d3.select(this).data()[0].Year);
			// document.getElementById('img').innerHTML = '';
		})
	col.on("mouseout", function(){
			d3.select(this).style("opacity", "0");
			removeDetail();
			// document.getElementById('img').innerHTML = '';
			// document.getElementById('img').innerHTML='<img src="img/1.jpg" alt="img/1.jpg" width="200" height="300">';
		})

}
