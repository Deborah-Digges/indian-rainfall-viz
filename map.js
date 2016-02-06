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
var startYear;
var endYear;
var colorScale;

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

function loadData() {
    d3.csv("data/data.csv", function(rainfallData) {
        processData(rainfallData);
    });
}

function processData(rainfallData) {
    computeYearlyIndex(rainfallData);
    computeMinMax(rainfallData);
    setRangeLimits();
    computeScale();
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

function computeMinMax(rainfallData) {
    minAnnualRainfall = d3.min(rainfallData, function(d) {return +d.ANNUAL; });
    maxAnnualRainfall = d3.max(rainfallData, function(d) {return +d.ANNUAL; });
    defaultAnnualRainfall = (minAnnualRainfall + maxAnnualRainfall)/2;

    startYear = d3.min(rainfallData, function(d) {return +d.YEAR; });
    endYear = d3.max(rainfallData, function(d) {return +d.YEAR; });
}

function setRangeLimits() {
    d3.select("#year")
    .attr("max", endYear)
    .attr("min", startYear);
}

function computeScale() {
    colorScale = d3.scale.quantize()
                    .domain([minAnnualRainfall, maxAnnualRainfall])
                    .range(d3.range(11).map(function(i) { return "q" + i + "-11"; }));
}

function setUpCallBacks() {
    d3.select("#year").on("change", function(){
        updateMap(this.value);
    });
}

function updateMap(year) {
    console.log(year);

    india.selectAll('path')
    .attr("fill", function(d) { console.log(d.id);});

}


function initialize() {
    drawMap();
    loadData();
    setUpCallBacks();
}
