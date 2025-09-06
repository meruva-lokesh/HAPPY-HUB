export function render(root) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <h2>🖼️ Meme Studio</h2>
    <div class="controls">
      <input type="file" id="img" accept="image/*" />
      <input type="text" id="top" placeholder="Top text" />
      <input type="text" id="bottom" placeholder="Bottom text" />
      <button id="download" class="primary">Download PNG</button>
    </div>
    <canvas id="canvas" width="800" height="800" aria-label="Meme canvas"></canvas>
    <p><small class="muted">Tip: Drag to reposition text on the canvas.</small></p>
  `;
  root.appendChild(el);

  const canvas = el.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  let img = new Image();
  let positions = { top: { x: 400, y: 60 }, bottom: { x: 400, y: 740 } };
  let dragging = null;

  function draw() {
    // background
    ctx.fillStyle = '#0c1223';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (img.complete && img.naturalWidth) {
      const ratio = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * ratio, h = img.naturalHeight * ratio;
      const x = (canvas.width - w) / 2, y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    }
    const topText = (el.querySelector('#top').value || '').toUpperCase();
    const bottomText = (el.querySelector('#bottom').value || '').toUpperCase();
    ctx.font = 'bold 44px Impact, Arial Black, sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';

    // draw text with outline
    ctx.strokeText(topText, positions.top.x, positions.top.y);
    ctx.fillText(topText, positions.top.x, positions.top.y);
    ctx.strokeText(bottomText, positions.bottom.x, positions.bottom.y);
    ctx.fillText(bottomText, positions.bottom.x, positions.bottom.y);
  }

  el.querySelector('#img').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    img = new Image();
    img.onload = () => { draw(); URL.revokeObjectURL(url); };
    img.src = url;
  });
  el.querySelector('#top').addEventListener('input', draw);
  el.querySelector('#bottom').addEventListener('input', draw);

  // Drag to move text
  canvas.addEventListener('mousedown', (e) => {
    const { offsetX:x, offsetY:y } = e;
    const dist = (p) => Math.hypot(p.x - x, p.y - y);
    dragging = dist(positions.top) < 50 ? 'top' : dist(positions.bottom) < 50 ? 'bottom' : null;
  });
  canvas.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    positions[dragging] = { x: e.offsetX, y: e.offsetY };
    draw();
  });
  window.addEventListener('mouseup', () => dragging = null);

  el.querySelector('#download').addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = 'meme.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });

  draw();
}