function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>🎶 Simon Says</h2>
    <p>Watch the lights, then repeat the pattern.</p>
    <div class="controls">
      <button id="start" class="primary">Start</button>
      <span class="status"><strong>Level:</strong> <span id="level">0</span></span>
    </div>
    <section class="simon">
      <button class="pad pad-0" data-i="0" aria-label="Green"></button>
      <button class="pad pad-1" data-i="1" aria-label="Red"></button>
      <button class="pad pad-2" data-i="2" aria-label="Yellow"></button>
      <button class="pad pad-3" data-i="3" aria-label="Blue"></button>
    </section>
  `;
  root.appendChild(el);

  const pads = Array.from(el.querySelectorAll('.pad'));
  const levelEl = el.querySelector('#level');

  let seq = [];
  let input = [];
  let playing = false;

  function tone(i, on=true) {
    // Simple visual "lit" effect; no audio for compatibility
    pads[i].classList.toggle('lit', on);
  }

  async function flash(i, ms=500) {
    tone(i, true); await sleep(ms); tone(i, false); await sleep(120);
  }

  async function playSequence() {
    playing = true;
    for (const i of seq) await flash(i, 420);
    playing = false;
  }

  function newLevel() {
    seq.push(Math.floor(Math.random()*4));
    levelEl.textContent = String(seq.length);
    input = [];
    playSequence();
  }

  function reset() {
    seq = []; input = []; levelEl.textContent = '0';
  }

  pads.forEach(p => {
    p.addEventListener('click', () => {
      if (playing || seq.length === 0) return;
      const i = Number(p.dataset.i);
      flash(i, 220);
      input.push(i);
      const idx = input.length - 1;
      if (input[idx] !== seq[idx]) {
        alert(`Wrong! You reached level ${seq.length}.`);
        reset();
        return;
      }
      if (input.length === seq.length) {
        setTimeout(newLevel, 500);
      }
    });
  });

  el.querySelector('#start').addEventListener('click', () => {
    reset(); newLevel();
  });
}