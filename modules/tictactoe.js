function winner(b) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (const [a,b2,c] of lines) {
    if (b[a] && b[a] === b[b2] && b[a] === b[c]) return b[a];
  }
  if (b.every(Boolean)) return 'draw';
  return null;
}

function aiMove(board) {
  const me = 'O', you = 'X';
  const empty = board.map((v,i)=>v?null:i).filter(v=>v!==null);

  // Try win
  for (const i of empty) {
    const test = [...board]; test[i] = me;
    if (winner(test) === me) return i;
  }
  // Block
  for (const i of empty) {
    const test = [...board]; test[i] = you;
    if (winner(test) === you) return i;
  }
  // Center
  if (!board[4]) return 4;
  // Corner
  for (const i of [0,2,6,8]) if (!board[i]) return i;
  // Side
  return empty[0];
}

export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>❌⭕ Tic-Tac-Toe</h2>
    <p>Play vs AI (you are X) or switch to 2 players.</p>
    <div class="controls">
      <button id="new" class="primary">New Game</button>
      <label><input type="checkbox" id="twop" /> 2 Players</label>
    </div>
    <div class="status"><strong>Turn:</strong> <span id="turn">X</span></div>
    <section id="board" class="game-board board-3"></section>
  `;
  root.appendChild(el);

  let board = Array(9).fill('');
  let turn = 'X';
  let twoP = false;
  const boardEl = el.querySelector('#board');
  const turnEl = el.querySelector('#turn');

  function draw() {
    boardEl.innerHTML = '';
    board.forEach((v, i) => {
      const cell = document.createElement('button');
      cell.className = 'cell';
      cell.textContent = v || '';
      cell.dataset.i = String(i);
      boardEl.appendChild(cell);
    });
    turnEl.textContent = turn;
  }

  function play(i) {
    if (board[i] || winner(board)) return;
    board[i] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    draw();

    const w = winner(board);
    if (w) {
      setTimeout(() => alert(w === 'draw' ? 'Draw!' : `${w} wins!`), 10);
      return;
    }

    if (!twoP && turn === 'O') {
      // AI move
      setTimeout(() => {
        const move = aiMove(board);
        if (move !== undefined) {
          board[move] = 'O';
          turn = 'X';
          draw();
          const w2 = winner(board);
          if (w2) setTimeout(() => alert(w2 === 'draw' ? 'Draw!' : `${w2} wins!`), 10);
        }
      }, 200);
    }
  }

  boardEl.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    play(Number(cell.dataset.i));
  });

  el.querySelector('#new').addEventListener('click', () => {
    board = Array(9).fill(''); turn = 'X'; draw();
  });
  el.querySelector('#twop').addEventListener('change', (e) => {
    twoP = e.target.checked; board = Array(9).fill(''); turn = 'X'; draw();
  });

  draw();
}