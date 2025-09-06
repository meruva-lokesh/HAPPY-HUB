export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>🐍 Snake</h2>
    <p>Use arrow keys. Eat apples, don’t hit the wall or yourself.</p>
    <div class="status"><strong>Score:</strong> <span id="score">0</span> <span class="kbd">← ↑ → ↓</span></div>
    <canvas id="c" width="320" height="320" aria-label="Snake game"></canvas>
    <div class="controls"><button id="restart" class="primary">Restart</button></div>
  `;
  root.appendChild(el);

  const c = el.querySelector('#c');
  const ctx = c.getContext('2d');
  const size = 16;
  const cells = c.width / size | 0;

  let snake, dir, food, score, loop, pendingDir = null, alive;

  function reset() {
    snake = [{x:8, y:8}];
    dir = {x:1, y:0};
    pendingDir = null;
    score = 0; alive = true;
    spawnFood();
    el.querySelector('#score').textContent = '0';
    if (loop) clearInterval(loop);
    loop = setInterval(tick, 110);
    draw();
  }

  function spawnFood() {
    while (true) {
      const f = { x: Math.floor(Math.random()*cells), y: Math.floor(Math.random()*cells) };
      if (!snake.some(s => s.x === f.x && s.y === f.y)) { food = f; break; }
    }
  }

  function tick() {
    if (!alive) return;
    if (pendingDir) { dir = pendingDir; pendingDir = null; }
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    // walls
    if (head.x < 0 || head.y < 0 || head.x >= cells || head.y >= cells) { gameOver(); return; }
    // self
    if (snake.some(s => s.x === head.x && s.y === head.y)) { gameOver(); return; }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++; el.querySelector('#score').textContent = String(score);
      spawnFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function draw() {
    // bg
    ctx.fillStyle = '#0c1223'; ctx.fillRect(0,0,c.width,c.height);
    // grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
    for (let i=0;i<cells;i++) {
      ctx.beginPath(); ctx.moveTo(i*size,0); ctx.lineTo(i*size,c.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,i*size); ctx.lineTo(c.width,i*size); ctx.stroke();
    }
    // food
    ctx.fillStyle = '#ff7ab6';
    ctx.fillRect(food.x*size, food.y*size, size, size);
    // snake
    snake.forEach((s,i) => {
      ctx.fillStyle = i===0 ? '#6ae3ff' : '#2dd4bf';
      ctx.fillRect(s.x*size, s.y*size, size, size);
    });
  }

  function gameOver() {
    alive = false;
    clearInterval(loop);
    draw();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = '#e8edf7';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', c.width/2, c.height/2 - 8);
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(`Score: ${score}  —  Press Restart`, c.width/2, c.height/2 + 16);
  }

  function setDir(nx, ny) {
    // prevent reverse
    if (nx === -dir.x && ny === -dir.y) return;
    pendingDir = {x:nx, y:ny};
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setDir(-1,0);
    if (e.key === 'ArrowRight') setDir(1,0);
    if (e.key === 'ArrowUp') setDir(0,-1);
    if (e.key === 'ArrowDown') setDir(0,1);
  });

  el.querySelector('#restart').addEventListener('click', reset);
  window.addEventListener('hashchange', () => clearInterval(loop), { once: true });

  reset();
}