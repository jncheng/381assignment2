//init 
var canvas = document.getElementById("myCanvas");

var backgroundColor = '#B3E5FC'

document.body.style.background = backgroundColor;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
var radius = canvas.width/50* 18;
var circleSize = canvas.width/17;
var centerSkewY = canvas.width/5;

var ballColour = '#9575CD';

var centerX = canvas.width / 2;
var centerY = canvas.height / 2 - centerSkewY;

var lowerTextArea = canvas.height/20 * 18;

//touch target size
var targetSize = canvas.width/15;

var mouseState = "up";
var touchState = "up";

//var audio = new Audio('audio/sauceboss.mp3');


// var b;
// var a;

var a = Math.floor(Math.random() * 5) + 5;
var b = Math.floor(Math.random() * 5) + 5;

var mathAnswer;

var spinning = true;

//font size
var fontSizeText = Math.floor(canvas.width / 15);
var fontStyleText = fontSizeText.toString() + "px Arial";

var num = [0, 0, 0, 0];

var numPos = [
              centerX - canvas.width/20 * 7.7, lowerTextArea,
              centerX - canvas.width/20 * 4.1, lowerTextArea,
              centerX - canvas.width/20 * 0.5, lowerTextArea,
              centerX - canvas.width/20 * -3.1, lowerTextArea
              ]

var mouseX, mouseY;
var touchX, touchY;

var alarmButtonX = canvas.width/50 * 43;
var alarmButtonY = canvas.height/40 * 35;
var alarmButtonPressed = false;
var alarmButtonSetWhileTouchingAlready = false;


var alarmHour = 0;
var alarmMinute = 0;

var alarmOn = false;
var timeSet = false;
var alarmSet = false;


var correctTimeSet = true;

//var setAlarm = new Date(hours, minutes, seconds, milliseconds);
var currentTime;

//ball selected or not
var selected = false;

//selected ball number
var selectedBallNumber;



//ball positions
balls = [];
balls_OrigPos = [];

init();

function init()
{
  for (var i = 0; i < 10; i++)
  {
    var angleRad = (Math.PI/180) * 30 * i + 2;
    //x, y
    var x = (Math.cos( angleRad )) * radius + centerX;
    var y = (Math.sin( angleRad )) * radius + centerY;

    balls[2 * i] = x;
    balls[2 * i + 1] = y;
    balls_OrigPos[2 * i] = x;
    balls_OrigPos[2 * i + 1] = y;
  }

}


var spinningAngleIncrement = 0;

var spinningAngleIncrementVal = 0.001;

function spinningBalls()
{
  spinningAngleIncrement += spinningAngleIncrementVal;

  balls = [];
  balls_OrigPos = [];

  for (var i = 0; i < 10; i++)
  {
    var spinningAngle = (Math.PI/180) * 30 * i + 2 + spinningAngleIncrement;

    //x, y
    var x = (Math.cos( spinningAngle )) * radius + centerX;
    var y = (Math.sin( spinningAngle )) * radius + centerY;

    balls.push(x, y);
    balls_OrigPos.push(x, y);
  }

}



// console.log(fontStyleText);

// function drawText(numIndex, posX, posY)
// {
//   //context.font = fontStyleText;

//   context.font = '700 30px Arial';

//   context.textAlign="center";

//   context.strokeStyle="black";
//   context.fillStyle = "black";

//   context.fillText(num[0], centerX, centerY);
// }

function drawCircle(x, y, num)
{
      context.shadowColor = '#444444';
      context.shadowBlur = 20;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 10;

      context.beginPath();
      context.arc(x, y, circleSize, 0, 2 * Math.PI, false);
      context.fillStyle = ballColour;
      context.fill();
      context.lineWidth = 5;
      context.closePath();
      //context.strokeStyle = '#ffffff';
      //context.stroke();
      
      //cancel shadow
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;

      //text inside ball
      var textFontSize = Math.floor(canvas.width / 20);
      var text = textFontSize.toString() + "px Arial";

      context.font = text;

      context.strokeStyle="white";
      context.fillStyle = "white";

      context.fillText(num, x, y + circleSize/5);
}

function alarmBox(x, y, width, height, colour)
{
    context.shadowColor = '#444444';
    context.shadowBlur = 50;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 20;

    context.beginPath();

      //context.strokeStyle = dashed;
    context.setLineDash([9]);
    //context.strokeRect(0, 0, 50, 50);
    context.fillStyle = colour;
    context.strokeRect(x, y - height/2, width, height);
    context.closePath();
    //context.strokeStyle = '#ffffff';
    //context.stroke();
    
    //cancel shadow
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

}

function alarmButton(x, y, width, height, colour, text)
{
    context.shadowColor = '#444444';
    context.shadowBlur = 30;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 10;

    context.beginPath();
    context.arc(x, y, circleSize * 1.5, 0, 2 * Math.PI, false);
    context.fillStyle = colour;
    context.fill();
    context.lineWidth = 5;
    context.closePath();
    //context.strokeStyle = '#ffffff';
    //context.stroke();
    
    //cancel shadow
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    //context.beginPath();
    context.fillStyle=colour;
    context.strokeStyle = "black";
    // context.fillRect(x,y,width, height);
    // context.strokeRect(x,y,width, height);
    //context.closePath();

    context.fillStyle = 'white';
    var alarmButtonTextSize = Math.floor(canvas.width / 20);
    var alarmButtonTextFont = alarmButtonTextSize.toString() + "px Arial";

    context.font = "bold" + " " + alarmButtonTextFont;
    context.textAlign = 'center';
    context.fillText(text, x, y + canvas.height/200 * 2);

}


function drawMathProblem(x, y)
{
  //audio.play();
  var numMathAnswer;

  // a = Math.floor(Math.random() * 10) + 1;
  // b = Math.floor(Math.random() * 10) + 1;

  for (var i = 0; i < 10; i++)
  {
    for (var j = 0; j < num.length; j++)
    {
      if (Math.abs(balls[2 * i] - numPos[2 * j]) < targetSize && Math.abs(balls[2 * i + 1] - numPos[2 * j + 1]) < targetSize)
      {


        num[j] = i;
      }
    }
  }
  numMathAnswer = num[2] * 10 + num[3];

    context.shadowColor = '#555555';
  context.shadowBlur = 20;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 10;

  context.beginPath();
  context.fillStyle = '#757575';
  context.arc(x, y, canvas.width/20 * 9.5, 0, 2 * Math.PI, false);
  context.fill();

  context.fillStyle = '#4FC3F7';

  var width = canvas.width/10 * 5;
  var height = canvas.height/20 * 2;

  //draw circle around current Time
  context.beginPath();
  context.arc(x, y, width/2, 0, 2 * Math.PI, false);
  context.fill();


  //context.arc(x, y, circleSize, 0, 2 * Math.PI, false);

  //cancel shadow
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  // var a = Math.floor(Math.random() * 10) + 1;
  // var b = Math.floor(Math.random() * 10) + 1;

  
  // return prompt("How much is " + a + " " + op + " " + b + "?") == eval( a + op + b);

  context.strokeStyle="black";
  context.fillStyle = "white";

  context.fillText(a + " " + "x" + " " + b + "?", centerX, centerY);

  mathAnswer = (a * b);
  //console.log(mathAnswer);

 
  
  if(numMathAnswer == mathAnswer)
  {
    // audio.pause();
    // audio.currentTime = 0;
    alarmSet = false;
    timeSet = false;


    num[0] = 0;
    num[1] = 0;
    num[2] = 0;
    num[3] = 0;
    a = Math.floor(Math.random() * 5) + 5;
    b = Math.floor(Math.random() * 5) + 5;
    alarmOn = false;

    //make alarm silent
    turnOffAlarm();
    
  }


}

var timeArray = [0, 0, 0];


function drawCurrentTime(x, y)
{

  context.shadowColor = '#555555';
  context.shadowBlur = 20;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 10;

  context.beginPath();
  context.fillStyle = '#757575';
  context.arc(x, y, canvas.width/20 * 9.5, 0, 2 * Math.PI, false);
  context.fill();

  context.fillStyle = '#4FC3F7';

  var width = canvas.width/10 * 5;
  var height = canvas.height/20 * 2;

  //draw circle around current Time
  context.beginPath();
  context.arc(x, y, width/2, 0, 2 * Math.PI, false);
  context.fill();


  //context.arc(x, y, circleSize, 0, 2 * Math.PI, false);

  //cancel shadow
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;


  var d = new Date();

  timeArray[0] = d.getHours();
  timeArray[1] = d.getMinutes();
  timeArray[2] = d.getSeconds();

  for (var i = 0; i < timeArray.length; i++)
  {
    if (timeArray[i] < 10)
    {
      timeArray[i] = "0" + timeArray[i].toString();
    }
  }

  var AmPmText  = 'AM';

  if (d.getHours() >= 12)
  {
    AmPmText  = 'PM';
  }

  timeArray[0] = timeArray[0] % 12;

  if (timeArray[0] == 0)
  {
    timeArray[0] = 12;
  }

  var currentTimeSize = Math.floor(canvas.width / 8);
  var currentTimeText = currentTimeSize.toString() + "px Arial";

  context.font = "bold " + currentTimeText;

  context.strokeStyle="black";
  context.fillStyle = "white";

  context.fillText(timeArray[0] + ":" + timeArray[1], x - canvas.width/20, y + canvas.width/40);

  var currentTimeSize = Math.floor(canvas.width / 20);
  var currentTimeText = currentTimeSize.toString() + "px Arial";

  context.font = "bold " + currentTimeText;
  context.fillText(AmPmText, x + canvas.width/20 * 3, y + canvas.width/40);

}

//change canvas size when resizing window
function onWindowResize()
{
  console.log("resized");

}

document.addEventListener("resize", onWindowResize);
document.onmousemove = function (e) {mousePos(e);};
document.onmousedown = mouseDown;
document.onmouseup   = mouseUp;


function mouseDown(ev) {
    mouseState = "down";
    //console.log('Down State you can now start dragging');
    //do not write any code here in this function



}

function mouseUp(ev) {
    mouseState = "up";
    //console.log('up state you cannot drag now because you are not holding your mouse')
    //do not write any code here in this function    


}


function mousePos(e)
{

  selected = false;

  mouseX = e.pageX;
  mouseY = e.pageY;

  if (mouseState=='down')
  {

    

    for (var i = 0; i < 10; i++)
    {
      
      var x = balls[2 * i];
      var y = balls[2 * i + 1];

      if (Math.abs(mouseX - x) < targetSize * 2 && Math.abs(mouseY - y) < targetSize * 2 && !selected)
      {
        selectedBallNumber = i;
        selected = true;
      }
    }

  }

  if (Math.abs(mouseX - alarmButtonX) < targetSize && Math.abs(mouseY - alarmButtonY) < targetSize)
  {
      console.log("moused");
  }

  balls[2 * selectedBallNumber] = e.pageX;
  balls[2 * selectedBallNumber + 1] = e.pageY;

  
}

canvas.addEventListener('touchend', function() {

  event.preventDefault();

  touchState = "up";

  //reset touch location off screen
  touchX = 0;
  touchY = 0;

  alarmButtonSetWhileTouchingAlready = false;


});

canvas.addEventListener('touchmove', function() {

  event.preventDefault();

  touchX = event.targetTouches[0].pageX;
  touchY = event.targetTouches[0].pageY;

  selected = false;

  selectedBallNumber = "?";

  if (touchState=='down')
  {
    for (var i = 0; i < 10; i++)
    {
      var x = balls[2 * i];
      var y = balls[2 * i + 1];

      if (Math.abs(touchX - x) < targetSize && Math.abs(touchY - y) < targetSize && !selected)
      {
        selectedBallNumber = i;
        selected = true;
      }

    }
  }

  balls[2 * selectedBallNumber] = event.targetTouches[0].pageX;
  balls[2 * selectedBallNumber + 1] = event.targetTouches[0].pageY;


});

canvas.addEventListener('touchstart', function() {

  event.preventDefault();

  touchState = "down";

  touchX = event.targetTouches[0].pageX;
  touchY = event.targetTouches[0].pageY;

  alarmButtonSetWhileTouchingAlready = false;


});



function draw()
{
  //clear page every frame
  context.fillStyle = backgroundColor;
  context.fillRect ( 0 , 0 , canvas.width, canvas.height );

  // context.fillStyle = '#4FC3F7';
  // context.fillRect ( 0 , canvas.height/20 * 15 , canvas.width, canvas.height/20 * 5 );

  if(alarmOn == true)
  { 
  //  num = [0, 0, 0, 0];
    drawMathProblem(centerX,centerY);
    changeSource();

    //spinning speed
    spinningAngleIncrementVal = 0.02;

    
    
  }

  else
  {
    turnOffAlarm();
    drawCurrentTime(centerX, centerY);

    //spinning speed
    spinningAngleIncrementVal = 0.005;
    
  }


  if (spinning && mouseState == 'up' && touchState == 'up')
  {
    spinningBalls();
  }

  if (mouseState=='up' && touchState == 'up')
  {
    for (var i = 0; i < balls.length; i++)
    {
      balls[i] = balls_OrigPos[i];

    }
  }

  //alarm number boxes


  alarmBox(canvas.width/20 , alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');
  alarmBox(canvas.width/10 * 2.3, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');
  alarmBox(canvas.width/10 * 4.1, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');
  alarmBox(canvas.width/10 * 5.9, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');


  

  for (var i = 0; i < 10; i++)
  {
    for (var j = 0; j < num.length; j++)
    {
      if (Math.abs(balls[2 * i] - numPos[2 * j]) < targetSize && Math.abs(balls[2 * i + 1] - numPos[2 * j + 1]) < targetSize)
      {
        num[j] = i;
      }

      //text(j, numios[2 * j], numPos[2 * j + 1]);

      //drawText(j, numPos[2 * j], numPos[2 * j + 1]);

      var setNumSize = Math.floor(canvas.width / 10);
      var setNumText = setNumSize.toString() + "px Arial";

      context.font = "bold " + setNumText;

      context.textAlign="center";

      context.fillStyle = "white";

      context.fillText(num[j], numPos[2 * j], numPos[2 * j + 1]);

    }
  }

  for (var k = 0; k < 10; k++)
  {
       drawCircle(balls[2*k], balls[2*k+1], k);
  }

  //console.log(num);

  if (Math.abs(touchX - alarmButtonX) < targetSize * 2 && Math.abs(touchY - alarmButtonY) < targetSize * 2 && !alarmButtonSetWhileTouchingAlready && num[0] <= 2 && num[2] <= 5)
  {
      alarmButtonPressed = !alarmButtonPressed;
      alarmButtonSetWhileTouchingAlready = true;
  }

  if (!alarmButtonPressed && !alarmOn)
  {
    alarmButton(alarmButtonX, alarmButtonY, canvas.width/5 , canvas.width/6, '#9E9E9E', 'OFF');
    alarmSet = false;

  }

  else
  {
    alarmButton(alarmButtonX, alarmButtonY, canvas.width/5 , canvas.width/6, '#EF5350', 'ON');
    spinning = true;
    alarmSet = true;

    if(num[0] <= 2 && num[2] <= 5)
    {
      timeSet = true;
    }
    alarm();

  }

  


  requestAnimationFrame(draw);
}

draw();


if (canvas.width > canvas.height)
{
  //alert("Please turn your device to portrait orientation and refresh the page. Thank you.")

}

function alarm()
{
  if(timeSet)
  {

      
      timeSet = false;
      alarmHour = num[0] * 10 + num[1];
      
      alarmMinute = num[2] * 10 + num[3];



      //console.log(alarmMinute);
      // console.log(alarmHour);



  }
    d = new Date();
      if(alarmHour == d.getHours() && alarmMinute == d.getMinutes() && alarmSet == true){
      console.log('1');
      alarmOn = true;



      num[0] = 0;
      num[1] = 0;
      num[2] = 0;
      num[3] = 0;
    }
    else
    {
      //console.log('0');
    }

   // draw();

}





