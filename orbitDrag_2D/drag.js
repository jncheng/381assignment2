var canvas = document.getElementById("myCanvas");

  // canvas.shadowColor = '#999';
  // canvas.shadowBlur = 20;
  // canvas.shadowOffsetX = 1;
  // canvas.shadowOffsetY = 1;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight * (19/20);

var alarmHour = 0;
var alarmMinute = 0;


var context = canvas.getContext('2d');

var alarmOn = false;
var timeSet = false;

var radius = canvas.width/4;
var circleSize = canvas.width/25;
var centerSkewY = 70;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2 - centerSkewY;

//touch target size
var targetSize = canvas.width/15;

var mouseState = "up";
var touchState = "up";

var spinning = true;

//font size
var fontSizeText = Math.floor(canvas.width / 20);
var fontStyleText = fontSizeText.toString() + "px Arial";

var num = [0, 0, 0, 0];
var numPos = [
              centerX - 300, centerY + canvas.width/2,
              centerX - 100, centerY + canvas.width/2,
              centerX + 100, centerY + canvas.width/2,
              centerX + 300, centerY + canvas.width/2
              ]



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
  spinningAngleIncrement += 0.05;

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
      
      context.shadowColor = '#999';
      context.shadowBlur = 10;
      context.shadowOffsetX = 5;
      context.shadowOffsetY = 5;

      
      context.beginPath();
      context.arc(x, y, circleSize, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      //context.strokeStyle = 'green';
      //context.stroke();

      



     // context.setShadow(null);

      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;

      context.font = '20px Arial';

      context.strokeStyle="black";
      context.fillStyle = "black";

      context.fillText(num, x, y + circleSize/10);


}

var timeArray = [0, 0, 0];

function drawCurrentTime(x, y)
{
  context.shadowBlur = 100;


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

  context.font = '40px Arial';

  context.strokeStyle="black";
  context.fillStyle = "black";

  context.fillText(timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2], x, y);

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

  if (mouseState=='down')
  {

    

    for (var i = 0; i < 10; i++)
    {
      
      var x = balls[2 * i];
      var y = balls[2 * i + 1];

      if (Math.abs(e.pageX - x) < targetSize && Math.abs(e.pageY - y) < targetSize && !selected)
      {
        selectedBallNumber = i;
        selected = true;
      }
    }

  }

  balls[2 * selectedBallNumber] = e.pageX;
  balls[2 * selectedBallNumber + 1] = e.pageY;

  
}

canvas.addEventListener('touchend', function() {

  event.preventDefault();

  touchState = "up";


});

canvas.addEventListener('touchmove', function() {

  event.preventDefault();

  selected = false;

  selectedBallNumber = "?";

  if (touchState=='down')
  {
    for (var i = 0; i < 10; i++)
    {
      var x = balls[2 * i];
      var y = balls[2 * i + 1];

      if (Math.abs(event.targetTouches[0].pageX - x) < targetSize && Math.abs(event.targetTouches[0].pageY - y) < targetSize && !selected)
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


});

function draw()
{
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

  context.clearRect ( 0 , 0 , canvas.width, canvas.height );


  for (var i = 0; i < 10; i++)
  {
    drawCircle(balls[2*i], balls[2*i+1], i);

    // if (Math.abs(balls[2*i] - centerX) < targetSize && Math.abs(balls[2 * i + 1] - centerY) < targetSize)
    // {
    //     num[0] = i;
    // }

    // drawText(0, numPos[2 * 0], numPos[2 * 0 + 1])

    for (var j = 0; j < num.length; j++)
    {
      if (Math.abs(balls[2 * i] - numPos[2 * j]) < targetSize && Math.abs(balls[2 * i + 1] - numPos[2 * j + 1]) < targetSize)
      {
        // if(num[j] == num[0]){
        //   num[j] = i *10 ;
        // }
        // else if(num[j] != num[0]){
          num[j] = i;
        //}

      }

      //text(j, numios[2 * j], numPos[2 * j + 1]);

      //drawText(j, numPos[2 * j], numPos[2 * j + 1]);
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        

        context.font = fontStyleText;

        context.textAlign="center";

        context.strokeStyle="black";
        context.fillStyle = "black";


        context.fillText(num[j], numPos[2 * j], numPos[2 * j + 1]);


    }

      // if(num[j] == num[0]){
      //   num[j] *10;
      // }
      // else {
      //   num[j] = i;
      // }
  }

    if(num[0] >= 3)
    {
      num[0] = 0;
    }

    if(num[2] >= 6)
    {
      num[2] = 0;
    }
  //console.log(num);

  drawCurrentTime(centerX, centerY);

  requestAnimationFrame(draw);

  setAlarm();
}

draw();

function setAlarm()
{
  context.beginPath();
  context.arc(centerX + 400, centerY + canvas.width/2, circleSize, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;

  context.font = '40px Arial';

  context.strokeStyle="black";
  context.fillStyle = "black";
  context.fillText("on", centerX + 400, centerY + canvas.width/2);

  if(touchState == 'up' && mouseState == 'up'){
    context.fillText("off", centerX + 400, centerY + canvas.width/2);

  }
  else
  {
    context.fillText("on", centerX + 400, centerY + canvas.width/2);
    spinning = true;
    alarmOn = true;

    if(num[0] <= 2)
    {
      timeSet = true;
    }
  }
  alarm();
}
//console.log('num[0]')
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
      if(alarmHour == d.getHours()){
      console.log('1');
    }
    else
    {
      console.log('0');
    }



}




