const gameContainer = document.getElementById("game-container");
const ball = document.getElementById("ball");

let ballPosition = 50; // Labda pozíciója (százalék)
let isGameOver = false;
let score = 0; // Pontszám
let obstacleSpeed = 3000; // Akadály sebessége (ms)

// Pontszám kijelzése
const scoreElement = document.createElement("div");
scoreElement.style.position = "fixed";
scoreElement.style.top = "10px";
scoreElement.style.right = "10px";
scoreElement.style.fontSize = "20px";
scoreElement.style.fontWeight = "bold";
scoreElement.textContent = `Pontszám: ${score}`;
document.body.appendChild(scoreElement);

// Labda mozgatása
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && ballPosition > 0) {
        ballPosition -= 5;
    } else if (e.key === "ArrowRight" && ballPosition < 100) {
        ballPosition += 5;
    }
    ball.style.left = `${ballPosition}%`;
});

// Akadály létrehozása
function spawnObstacle() {
    const obstacle = document.createElement("div");
    obstacle.style.left = `${Math.random() * 90}vw`;
    obstacle.style.animation = `fall ${obstacleSpeed / 1000}s linear`;
    obstacle.classList.add("obstacle");
    gameContainer.appendChild(obstacle);

    // Ütközés figyelése
    const obstacleInterval = setInterval(() => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (
            ballRect.left < obstacleRect.right &&
            ballRect.right > obstacleRect.left &&
            ballRect.top < obstacleRect.bottom &&
            ballRect.bottom > obstacleRect.top
        ) {
            alert("Game Over! Végső pontszám: " + score);
            isGameOver = true;
            clearInterval(obstacleInterval);
            location.reload(); // Újraindítja a játékot
        }
    }, 10);

    // Akadály eltávolítása és pontszám növelése
    obstacle.addEventListener("animationend", () => {
        if (!isGameOver) {
            score++;
            scoreElement.textContent = `Pontszám: ${score}`;
            obstacle.remove();
        }
        clearInterval(obstacleInterval);
    });
}

// Játék szintek növelése
function increaseDifficulty() {
    if (obstacleSpeed > 1000) {
        obstacleSpeed -= 200; // Gyorsítja az akadályokat
    }
}

// Játék indítása
function startGame() {
    setInterval(() => {
        if (!isGameOver) {
            spawnObstacle();
        }
    }, 1000);

    setInterval(() => {
        if (!isGameOver) {
            increaseDifficulty();
        }
    }, 5000); // 5 másodpercenként növekvő nehézség
}

// CSS animáció akadályokhoz
const style = document.createElement("style");
style.textContent = `
@keyframes fall {
    from {
        top: -50px;
    }
    to {
        top: 100vh;
    }
}
.obstacle {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: green;
    top: 0;
}`;
document.head.appendChild(style);

// Játék indítása
startGame();
