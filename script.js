/* Pickit — scripts (no tracking, no dependencies) */
(function () {
  // Footer year
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  // Quote form -> build mailto draft
  const form = document.getElementById('quoteForm');
  if (form) {
    const to = "pickit.korea.official@gmail.com";

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const fd = new FormData(form);
      const product = fd.get('product') || '';
      const qty = fd.get('quantity') || '';
      const finish = fd.get('finish') || '';
      const deadline = fd.get('deadline') || '';
      const name = fd.get('name') || '';
      const fromEmail = fd.get('email') || '';
      const phone = fd.get('phone') || '';
      const message = fd.get('message') || '';

      const subject = `[Pickit Quote] ${product} / ${qty}`;
      const bodyLines = [
        'Pickit Quote Request',
        '-------------------',
        `Product: ${product}`,
        `Quantity: ${qty}`,
        `Finish: ${finish}`,
        `Deadline: ${deadline}`,
        '',
        `Name/Company: ${name}`,
        `Email: ${fromEmail}`,
        `Phone: ${phone}`,
        '',
        'Notes:',
        message,
        '',
        'Please attach files: AI / SVG / PDF / PNG',
      ];

      const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      window.location.href = mailto;
    });
  }

  // Home card mouse-follow
  const card = document.getElementById('heroCard');
  if (card) {
    const stage = card.parentElement;
    let raf = null;

    function setFromPoint(pt) {
      const rect = stage.getBoundingClientRect();
      const x = (pt.clientX - rect.left) / rect.width;
      const y = (pt.clientY - rect.top) / rect.height;

      const mx = Math.max(0, Math.min(1, x));
      const my = Math.max(0, Math.min(1, y));

      const rotY = (mx - 0.5) * 14;
      const rotX = (0.5 - my) * 10;

      card.style.setProperty('--mx', mx.toFixed(4));
      card.style.setProperty('--my', my.toFixed(4));
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }

    stage.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setFromPoint(e));
    });

    stage.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.setProperty('--mx', '0.5');
      card.style.setProperty('--my', '0.5');
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    stage.addEventListener('touchmove', (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setFromPoint(t));
    }, { passive: true });

    stage.addEventListener('touchend', () => {
      card.style.setProperty('--mx', '0.5');
      card.style.setProperty('--my', '0.5');
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
})();
