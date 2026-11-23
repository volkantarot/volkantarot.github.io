/* Volkan Tarot — profesyonel hareket katmanı (fx). Mevcut siteyi bozmadan üstüne eklenir. */
(function(){
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const EASE = "cubic-bezier(.2,.8,.2,1)";
  const deck = $("#deck"), slots = $("#slots"), reading = $("#reading");
  if (!deck) return;

  /* 1) Deste: hafif eğik, üst üste binen serilmiş kartlar */
  function layoutDeck(){
    const cards = $$("#deck .dcard");
    if (!cards.length) return;
    cards.forEach((c, i) => {
      if (!c.dataset.fx){ c.dataset.fx = "1"; c.style.setProperty("--rot", (((i * 37) % 11) - 5) * 0.6 + "deg"); }
    });
    const h = cards[0].getBoundingClientRect().height;
    if (h > 0){ deck.style.setProperty("--ov", Math.round(h * 0.52) + "px"); deck.classList.add("fx-stack"); }
  }
  new MutationObserver(layoutDeck).observe(deck, { childList: true });
  addEventListener("resize", () => { deck.classList.remove("fx-stack"); deck.style.removeProperty("--ov"); requestAnimationFrame(layoutDeck); });
  layoutDeck();

  /* 2) Seçilen kart desteden çıkıp yerine uçar */
  function fly(card){
    const filled = $$("#slots .slot.filled");
    const frame = filled.length && filled[filled.length - 1].querySelector(".frame");
    if (!frame) return;
    const flip = frame.querySelector(".flip");
    const a = card.getBoundingClientRect(), b = frame.getBoundingClientRect();
    if (RM || !a.width || !b.width) return;
    if (flip) flip.style.opacity = "0";
    const g = card.cloneNode(false);
    g.removeAttribute("aria-label"); g.className = "dcard back"; g.dataset.fx = "";
    Object.assign(g.style, { position:"fixed", left:a.left+"px", top:a.top+"px", width:a.width+"px", height:a.height+"px",
      margin:"0", zIndex:"60", pointerEvents:"none", animation:"none", transformOrigin:"top left", opacity:"1", rotate:"0deg",
      boxShadow:"0 18px 40px rgba(0,0,0,.5),0 0 24px rgba(232,189,90,.45)" });
    document.body.appendChild(g);
    const dx = b.left - a.left, dy = b.top - a.top, sx = b.width / a.width, sy = b.height / a.height;
    const anim = g.animate([
      { transform:"translate(0,0) scale(1)" },
      { transform:`translate(${dx*0.5}px,${dy*0.5 - 40}px) scale(${(sx+1)/2*1.08},${(sy+1)/2*1.08}) rotate(-4deg)`, offset:.55 },
      { transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})` }
    ], { duration: 620, easing: EASE, fill: "forwards" });
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      if (flip){ flip.style.transition = "opacity .2s"; flip.style.opacity = ""; setTimeout(() => { flip.style.transition = ""; }, 260); }
      g.style.transition = "opacity .18s"; g.style.opacity = "0"; setTimeout(() => g.remove(), 220);
    };
    anim.onfinish = finish;
    setTimeout(finish, 700); /* güvenlik: animasyon olayı gelmese de kart mutlaka yerine oturur */
  }
  new MutationObserver(ms => {
    ms.forEach(m => { const t = m.target;
      if (t.classList && t.classList.contains("dcard") && t.classList.contains("taken") && !(m.oldValue || "").includes("taken")) fly(t); });
  }).observe(deck, { subtree: true, attributes: true, attributeFilter: ["class"], attributeOldValue: true });

  /* 3) Kart açılınca altın parlama */
  if (slots) new MutationObserver(ms => {
    ms.forEach(m => { const t = m.target;
      if (t.classList && t.classList.contains("flip") && t.classList.contains("open") && !(m.oldValue || "").includes("open")){
        const fr = t.closest(".frame"); if (fr){ fr.classList.remove("fx-glow"); void fr.offsetWidth; fr.classList.add("fx-glow"); } } });
  }).observe(slots, { subtree: true, attributes: true, attributeFilter: ["class"], attributeOldValue: true });

  /* 4) Yorum kartları sırayla belirir, sonra WhatsApp butonu nabız atar */
  if (reading) new MutationObserver(() => {
    const kids = [...reading.children];
    const wa = $("#waBig"); if (wa) wa.classList.remove("fx-pulse");
    if (!RM) kids.forEach((k, i) => k.animate(
      [{ opacity:0, transform:"translateY(22px)" }, { opacity:1, transform:"none" }],
      { duration: 650, delay: 150 + i * 160, easing: EASE, fill: "backwards" }));
    if (wa) setTimeout(() => wa.classList.add("fx-pulse"), RM ? 0 : 400 + kids.length * 160);
  }).observe(reading, { childList: true });

  /* 5) Başlıkta altın ışık */
  const h1 = $(".hero h1"); if (h1 && !RM) h1.classList.add("fx-shine");

  /* 6) Aşağıdaki bölümler kaydırınca yumuşakça belirir */
  if (!RM && "IntersectionObserver" in window){
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add("fx-in"); e.target.classList.remove("fx-hide"); io.unobserve(e.target); }
    }), { threshold: 0.06 });
    $$("main > section, main > .panel, .panel").forEach(el => {
      if (el.id === "paid" || el.closest("#paid")) return;
      const r = el.getBoundingClientRect();
      if (r.top > innerHeight * 0.92){ el.classList.add("fx-hide"); io.observe(el); }
    });
  }
})();
