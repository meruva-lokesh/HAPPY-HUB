export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>🐹 Whack-a-Mole</h2>
    <p>Click the mole when it pops up. 30 seconds. Good luck!</p>
    <div class="controls">
      <button id="start" class="primary">Start</button>
      <span class="status"><strong>Score:</strong> <span id="score">0</span></span>
      <span class="status"><strong>Time:</strong> <span id="time">30</span>s</span>
    </div>
    <section id="board" class="game-board board-3"></section>
  `;
  root.appendChild(el);

  const board = el.querySelector('#board');
  let score = 0, time = 30, mole = -1;
  let gameTimer = null, moleTimer = null;

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.dataset.i = String(i);
    tile.textContent = '🕳️';
    board.appendChild(tile);
  }

  function setMole(i) {
    board.querySelectorAll('.tile').forEach(t => t.textContent = '🕳️');
    if (i >= 0) {
      const t = board.querySelector(`.tile[data-i="${i}"]`);
      t.textContent = '🐹';
    }
    mole = i;
  }

  function start() {
    score = 0; time = 30;
    el.querySelector('#score').textContent = '0';
    el.querySelector('#time').textContent = '30';
    setMole(-1);
    clearInterval(gameTimer); clearInterval(moleTimer);

    gameTimer = setInterval(() => {
      time--; el.querySelector('#time').textContent = String(time);
      if (time <= 0) {
        clearInterval(gameTimer); clearInterval(moleTimer);
        setMole(-1);
        alert(`Time! Score: ${score}`);
      }
    }, 1000);

    moleTimer = setInterval(() => {
      const i = Math.floor(Math.random() * 9);
      setMole(i);
      // auto-hide a bit later
      setTimeout(() => { if (mole === i) setMole(-1); }, 700);
    }, 900);
  }

  board.addEventListener('click', (e) => {
    const tile = e.target.closest('.tile');
    if (!tile) return;
    if (Number(tile.dataset.i) === mole) {
      score++; el.querySelector('#score').textContent = String(score);
      setMole(-1);
    }
  });

  el.querySelector('#start').addEventListener('click', start);

  // Cleanup on navigation
  window.addEventListener('hashchange', () => { clearInterval(gameTimer); clearInterval(moleTimer); }, { once: true });
}