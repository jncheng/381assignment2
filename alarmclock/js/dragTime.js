function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();		
  }
  return false;
}

function refreshHours1(hours_1){
	
	$('#hours-1 span').text(hours_1);

}
function refreshHours2(hours_2){
	
	$('#hours-2 span').text(hours_2);
	
}
function refreshMinutes1(minutes_1){
	
	$('#minutes-1 span').text(minutes_1);
	
}
function refreshMinutes2(minutes_2){
	
	$('#minutes-2 span').text(minutes_2);
	
}
function refreshTotalHours(totalHours){
	
	$('#total-hours span').text(totalHours);
	
}
function refreshTotalMinutes(totalMinutes){
	
	$('#total-minutes span').text(totalMinutes);
}
function refresh_time(time){
	
	$('#timeSlot span').text(time);
}


$(document).ready(function() {
	
		var hours_1 = 0;
		var hours_2 = 0;
		var	minutes_1 = 0;
		var	minutes_2 = 0;
		var	totalHours = 0;
		var	totalMinutes= 0;
		var time = 0;

		
		refreshHours1(hours_1);

		time = hours_1;

		refresh_time(time);
		
		// Get the #drop zone
		var drop = document.getElementById('drop');
		var drop2 = document.getElementById('drop2');
		var drop3 = document.getElementById('drop3');
		var drop4 = document.getElementById('drop4');

		var draggedItem = null;
		
		// Add the Event Listener to each draggable item		
		$('.dragable-item').each(function(index){
			$(this)[0].addEventListener('dragstart',function(e){
				
				draggedItem = jQuery(this);
				
				e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
								
			},false);
		});
	
		drop.addEventListener('dragover', cancel);
		drop.addEventListener('dragenter', cancel);

		drop2.addEventListener('dragover', cancel);
		drop2.addEventListener('dragenter', cancel);

		drop3.addEventListener('dragover', cancel);
		drop3.addEventListener('dragenter', cancel);

		drop4.addEventListener('dragover', cancel);
		drop4.addEventListener('dragenter', cancel);
		
		drop.addEventListener('drop', function (e) {

		  
		   e.preventDefault();	
		  
		   // Let's play with the data attribute		   
		   var html = $(draggedItem).data('price') + "<br />";
		   

   		  // var html2 = $(draggedItem).data('price2') + "<br />";

		  // $('#output').prepend( html );
		   $('#output').prepend( html );

		   if(parseInt($(draggedItem).data('price')) <= 2)
		   {
		   hours_1 = parseInt($(draggedItem).data('price')) * 10;

		   totalHours = hours1_ + hours_2;
		   }
		   else{
		   	hours_1 = 0;
		   	totalHours = hours_1 + hours_2;
		   }

		   if(totalHours >= 24){
		   	totalHours= totalHours - 24;
		   }
		   refreshHours1(hours_1);
		   refreshTotalHours(totalHours);
		   refreshHours2(hours_2);
		   refresh_time(time);
		   time = total_costs5;
		  return false;
		});

	drop2.addEventListener('drop', function (e) {

		  
		   e.preventDefault();	
		  
		   // Let's play with the data attribute		   
		   var html = $(draggedItem).data('price') + "<br />";
		   

   		  // var html2 = $(draggedItem).data('price2') + "<br />";

		  // $('#output').prepend( html );
		   $('#output2').prepend( html );


		   hours_2 = parseInt($(draggedItem).data('price'));
		   
		   totalHours = hours_1 + hours_2;
		   if(totalHours >= 24){
		   	totalHours = totalHours - 24;
		   }
		   refreshHours2(hours_2);

		   refreshTotalHours(totalHours);
		   		refresh_time(time);

		   if(totalHours == n){
		   		document.getElementById("result").innerHTML = 1;

		   }
		   refreshTotalHours(totalHours);
		   refreshMinutes1(minutes1);


		  return false;
		});

		drop3.addEventListener('drop', function (e) {

		  
		   e.preventDefault();	
		  
		   // Let's play with the data attribute		   
		   var html = $(draggedItem).data('price') + "<br />";
		   

		   $('#output3').prepend( html );


		   if(parseInt($(draggedItem).data('price')) <= 6)
		   {
		   minutes_1 = parseInt($(draggedItem).data('price')) * 10;

		   totalMinutes = minutes_1 + minutes_2;
		   }
		   else{
		   	total_costs6 = 0;
		   	total_costs6 = total_costs3 + total_costs4;
		   }

		   if(total_costs6 >= 60){
		   	total_costs6 = total_costs6 -60;
		   }


		   if(total_costs5 == n){
		   		document.getElementById("result").innerHTML = 1;

		   }
		   
					   
		   refresh_total_costs3(total_costs3);
		   refresh_total_costs4(total_costs4);

		   refresh_total_costs6(total_costs6);
		refresh_time(time);

		   
		  return false;
		});

		drop4.addEventListener('drop', function (e) {

		  
		   e.preventDefault();	
		  
		   // Let's play with the data attribute		   
		   var html = $(draggedItem).data('price') + "<br />";
		   

		   $('#output4').prepend( html );

		   total_costs4 = parseInt($(draggedItem).data('price'));
		   
		   total_costs6 = total_costs3 + total_costs4;
		   if(total_costs6 >= 60){
		   	total_costs6 = total_costs6 - 60;
		   }
		   refresh_total_costs4(total_costs4);

		   refresh_total_costs6(total_costs6);
		refresh_time(time);

	
		   
		  return false;
		});
});
		