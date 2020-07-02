var svgWidth = 700;
var svgHeight = 400;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.csv("assets/data/data.csv").then(function(smokeData) {

  smokeData.forEach(function(data) {
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.abbr = data.abbr
    console.log(data.abbr)
  });

  var xAxisRange = d3.scaleLinear()
  .domain([35000, d3.max(smokeData, d => d.income)])
  .range([0, chartWidth]);
  var yAxisRange = d3.scaleLinear()
  .domain([9, d3.max(smokeData, d => d.smokes)])
  .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xAxisRange);
  var leftAxis = d3.axisLeft(yAxisRange);

  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

  chartGroup.append("g")
  .call(leftAxis);

  var plotpoints = chartGroup.selectAll("circle").data(smokeData).enter()

  plotpoints.append("circle")
    .attr("cx", d => xAxisRange(d.income))
    .attr("cy", d => yAxisRange(d.smokes))
    .attr("r", '7.5')
    .style("fill", "Orange")
    .attr("opacity", ".75");
  
  plotpoints.append("text")
    .attr("x", d => (xAxisRange(d.income)-5))
    .attr("y", d => (yAxisRange(d.smokes)+3))
    .text(d => (d.abbr))
    .attr("font-size", '7px')
  
  //mouseover.tooltip

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 10)
    .attr("x", 0 - (chartHeight / 2 + 80))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smokers (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2 - 90}, ${chartHeight + margin.top - 15})`)
    .attr("class", "axisText")
    .text("Household Income (Median)");

});