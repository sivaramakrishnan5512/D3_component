 function bar(filecontent,orientation,xaxis_label,yaxis_label,xaxis_value,yaxis_value,file_extention) 
 {	 //console.log(filecontent)
	 //console.log(orientation+"  "+xaxis_label+"  "+yaxis_label+"  "+file_extention)
	 
	 //console.log(xaxis_value+""+yaxis_value)
	 var code="";
	 if((xaxis_label=="")&&(yaxis_label==""))
		{
		xaxis_label=xaxis_value;
		yaxis_label=yaxis_value;
		}
	//console.log(orientation) ;
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
	width = 600 - margin.left - margin.right-100;
	if(orientation=="Vertical")
	height = 300 - margin.top - margin.bottom-100;
	if(orientation=="Horizontal")
	height = 375 - margin.top - margin.bottom-100;
//add the SVG element
		  d3.select(".bar").remove();
var svg = d3.select(".dashboard").append("svg")
			.attr("class","bar")
			.attr("viewBox", `10 10 ${width + margin.left + margin.right} ${height + margin.left}`)
			/*.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)*/
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data=[];
data=JSON.parse(filecontent);
//load the data
/*d3.json(file, function(error, data) {
*/
//console.log(data);
data.forEach(function(d) {
    d[xaxis_value] = d[xaxis_value];
    d[yaxis_value] = +d[yaxis_value];
});
// if vertical then x & y will be
    try {
		
//console.log(data);	
if(orientation=="Vertical")
	{
	var tooltip = d3.select("body").append("div")
	.style("position", "absolute").style("position", "absolute")
	.style("z-index", "10")
	.style("fill","#2196F3")
	.style("visibility", "hidden");
	var x     =d3.scaleBand().rangeRound([0, width]).padding(0.05);
//var x     = d3.scale.ordinal().rangeRoundBands([0, width], .05);
/*var xAxis = d3.svg.axis()
				  .scale(x)
	              .orient("bottom");*/
  var xAxis =d3.axisBottom(x);
            x.domain(data.map(function(d) {return d[xaxis_value]; }));
var xline =svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
            
xline.append("text")
.attr("id", "xaxis_label")
.attr("transform", "rotate(0)")
.attr("x", width/2)
.attr("y", 30)
.attr("dx", ".71em")
.style("text-anchor", "end")
.text(xaxis_label);
var y     =d3.scaleLinear().range([height, 0]);
//var y     = d3.scale.linear().range([height, 0]);
//console.log(d3.max(data, function(d) { return d[yaxis_value]; }))
var fiv_perc=(d3.max(data, function(d) { return d[yaxis_value]; })/100)*20;
//console.log((d3.max(data, function(d) { return d[yaxis_value]; })+fiv_perc))
/*var yAxis = d3.svg.axis()
    		  .scale(y)
			  .orient("left")
			  .ticks(3);*/
 var yAxis =d3.axisLeft(y);
console.log(data);
			y.domain([0, (d3.max(data, function(d) { return d[yaxis_value]; })+fiv_perc)]);
var yline =svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis);
svg.selectAll("bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d[xaxis_value]); })
.attr("width", x.bandwidth())
.attr("y", function(d) { return y(d[yaxis_value]); })
.attr("height", function(d) {
	
	//console.log(height - y(d[yaxis_value]))
	return height - y(d[yaxis_value]); })
	.on("mouseover", function(d){
		tooltip.text(d[xaxis_value]);
		return tooltip.style("visibility", "visible");})
	.on("mousemove", function(d){
		tooltip.text(d[xaxis_value]);
		return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	.on("mouseout", function(d){return tooltip.style("visibility", "hidden");}); 
yline.append("text")
.attr("id", "yaxis_label")
.attr("transform", "rotate(-90)")
.attr("y", -30)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text(yaxis_label);
	}
//if horizontal then x & y will be
if(orientation=="Horizontal")
	{
	var tooltip = d3.select("body").append("div")
	.style("position", "absolute").style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden");
	var x     = d3.scaleLinear().range([0, width]);
	//var x     = d3.scale.linear().range([0, width]);
	var xAxis =d3.axisBottom(x);
	/*var xAxis = d3.svg.axis()
				  .scale(x)
	              .orient("bottom");
*/var fiv_perc=(d3.max(data, function(d) { return d[yaxis_value]; })/100)*20;
            x.domain([0, (d3.max(data, function(d) { return d[yaxis_value]; })+fiv_perc)]);
var xline =svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
xline.append("text")
.attr("id", "xaxis_label")
.attr("transform", "rotate(0)")
.attr("x", width/2)
.attr("dx", ".71em")
.attr("y", 30)
.style("text-anchor", "end")
.text(xaxis_label);
var y = d3.scaleBand().rangeRound([height,0]).padding(0.05);
//var y = d3.scale.ordinal().rangeRoundBands([height,0], .05);
var yAxis =d3.axisLeft(y);
/*var yAxis = d3.svg.axis()
			  .scale(y)
			  .orient("left");*/
	y.domain(data.map(function(d) { return d[xaxis_value]; }));
var yline =svg.append("g")
	  .attr("class", "x axis")
	  //.attr("transform", "translate(0," + height + ")")
	  .call(yAxis);
   /*yline.selectAll("text")
 		.style("text-anchor", "end")
 		.attr("dx", "-.8em")
 		.attr("dy", ".05em")
 		.attr("transform", "rotate(-90)" ); */
yline.append("text")
.attr("id", "yaxis_label")
.attr("transform", "rotate(-90)")
.attr("y", -30)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text(yaxis_label);
svg.selectAll("bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("value",function(d){return d[yaxis_value];})
.attr("y", function(d) {return y(d[xaxis_value]); })
//.attr("height", x.range())
.attr("height", "5")
//.attr("x", "0")
.attr("width", function(d) { return  x(d[yaxis_value]); })
.on("mouseover", function(d){
	tooltip.text(d[xaxis_value]);
	return tooltip.style("visibility", "visible");})
.on("mousemove", function(d){
	tooltip.text(d[xaxis_value]);
	return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
.on("mouseout", function(d){return tooltip.style("visibility", "hidden");}); 
	}
} catch (e) {
	// TODO: handle exception
	console.log("HieghtNotAdjust")
}


 }
 var data_keys=null;
 
 function getKeys(file_content)
 {
	 data_keys=[];
 //console.log(file_content);
	 try{
	 var data=JSON.parse(file_content);
	 if(isJsonObjDepthIsOne(data))
		 {//console.log("depth is one return daata keys")
		 Object_recursion(data);
		 return data_keys;
		 }else
			 {
			 return "Not in Describe Json format";
			 }
	 }catch (e) {
		// TODO: handle exception
		 return "Not a Json Format";
	}
	

	 
	 
 }//fun getKeys
 
 function Object_recursion(dat)
 {//console.log(dat);
	  //console.log(isJson(dat))
 	//console.log( Object.prototype.toString.call( dat ))
 			 if( isJson(dat)?false :true)//if array is true
 			 {
 				 //console.log("if");
 				if(dat===null||( Object.prototype.toString.call( dat ) === '[object String]') ||( Object.prototype.toString.call( dat ) === '[object Number]')?false:true)
 				 dat.map(function(d){Object_recursion(d);})
 		 	 }
 			 else{
 				 //.log("else");
 				 d3.keys(dat).map(function(f){
 					 //console.log(data_keys.indexOf(f))
 					if( data_keys.indexOf(f)==-1 || data_keys.length==0)
 						{//console.log(f);
 					 data_keys.push(f)
 						}
 					 }); 
 				 //console.log(d3.values(dat).map(function(f){return f}));
 				 d3.values(dat).map(function(f){Object_recursion(f);});
 			 }

 	 
 	
	
	
 	 
 }
 function isJson(inp)
 {//console.log(Object.prototype.toString.call( inp ))
 	
 	//var response=JSON.parse(inp);
 	
 	if( Object.prototype.toString.call( inp ) === '[object Array]')
 	{
 		//console.log("isJ true");
 	  // It is JSON
 	  return false;
 	}
 	else if( Object.prototype.toString.call( inp ) === '[object Object]')
 	{
 		//console.log("isJ false");
 	     // the response was a string "false", parseJSON will convert it to boolean false
 	     return true;
 	}else
 		{
 		return false;
 		}
 	
 	
 }
 function tsvJSON(tsv)
 {
	 
	  var lines=tsv.split("\n");
	 
	  var result = [];
	 
	  var headers=lines[0].split("\t");
	 
	  for(var i=1;i<lines.length;i++){
	 
		  var obj = {};
		  var currentline=lines[i].split("\t");
	 
		  for(var j=0;j<headers.length;j++){
			  obj[headers[j]] = currentline[j];
		  }
	 
		  result.push(obj);
	 
	  }
	  
	  //return result; //JavaScript object
	  return JSON.stringify(result); //JSON
	}
 function csvJSON(csv){
var parsed=Papa.parse(csv).data;
var returnjson=[];

	for (var i = 1; i < parsed.length; i++) {
		var array_element = parsed[i];
		var obj={};
		parsed[0].forEach(function(value,j){
			obj[value] = array_element[j];
		});
		returnjson.push(obj);
		
	}
	//return returnjson;//json obj
	  return JSON.stringify(returnjson);

	 }
 function isJsonObjDepthIsOne(data)
 {
	 
		var jsonObjIterations=true;
		if(isJson( data))
			{//console.log("json")
			var json_Array=d3.values(data);
			//console.log(json_Array)
		jsonObjIterations=	json_Array.map(function (d,i){
				 if( ( Object.prototype.toString.call(d ) === '[object Object]' ) || ( Object.prototype.toString.call(d ) === '[object Array]' )?true :false){
					 //console.log("false at"+i)
					 return false;
					 		 }else
					 			 {
					 			//console.log("true at"+i)
					 			 }
				 
				 });
			}else{//console.log("Array loop")
		jsonObjIterations=data.map(function (d,i){
			 if( ( Object.prototype.toString.call( d3.values(d) ) === '[object Object]' )?true :false){
				 
				// console.log(d3.values(d))
				 //console.log(i)
				 return false;
				 		 }
			 
			 });
			}
		//Object_recursion(data)
		//console.log(jsonObjIterations)
		//console.log(jsonObjIterations.indexOf(false))
		if(jsonObjIterations.indexOf(false)=== -1)
			return true;
		else if (jsonObjIterations.indexOf(false)===1) {
			return false;
		}
 }
 