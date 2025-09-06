import { modules } from './registry.js';

export function render(root) {
  const wrap = document.createElement('div');

  const search = document.createElement('div');
  search.className = 'card';
  search.innerHTML = `
    <h2>Welcome 👋</h2>
    <p class="muted">Pick a mini-game or fun tool below. Built with pure HTML, CSS, and JS.</p>
    <div class="controls">
      <input id="q" type="text" placeholder="Search games (e.g., snake, memory, meme)"/>
      <select id="filter">
        <option value="">All</option>
        <option value="game">Games</option>
        <option value="fun">Fun tools</option>
      </select>
    </div>
  `;

  const grid = document.createElement('section');
  grid.className = 'grid';
  const renderCards = (q = '', tag = '') => {
    const qlc = q.trim().toLowerCase();
    grid.innerHTML = modules
      .filter(m => (!tag || m.tags?.includes(tag)))
      .filter(m => !qlc || [m.title, m.desc, m.id, m.emoji].join(' ').toLowerCase().includes(qlc))
      .map(m => `
        <article class="card">
          <div class="tags">
            <span class="tag"><span class="dot"></span> ${m.tags?.[0] === 'game' ? 'Game' : 'Fun'}</span>
          </div>
          <h3>${m.emoji ? m.emoji + ' ' : ''}${m.title}</h3>
          <p>${m.desc}</p>
          <a class="btn" href="#/module/${m.id}">Open</a>
        </article>
      `).join('');
  };
  renderCards();

  search.querySelector('#q')?.addEventListener('input', (e) => {
    renderCards(e.target.value, search.querySelector('#filter').value);
  });
  search.querySelector('#filter')?.addEventListener('change', (e) => {
    renderCards(search.querySelector('#q').value, e.target.value);
  });

  wrap.appendChild(search);
  wrap.appendChild(grid);
  root.appendChild(wrap);
}