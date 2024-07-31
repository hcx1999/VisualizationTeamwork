
const mar = {top: 100, right: 100, bottom: 100, left: 0};
const he = 300;
const wi = 100;

var svg1 = d3.select("#img").append("svg")
	.attr("width", wi + mar.left + mar.right)
	.attr("height", he + mar.top + mar.bottom);

function renderDetail(year) {

        data = [
            {"Name": "城市人口", "Value": City.find(d => d.Year==year).Value},
            {"Name": "乡村人口", "Value": Countryside.find(d => d.Year==year).Value}
        ]

        // 创建一个分组元素，用于包含所有的扇形
        var g = svg1.append("g")
            .attr("transform", "translate(100, 100)");

        // 使用d3.pie()生成器
        var pie = d3.pie()
            .value(function(d) { return d.Value; });

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
            .attr("fill", function(d, i) { return d3.schemeCategory10[i]; });

        // 添加标签
        arcs.append("text")
            // .style("text-anchor", "end")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .text(function(d) { return d.data.Name; });

}

function removeDetail() {
    svg1.selectAll("*").remove();
}