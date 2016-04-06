var proj = d3.geo.mercator();

var map = d3.select("#map").call(function() {proj.scale(4700);
      proj.translate([-700, 500]);
}),
    zoom = d3.behavior.zoom()
            .translate([-38, 32])
            .scale(200)
            .scaleExtent([0.5, 10.0]),

    layer = map.append("g")
            .attr("id", "layer"),
    states = layer.append("g")
            .attr("id", "states")
            .selectAll("path");

var carto = d3.cartogram()
                .projection(proj)
                .value(function(d) {return Math.random() * 20});

d3.json("india_topology.json", function(topology) {
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

        states.append("title");

});