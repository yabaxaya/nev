document.addEventListener('DOMContentLoaded', () => {
    let randomNumber;
    let attempts = 0;
    const maxAttempts = 3;
    let score = 0;
    const scores = [];
    const maxNumber = 100;

    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-button');
    const message = document.getElementById('message');
    const hintMessage = document.getElementById('hint-message');
    const attemptsLeft = document.getElementById('attempts-left');
    const scoreElement = document.getElementById('score');
    const leaderboard = document.getElementById('leaderboard');
    const restartButton = document.getElementById('restart-button');
    const showHelpButton = document.getElementById('show-help');
    const instructions = document.getElementById('instructions');
    const instructionsMaxNumber = document.getElementById('instructions-max-number');

    // Admin panel elements
    const adminButton = document.getElementById('admin-button');
    const adminContainer = document.getElementById('admin-container');
    const adminLogin = document.getElementById('admin-login');
    const adminPassword = document.getElementById('admin-password');
    const loginButton = document.getElementById('login-button');
    const adminMessage = document.getElementById('admin-message');
    const adminPanel = document.getElementById('admin-panel');
    const backToGameButton = document.getElementById('back-to-game');
    const gamesPlayed = document.getElementById('games-played');
    const avgAttempts = document.getElementById('avg-attempts');
    const adminLeaderboard = document.getElementById('admin-leaderboard');

    const startGame = () => {
        randomNumber = Math.floor(Math.random() * maxNumber) + 1;
        attempts = 0;
        message.textContent = '';
        hintMessage.textContent = '';
        guessInput.disabled = false;
        submitButton.disabled = false;
        restartButton.style.display = 'none';
        attemptsLeft.textContent = `Попытки: ${maxAttempts}`;
        scoreElement.textContent = `Очки: ${score}`;
        guessInput.focus();
    };

    const checkGuess = () => {
        const userGuess = parseInt(guessInput.value);
        attempts++;
        if (userGuess === randomNumber) {
            message.textContent = 'Поздравляем! Вы угадали число!';
            score++;
            leaderboard.innerHTML += `<li>Игрок - ${score}</li>`;
            scores.push(score);
            restartButton.style.display = 'block';
            guessInput.disabled = true;
            submitButton.disabled = true;
        } else if (attempts >= maxAttempts) {
            message.textContent = `Игра окончена. Правильное число было ${randomNumber}.`;
            restartButton.style.display = 'block';
            guessInput.disabled = true;
            submitButton.disabled = true;
        } else {
            message.textContent = `Попробуйте снова.`;
            hintMessage.textContent = userGuess < randomNumber ? 'Загаданное число больше.' : 'Загаданное число меньше.';
            attemptsLeft.textContent = `Попытки: ${maxAttempts - attempts}`;
        }
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
    };

    const showInstructions = () => {
        instructions.style.display = 'block';
        instructionsMaxNumber.textContent = maxNumber;
    };

    const loginAdmin = () => {
        if (adminPassword.value === 'adminpass') {
            adminLogin.style.display = 'none';
            adminPanel.style.display = 'block';
            // Update admin stats
            gamesPlayed.textContent = '0'; // Dummy data
            avgAttempts.textContent = '0'; // Dummy data
            adminLeaderboard.innerHTML = `<li>Игрок 1 - 10</li><li>Игрок 2 - 8</li>`; // Dummy data
        } else {
            adminMessage.textContent = 'Неверный пароль!';
        }
    };

    const backToGame = () => {
        adminPanel.style.display = 'none';
        adminLogin.style.display = 'block';
    };

    submitButton.addEventListener('click', checkGuess);
    restartButton.addEventListener('click', startGame);
    showHelpButton.addEventListener('click', showInstructions);
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    loginButton.addEventListener('click', loginAdmin);
    backToGameButton.addEventListener('click', backToGame);

    startGame(); // Initialize the game
});

