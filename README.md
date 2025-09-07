
---

# HAPPY-HUB

> A small, client-side "Guess the Movie" style web app (static HTML / CSS / JavaScript).
> Lightweight, easy to run locally, and ready to be extended with additional movie sets or language support.

---

## Table of Contents

* [About](#about)
* [Features](#features)
* [Demo](#demo)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Install & Run Locally](#install--run-locally)
* [Project Structure](#project-structure)
* [How to Add / Edit Movies](#how-to-add--edit-movies)
* [Configuration & Options](#configuration--options)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [Troubleshooting](#troubleshooting)
* [License & Contact](#license--contact)

---

## About

**HAPPY-HUB** is a static web application that presents a short “guess the movie” game with hints, similarity-based guess scoring, stats tracking, and optional daily/random modes. The app is front-end only and stores lightweight stats in `localStorage`.

It appears to be organized to support multiple languages / movie sets and is easy to extend.

---

## Features

* Similarity-based scoring for guesses (Levenshtein-based)
* Progressive hints (emoji, year, director, cast, keywords)
* Daily and random game modes
* Local stats: wins, losses, streaks (saved in `localStorage`)
* Titles autocompletion using an HTML `datalist`
* Simple share / copy-to-clipboard support
* Static, dependency-free (no build step required)

---

## Demo

> No public demo is published on the repository. To try it locally, see the instructions below.

---

## Getting Started

### Prerequisites

No build tools are required — the app is vanilla HTML/CSS/JS. To run in a browser you only need any static file server or just open the `index.html` file in your browser (note: some browsers restrict certain JS behaviors on `file://` pages, so running via a local HTTP server is recommended).

### Install & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/meruva-lokesh/HAPPY-HUB.git
cd HAPPY-HUB

# 2a. Quick (recommended) - start a simple HTTP server (Python 3)
python -m http.server 8000
# then open: http://localhost:8000/

# 2b. Alternative: open index.html directly in your browser
# (may work, but local HTTP server avoids CORS/file:// issues)

# 2c. If you have Node/npm, you can use `live-server`:
npm i -g live-server
live-server
```

Open `index.html` in your browser (or the server URL) and play.

---

## Project Structure

```
HAPPY-HUB/
├─ modules/               # (movie data modules or extensions — edit here)
├─ app.js                 # core game logic and UI wiring
├─ index.html             # UI and markup
├─ styles.css             # styling
└─ README.md              # <-- add this file
```

> If `modules/` contains movie lists, add new movie objects there. See the code to learn the expected movie object shape.

---

## How to Add / Edit Movies

Movie data is stored in the repository (likely under `modules/` or a `MOVIES` / `MOVIE_SETS` variable). A movie object typically contains properties similar to:

```js
{
  title: "Example Movie",
  year: 2000,
  director: "Director Name",
  cast: ["Actor One", "Actor Two"],
  emoji: "🎬",
  keywords: ["drama", "romance"]
}
```

Steps to add a movie:

1. Open the appropriate file in `modules/` (or wherever the `MOVIES` or `MOVIE_SETS` array is defined).
2. Add an object following the existing format.
3. Save and reload the web page to see the new entries available in the datalist and game pool.

If the code uses language-specific sets (e.g., `MOVIE_SETS['te']`), add the movie to the correct language array.

---

## Configuration & Options

* **Daily Mode**: The app supports a deterministic daily seed (select via the UI toggle). The seed is derived from the date so each day has a predictable movie.
* **Local storage keys**: Stats and preferences are saved in `localStorage`. Clearing storage will reset stats.
* **Similarity thresholds**: The scoring / success thresholds are implemented in `app.js` (e.g., `>=95%` or exact normalized match). Edit those checks to tighten/loosen guessing rules.

---

## Deployment

This is a static site and can be deployed anywhere static files are served. Common quick options:

* **GitHub Pages**: Enable Pages from the repo settings and serve the `main` branch (or `docs/`).
* **Netlify / Vercel**: Connect repository and deploy (no build step necessary).
* **Static host / CDN**: Upload `index.html`, `app.js`, `styles.css`, and `modules/` to any static host.

---

## Contributing

Thanks for considering contributing! A few quick guidelines:

1. Fork the repo.
2. Make your changes on a feature branch.
3. Test locally.
4. Open a pull request describing the change.

Ideas for improvements:

* Add more movie datasets (other languages).
* Add unit tests for similarity logic.
* Improve accessibility (ARIA, keyboard support).
* Add a visual/a11y-friendly theme switch.
* Add a settings panel (tweak hints, thresholds).

---

## Troubleshooting

* **Blank page or JS errors**: Check the browser console — missing `MOVIES` or `MOVIE_SETS` will cause errors. Ensure movie data modules are present.
* **Autocomplete list empty**: Make sure the `modules/` movie list is loaded and that titles are populated by the script.
* **Local file issues**: If opening `index.html` directly yields odd behavior, run a simple HTTP server (see `python -m http.server`).

---

## License & Contact

* **License**: No license file detected in the repository. If you want others to reuse the code, add a `LICENSE` file (e.g., MIT).
* **Contact / Author**: `meruva-lokesh` on GitHub — open an issue or PR, or add contact info to the repo if you want other ways to reach you.

---

## Final Notes
