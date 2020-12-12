let min = 1;
let max = 20;
let num1;
let num2;
let sum;
let ans;
let level = 1;
let counter = 0;
let tries = 5;
let score = 0;
let hiScore = 0;

function init() {

    if (localStorage.getItem('level') != null && localStorage.getItem('max') != null && localStorage.getItem('tries')) {
        loadSaved();
    }
    generateRandom();
    updateTries();
    uptdateScore();
    updateHiScore();
}

function updateHiScore() {
document.getElementById('hiScore').innerHTML = hiScore;
}

function loadSaved() {
    let savedLevel = localStorage.getItem('level');
    let savedMax = localStorage.getItem('max');
    let savedTries = localStorage.getItem('tries');
    let savedScore = localStorage.getItem('score');
    let savedHiScore = localStorage.getItem('hiScore');
    hiScore = JSON.parse(savedHiScore);
    score = JSON.parse(savedScore);
    level = JSON.parse(savedLevel);
    max = JSON.parse(savedMax);
    tries = JSON.parse(savedTries);
}

function startNewGame() {
    document.getElementById('startScreen').classList.add('d-none');
    level = 1;
    max = 20;
    tries = 5;
    score = 0;
    let savedScore = JSON.stringify(score);
    localStorage.setItem('score', savedScore);
    let savedMax = JSON.stringify(max);
    localStorage.setItem('max', savedMax);
    let savedLevel = JSON.stringify(level);
    localStorage.setItem('level', savedLevel);
    let savedTries = JSON.stringify(tries);
    localStorage.setItem('tries', savedTries);
    init();
}

function loadSaveGame() {
    loadSaved();
    document.getElementById('startScreen').classList.add('d-none');
}

function generateRandom() {
    min = Math.ceil(min);
    max = Math.floor(max);
    num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('quest').innerHTML = num1 + '+' + num2;
    document.getElementById('level').innerHTML = level;
}

function uptdateScore() {
    document.getElementById('score').innerHTML = score;
}

function updateTries() {

    document.getElementById('tries').innerHTML = tries;

}

function checkAns() {
    let correct = document.getElementById('correct');
    let incorrect = document.getElementById('incorrect');
    let answerInput = document.getElementById('ans');
    sum = num1 + num2;
    ans = +answerInput.value;

    if (sum === ans) {

        answerInput.value = null;
        correct.classList.remove('d-none');
        generateRandom();
        score += 10;
        let savedScore = JSON.stringify(score);
        localStorage.setItem('score', savedScore);
        uptdateScore();

        if (counter < 2) {
            counter++;
        } else {
            counter = 1;
            level++;
            max += 20;
            score += 15;
            let savedMax = JSON.stringify(max);
            localStorage.setItem('max', savedMax);
            let savedLevel = JSON.stringify(level);
            localStorage.setItem('level', savedLevel);
            uptdateScore();
        }
        setTimeout(() => {
            correct.classList.add('d-none');
        }, 3000);
        max += 5;
        if (score > hiScore) {
            hiScore = score;
            let savedHiScore = JSON.stringify(hiScore);
            localStorage.setItem('hiScore', savedHiScore);
        }
    } else {
        answerInput.value = null;
        score -= 5
        incorrect.classList.remove('d-none');
        setTimeout(() => {
            incorrect.classList.add('d-none');
        }, 3000);
        tries--;
        let savedTries = JSON.stringify(tries);
        localStorage.setItem('tries', savedTries)
        updateTries();
        uptdateScore();
        if (tries < 1) {
            document.getElementById('restart').classList.remove('d-none');
            setTimeout(() => {
                document.getElementById('restart').classList.add('d-none');
            }, 3000);

            startNewGame();
        }
    }

}

document.addEventListener("keydown", e => {
    const k = e.key;
    if (k == 'Enter') {
        checkAns();
    }
});