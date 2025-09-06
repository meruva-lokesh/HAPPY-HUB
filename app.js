import { modules } from './modules/registry.js';

const appEl = document.getElementById('app');

function setTitle(suffix) {
  document.title = suffix ? `Happy Hub Arcade – ${suffix}` : 'Happy Hub Arcade';
}

async function navigateImpl() {
  const hash = location.hash || '#/home';
  const [ , route, ...rest ] = hash.split('/'); // e.g. #/module/reaction
  appEl.innerHTML = ''; // clear

  if (route === 'home') {
    const { render } = await import('./modules/home.js');
    setTitle('Home');
    render(appEl);
    return;
  }

  if (route === 'module') {
    const id = rest[0];
    const mod = modules.find(m => m.id === id);
    if (!mod) {
      appEl.innerHTML = `<div class="card"><h2>Not found</h2><p>Module "${id}" does not exist.</p><a class="btn" href="#/home">Back Home</a></div>`;
      return;
    }
    setTitle(mod.title);
    const { render } = await import(`./modules/${id}.js`);
    render(appEl);
    return;
  }

  location.hash = '#/home';
}

async function navigate() {
  await navigateImpl();
  appEl?.focus({ preventScroll: true });
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);