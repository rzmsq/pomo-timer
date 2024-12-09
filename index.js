const timeEl = document.querySelector('.pomodoro__time');
const focusModeEl = document.querySelector('.pomodoro__mode');
const progressEls = document.querySelectorAll('.pomodoro__progress__el');
const startBtn = document.getElementById('start-btn');

let focusTime = 3;
let restTime = 2;
let progressCount = 0;
let isFocusTime = true;

const startCount = () => {
    let time = isFocusTime ? focusTime : restTime;
    const timer = setInterval(() => {
        time--;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeEl.textContent = `${minutes}:${seconds}`;
        if (time === 0) {
            clearInterval(timer);

            if (isFocusTime){
                progressEls.forEach((el, ind) => {
                    if (progressCount === ind) {
                        el.classList.toggle('pomodoro__progress__el--active');
                    }
                });
                progressCount === 3 ? progressCount = 0 : progressCount++;
                timeEl.textContent = `${restTime}:00`;
                focusModeEl.textContent = 'Rest time';
            }
            else {
                timeEl.textContent = `${focusTime}:00`;
                focusModeEl.textContent = 'Focus time';
            }
            isFocusTime = !isFocusTime;
        }
    }, 1000)
}

startBtn.addEventListener('click', () => {
    startCount();
})

window.addEventListener('load', () => {
    focusModeEl.textContent = isFocusTime ? 'Focus time' : 'Rest time';
    timeEl.textContent = `${focusTime}:00`;
})