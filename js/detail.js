
const mar = {top: 100, right: 0, bottom: 0, left: 0};
const he = 200;
const wi = 300;

var svg1 = d3.select("#svg-detail").append("svg")
	.attr("width", wi + mar.left + mar.right)
	.attr("height", he + mar.top + mar.bottom);
var table = d3.select("#form").append("table")
    .attr("transform", "translate(-1000, -1000)");

function renderDetail(year) {
    renderPieChart(year);
    renderRuler(year);
    renderForm(year);
}

function renderPieChart(year){

    // 整理当年的数据
    var Total = Number(City.find(d => d.Year==year).Value) + Number(Countryside.find(d => d.Year==year).Value);
    data = [
        {"Name": "城市人口", "Value": City.find(d => d.Year==year).Value, "Percent": Number(City.find(d => d.Year==year).Value)/Total},
        {"Name": "乡村人口", "Value": Countryside.find(d => d.Year==year).Value, "Percent": Number(Countryside.find(d => d.Year==year).Value)/Total}
    ]

    // 创建一个分组元素，用于包含所有的扇形
    var g = svg1.append("g")
        .attr("transform", "translate(60, 150)");

    // 使用d3.pie()生成器
    var pie = d3.pie()
        .value(function(d) { return d.Value; })

    // 使用d3.arc()生成器
    var arc = d3.arc()
        .innerRadius(30)
        .outerRadius(50);

    // 绑定数据和生成SVG路径元素
    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    // 添加路径元素
    arcs.append("path")
        .attr("d", arc)
        // .attr("fill", function(d, i) { return d3.schemeCategory10[i]; });
        .attr("fill", function(d, i) { return ["#377483", "#c7dff0"][i]; });

    // 添加标签
    // arcs.append("text")
    //     // .style("text-anchor", "end")
    //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    //     .text(function(d) { return (d.data.Percent*100).toFixed(2)+'%'; });

    // 添加图例
	svg1.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(60, 200)");

    // 添加图例的图标
    svg1.append("rect")
        .attr("x", mar.left)
        .attr("y", mar.top+130)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#377483");
    svg1.append("rect")
        .attr("x", mar.left)
        .attr("y", mar.top + 160)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#c7dff0");

    // 添加图例的文本
    svg1.append("text")
        .attr("x", mar.left+15)
        .attr("y", mar.top +135)
        .attr("dy", ".35em")
        .text('城市人口('+(data[0].Percent*100).toFixed(2)+'%)');
    svg1.append("text")
        .attr("x", mar.left+15)
        .attr("y", mar.top +165)
        .attr("dy", ".35em")
        .text('乡村人口('+(data[1].Percent*100).toFixed(2)+'%)');

}

function renderRuler(year) {

    // 计算男女比例
    var Percent = (Number(Male.find(d => d.Year==year).Value) / Number(Female.find(d => d.Year==year).Value)).toFixed(4);

	// 男女比例的小尺子
	var ruler = d3.scaleLinear()
    .domain([1.0000, 1.0900]).nice()
    .range([he - mar.bottom, mar.top]);

	var rulerAxis = d3.axisLeft(ruler);

	svg1.append("g")
		.attr("transform", `translate(${wi-mar.right-100},0)`)
		.call(rulerAxis);

    // 小箭头
    // M = 移动到起点, L = 画线到终点, Z = 闭合路径
    var arrowX = wi-mar.right-98;
    var arrowY = ruler(Percent);
    var arrowPath = 'M'+arrowX+','+arrowY+' L'+(arrowX+5)+','+(arrowY-5)+' L'+(arrowX+5)+','+(arrowY+5)+' Z';
    // console.log(arrowPath);

    // 在SVG中添加箭头(path)
    svg1.append("path")
        .attr("d", arrowPath)
        .attr("fill", "black") // 填充颜色
        .attr("stroke", "black") // 边框颜色
        .attr("stroke-width", "2"); // 边框宽度

    svg1.append("text")
        .attr("x", wi - mar.right - 150)
        .attr("y", mar.top + 150)
        .attr("dy", ".35em")
        .text('男女比例('+Percent+':1)');
}

function removeDetail() {
    svg1.selectAll("*").remove();
    table.selectAll("*").remove();
}

function renderForm(year) {
    
        // 准备数据
        var data = [
            { 统计: "总人口(万人)", 数值: Population.find(d => d.Year==year).Value },
            { 统计: "男性(万人)", 数值: Male.find(d => d.Year==year).Value},
            { 统计: "女性(万人)", 数值: Female.find(d => d.Year==year).Value },
            { 统计: "城市(万人)", 数值: City.find(d => d.Year==year).Value},
            { 统计: "乡村(万人)", 数值: Countryside.find(d => d.Year==year).Value },
            { 统计: "男性新生儿(人)", 数值: maleNewborn.find(d => d.Year==year).Value },
            { 统计: "女性新生儿(人)", 数值: femaleNewborn.find(d => d.Year==year).Value },
            { 统计: "平均生育数量(婴儿/每个妇女)", 数值: fertility.find(d => d.Year==year).Value },
            { 统计: "出生率(‰)", 数值: BirthRate.find(d => d.Year==year).Value },
            { 统计: "死亡率(‰)", 数值: DeathRate.find(d => d.Year==year).Value },
            { 统计: "自然增长率(‰)", 数值: GrowthRate.find(d => d.Year==year).Value }
        ];

        // 添加表头
        table.append("thead")
            .append("tr")
            .selectAll("th")
            .data(Object.keys(data[0]))
            .enter().append("th")
            .text(function(d) { return d; });

        // 添加表格行
        var rows = table.append("tbody")
            .selectAll("tr")
            .data(data)
            .enter().append("tr");

        // 添加单元格
        rows.selectAll("td")
            .data(function(d) { return Object.values(d); })
            .enter().append("td")
            .text(function(d) { return d; });

}