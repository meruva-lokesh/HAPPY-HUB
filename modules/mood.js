export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>Moodboard + Soundboard</h2>
    <div class="controls">
      <select id="mood">
        <option value="chill">Chill</option>
        <option value="hype">Hype</option>
        <option value="lol">LOL</option>
      </select>
      <button id="shuffle" class="primary">Shuffle</button>
    </div>
    <div id="gallery" class="grid"></div>
    <audio id="player" controls></audio>
  `;
  root.appendChild(el);

  const moodEl = el.querySelector('#mood');
  const gallery = el.querySelector('#gallery');
  const player = el.querySelector('#player');

  const DATA = {
    chill: {
      gifs: ['https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'],
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav'
    },
    hype: {
      gifs: ['https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'],
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav'
    },
    lol: {
      gifs: ['https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif'],
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav'
    }
  };

  function renderMood() {
    const m = DATA[moodEl.value];
    gallery.innerHTML = m.gifs.map(src => `<img src="${src}" alt="" style="width:100%;border-radius:10px">`).join('');
    player.src = m.audio;
  }

  el.querySelector('#shuffle').addEventListener('click', renderMood);
  moodEl.addEventListener('change', renderMood);
  renderMood();
}