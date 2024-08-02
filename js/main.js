
// renderBarChart(maleNewborn, femaleNewborn);
// renderLineChart(fertility, maleMortality, femaleMortality);
// renderRateChart(BirthRate, DeathRate);
// renderTags();
// renderColomnShow(BirthRate);

// const fs = require('fs').promises;

renderBarChart(0, 0);
renderLineChart(0, 0, 0);
renderRateChart(0, 0);
renderTags();
renderColomnShow(0);

function onChange() {

    var selectedChartItself = document.getElementById("select");
    var selectedChart = selectedChartItself.options[selectedChartItself.selectedIndex].value;
    // console.log(selectedChart);
    if(selectedChart == 'All') {
        svg.selectAll("rect").style("opacity", "1");
        svg.selectAll("path").style("opacity", "1");
        svg.selectAll("circle").style("opacity", "1");
    }else if (selectedChart == 'Bar Chart'){
        svg.selectAll("rect").style("opacity", "1");
        svg.selectAll("path").filter(".path1").style("opacity", "0");
        svg.selectAll("path").filter(".path2").style("opacity", "0");
        svg.selectAll("path").filter(".path3").style("opacity", "0");
        svg.selectAll("circle").style("opacity", "0");
    }else if (selectedChart == 'Line Chart'){
        svg.selectAll("rect").style("opacity", "0");
        svg.selectAll("path").filter(".path1").style("opacity", "1");
        svg.selectAll("path").filter(".path2").style("opacity", "0");
        svg.selectAll("path").filter(".path3").style("opacity", "0");
        svg.selectAll("circle").filter(".dot1").style("opacity", "1");
        svg.selectAll("circle").filter(".dot2").style("opacity", "0");
        svg.selectAll("circle").filter(".dot3").style("opacity", "0");
    }else if (selectedChart == 'Growth Rate'){
        svg.selectAll("rect").style("opacity", "0");
        svg.selectAll("path").filter(".path1").style("opacity", "0");
        svg.selectAll("path").filter(".path2").style("opacity", "1");
        svg.selectAll("path").filter(".path3").style("opacity", "1");
        svg.selectAll("circle").filter(".dot1").style("opacity", "0");
        svg.selectAll("circle").filter(".dot2").style("opacity", "1");
        svg.selectAll("circle").filter(".dot3").style("opacity", "1");
    }
}

function predict() {

    // console.log('test')
    var inputElement = document.getElementById('input');
    inputElement.addEventListener('keyup', function(event) {

        if (event.key === 'Enter') {

            event.preventDefault();
            var inputValue = inputElement.value;
            // console.log("Input: " + inputValue);

            filtered_DATA = DATA_BACKUP.filter(d => d.Year <= inputValue);

            if (Number(inputValue)<2024||Number(inputValue)>2035) {

            }else{

            // filtered_DATA = 'var DATA = '+filtered_DATA;
            // fs.writeFile('json/final.js', filtered_DATA).then(() => {
            //     console.log('JSON data has been written to the file.');
            // }).catch((err) => {
            //     console.error('An error occurred while writing the file:', err);
            // });

            // location.reload();
            // setTimeout(function(){
                DATA = filtered_DATA
                // console.log(DATA);

                svg.selectAll("rect").remove();
                svg.selectAll("path").remove();
                svg.selectAll("line").remove();
                svg.selectAll("circle").remove();
                svg.selectAll("text").remove();
                svg.selectAll("g").remove();
                
                renderBarChart(0, 0);
                renderLineChart(0, 0, 0);
                renderRateChart(0, 0);
                renderTags();
                renderColomnShow(0);

            // }, 500);
            }
        }
    });
}
