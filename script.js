let countdown;
let isRunning = false;
let initialDuration = 00; // 10 minutes
let currentDuration = initialDuration;

function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    countdown = setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            isRunning = false;
        }
    }, 1000);
}

function resetTimer(display) {
    clearInterval(countdown);
    isRunning = false;
    display.textContent = formatTime(initialDuration);
}

function restartTimer(duration, display) {
    resetTimer(display);
    isRunning = true;
    startTimer(duration, display);
}

function formatTime(duration) {
    let hours = parseInt(duration / 3600, 10);
    let minutes = parseInt((duration % 3600) / 60, 10);
    let seconds = parseInt(duration % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

window.onload = function () {
    let display = document.querySelector('#timer');
    display.textContent = formatTime(initialDuration); // Initialize display
    document.getElementById('startBtn').addEventListener('click', function () {
        if (!isRunning) {
            isRunning = true;
            startTimer(currentDuration, display);
        }
    });
    document.getElementById('stopBtn').addEventListener('click', function () {
        clearInterval(countdown);
        isRunning = false;
    });
    document.getElementById('resetBtn').addEventListener('click', function () {
        resetTimer(display);
    });
    document.getElementById('restartBtn').addEventListener('click', function () {
        restartTimer(currentDuration, display);
    });
    document.getElementById('setTimeBtn').addEventListener('click', function () {
        let hours = parseInt(document.getElementById('hours').value) || 0;
        let minutes = parseInt(document.getElementById('minutes').value) || 0;
        let seconds = parseInt(document.getElementById('seconds').value) || 0;
        currentDuration = (hours * 3600) + (minutes * 60) + seconds;
        initialDuration = currentDuration;
        display.textContent = formatTime(currentDuration);
    });
};
