const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 3;

let rotation = 0;
let knives = [];
let score = 0;
let gameOver = false;

function drawLog() {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.fillStyle = "#d8a45d";
  ctx.beginPath();
  ctx.arc(0, 0, 80, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawKnives() {
  knives.forEach(angle => {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + rotation);
    ctx.fillStyle = "silver";
    ctx.fillRect(-3, -120, 6, 40);
    ctx.restore();
  });
}

function throwKnife() {
  if (gameOver) return;

  let hitAngle = -rotation;

  for (let k of knives) {
    if (Math.abs(k - hitAngle) < 0.2) {
      gameOver = true;
      alert("Game Over! Score: " + score);
      location.reload();
      return;
    }
  }

  knives.push(hitAngle);
  score++;
  document.getElementById("score").innerText = "Score: " + score;
}

canvas.addEventListener("click", throwKnife);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rotation += 0.03; // smooth rotation speed
  drawLog();
  drawKnives();
  requestAnimationFrame(update);
}

update();
