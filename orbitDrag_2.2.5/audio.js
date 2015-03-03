var audio = new Audio();
audio.src = 'audio/silence.mp3';
//audio.controls = true;
audio.autoplay = true;
audio.loop = true;
document.body.appendChild(audio);

//make audio loop
audio.addEventListener('ended', function() {
	this.currentTime = 0;
}, false);

function changeSource()
{
	if (!alarmRinging)
	{

		audio.src = 'audio/alarm.mp3'

		alarmRinging = true;
	}
}

function turnOffAlarm()
{

	audio.src = 'audio/silence.mp3'

	alarmRinging = false;
}


var alarmRinging = false;

