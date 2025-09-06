export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>⚡ Reaction Speed</h2>
    <p>Wait for green, then click as fast as you can.</p>
    <div class="controls">
      <button id="start" class="primary">Start</button>
      <button id="resetBest" class="btn-secondary">Reset Best</button>
    </div>
    <div class="status">
      <strong>Status:</strong> <span id="status">Idle</span>
      <span>|</span>
      <strong>Last:</strong> <span id="last">–</span> ms
      <span>|</span>
      <strong>Best:</strong> <span id="best">–</span> ms
    </div>
    <div id="area" class="tile" style="height:180px; border-style:dashed; font-size:1.1rem;">Click here when it turns green</div>
  `;
  root.appendChild(el);

  const area = el.querySelector('#area');
  const statusEl = el.querySelector('#status');
  const lastEl = el.querySelector('#last');
  const bestEl = el.querySelector('#best');

  let best = Number(localStorage.getItem('hh_reaction_best') || 0);
  let timer = null, startAt = 0, phase = 'idle'; // idle -> waiting -> go

  const setPhase = (p) => { phase = p; statusEl.textContent = p.toUpperCase(); };

  const paint = (color, text) => {
    area.style.background = color;
    area.textContent = text;
  };

  const updateBest = (v) => {
    if (!best || v < best) {
      best = v; localStorage.setItem('hh_reaction_best', String(best));
    }
    bestEl.textContent = best ? best : '–';
  };

  updateBest(best);

  el.querySelector('#start').addEventListener('click', () => {
    if (timer) clearTimeout(timer);
    setPhase('waiting');
    paint('#31264a', 'Wait...');
    const delay = 700 + Math.random() * 1800;
    timer = setTimeout(() => {
      setPhase('go');
      startAt = performance.now();
      paint('linear-gradient(135deg, #19c37d, #0f9960)', 'CLICK!');
    }, delay);
  });

  area.addEventListener('click', () => {
    if (phase === 'waiting') {
      setPhase('idle');
      paint('#3a2e5c', 'Too soon! Click Start again.');
      return;
    }
    if (phase === 'go') {
      const t = Math.round(performance.now() - startAt);
      lastEl.textContent = String(t);
      updateBest(t);
      setPhase('idle');
      paint('#22283f', 'Nice! Press Start to try again.');
    }
  });

  el.querySelector('#resetBest').addEventListener('click', () => {
    best = 0; localStorage.removeItem('hh_reaction_best'); bestEl.textContent = '–';
  });
}