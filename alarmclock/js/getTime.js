function myFunction() {
    var d = new Date();
    var n = d.getHours();
    document.getElementById("demo").innerHTML = n;
    document.getElementById("myTime").innerHTML = total_costs5;
		   refresh_total_costs5(total_costs5);

    if(n == total_costs5){
    	console.log('correct');
       document.getElementById("demo").innerHTML = 10;

    } else {
    	console.log('incorrect');
       document.getElementById("demo").innerHTML = 6;
}
}