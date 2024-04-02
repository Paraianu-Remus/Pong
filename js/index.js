import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

// Game update loop
let lastTime;
function gameUpdate(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.gameUpdate(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.gameUpdate(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

        if (gameLost()) {
            lost();
        }
    }
    lastTime = time;
    window.requestAnimationFrame(gameUpdate);
}

// Game over
function gameLost() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;   
}

// check lose condition and resets
function lost() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(gameUpdate);