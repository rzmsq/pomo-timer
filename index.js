const timeEl = document.querySelector('.pomodoro__time');
const focusModeEl = document.querySelector('.pomodoro__mode');
const progressEls = document.querySelectorAll('.pomodoro__progress__el');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

const defaultFocusTime = 10;
const defaultRestTime = 2;


let focusTime = defaultFocusTime;
let restTime = defaultRestTime;
let progressCount = 0;
let isFocusTime = true;

let timer = null;
let currentTime = null;

const setCurrentTime = () => {
    const time = JSON.parse(localStorage.getItem('currentTime'));

    if (time) {
        currentTime = time;
    }
    else {
        currentTime = isFocusTime ? focusTime : restTime;
    }

}

const longRest = () =>{
    progressCount = 0;
    restTime = 900;
    progressEls.forEach(el => {
        el.classList.toggle('pomodoro__progress__el--inactive');
    });
}

const getTimeStr = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${
        minutes.toString().length === 1 ?
                '0' + minutes.toString() 
                : 
                minutes.toString()
    }:${
        seconds.toString().length === 1 ?
                '0' + seconds.toString() 
                :         
                seconds.toString()
    }`;
}

const startCount = () => {
    timer = setInterval(() => {
        currentTime--;
        timeEl.textContent = getTimeStr(currentTime);
        if (currentTime === 0) {
            clearInterval(timer);

            if (isFocusTime){
                progressEls.forEach((el, ind) => {
                    if (progressCount === ind) {
                        el.classList.toggle('pomodoro__progress__el--active');
                    }
                });
                progressCount === 3 ? longRest() : progressCount++;
                timeEl.textContent = getTimeStr(restTime);
                focusModeEl.textContent = 'Rest time';
            }
            else {
                restTime = defaultRestTime;
                timeEl.textContent = getTimeStr(focusTime);
                focusModeEl.textContent = 'Focus time';
            }

            isFocusTime = !isFocusTime;
            currentTime = isFocusTime ? focusTime : restTime;
        }
    }, 1000)
}

const stopCount = () => {
    clearInterval(timer);
    localStorage.setItem('currentTime', currentTime);
}


startBtn.addEventListener('click', () => {
    setCurrentTime();
    startCount();
    localStorage.clear();
})

stopBtn.addEventListener('click', () =>{
    stopCount();
})

window.addEventListener('load', () => {
    focusModeEl.textContent = isFocusTime ? 'Focus time' : 'Rest time';
    setCurrentTime();
    timeEl.textContent = getTimeStr(currentTime);
})