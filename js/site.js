// HR Analitic 360 tanıtım sayfası. Yalnızca geliştirme: menü, belirme, plan seçimi, form gönderimi. Her şey JS olmadan da çalışır.
(() => {
  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => [...k.querySelectorAll(s)];

  // Mobil menü
  const menuDugme = $('.menu-dugme'), menu = $('#menu');
  if (menuDugme && menu) {
    const ac = (acik) => { menu.classList.toggle('acik', acik); menuDugme.setAttribute('aria-expanded', String(acik)); menuDugme.textContent = acik ? 'Kapat' : 'Menü'; };
    menuDugme.addEventListener('click', () => ac(!menu.classList.contains('acik')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) ac(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') ac(false); });
  }


  // Kahraman arka planı: fareyi gecikmeli izleyen yumuşak ışık. Hareket azaltma tercihi varsa sabit kalır; dokunmatik cihazda yavaşça kendi kendine gezinir;
  // kahraman alanı görünmüyorsa çalışmaz. Konum CSS değişkenleriyle (--x, --y) yazılır; ışık ve ızgara maskesi bunlardan beslenir.
  const alan = $('.kahraman'), arka = $('.arka');
  if (alan && arka) {
    const azalt = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dokunmatik = window.matchMedia('(hover: none)').matches;
    let w = 0, h = 0, x = 0, y = 0, hx = 0, hy = 0, calisiyor = false, gorunur = true, imlecte = false;
    const t0 = performance.now();
    const olc = () => { const r = alan.getBoundingClientRect(); w = r.width; h = r.height; };
    const dinlenme = () => { hx = w * 0.7; hy = h * 0.34; };
    const yaz = () => { arka.style.setProperty('--x', x.toFixed(1) + 'px'); arka.style.setProperty('--y', y.toFixed(1) + 'px'); };
    const basla = () => { if (!calisiyor) { calisiyor = true; requestAnimationFrame(adim); } };
    function adim(zaman) {
      calisiyor = false;
      if (!gorunur || azalt.matches) return;
      if (dokunmatik && !imlecte) { const k = (zaman - t0) / 1000; hx = w * (0.62 + 0.12 * Math.sin(k * 0.35)); hy = h * (0.34 + 0.1 * Math.sin(k * 0.27 + 1)); }
      x += (hx - x) * 0.07; y += (hy - y) * 0.07;
      yaz();
      if (dokunmatik || Math.abs(hx - x) > 0.4 || Math.abs(hy - y) > 0.4) basla();
    }
    olc(); dinlenme(); x = hx; y = hy; yaz();
    window.addEventListener('resize', () => { olc(); if (!imlecte) { dinlenme(); if (azalt.matches) { x = hx; y = hy; yaz(); } else basla(); } }, { passive: true });
    alan.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = alan.getBoundingClientRect(); imlecte = true; hx = e.clientX - r.left; hy = e.clientY - r.top; basla();
    }, { passive: true });
    alan.addEventListener('pointerleave', () => { imlecte = false; dinlenme(); basla(); });
    if ('IntersectionObserver' in window) new IntersectionObserver((k) => { gorunur = k[0].isIntersecting; if (gorunur) basla(); }).observe(alan);
    azalt.addEventListener('change', () => { if (azalt.matches) { dinlenme(); x = hx; y = hy; yaz(); } else basla(); });
    basla();
  }

  // Başlık satırları: sayfa yüklenince sırayla
  const kahraman = $('.kahraman');
  if (kahraman) requestAnimationFrame(() => requestAnimationFrame(() => kahraman.classList.add('hazir')));

  // Aşağıdaki bölümler görününce belirir (destek yoksa hepsi hemen görünür)
  const belirenler = $$('.belir');
  if ('IntersectionObserver' in window) {
    const g = new IntersectionObserver((kayitlar) => { for (const k of kayitlar) if (k.isIntersecting) { k.target.classList.add('icerde'); g.unobserve(k.target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    belirenler.forEach((b) => g.observe(b));
  } else belirenler.forEach((b) => b.classList.add('icerde'));

  // Fiyatlandırma düğmeleri formdaki planı seçer
  const planAlani = $('#plan');
  $$('[data-plan]').forEach((a) => a.addEventListener('click', () => { if (planAlani) planAlani.value = a.dataset.plan; }));

  // Form
  const form = $('#form'), durum = $('#form-durum'), gonder = $('#gonder');
  if (!form) return;
  const hataYaz = (id, metin) => { const e = $(`#${id}-hata`); if (e) e.textContent = metin; const alan = $(`#${id}`); if (alan) alan.setAttribute('aria-invalid', metin ? 'true' : 'false'); };
  const durumYaz = (tur, metin) => { durum.dataset.tur = tur; durum.textContent = metin; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ad = $('#ad').value.trim(), sirket = $('#sirket').value.trim(), eposta = $('#eposta').value.trim(), onay = $('#onay').checked;
    const epostaGecerli = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(eposta);
    hataYaz('ad', ad ? '' : 'Ad ve soyad girilmelidir.');
    hataYaz('sirket', sirket ? '' : 'Kurum adı girilmelidir.');
    hataYaz('eposta', epostaGecerli ? '' : 'Geçerli bir e-posta adresi girilmelidir.');
    hataYaz('onay', onay ? '' : 'Devam edebilmek için onay verilmesi gerekmektedir.');
    durumYaz('', '');
    if (!ad || !sirket || !epostaGecerli || !onay) { const ilk = $('[aria-invalid="true"]', form); if (ilk) ilk.focus(); return; }
    if ($('[name="_honey"]', form).value) { durumYaz('basari', 'Talebiniz alınmıştır.'); form.reset(); return; }   // bot: sessizce yut
    gonder.disabled = true; durumYaz('', 'Gönderiliyor…');
    try {
      const veri = {};
      for (const [k, v] of new FormData(form).entries()) if (typeof v === 'string' && k !== '_honey') veri[k] = v;
      await new Promise((r) => setTimeout(r, 600));   // gösterim: hiçbir yere gönderilmez
      durumYaz('basari', 'Talebiniz alınmıştır. En kısa sürede tarafınıza dönüş yapılacaktır.');
      form.reset();
    } catch {
      durum.dataset.tur = 'hata'; durum.textContent = 'Talebiniz iletilemedi. Lütfen daha sonra tekrar deneyiniz veya ';
      const a = document.createElement('a'); a.href = '#'; a.textContent = 'iletisim adresimize'; durum.append(a, ' adresine yazınız.');
    } finally { gonder.disabled = false; }
  });
})();
