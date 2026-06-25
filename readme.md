# Bokhi Birthday Chaos 2026 🎂

A single-page, frontend-only birthday site for Aden Basra. Pure HTML/CSS/JS, no build step, no backend.

## File structure
```
bokhi-birthday/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── aden.jpg      <-- you need to add this yourself
└── README.md
```

## Before you deploy — 2 things you MUST do

1. **Add the photo.** Drop a real photo named exactly `aden.jpg` into the `assets/` folder.
   If you don't, the poster frame shows a placeholder ("Drop aden.jpg into /assets") instead of breaking.

2. **Music is optional and NOT included.** There is no `music.mp3` or `confetti.mp3` in this
   project — I can't generate audio files. The "Play Birthday Chaos Music" button checks if
   `assets/music.mp3` exists; if you don't add one, it auto-disables itself instead of throwing
   a broken-audio error. If you want music, drop any royalty-free mp3 into `assets/music.mp3`.
   The confetti is done entirely in canvas/JS — it does not need an mp3 file at all.

## Run it locally
No server, no install needed for a quick look — just double-click `index.html` and it opens in
your browser. (Audio autoplay restrictions mean the music button must be clicked manually anyway,
so opening the file directly is fine for testing.)

If you want it served properly (recommended before pushing to GitHub, since some browsers restrict
local file access for things like `fetch`):
- **VS Code**: install the "Live Server" extension → right-click `index.html` → "Open with Live Server".
- **PyCharm**: open the folder as a project → right-click `index.html` in the project tree → "Open in Browser".
  (PyCharm is a Python IDE — it works fine as a plain file editor here, but it's overkill for a static
  site. VS Code or even a plain text editor does the same job with less overhead.)

## Deploy to Vercel (step by step)

1. **Create a GitHub repo**
   - Go to github.com → New repository → name it `bokhi-birthday` → Create.
   - Don't initialize with a README (you already have one).

2. **Push your files**
   ```bash
   cd bokhi-birthday
   git init
   git add .
   git commit -m "Initial commit: Bokhi Birthday Chaos 2026"
   git commit -m "Initial commit: Bokhi Birthday Chaos 2026"
   git remote add origin https://github.com/daniyalnadeem911-design/bokhi-birthday.git
   git push -u origin main
   ```

3. **Connect to Vercel**
   - Go to vercel.com → log in with GitHub.
   - Click "Add New" → "Project".
   - Select your `bokhi-birthday` repo → Import.

4. **Configure (there's barely anything to configure)**
   - Framework Preset: choose "Other" (it's a static site, not React/Next/etc).
   - Build Command: leave blank.
   - Output Directory: leave as root (`.`) — there is no build step, the files are already final.
   - Click Deploy.

5. **Get your link**
   - Vercel gives you a URL like `bokhi-birthday.vercel.app` within ~30 seconds.
   - Open it, confirm the photo loads and the buttons work.

6. **Share it**
   - Send Aden the Vercel link. That's it — no login, no install needed on her end.

## Editing later
- **Colors**: all defined as CSS variables at the top of `style.css` (`--pink`, `--purple`, etc.) — change them once, the whole site updates.
- **Roast messages**: edit the `roastMessages` object near the top of `script.js`.
- **Ticker text**: edit the two `<span>` elements inside `.ticker` in `index.html` (both spans must stay identical — that's what makes the infinite scroll loop seamlessly).
- **Wish text**: edit the `.wish-section` paragraphs directly in `index.html`.