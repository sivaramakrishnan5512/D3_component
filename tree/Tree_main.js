function tree_map(data,attribute_list){
  var margin = {top: 20, right: 20, bottom: 70, left: 40},
  width = 600 - margin.left - margin.right-100;
  height = 375 - margin.top - margin.bottom-100;
//add the SVG element
      d3.select(".bar").remove();
var svg = d3.select(".dashboard").append("svg")
      .attr("class","bar")
      .attr("viewBox", `0 0 ${width} ${height}`);

var tooltip = d3.select("body").append("div")
.attr("class", "tooltipline")
.style("opacity", 0);
                      var eval_string="var nest = d3.nest()";
for (var i = 0; i < attribute_list.length-1; i++) {
eval_string=eval_string+".key(function(d){return d."+attribute_list[i]+"})"
}  
eval_string=eval_string+".rollup(function(d){return d3.sum(d,function(d){return d."+attribute_list[attribute_list.length-1]+"})}).entries(data)";
eval(eval_string);
var treemap = d3.treemap()
    .size([width,height])
    .padding(1)
    .round(true);
  var root = d3.hierarchy({values: nest}, function(d) { return d.values; })
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });
  treemap(root);
  var colorarray=[];
  colorarray[0]=d3.extent(root.leaves(),function (d){return d.value})[0];
  colorarray[19]=d3.extent(root.leaves(),function (d){return d.value})[1];
  for (var i = 1; i <= 18; i++) {
    colorarray[i]=(d3.extent(root.leaves(),function (d){return d.value})[1]/18)*i;
  }
var color = d3.scaleOrdinal().domain(colorarray).range(d3.schemeCategory20);

var node=svg.selectAll(".node")
    .data(root.leaves())
    .enter().append("g").attr("transform",function(d){
      return "translate("+d.x0+","+d.y0+")"
    })
    .append("rect")
    .attr("width", function(d) { return d.x1 - d.x0 + "px"; })
      .attr("height", function(d) { return d.y1 - d.y0 + "px"; })
      .attr("fill",function(d){return color(d.value)})
      .on("mouseover", function(d) {
                          tooltip.transition()
                               .duration(200)
                               .style("opacity", .9);
                           var tol_data=(d.parent.data.key==undefined)?"":d.parent.data.key;
    tol_data=((d.parent.parent.data.key==undefined)?"":d.parent.parent.data.key)+"-"+tol_data;
    tol_data=tol_data+"-"+((d.data.key==undefined)?"":d.data.key);
      tooltip.html(tol_data)
           .style("left", (d3.event.pageX -100 ) + "px")                              
           .style("top", (d3.event.pageY -60) + "px");
                      })
      .on("mouseout", function(d) {
                          tooltip.transition()
                               .duration(500)
                               .style("opacity", 0);
                      });




                      /*function rect(rect) {
            rect.attr("x", function(d) {
              return x(d.x0);
            }).attr("y", function(d) {
              return y(d.y0);
            }).attr("width", function(d) {
              return x(d.x0 + d.x1) - x(d.x0);
            }).attr("height", function(d) {
              return y(d.y0 + d.y1) - y(d.y0);
            })/*.style("background", function(d) {
              return d.parent ? color(d.name) : null;
            });
          }

  var node = svg.selectAll(".node")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .style("left", function(d) { return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 + "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; });

*/
  node.append("text")
      .attr("class", "node-label")
      .text(function(d) { return d.data.key; });

  node.append("text")
      .attr("class", "node-value")
      .text(function(d) { return d.value; });
}