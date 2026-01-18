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
