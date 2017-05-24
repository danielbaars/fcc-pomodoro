document.addEventListener("DOMContentLoaded", function(event) {

	var pomodoro = document.getElementById("jsPomodoro");
	var clockStatus = document.getElementById("jsClockStatus");	
	var clock = document.getElementById("jsClock");
	var sessionMinus = document.getElementById("jsSessionMinus");
	var sessionPlus = document.getElementById("jsSessionPlus");
	var sessionLength = document.getElementById("jsSessionLength");
	var breakMinus = document.getElementById("jsBreakMinus");
	var breakPlus = document.getElementById("jsBreakPlus");
	var breakLength = document.getElementById("jsBreakLength");	

	var defaultSession = 25;
	var defaultBreak = 5;

	sessionLength.innerHTML = defaultSession;
	breakLength.innerHTML = defaultBreak;
	clock.innerHTML = moment().minutes(defaultSession).seconds(0).format("mm:ss");

	var sessionMinutes = sessionLength.innerHTML;
	var breakMinutes = breakLength.innerHTML;

	var sessionTimer = null;	
	var sessionPaused = false;
	var sessionRunningTime;
	var breakTimer = null;
	var breakPaused = false;
	var breakRunningTime;

	function toggleStatus() {

		pomodoro.classList.toggle('paused');
		pomodoro.classList.toggle('playing');

	}

	function toggleTimer() {

		pomodoro.classList.toggle('work');
		pomodoro.classList.toggle('break');

	}	

	function sessionSubtract(){

		sessionPaused = false;
		if (parseFloat(sessionMinutes) !== 1) {
			sessionLength.innerHTML = parseFloat(sessionMinutes) - 1;
			sessionMinutes = sessionLength.innerHTML;
		}		

		clock.innerHTML = moment().hours(0).minutes(sessionMinutes).seconds(0).format("mm:ss");

	}

	function sessionAdd(){

		sessionPaused = false;
		sessionLength.innerHTML = parseFloat(sessionMinutes) + 1;
		sessionMinutes = sessionLength.innerHTML;
		clock.innerHTML = moment().hours(0).minutes(sessionMinutes).seconds(0).format("mm:ss");

	}

	function breakSubtract(){

		if (parseFloat(breakMinutes) !== 1) {
			breakLength.innerHTML = parseFloat(breakMinutes) - 1;
			breakMinutes = breakLength.innerHTML;
		}

	}

	function breakAdd(){

		breakLength.innerHTML = parseFloat(breakMinutes) + 1;
		breakMinutes = breakLength.innerHTML;

	}	

	sessionMinus.addEventListener("click", sessionSubtract);
	sessionPlus.addEventListener("click", sessionAdd);
	breakMinus.addEventListener("click", breakSubtract);
	breakPlus.addEventListener("click", breakAdd);	
	clock.addEventListener("click", startSessionTimer);

	function startSessionTimer(){

		var checkMinutes = parseFloat(sessionLength.innerHTML);

		toggleStatus();

		if (!sessionPaused)
			sessionRunningTime = moment().hours(0).minutes(checkMinutes).seconds(0);

		sessionTimer = moment.duration(1, "seconds").timer({

			loop: true

		}, function() { 

			sessionRunningTime = sessionRunningTime.subtract(1, 'seconds');
			var checkTime = sessionRunningTime.format("mm:ss");

			if (checkTime === "00:00") {

				sessionTimer.stop();
				clock.removeEventListener("click", startSessionTimer);
				clock.removeEventListener("click", stopSessionTimer);
				clock.addEventListener("click", stopBreakTimer);
				clock.innerHTML = moment().hours(0).minutes(parseFloat(breakLength.innerHTML)).seconds(0).format("mm:ss");
				toggleStatus();
				toggleTimer();
				startBreakTimer();

			} else {

				clock.innerHTML = sessionRunningTime.format("mm:ss");

			}
			

		});

		clockStatus.innerHTML = "Hard at work";

		sessionPaused = false;
		clock.removeEventListener("click", startSessionTimer);
		clock.addEventListener("click", stopSessionTimer);
		sessionMinus.removeEventListener("click", sessionSubtract);
		sessionPlus.removeEventListener("click", sessionAdd);		

	}

	function stopSessionTimer(){

		clockStatus.innerHTML = "About to work";

		toggleStatus();
		sessionTimer.stop();
		sessionPaused = true;
		clock.removeEventListener("click", stopSessionTimer);
		clock.addEventListener("click", startSessionTimer);
		sessionMinus.addEventListener("click", sessionSubtract);
		sessionPlus.addEventListener("click", sessionAdd);
		
	}	

	function startBreakTimer(){

		var checkMinutes = parseFloat(breakLength.innerHTML);

		toggleStatus();

		if (!breakPaused)
			breakRunningTime = moment().hours(0).minutes(checkMinutes).seconds(0);

		breakTimer = moment.duration(1, "seconds").timer({

			loop: true

		}, function() { 

			breakRunningTime = breakRunningTime.subtract(1, 'seconds');
			var checkTime = breakRunningTime.format("mm:ss");

			if (checkTime === "00:00") {

				breakTimer.stop();
				clock.removeEventListener("click", startBreakTimer);
				clock.removeEventListener("click", stopBreakTimer);
				clock.addEventListener("click", stopSessionTimer);	
				clock.innerHTML = moment().hours(0).minutes(parseFloat(sessionLength.innerHTML)).seconds(0).format("mm:ss");
				toggleStatus();
				toggleTimer();
				startSessionTimer();

			} else {

				clock.innerHTML = breakRunningTime.format("mm:ss");

			}

		});

		clockStatus.innerHTML = "It's chillin' time";

		breakPaused = false;
		clock.removeEventListener("click", startBreakTimer);
		clock.addEventListener("click", stopBreakTimer);
		breakMinus.removeEventListener("click", breakSubtract);
		breakPlus.removeEventListener("click", breakAdd);		

	}	

	function stopBreakTimer(){

		clockStatus.innerHTML = "Waiting to chill";

		toggleStatus();
		breakTimer.stop();
		breakPaused = true;
		clock.removeEventListener("click", stopBreakTimer);
		clock.addEventListener("click", startBreakTimer);
		breakMinus.addEventListener("click", breakSubtract);
		breakPlus.addEventListener("click", breakAdd);
		
	}

});











