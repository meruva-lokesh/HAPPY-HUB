export function render(root) {
  const compliments = [
    'You have top-tier vibes.',
    'Your code is cleaner than my room.',
    'You radiate main-character energy.',
    'Your ideas make bugs resign voluntarily.',
    'You make Monday feel like Friday.',
  ];
  const spices = {
    soft: ['', 'kind', 'sparkly', 'stellar'],
    medium: ['legend', 'wizard', 'boss', 'beast'],
    spicy: ['certified banger', 'absolute unit', 'chaos machine', 'goat']
  };

  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>💖 Compliment Generator</h2>
    <div class="controls">
      <label>Vibe:
        <select id="vibe">
          <option>soft</option>
          <option selected>medium</option>
          <option>spicy</option>
        </select>
      </label>
      <button id="gen" class="primary">Generate</button>
      <button id="copy" class="btn-secondary">Copy</button>
    </div>
    <p id="out" style="font-size:1.25rem; font-weight:700; min-height:2em;"></p>
  `;
  root.appendChild(el);

  const out = el.querySelector('#out');
  const vibeEl = el.querySelector('#vibe');
  const gen = () => {
    const base = compliments[Math.floor(Math.random() * compliments.length)];
    const spiceList = spices[vibeEl.value];
    const spice = spiceList[Math.floor(Math.random() * spiceList.length)];
    out.textContent = spice ? `${base} You are a ${spice}.` : base;
  };
  el.querySelector('#gen').addEventListener('click', gen);
  el.querySelector('#copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(out.textContent || ''); } catch {}
  });
  gen();
}