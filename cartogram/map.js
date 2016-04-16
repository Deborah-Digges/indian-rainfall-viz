// Projection of the indian subcontinent
var proj = d3.geo.mercator().center([78, 27])
            .scale(1200);

var map = d3.select("#map");

var layer = map.append("g")
        .attr("id", "layer");

var states = layer.append("g")
        .attr("id", "states")
        .selectAll("path");

var carto = d3.cartogram()
                .projection(proj)
                .value(function(d) {return Math.random() * 2000});

var topology;
var geometries;

d3.json("india_topology.json", function(topo) {

    topology = topo;
    geometries = topology.objects.states.geometries;

    var features = carto.features(topology, geometries);

    path = d3.geo.path().projection(proj);

    states = states.data(features)
            .enter()
            .append("path")
            .attr("class", "state")
            .attr("id", function(d) {
              return d.properties.NAME;
            })
            .attr("fill", "#fafafa")
            .attr("d", path);

    reset = function(){

          alert("change cartogram");

          // Update the cartogram values
          carto.value(function(d) {return Math.random() * 1000});
          
          // Obtain the features from the new cartogram object
          var features = carto(topology, geometries).features;

          // update the svg with these features
          states.data(features)
          .transition()
          .duration(750)
          .ease("linear")
          .attr("d", carto.path);
          setTimeout(reset, 5000);
        }
    setTimeout(reset, 5000);



});