\
/* Pickit v1 scripts — no tracking, no dependencies */
(function () {
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  // Quote form -> build a mailto draft (client-side, no server).
  const form = document.getElementById('quoteForm');
  if (!form) return;

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
      'Pickit 견적 요청 / Quote Request',
      '--------------------------------',
      `제품 / Product: ${product}`,
      `수량 / Quantity: ${qty}`,
      `마감 / Finish: ${finish}`,
      `희망 납기 / Deadline: ${deadline}`,
      '',
      `이름/회사 / Name/Company: ${name}`,
      `이메일 / Email: ${fromEmail}`,
      `연락처 / Phone: ${phone}`,
      '',
      '요청사항 / Notes:',
      message,
      '',
      '파일 첨부는 이메일로 보내주세요: AI / SVG / PDF / PNG',
      'Please attach files via email: AI / SVG / PDF / PNG',
    ];

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
  });
})();
/* ===== Home intro: mouse-follow metal card + show nav on scroll ===== */
(function () {
  const card = document.getElementById('heroCard');
  if (!card) return;

  const body = document.body;

  // 홈 첫 화면에서는 네비 숨기고, 스크롤하면 나타나게
  const syncNav = () => {
    if (!body.classList.contains('is-home')) return;
    if (window.scrollY > 8) body.classList.add('nav-visible');
    else body.classList.remove('nav-visible');
  };
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();

  // 마우스 따라 카드 기울기 + 하이라이트/모서리 이동
  const stage = card.parentElement;
  let raf = null;

  function setFromEvent(e) {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0~1
    const y = (e.clientY - rect.top) / rect.height;   // 0~1

    const mx = Math.max(0, Math.min(1, x));
    const my = Math.max(0, Math.min(1, y));

    // 회전 각도(대기업 느낌: 과하지 않게)
    const rotY = (mx - 0.5) * 14; // 좌우
    const rotX = (0.5 - my) * 10; // 상하

    card.style.setProperty('--mx', mx.toFixed(4));
    card.style.setProperty('--my', my.toFixed(4));
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  }

  stage.addEventListener('mousemove', (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setFromEvent(e));
  });

  stage.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    card.style.setProperty('--mx', '0.5');
    card.style.setProperty('--my', '0.5');
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  // 모바일/터치 대응(가벼운 반응)
  stage.addEventListener('touchmove', (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setFromEvent(t));
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    card.style.setProperty('--mx', '0.5');
    card.style.setProperty('--my', '0.5');
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
})();

