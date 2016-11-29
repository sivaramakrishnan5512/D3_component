$(document).ready(function()
		{var disabled=0;
		initial_index();
		$("#nonSelect").text("Select Any Graph That you Want ");
		var pageTitle = null;
jQuery(document).ready(function($) {$('.multiselect').multiselect({sort:true});});
$("li .menu").hover(function(){$('li').attr("class","inactive");
			var this_class="active";
			$(this).parent().attr("class",this_class);});	
$("li .menu").click(function (){
	
			reset_modal();
//----------highlight the selected chart option 
			$('li').attr("class","inactive");
			var this_class="active";
			$(this).parent().attr("class",this_class);
//----------while open modal selected chart options are open and show rest are hidden and set the modal name
			      pageTitle = $(this).attr('pageTitle');
		          var data = "#"+$(this).attr('page-content');
		          //console.log(data)
		          $(".modal .modal-title").html(pageTitle);
		          $(data).css("display","block");		          
			
		});
//----BarChart------when click  the check box shows 
		 $("#axis").change(function(){ 
			 if(this.checked)
		            $('#axisUpdate').show();
		        else{
		            $('#axisUpdate').fadeOut('slow');
		            $('#xaxis').val(null);
		            $('#yaxis').val(null);
		        }
		 });
		 
//----BarChart------
		 var arr=[];
		 var typeofchart=null;
			var xaxis=null;
			var yaxis=null;
			var axis=null;
			var file_name_extention=null;
			var file_name = null;
			var file_content=null
//----BarChart------
		$("#modal_button").click(function() {	
			
			
			if(pageTitle==="Bar Chart"){
			typeofchart=$('input[name=optradio]:checked').val();
			if(typeofchart ==="Horizontal" ||typeofchart ==="Vertical"){
				xaxis=$('#xaxis').val();
				yaxis=$('#yaxis').val();
				axis=($("#axis:checked").val())?true:false;
				if(axis){
					if(xaxis==''||yaxis=='')
					{
					alert('Enter x & y axis');
					}				
					}
				var Category_key=$("input[name='xaxisradio']:checked").val(),Value_key=$("input[name='yaxisradio']:checked").val();
				//console.log(Category_key+"--"+Value_key)
				if(Category_key!=null && Value_key!=null ){
				try {
						var data=[];
						 data=JSON.parse(file_content);
						data=sortByKey(data, Category_key);	

					var stacked_bar=data.map(function(d,i){
						if (i!=data.length-1) {
							if(data[i+1][Category_key]===data[i][Category_key]){
								return true;
							
						}else{
									return false;}}}).indexOf(true);	
					//console.log(stacked_bar)
						if (stacked_bar!=-1) {							
							$("#keys_part").hide();
							$("#stacked_bar").show();
							if ($("input[name='addoravg']:checked").val()?true:false) {
						bar(file_content,typeofchart,xaxis,yaxis,Category_key,Value_key,file_name_extention,$("input[name='addoravg']:checked").val());
						$('#myModal').modal('toggle'); 
							}
						}else{
						bar(file_content,typeofchart,xaxis,yaxis,Category_key,Value_key,file_name_extention,stacked_bar);
						$('#myModal').modal('toggle'); 
					}
					} catch (e) {
						// TODO: handle exception
					//	console.log("HieghtNotAdjust")
					}
			}else if(file_name_extention!=null)
				{
				alert("select Category and Value Key");
				}else{
					alert("Select a Valid File")
				}				
			}else{
				alert("Select Any One Type Of Chart")
			}		 
		}
			if(pageTitle==="Line Chart")
				{
				var xaxisradio_line=$("input[name='xaxisradio_line']:checked").val()?true:false;
				
				var axis_line=($("#axis_line:checked").val())?true:false;
				arr=[];
				$('input[name=yaxisradio_line]:checked').each(function(){
		              arr.push(KEYS_line[$(this).val()]);
		           });
				var date_line=($("#date_line:checked").val())?true:false;
			var	date_input_line=$("#date_input_line").val()?true:false;
				//console.log(date_line)
				
				
				if(file_content_line==null){
					alert("select a valid file");
				}else if(arr.length<1 ){
					alert("select a line");
				}else if(xaxisradio_line==false)
					{alert("Select xaxis")
					}else
						{
						var succes=true;
						if(date_line){
							if(date_input_line){
								
							}else
								{ succes=false;
								alert("Enter date format")
								}
						}
						if(axis_line){
							if($("#xaxis_line").val()==''||$("#yaxis_line").val()=='')
							{succes=false;
							alert('Enter x & y axis');
							}
						}
						if(succes==true)
							{//console.log(KEYS_line[$("input[name='xaxisradio_line']:checked").val()],$("#date_input_line").val(),$("#xaxis_line").val(),$("#yaxis_line").val());
							line(file_content_line,arr,KEYS_line[$("input[name='xaxisradio_line']:checked").val()],$("#date_input_line").val(),$("#xaxis_line").val(),$("#yaxis_line").val());
							$('#myModal').modal('toggle');
							}					
						}			
				}
				if(pageTitle==="Tree Map"){
					var multiselect_to_1=$("#multiselect_to_1").find("option");
				for (var i = 0; i < multiselect_to_1.length; i++) {
					multiselect_to_1[i]=multiselect_to_1[i].text;
				}					
					tree_map(JSON.parse(file_content_tree),multiselect_to_1)
					//tree_map(file_content_tree)
				}
		});
//----BarChart------		
		
		$('#upload').change(function(event){		
		if($('#upload').val()==null)
			{
			alert('upload a valid  file');
			}else{typeofchart=$('input[name=optradio]:checked').val();
				 file_name =  $('#upload').val().split('\\').pop().toLowerCase();
				file_name_extention=file_name.split('.').pop().toLowerCase();
				if(file_name_extention==""?false:true)
				{
					if(file_name_extention=="tsv"||file_name_extention=="csv"||file_name_extention=="json")
						{file_content=null;
					 var input =null;
							 input=event.target;
					    var reader = new FileReader();
						    reader.onload = function(){
						    	file_content = reader.result;
						    	//console.log(file_content); 	
						      			    };
						    reader.readAsText(input.files[0]);
						$("#upload_name").text("");
						//console.log("d"+$('#upload').val());
						$("#upload_name").text("Upload "+file_name);					
						$("#upload_ok").fadeIn(1000);				 
						}
					else
						{$("#upload_name").text("");
						alert('upload a valid  file');
						$("#upload_ok").hide(1000);
						}
				}	else{$("#upload_name").text("");
					alert('upload a valid  file');
					$("#upload_ok").hide(1000);
				}				
			}
			});
//----BarChart------
			$("#upload_ok").click(function(){
				$("#xaxis_keys_part").html('');
				$("#yaxis_keys_part").html('');
				$("#uploading_part").hide(1000);
				//console.log(file_name_extention+""+typeofchart)
				if(file_name_extention!=null)
				{
					if(file_name_extention=="tsv"){
					 file_content=tsvJSON(file_content);
									var KEYS=null;									
						KEYS=getKeys(file_content);
											
					}else if(file_name_extention=="json")
						{
						var KEYS=null;						
						KEYS=getKeys(file_content);
						//console.log(KEYS);
						//console.log(KEYS.length+""+KEYS)						
						}else if (file_name_extention=="csv") {
							file_content=csvJSON(file_content);
							var KEYS=null;							
							KEYS=getKeys(file_content);
							console.log("rr"+KEYS);							
						}				
					//bar(file_content,typeofchart,xaxis,yaxis);
					if( Object.prototype.toString.call(KEYS)==='[object Array]'){
						$("#keys_part").show(1000);
						$("#xaxis_keys_part").html('');
						KEYS.forEach(function(value){
					var x = "<div class='radio'> <label><input type='radio' id='xaxisradio' value='"+value+"' name='xaxisradio'>"+value+"</label>   </div>";						    
						    $(x).appendTo("#xaxis_keys_part");						    
						});
						$("#yaxis_keys_part").html('');
						KEYS.forEach(function(value){
							var x = "<div class='radio'> <label><input type='radio' id='yaxisradio' value='"+value+"' name='yaxisradio'>"+value+"</label>   </div>";								    
								    $(x).appendTo("#yaxis_keys_part");
								    								});
					}
					else{		//console.log(KEYS)				
						$("#no_key_part").show(1000);
						$("#error_no_key_part").text('');
						$("#error_no_key_part").text(KEYS);
					}
					}
				
				//initial_index();
				//
				
			});
//----LineChart------
			$("#axis_line").change(function(){ 
				 if(this.checked)
			            $('#axisUpdate_line').show();
			        else{
			            $('#axisUpdate_line').fadeOut('slow');
			            $('#xaxis_line').val(null);
			            $('#yaxis_line').val(null);
			        }
			 });
			$("#date_line").change(function(){ 
				 if(this.checked){//(Your Date-June 30,2014)
					 //console.log(file_content_line)	 
					 if($("input[name='xaxisradio_line']:checked").val()!=undefined)
						 {var original_date="\""+KEYS_line[$("input[name='xaxisradio_line']:checked").val()]+"\":\"";
						 
						 //.substring(
						 //console.log(file_content_line.substring(file_content_line.indexOf(original_date)+original_date.length))
						 original_date= file_content_line.slice(file_content_line.indexOf(original_date)+original_date.length,file_content_line.substring(file_content_line.indexOf(original_date)+original_date.length).indexOf("\"")+file_content_line.indexOf(original_date)+original_date.length);
						 $("#original_date").text(original_date);
			            $('#date_input_part_line').show();
			            
						 }
					 else
						 {
						 alert("Please select X-axis");
							$("#date_line").prop('checked',false);
						 }
			            
				 }
			        else{
			            $('#date_input_part_line').fadeOut('slow');
			            $('#date_input_line').val(null);
			          }
			 });
//----LineChart------
			var file_name_extention_line=null;
			var file_name_line = null;
			var file_content_line=null
			$('#upload_line').change(function(event){
			if($('#upload_line').val()==null)
				{file_content_line=null;
				alert('upload a valid  file');
				}else{file_content_line=null;
					 file_name_line =  $('#upload_line').val().split('\\').pop().toLowerCase();
					file_name_extention_line=file_name_line.split('.').pop().toLowerCase();
					if(file_name_extention_line==""?false:true)
					{
						if(file_name_extention_line=="tsv"||file_name_extention_line=="csv"||file_name_extention_line=="json")
							{file_content_line=null;
						 var input_line =null;
								 input_line=event.target;
						    var reader_line = new FileReader();
							    reader_line.onload = function(){
							    	file_content_line = reader_line.result;
							    	//console.log(file_content); 	
							      			    };
							    reader_line.readAsText(input_line.files[0]);
							$("#upload_name_line").text("");
							//console.log("d"+$('#upload').val());
							$("#upload_name_line").text("Upload "+file_name_line);					
							$("#upload_ok_line").fadeIn(1000);				 
							}
						else
							{$("#upload_name_line").text("");
							alert('upload a valid  file');
							$("#upload_ok_line").hide(1000);
							}
					}	else{$("#upload_name_line").text("");
						alert('upload a valid  file');
						$("#upload_ok_line").hide(1000);
					}				
				}
				});
//----LineChart------	
			var KEYS_line=null;	
			$("#upload_ok_line").click(function(){
				$("#xaxis_keys_part_line").html('');
				$("#yaxis_keys_part_line").html('');
				$("#uploading_part_line").hide(1000);
				
				if(file_name_extention_line!=null)
				{
					if(file_name_extention_line=="tsv"){
					 file_content_line=tsvJSON(file_content_line);
					 //console.log(file_content_line)								
						KEYS_line=getKeys(file_content_line);
						//console.log(KEYS);						
					}else if(file_name_extention_line=="json")
						{					
						KEYS_line=getKeys(file_content_line);
						}else if (file_name_extention_line=="csv") {
							file_content_line=csvJSON(file_content_line);
							
							KEYS_line=getKeys(file_content_line);
								
						}				
					if( Object.prototype.toString.call(KEYS_line)==='[object Array]'){
						//console.log(KEYS_line)
						$("#keys_part_line").show(1000);
						$("#xaxis_keys_part_line").html('');
						KEYS_line.forEach(function(value,i){
					var x = "<div class='radio'> <label><input type='radio' id='xaxisradio_line' value='"+i+"' name='xaxisradio_line'>"+value+"</label>   </div>";						    
						    $(x).appendTo("#xaxis_keys_part_line");
						    						});
						$("#yaxis_keys_part").html('');
						KEYS_line.forEach(function(value,i){
							var x = "<div class='radio'> <label><input type='checkbox' value='"+i+"' id='yaxisradio_line'  name='yaxisradio_line'>"+value+"</label>   </div>";								    
								    $(x).appendTo("#yaxis_keys_part_line");
								    								});
					}
					else{					console.log(KEYS_line)	
						$("#no_key_part_line").show(1000);
						$("#error_no_key_part_line").text('');
						$("#error_no_key_part_line").text(KEYS_line);
					}
					}
				});
//----LineChart------
			/*$("input[name='xaxisradio_line']:checked").change(function(){alert("LL")
				console.log(disabled)
				var disable=$("input[name='xaxisradio_line']:checked").val();
				console.log(disable)
				$("input[name='yaxisradio_line']").find("value="+disabled).attr('disabled', false);
				disabled=disable;
				$("input[name='yaxisradio_line']").find("value="+disable).attr('disabled', true);
			});*/
			//-----TreeMap--------
var file_name_extention_tree=null;
			var file_name_tree = null;
			var file_content_tree=null
			$('#upload_tree').change(function(event){
			if($('#upload_tree').val()==null)
				{file_content_tree=null;
				alert('upload a valid  file');
				}else{file_content_tree=null;
					 file_name_tree =  $('#upload_tree').val().split('\\').pop().toLowerCase();
					file_name_extention_tree=file_name_tree.split('.').pop().toLowerCase();
					if(file_name_extention_tree==""?false:true)
					{
						if(file_name_extention_tree=="tsv"||file_name_extention_tree=="csv"||file_name_extention_tree=="json")
							{file_content_tree=null;
						 var input_tree =null;
								 input_tree=event.target;
						    var reader_tree = new FileReader();
							    reader_tree.onload = function(){
							    	file_content_tree = reader_tree.result;
							    	//console.log(file_content); 	
							      			    };
							    reader_tree.readAsText(input_tree.files[0]);
							$("#upload_name_tree").text("");
							//console.log("d"+$('#upload').val());
							$("#upload_name_tree").text("Upload "+file_name_tree);					
							$("#upload_ok_tree").fadeIn(1000);				 
							}
						else
							{$("#upload_name_tree").text("");
							alert('upload a valid  file');
							$("#upload_ok_tree").hide(1000);
							}
					}	else{$("#upload_name_tree").text("");
						alert('upload a valid  file');
						$("#upload_ok_tree").hide(1000);
					}				
				}
				});			
//------Treemap-----
	var KEYS_tree=null;	
			$("#upload_ok_tree").click(function(){
				$("#uploading_part_tree").hide(1000);
							$("#multiselect_to_1").html('');
							$("#multiselect_from_1").html('');

				if(file_name_extention_tree!=null)
				{
					if(file_name_extention_tree=="tsv"){
					 file_content_tree=tsvJSON(file_content_tree);
					 //console.log(file_content_line)								
						KEYS_tree=getKeys(file_content_tree);
						//console.log(KEYS);						
					}else if(file_name_extention_tree=="json")
						{					//console.log(file_content_tree)
						KEYS_tree=getKeyswodepth(file_content_tree);
						}else if (file_name_extention_tree=="csv") {
							file_content_tree=csvJSON(file_content_tree);
							
							KEYS_tree=getKeys(file_content_tree);
								
						}				
					if( Object.prototype.toString.call(KEYS_tree)==='[object Array]'){
						//console.log(KEYS_line)
						
						KEYS_tree.forEach(function(value,i){
					var x = "<option value='"+value+"' class='form-control' style='text-align: center;text-align: -webkit-center;'>"+value+"</option>";						    
									    $(x).appendTo("#multiselect_from_1");
						    						});
						$("#tree_hei_selection").show(1000);						
					}
					else{				
						$("#no_key_part_tree").show(1000);
						$("#error_no_key_part_tree").text('');
						$("#error_no_key_part_tree").text(KEYS_tree);
					}
					}

							
							});	

		});//document get ready ended



function initial_index() 
{
	var c=$('.menu').click(function(){$("#nonSelect").remove();});
	  $('#axisUpdate').hide();
	  $('#axisUpdate_line').hide();
	  $('#date_input_part_line').hide();
	  $('#floatingCirclesG').hide();
	  $('#design_tab').attr("class","active");
	  $("#no_key_part").hide();
	  $("#no_key_part_line").hide();
	   $("#no_key_part_tree").hide();
	  $("#keys_part").hide();
	   $("#stacked_bar").hide();
	  $("#keys_part_line").hide();

}
function reset_modal()
{ //console.log("inside reside modal");
	 $('input[name=optradio]').prop('checked',false);
	$('#xaxis').val(null);
	$('#yaxis').val(null);
	$('#xaxis_line').val(null);
	$('#yaxis_line').val(null);
	$('#date_input_line').val(null);
	$('#upload').val(null);
	$('#upload_line').val(null);
	$('#upload_tree').val(null);
	$("#keys_part").hide(1000);
	$("#stacked_bar").hide(1000);
	$("#keys_part_line").hide(1000);
	$("#xaxis_keys_part").html('');
	$("#yaxis_keys_part").html('');
	$("#xaxis_keys_part_line").html('');
	$("#yaxis_keys_part_line").html('');
	$("#no_key_part").hide(1000);
	$("#no_key_part_line").hide(1000);
	$("#no_key_part_tree").hide(1000);
	$("#error_no_key_part").text('');
	$("#error_no_key_part_line").text('');
	$("#error_no_key_part_tree").text('');
	$("#upload_name").text("");
	$("#upload_name_line").text("");
	$("#upload_name_tree").text("");
	$('input[name=addoravg]').prop('checked',false);	
	//$('#upload').change();
	$("#axis").prop('checked',false);
	$("#axis_line").prop('checked',false);
	$("#date_line").prop('checked',false);
	$('#axisUpdate').hide();
	$('#axisUpdate_line').hide();
	$('#date_input_part_line').hide();
	$("#uploading_part").show();
	$("#uploading_part_line").show();
	$("#uploading_part_tree").show();
    $('#upload_ok').hide();
    $('#upload_ok_line').hide();
      $('#upload_ok_tree').hide();
    $('#barChart').css("display", "none");
    $('#lineChart').css("display", "none");
    $('#treemap').css("display", "none");
    $("#tree_hei_selection").hide();
    $("#multiselect_to_1").html('');
    $("#multiselect_from_1").html('');
}