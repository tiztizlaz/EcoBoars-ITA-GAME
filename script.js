const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: 50,
  y: 250,
  radius: 20,
  color: "red",
  dy: 0,
  gravity: 1,
  jumpStrength: -15,
  onGround: true
};

let obstacle = {
  x: canvas.width,
  y: 260,
  width: 20,
  height: 40,
  speed: 6
};

let score = 0;
let gameOver = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function drawObstacle() {
  ctx.fillStyle = "black";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#333";
  ctx.fillText("Punteggio: " + score, 10, 30);
}

function reset() {
  ball.y = 250;
  ball.dy = 0;
  obstacle.x = canvas.width;
  score = 0;
  gameOver = false;
  loop();
}

function loop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fisica pallina
  ball.dy += ball.gravity;
  ball.y += ball.dy;

  if (ball.y + ball.radius > 280) {
    ball.y = 280 - ball.radius;
    ball.dy = 0;
    ball.onGround = true;
  } else {
    ball.onGround = false;
  }

  // Muovi ostacolo
  obstacle.x -= obstacle.speed;

  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width + Math.random() * 200;
    score++;
  }

  // Collisione
  if (
    ball.x + ball.radius > obstacle.x &&
    ball.x - ball.radius < obstacle.x + obstacle.width &&
    ball.y + ball.radius > obstacle.y
  ) {
    gameOver = true;
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillText("Premi SPAZIO o Tocca per riprovare", canvas.width / 2 - 170, canvas.height / 2 + 40);
    return;
  }

  drawBall();
  drawObstacle();
  drawScore();

  requestAnimationFrame(loop);
}

function jump() {
  if (ball.onGround) {
    ball.dy = ball.jumpStrength;
  } else if (gameOver) {
    reset();
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") jump();
});

document.addEventListener("touchstart", jump);

loop();
