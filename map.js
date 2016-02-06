var w = 600;
var h = 600;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale
var map = d3.select("#chart").append("svg:svg")
                            .attr("width", w)
                            .attr("height", h)
                            .call(initialize);

var india = map.append("svg:g")
.attr("id", "india");

var yearlyDataDict = {};
var maxAnnualRainfall;
var minAnnualRainfall;

function drawMap() {
    d3.json("data/states.json", function (json) {
        india.selectAll("path")
        .data(json.features)
        .enter().append("path")
        .attr("d", path)
        .append("svg:title")
        .text(function(d) { return d.id; });
    });
    proj.scale(6700);
    proj.translate([-1240, 720]);
}

function computeYearlyIndex(rainfallData) {
    console.log(rainfallData);
    for(var i=0; i<rainfallData.length; ++i) {
        record = rainfallData[i];
        year = record["YEAR"];
        state = record["SD_Name"];
        annualRainfall = record["ANNUAL"];

        if(!yearlyDataDict.hasOwnProperty(year)) {
            yearlyDataDict[year] = {};
        }
        yearlyDataDict[year][state] = parseFloat(annualRainfall);
    }

}
function processData(rainfallData) {
    computeYearlyIndex(rainfallData);
    minAnnualRainfall = d3.min(rainfallData, function(d) {return +d.ANNUAL; });
    maxAnnualRainfall = d3.max(rainfallData, function(d) {return +d.ANNUAL; });
}

function loadData() {
    d3.csv("data/data.csv", function(rainfallData) {
        processData(rainfallData);
    });
}

function initialize() {
    drawMap();
    loadData();
}
