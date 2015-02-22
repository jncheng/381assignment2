// Callback function when cancelling the event
function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();     
  }
  return false;
}

// Get the #drop zone
var drop = document.getElementById('drop');

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

drop.addEventListener('drop', function (e) {
  
   // Prevent default browser behaviour 
   e.preventDefault();  
  
   // Here you can do anything you want 
   
  return false;
});