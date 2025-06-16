const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: 50,
  y: canvas.height - 30,
  radius: 15,
  dy: 0,
  gravity: 0.6,
  jumpPower: -12,
  isJumping: false
};

let obstacles = [];
let score = 0;

function createObstacle() {
  obstacles.push({
    x: canvas.width,
    y: canvas.height - 30,
    width: 20,
    height: 30
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}

function drawObstacles() {
  ctx.fillStyle = "#333";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  });
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 4;

    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function checkCollision() {
  for (let ob of obstacles) {
    if (
      ball.x + ball.radius > ob.x &&
      ball.x - ball.radius < ob.x + ob.width &&
      ball.y + ball.radius > ob.y
    ) {
      alert("Hai perso! Punteggio: " + score);
      document.location.reload();
    }
  }
}

function jump() {
  if (!ball.isJumping) {
    ball.dy = ball.jumpPower;
    ball.isJumping = true;
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") jump();
});

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.dy += ball.gravity;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.dy = 0;
    ball.isJumping = false;
  }

  if (Math.random() < 0.02) createObstacle();

  updateObstacles();
  checkCollision();

  drawBall();
  drawObstacles();

  requestAnimationFrame(update);
}

update();
