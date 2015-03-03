var canvas = document.getElementById("myCanvas");

var backgroundColor = '#B3E5FC'

document.body.style.background = backgroundColor;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
var radius = canvas.width/50* 19;
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

var spinning = true;

//font size
var fontSizeText = Math.floor(canvas.width / 15);
var fontStyleText = fontSizeText.toString() + "px Arial";

var num = [0, 0, 0, 0];

var numPos = [
              centerX - canvas.width/20 * 8.5, lowerTextArea,
              centerX - canvas.width/20 * 4.7, lowerTextArea,
              centerX - canvas.width/20 * 0.7, lowerTextArea,
              centerX - canvas.width/20 * -3.3, lowerTextArea
              ]

var mouseX, mouseY;
var touchX, touchY;

var alarmButtonX = canvas.width/50 * 43;
var alarmButtonY = canvas.height/40 * 35;
var alarmButtonPressed = false;
var alarmButtonSetWhileTouchingAlready = false;

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

function spinningBalls()
{
  spinningAngleIncrement += 0.001;

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
    context.fillStyle = colour;
    context.fillRect(x, y - height/2, width, height);
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

var timeArray = [0, 0, 0];

function drawCurrentTime(x, y)
{

  context.shadowColor = '#555555';
  context.shadowBlur = 20;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 10;

  context.beginPath();
  context.fillStyle = '#757575';
  context.arc(x, y, 500, 0, 2 * Math.PI, false);
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


  drawCurrentTime(centerX, centerY);



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
  alarmBox(10, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');
  alarmBox(canvas.width/10 * 2, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');
  alarmBox(canvas.width/10 * 4, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');
  alarmBox(canvas.width/10 * 6, alarmButtonY, canvas.width/10 * 1.3, canvas.width/6, '#E0E0E0');


  

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

  if (Math.abs(touchX - alarmButtonX) < targetSize * 2 && Math.abs(touchY - alarmButtonY) < targetSize * 2 && !alarmButtonSetWhileTouchingAlready)
  {
      alarmButtonPressed = !alarmButtonPressed;
      alarmButtonSetWhileTouchingAlready = true;
  }

  if (!alarmButtonPressed)
  {
    alarmButton(alarmButtonX, alarmButtonY, canvas.width/5 , canvas.width/6, '#9E9E9E', 'OFF');
  }

  else
  {
    alarmButton(alarmButtonX, alarmButtonY, canvas.width/5 , canvas.width/6, '#EF5350', 'ON');
  }

  


  requestAnimationFrame(draw);
}

draw();


if (canvas.width > canvas.height)
{
  alert("Please turn your device to portrait orientation and refresh the page. Thank you.")

}





