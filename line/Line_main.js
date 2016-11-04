function line(filecontent,yaxis_array,xaxis_value,date_format,xaxis_label,yaxis_label) 
 {	 
	//console.log(xaxis_value,date_format,xaxis_value.length) 
	 
	 //console.log(xaxis_value+""+yaxis_value)
	 var code="";
	 if((xaxis_label=="")&&(yaxis_label==""))
		{
		xaxis_label="X-Axis";
		yaxis_label="Y-Axis";
		}
	
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
	width = 600 - margin.left - margin.right-100;
	height = 300 - margin.top - margin.bottom-100;
	
//add the SVG element
		  d3.select(".bar").remove();
var svg = d3.select(".dashboard").append("svg")
			.attr("class","bar")
			.attr("viewBox", `10 10 ${width + margin.left + margin.right} ${height + margin.left}`)
			/*.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)*/
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var tooltip = d3.select("body").append("div")
.attr("class", "tooltipline")
.style("opacity", 0);
//if(date_format!="")
var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });


var x = d3.scaleTime().range([0, width]),
y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);
var data=[];
data=JSON.parse(filecontent);
var citie=yaxis_array;
var non_numeric="";
var numeric="";
 if(d3.keys(data[0]).map(function(d,i){if(citie.indexOf(d)!=-1){if(+d3.values(data[0])[i]>=0){numeric=d;return true;}else{non_numeric=d;return false;}}}).indexOf(false)>=0?true:false )
{
	 if(date_format!="")
	 {var data1 = d3.nest()
	     .key(function(d) {return d[non_numeric];})
	     .entries(data);
	 var parseTime = d3.timeParse(date_format);
	 var cities = data1.map(function(d,i) {
	     return {
	       id: d.key,
	       values: d.values.map(function(e) {
	         return {date: parseTime(e[xaxis_value]), temperature: +e[numeric]};
	       })
	     }});
	 }
	 else
	 	{var data1 = d3.nest()
	     .key(function(d) {return d[non_numeric];})
	     .entries(data);
	 //var parseTime = d3.timeParse(date_format);
	 var cities = data1.map(function(d,i) {
	     return {
	       id: d.key,
	       values: d.values.map(function(e) {
	         return {date: e[xaxis_value], temperature: +e[numeric]};
	       })
	     }});
	 }
	 
	 
	 
	 }else
		 {

		 if(date_format!="")
		 {
		 var parseTime = d3.timeParse(date_format);
		 var cities = citie.map(function(id) {
		     return {
		       id: id,
		       values: data.map(function(d) {
		         return {date: parseTime(d[xaxis_value]), temperature: +d[id]};
		       })
		     }});
		 }
		 else
		 	{
		 	var cities = citie.map(function(id) {
		 	    return {
		 	      id: id,
		 	      values: data.map(function(d) {
		 	        return {date: d[xaxis_value], temperature: +d[id]};
		 	      })
		 	    }});
		 	
		 	}
		 }
/*d3.tsv("line/data.tsv", type, function(error, data) {
  if (error) throw error;
  
  var cities = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {date: d.date, temperature: d[id]};
      })
    };
  });*/
  var date_array=[];
cities.map(function(d){d.values.map(function(e){ date_array.push(e.date)})})
//
  //x.domain(d3.extent(cities, function(d){return d.values.map(function(e){return e.date})}));
	x.domain(d3.extent(date_array, function(d) { return d; }));
  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
  ]);

  z.domain(cities.map(function(c) { return c.id; }));

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)).append("text")
      .attr("transform", "rotate(0)")
      .attr("y", (20))
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text(xaxis_label);

  svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -27)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text(yaxis_label);

  var city = svg.selectAll(".city")
    .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("id",function (d){return d.id.replace(/ /g, "_");})
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

  city.append("rect")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d,i) {var place=((i+1)*13); return "translate(" + (width+15) + "," + place + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .attr("width",10)
      .attr("height",10)
      .attr("fill",function(d) { return z(d.id); })
      .on("mouseover", function(d) {
                          tooltip.transition()
                               .duration(200)
                               .style("opacity", .9);
                               
                          tooltip.html(d.id)
                               .style("left", (d3.event.pageX -100 ) + "px")                          		
                               .style("top", (d3.event.pageY -60) + "px");
                      })
      .on("mouseout", function(d) {
                          tooltip.transition()
                               .duration(500)
                               .style("opacity", 0);
                      })
      //.style("font", "10px sans-serif")
      //.text("--")//function(d) { return d.id; }
      .on("click",function(d){
    	  var element_id_hidden=document.getElementById(d.id.replace(/ /g, "_")).style.display;
  //  	  console.log(document.getElementById(d.id.replace(/ /g, "_")).style.display)
    	 /* if (element_id_hidden.indexOf(' ')===-1) {
    		  element_id_hidden=d.id;
    		 }else
    			{
    			 
    			}*/
    	
    	
    	//console.log(element_id_hidden+"|"+d.id)
    	if(element_id_hidden == "none")
    	{ var element_id="#"+d.id.replace(/ /g, "_");
    		$(element_id).show();
    		}else{
    			 var element_id="#"+d.id.replace(/ /g, "_");
    			$(element_id).hide();
    			}  
    	 
    	});
/*});*/
function type(d, _, columns) {
	  d.date = parseTime(d.date);
	  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
	  return d;
	}

 }
