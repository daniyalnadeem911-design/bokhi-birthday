/* ============================================================
   BOKHI BIRTHDAY CHAOS 2026 — SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. WARNING MODAL
  --------------------------------------------------------- */
  const warningModal = document.getElementById('warningModal');
  const modalYes = document.getElementById('modalYes');
  const modalYesAbs = document.getElementById('modalYesAbs');

  function closeWarningModal() {
    warningModal.classList.add('hidden');
    burstConfetti(140);
    startMusicFromGesture();
  }
  modalYes.addEventListener('click', closeWarningModal);
  modalYesAbs.addEventListener('click', closeWarningModal);

  /* ---------------------------------------------------------
     2. CHAOS BACKGROUND (floating food / balloons / stars)
  --------------------------------------------------------- */
  const chaosLayer = document.getElementById('chaosLayer');
  const chaosEmojis = ['🍔', '🍟', '🧁', '⭐', '🎈', '💖', '🍕', '🍩'];
  const CHAOS_ITEM_COUNT = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < CHAOS_ITEM_COUNT; i++) {
    const el = document.createElement('span');
    el.className = 'chaos-item';
    el.textContent = chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (1.2 + Math.random() * 1.6) + 'rem';
    el.style.opacity = 0.35 + Math.random() * 0.35;
    el.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    const duration = 14 + Math.random() * 16;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = (Math.random() * duration) + 's';
    chaosLayer.appendChild(el);
  }

  /* ---------------------------------------------------------
     3. CONFETTI ENGINE (canvas based)
  --------------------------------------------------------- */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let confettiPieces = [];
  let confettiRunning = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confettiColors = ['#ff5c97', '#7c3aed', '#ffd23f', '#ff8a3d', '#ffffff'];

  function burstConfetti(count = 100) {
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        size: 6 + Math.random() * 8,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: 2 + Math.random() * 4,
        speedX: Math.random() * 3 - 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        life: 0,
        maxLife: 200 + Math.random() * 100
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(animateConfetti);
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.life++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      const fade = Math.max(0, 1 - p.life / p.maxLife);
      ctx.globalAlpha = fade;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    confettiPieces = confettiPieces.filter(p => p.life < p.maxLife && p.y < canvas.height + 40);

    if (confettiPieces.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ---------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.character-section, .stats-section, .roast-section, .wish-section, .achievements-section, .finale-section'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const statsSection = document.querySelector('.stats-section');
  let statsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        if (entry.target === statsSection && !statsAnimated) {
          statsAnimated = true;
          document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = bar.dataset.target + '%';
          });
        }
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------------------------------------------------------
     5. ROAST BUTTONS — random Urdu verdicts
  --------------------------------------------------------- */
  const roastMessages = {
    reality: [
      'Aaj birthday hai isliye bach gai.',
      'khanay kay ilawa khabhi CS ki tiyari karlo',
      'Khana dekho to speed internet se zyada ho jati hai.'
    ],
    food: [
      'apni behno ka hissa bhi khnay wali',
      'har cheez khajanay wali'
    ],
    height: [
      'Error: height is too small to measure.',
      'Detected: Pocket-sized human.'
    ]
  };

  document.querySelectorAll('.btn-roast').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.target;
      const list = roastMessages[key];
      const output = document.getElementById('output-' + key);
      const msg = list[Math.floor(Math.random() * list.length)];

      output.style.opacity = 0;
      setTimeout(() => {
        output.textContent = msg;
        output.style.opacity = 1;
      }, 150);

      burstConfetti(20);
    });
  });

  /* ---------------------------------------------------------
     6. EASTER EGG — click photo 5 times
  --------------------------------------------------------- */
  const adenPhoto = document.getElementById('adenPhoto');
  const secretModal = document.getElementById('secretModal');
  const secretClose = document.getElementById('secretClose');
  let photoClicks = 0;

  adenPhoto.addEventListener('click', () => {
    photoClicks++;
    adenPhoto.style.transform = 'scale(0.96) rotate(' + (Math.random() * 6 - 3) + 'deg)';
    setTimeout(() => { adenPhoto.style.transform = ''; }, 150);

    if (photoClicks >= 5) {
      photoClicks = 0;
      secretModal.classList.remove('hidden');
      burstConfetti(180);
    }
  });
  secretClose.addEventListener('click', () => secretModal.classList.add('hidden'));

  /* ---------------------------------------------------------
     7. FINALE BUTTON
  --------------------------------------------------------- */
  const finaleBtn = document.getElementById('finaleBtn');
  const finaleMessage = document.getElementById('finaleMessage');

  finaleBtn.addEventListener('click', () => {
    finaleMessage.classList.add('show');
    burstConfetti(250);
    setTimeout(() => burstConfetti(150), 350);
    setTimeout(() => burstConfetti(150), 700);
  });

  /* ---------------------------------------------------------
     8. MUSIC — auto-starts the moment the warning modal is
     dismissed (that click is the "user gesture" browsers
     require before they'll allow sound to play). The button
     stays as a manual pause/resume control after that.
     NOTE: only plays if assets/music.mp3 actually exists.
     If the file is missing, the button quietly disables itself
     instead of throwing errors.
  --------------------------------------------------------- */
  const musicToggle = document.getElementById('musicToggle');
  const audio = new Audio('assets/music.mp3');
  audio.loop = true;
  let musicPlaying = false;
  let musicAvailable = true;

  audio.addEventListener('error', () => {
    musicAvailable = false;
    musicToggle.textContent = '🔇 No music file added';
    musicToggle.disabled = true;
    musicToggle.style.opacity = 0.5;
    musicToggle.style.cursor = 'not-allowed';
  });

  function startMusicFromGesture() {
    if (!musicAvailable || musicPlaying) return;
    audio.play()
      .then(() => {
        musicPlaying = true;
        musicToggle.textContent = '🔊 Pause Birthday Chaos Music';
      })
      .catch(() => {
        // Some browsers (mostly Safari/iOS) can still block this even
        // after a click. If so, the button below remains a one-tap
        // manual start — that tap also counts as a valid gesture.
        musicToggle.textContent = '🔈 Tap to Play Birthday Chaos Music';
      });
  }

  musicToggle.addEventListener('click', () => {
    if (!musicAvailable) return;
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      musicToggle.textContent = '🔈 Play Birthday Chaos Music';
    } else {
      startMusicFromGesture();
    }
  });

  /* ---------------------------------------------------------
     9. INITIAL CONFETTI ON LOAD
  --------------------------------------------------------- */
  setTimeout(() => burstConfetti(160), 400);

});
