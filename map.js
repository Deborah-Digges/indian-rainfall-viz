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
var yearEvents = { "1960" : "Something awful happened"};

var maxAnnualRainfall;
var minAnnualRainfall;
var startYear;
var endYear;
var colorScale;
var text;

/*
    Draws the inital map from the GeoJSON
*/
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

/*
    Loads the Rainfall Data and initiates its processing
*/
function loadData() {
    d3.csv("data/data.csv", function(rainfallData) {
        processData(rainfallData);
        drawLegend();
        updateMap(startYear);
    });
}

/*
    Computes
    1. Index of data based on year
    2. Min and Max Rainfall across all years
    3. Min and Max for the range input
    4. Scale for mapping annual rainfall to a colour
*/
function processData(rainfallData) {
    computeYearlyIndex(rainfallData);
    computeMinMax(rainfallData);
    setRangeLimits();
    computeScale();
}

/*
    Creates an index of this form:

    {
        year1: {
                 state1: annualRainfall1,
                 ..
                 stateN: annualRainfallN
              }
              .
              .
              .
        yearN: {

               }
    }
*/
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

/*
    Computes:
    1. Maximum annual ranifall over all years
    2. Minimum annual rainfall over all years
    3. Start and end year for the visualization
*/
function computeMinMax(rainfallData) {
    minAnnualRainfall = d3.min(rainfallData, function(d) {return +d.ANNUAL; });
    maxAnnualRainfall = d3.max(rainfallData, function(d) {return +d.ANNUAL; });
    defaultAnnualRainfall = (minAnnualRainfall + maxAnnualRainfall)/2;

    startYear = d3.min(rainfallData, function(d) {return +d.YEAR; });
    endYear = d3.max(rainfallData, function(d) {return +d.YEAR; });
}

/*
    Set the start and end year for the input range field for the year
*/
function setRangeLimits() {
    d3.select("#year")
    .attr("max", endYear)
    .attr("min", startYear);
}

/*
    Maps from a value of annual rainfall to a CSS class
    The CSS classes .q0-11 - .q10-11 form a divergent scale
    with .q0-11 representing the lowest values of rainfall(darkest red)
    and .q10-11 representing the highest values of rainfall(darkest blue)
*/
function computeScale() {
    colorScale = d3.scale.quantize()
                    .domain([minAnnualRainfall, maxAnnualRainfall])
                    .range(d3.range(11).map(function(i) { return "q" + i + "-11"; }));
}

/*
    When the range input changes, update the map according to the data for that year
*/
function setUpCallBacks() {
    d3.select("#year").on("change", function(){
        updateMap(this.value);
    });
}

/*
    Each region on the present day map corresponds to one or more regions on the olden day map
    We need to sum across all the regions that the current region corresponds to.
*/
function computeRainfall(d, year) {
    var totalRegionRain = 0;

    for(var i=0; i<stateMappings[d.id].length; ++i) {
        stateName = stateMappings[d.id][i]
        totalRegionRain += yearlyDataDict[year][stateName];
    }
    return totalRegionRain;
}

/*  
    Change the CSS class of each region on the map based on the total annual rainfall
    for that region
*/
function updateMap(year) {
    d3.select("#yearlabel").text("Year:  " + year);

    india.selectAll('path')
    .attr("class", function(d) { 
        totalRain = computeRainfall(d, year);
        return colorScale(totalRain);
    });

    if(yearEvents.hasOwnProperty(year)){
        d3.select("#story").html(yearEvents[year]);
    } else {
        d3.select("#story").html("&nbsp;");
    }

}

function drawLegend() {
    var legend = d3.select("#india")
                .append("g")
                .attr("transform", "translate(400, 400)")
                .selectAll('g.legendEntry')
                .data(colorScale.range())
                .enter()
                .append('g');

    legend
    .append('rect')
    .attr("x", "10px")
    .attr("y", function(d, i) {
    return i * 15;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("class", function(d){return d;});


    if(!text){
        text = legend
        .append('text');
    }

    text
    .attr("x", "25px")
    .attr("y", function(d, i) {
    return i * 15;
    })
    .transition()
    .duration(100)
    .style("opacity", 0)
    .transition().duration(500)
    .style("opacity", 1)
    .attr("dy", "0.8em")
        .text(function(d,i) {
        var extent = colorScale.invertExtent(d);

        var format = d3.format("0.0f");
        return format(+extent[0]) + " - " + format(+extent[1]);
    });

}

function initialize() {
    drawMap();
    loadData();
    setUpCallBacks();
}
