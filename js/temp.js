// 假设svg是你的SVG容器，d3是你的D3对象
var data = d3.range(100).map(function(d) { return {x: d / 10, y1: Math.sin(d / 10), y2: Math.sin(d / 10 + 0.5)}; });

var line1 = d3.line()
    .x(function(d) { return d.x * 100; })
    .y(function(d) { return 100 - d.y1 * 100; });

var line2 = d3.line()
    .x(function(d) { return d.x * 100; })
    .y(function(d) { return 100 - d.y2 * 100; });

var area = d3.area()
    .x(function(d) { return d.x * 100; })
    .y0(function(d) { return 100 - Math.max(d.y1, d.y2) * 100; })
    .y1(function(d) { return 100 - Math.min(d.y1, d.y2) * 100; });

svg.append("path")
    .datum(data)
    .attr("fill", "green")
    .attr("d", area);

svg.append("path")
    .datum(data)
    .attr("stroke", "black")
    .attr("d", line1);

svg.append("path")
    .datum(data)
    .attr("stroke", "red")
    .attr("d", line2);
