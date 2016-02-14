(function() {
var width = window.innerWidth,
    height = window.innerHeight;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(120)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("grupitcho.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 2; });



  var defs = svg.append('defs').attr('id', 'picturedefs');
  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 25)
      .style("fill", function(d) {
        var name = d.name.split(' ')[0];

        var picturepattern = defs.append('pattern')
            .attr('id', 'picturepattern' + name)
            .attr('height', 1)
            .attr('width', 1)
            .attr('x', '0')
            .attr('y', '0')
        picturepattern.append('image')
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 50)
                .attr("width", 50)
            .attr("xlink:href", d.picture)

          return 'url(#picturepattern' + name  + ')';
      })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});
})();
