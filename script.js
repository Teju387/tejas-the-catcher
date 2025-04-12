const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let catcher = { x: 180, y: 550, width: 40, height: 20, speed: 5 };
let objects = [];
let score = 0;

function drawCatcher() {
  ctx.fillStyle = 'white';
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
}

function drawObjects() {
  ctx.fillStyle = 'yellow';
  for (let obj of objects) {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateObjects() {
  for (let obj of objects) {
    obj.y += obj.speed;

    // Check for catch
    if (
      obj.y + obj.radius > catcher.y &&
      obj.x > catcher.x &&
      obj.x < catcher.x + catcher.width
    ) {
      score++;
      document.getElementById('score').textContent = `Score: ${score}`;
      objects.splice(objects.indexOf(obj), 1);
    }

    // Remove if off screen
    if (obj.y > canvas.height) {
      objects.splice(objects.indexOf(obj), 1);
    }
  }

  // Add new objects
  if (Math.random() < 0.03) {
    objects.push({
      x: Math.random() * canvas.width,
      y: 0,
      radius: 10,
      speed: 2 + Math.random() * 2
    });
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  drawCatcher();
  updateObjects();
  drawObjects();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && catcher.x > 0) {
    catcher.x -= catcher.speed;
  } else if (e.key === 'ArrowRight' && catcher.x + catcher.width < canvas.width) {
    catcher.x += catcher.speed;
  }
});

gameLoop();
