const choices = ['rock', 'paper', 'scissors'];
const choiceBtns = document.querySelectorAll('.choice-btn');
const statusMsg = document.getElementById('status-msg');
const playerScoreEl = document.getElementById('player-score');
const compScoreEl = document.getElementById('comp-score');
const historyList = document.getElementById('history-list');
const overlay = document.getElementById('game-over-overlay');
const finalMsg = document.getElementById('final-result-msg');
const restartBtn = document.getElementById('restart-btn');

let pScore = 0;
let cScore = 0;
const WINNING_SCORE = 5;

const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
};

const playRound = (playerChoice) => {
    if (pScore >= WINNING_SCORE || cScore >= WINNING_SCORE) return;

    const compChoice = getComputerChoice();
    let result = '';
    let resultClass = '';

    if (playerChoice === compChoice) {
        result = 'draw';
        resultClass = 'draw';
        statusMsg.textContent = `It's a draw! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && compChoice === 'scissors') ||
        (playerChoice === 'paper' && compChoice === 'rock') ||
        (playerChoice === 'scissors' && compChoice === 'paper')
    ) {
        result = 'win';
        resultClass = 'win';
        pScore++;
        statusMsg.textContent = `You win! ${playerChoice} beats ${compChoice}.`;
    } else {
        result = 'lose';
        resultClass = 'lose';
        cScore++;
        statusMsg.textContent = `You lose! ${compChoice} beats ${playerChoice}.`;
    }

    updateScoreboard();
    addToHistory(playerChoice, compChoice, resultClass);
    checkGameOver();
};

const updateScoreboard = () => {
    playerScoreEl.textContent = pScore;
    compScoreEl.textContent = cScore;
};

const addToHistory = (pChoice, cChoice, resultClass) => {
    const li = document.createElement('li');
    li.classList.add(resultClass);
    li.innerHTML = `
        <span>P: ${pChoice}</span>
        <span>C: ${cChoice}</span>
    `;
    historyList.prepend(li);
};

const checkGameOver = () => {
    if (pScore >= WINNING_SCORE) {
        finalMsg.textContent = 'YOU WIN MATCH';
        overlay.classList.remove('hidden');
    } else if (cScore >= WINNING_SCORE) {
        finalMsg.textContent = 'YOU LOSE MATCH';
        finalMsg.style.color = 'var(--lose-color)';
        document.querySelector('.modal').style.borderColor = 'var(--lose-color)';
        overlay.classList.remove('hidden');
    }
};

const resetGame = () => {
    pScore = 0;
    cScore = 0;
    updateScoreboard();
    historyList.innerHTML = '';
    statusMsg.textContent = 'Choose your weapon';
    overlay.classList.add('hidden');
    
    // Reset modal colors
    finalMsg.style.color = 'var(--accent)';
    document.querySelector('.modal').style.borderColor = 'var(--accent)';
};

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        playRound(btn.dataset.choice);
    });
});

restartBtn.addEventListener('click', resetGame);
