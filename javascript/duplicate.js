$(document).ready(function(){
		var c=document.getElementsByClassName("active");
		  $('#axisUpdate').hide();
	if(c.length==0)
		{
		$("#nonSelect").text("Select Any Graph That you Want ");
		}
	else
		{
		$("#nonSelect").remove();
		}
	var menu_Element=$('.menu').click(function() {
		$('li').attr("class","inactive");
		var this_class="active";
				//console.log(this+"Menujs14");
		$(this).parent().attr("class",this_class);

		var c=document.getElementsByClassName("active");
		if(c.length==0)
			{alert("inside menu select");
			$("#nonSelect").text("Select Any Graph That you Want ");
			}
		else
			{
			$("#nonSelect").remove();
			
			  $("#demo-modal-3").modal({backdrop: "static"});
			    $(".modal-title").text($(this).text());
			    if($(this).text()=="Bar-Charts")//Bar-Charts
			    	{
			    	//modal-body
			    	}
			}
	});
	 $('#axis').change(function(){
	        if(this.checked)
	            $('#axisUpdate').fadeIn('slow');
	        else
	            $('#axisUpdate').fadeOut('slow');

	    });
	$("#modal_button").click(function() {
		
		//var typeofchart=$('input[name=optradio]').val();
		var typeofchart=$('input[name=optradio]:checked').val();
		var xaxis=$('#xaxis').val();
		var yaxis=$('#yaxis').val();
		$("#myModal").modal("hide");
		var ext = $('#upload').val().split('.').pop().toLowerCase();
		
	if(typeofchart==null)
		{
		alert("select any one of the type");
		}
	else
		{console.log(typeofchart+""+xaxis+""+yaxis+"Menujs54")
		sendEvent('#demo-modal-3', 2)
		}
	} );
});


var fileInput = document.getElementById('upload');
var file = fileInput.files[0];
console.log(file);
/*var EachFile = 0
var fileInput = document.getElementById('upload').value;
var file = fileInput.files[0].webkitRelativePath;
var formData = new FormData();
formData.append('file', file);
$.each($('#upload')[0].files, function()
		{
		    ++EachFile;
		    console.log(EachFile);
		});
console.log(file_name);
console.log(file);
console.log(fileInput);*/
//alert(file_name_extention+" , "+typeofchart+" , "+xaxis+" , "+yaxis);


