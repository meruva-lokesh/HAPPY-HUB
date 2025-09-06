function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>🧠 Memory Match</h2>
    <p>Flip cards to find pairs. Fewer moves is better!</p>
    <div class="controls">
      <button id="new" class="primary">New Game</button>
      <span class="status"><strong>Moves:</strong> <span id="moves">0</span></span>
    </div>
    <section id="board" class="game-board board-4"></section>
  `;
  root.appendChild(el);

  const EMOJI = ['🍎','🍋','🍇','🍓','🥑','🍒','🍍','🍉'];
  let deck = [];
  let flipped = []; // indices
  let matched = new Set();
  let moves = 0;

  const board = el.querySelector('#board');
  const movesEl = el.querySelector('#moves');

  function setup() {
    moves = 0; movesEl.textContent = '0';
    matched.clear(); flipped = [];
    deck = shuffle([...EMOJI, ...EMOJI]);
    board.innerHTML = '';
    deck.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'tile';
      btn.setAttribute('aria-label', 'Card');
      btn.dataset.i = String(i);
      btn.textContent = '❓';
      board.appendChild(btn);
    });
  }

  function reveal(i, btn) {
    btn.textContent = deck[i];
    btn.style.background = 'linear-gradient(135deg, #2a355f, #192046)';
  }

  function hide(btn) {
    btn.textContent = '❓';
    btn.style.background = '';
  }

  board.addEventListener('click', (e) => {
    const btn = e.target.closest('button.tile');
    if (!btn) return;
    const i = Number(btn.dataset.i);
    if (matched.has(i) || flipped.includes(i)) return;
    if (flipped.length === 2) return;

    reveal(i, btn);
    flipped.push(i);

    if (flipped.length === 2) {
      moves++; movesEl.textContent = String(moves);
      const [a, b] = flipped;
      const aBtn = board.querySelector(`button.tile[data-i="${a}"]`);
      const bBtn = board.querySelector(`button.tile[data-i="${b}"]`);
      if (deck[a] === deck[b]) {
        matched.add(a); matched.add(b);
        flipped = [];
        if (matched.size === deck.length) {
          setTimeout(() => alert(`You win! Moves: ${moves}`), 50);
        }
      } else {
        setTimeout(() => {
          hide(aBtn); hide(bBtn);
          flipped = [];
        }, 700);
      }
    }
  });

  el.querySelector('#new').addEventListener('click', setup);
  setup();
}