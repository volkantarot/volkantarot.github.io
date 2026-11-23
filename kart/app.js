/* ---------- deste ---------- */
const RANKS_TR=RANKS.tr, RANKS_EN=RANKS.en;
const DECK=[];
M.forEach((c,i)=>DECK.push({img:`cards/m${String(i).padStart(2,"0")}.jpg`,g:"m",n:i,
  tr:{name:c[0],up:c[1],rv:c[2],lesson:c[3]},en:{name:c[4],up:c[5],rv:c[6],lesson:c[7]},
  ar:{name:M_AR[i][0],up:M_AR[i][1],rv:M_AR[i][2],lesson:M_AR[i][3]}}));
SUITS.forEach(([k,trL,enL,arr])=>arr.forEach((c,i)=>{
  const arName=i===0?`آس ${SUIT_AR[k]}`:i>=10?`${RANK_AR[i]} ${SUIT_AR[k]}`:`${RANK_AR[i]} من ${SUIT_AR[k]}`;
  DECK.push({img:`cards/${k}${String(i+1).padStart(2,"0")}.jpg`,g:k,n:i,
    tr:{name:`${trL} ${RANKS_TR[i]}`,up:c[0],rv:c[1]},en:{name:`${RANKS_EN[i]} ${enL}`,up:c[2],rv:c[3]},
    ar:{name:arName,up:S_AR[k][i][0],rv:S_AR[k][i][1]}});
}));
const NEG=new Set(["m15","m16","m18","w4","w9","c4","c7","s2","s4","s6","s7","s8","s9","p4"]);
const NEU=new Set(["m12","m13","s1"]);
const POSC=["var(--rose)","var(--saffron)","var(--emerald)"];

/* ---------- durum ---------- */
let lang="tr",topic="love",mode="three",picks=[],order=[],shown=null,hostState="idle",cdTimer=null,src="";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const deckEl=$("#deck"),revealBtn=$("#reveal");
const U=()=>UI[lang], L=()=>T[lang];
const need=()=>mode==="three"?3:1;
function esc(x){return String(x).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]))}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function load(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
function lc(x){return lang==="tr"?x.toLocaleLowerCase("tr"):lang==="en"?x.toLowerCase():x}
function kw(c,rev){const C=c[lang];return lc((rev?C.rv:C.up).split(/[,.;:،؛]/)[0].trim())}
function wa(text){return "https://wa.me/905350416778?text="+encodeURIComponent(text)}
function cardName(p){const c=DECK[p.ci];return c[lang].name+(p.rev?` (${U().revWord})`:"")}

/* ---------- kaynak etiketi ---------- */
(function(){const h=(location.hash||"").slice(1).toLowerCase();
  if(["ig","tt","wa","yt","fb","x"].includes(h)){src=h;try{sessionStorage.setItem("vt_src",h)}catch(e){}}
  else{try{src=sessionStorage.getItem("vt_src")||""}catch(e){}}})();

/* ---------- ses ---------- */
const Sound={ctx:null,on:false,amb:null,
  init(){if(!this.ctx){try{this.ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}return this.ctx},
  flip(){if(!this.on||!this.init())return;const c=this.ctx,t=c.currentTime,len=.12,b=c.createBuffer(1,c.sampleRate*len,c.sampleRate),d=b.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
    const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type="bandpass";f.frequency.value=2400;f.Q.value=.8;
    const g=c.createGain();g.gain.value=.5;s.connect(f).connect(g).connect(c.destination);s.start(t)},
  chime(){if(!this.on||!this.init())return;const c=this.ctx,t=c.currentTime;[659.3,880,1318.5,1760].forEach((fr,i)=>{
    const o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=fr;
    g.gain.setValueAtTime(0,t+i*.12);g.gain.linearRampToValueAtTime(.12,t+i*.12+.02);g.gain.exponentialRampToValueAtTime(.0001,t+i*.12+1.6);
    o.connect(g).connect(c.destination);o.start(t+i*.12);o.stop(t+i*.12+1.7)})},
  ambient(start){if(!this.init())return;const c=this.ctx;
    if(start&&!this.amb){const g=c.createGain();g.gain.value=0;g.gain.linearRampToValueAtTime(.035,c.currentTime+2);
      const lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=700;
      const os=[110,164.8,220.5].map((f,i)=>{const o=c.createOscillator();o.type=i===2?"sine":"triangle";o.frequency.value=f;o.detune.value=(i-1)*6;o.connect(lp);o.start();return o});
      const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.08;lg.gain.value=250;lfo.connect(lg).connect(lp.frequency);lfo.start();
      lp.connect(g).connect(c.destination);this.amb={g,os:[...os,lfo]};}
    if(!start&&this.amb){const a=this.amb;a.g.gain.linearRampToValueAtTime(0,c.currentTime+.8);setTimeout(()=>a.os.forEach(o=>{try{o.stop()}catch(e){}}),900);this.amb=null}}};
$("#soundBtn").addEventListener("click",()=>{Sound.on=!Sound.on;Sound.init();if(Sound.ctx&&Sound.ctx.state==="suspended")Sound.ctx.resume();
  Sound.ambient(Sound.on);$("#soundBtn").setAttribute("aria-pressed",String(Sound.on));$("#soundBtn").setAttribute("aria-label",Sound.on?U().soundOff:U().soundOn);store("vt_sound",Sound.on)});

/* ---------- tarotçu ---------- */
function bubbleKey(){if(mode==="yn"&&(hostState==="idle"||hostState==="ready"))return ["yn",hostState];
  return ["say",hostState==="pick"?(picks.length===1?"p1":"p2"):hostState]}
function setHost(st){hostState=st;$("#host").dataset.state=st;const [grp,k]=bubbleKey();
  const b=$("#bubble");b.textContent=grp==="yn"?U().sayYN[k]:U().say[k];b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");
  if(st==="reveal")sparkBurst()}
function sparkBurst(){const cv=$("#sparks");if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const r=cv.getBoundingClientRect(),d=devicePixelRatio;cv.width=r.width*d;cv.height=r.height*d;const ctx=cv.getContext("2d");
  const ox=cv.width*.24,oy=cv.height*.3;const P=Array.from({length:80},()=>{const a=Math.random()*6.28,v=(1+Math.random()*4)*d;return{x:ox,y:oy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.5*d,l:1,r:(1+Math.random()*2.2)*d,c:Math.random()<.6?"#ffd98a":"#ef5a7a"}});
  (function f(){ctx.clearRect(0,0,cv.width,cv.height);let alive=0;P.forEach(p=>{if(p.l<=0)return;alive++;p.x+=p.vx;p.y+=p.vy;p.vy+=.06*d;p.l-=.012;ctx.globalAlpha=Math.max(p.l,0);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.28);ctx.fill()});if(alive)requestAnimationFrame(f);else ctx.clearRect(0,0,cv.width,cv.height)})()}

/* ---------- deste ve yuvalar ---------- */
function shuffleOrder(){order=[...DECK.keys()];for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}}
function renderDeck(animate){
  deckEl.innerHTML="";
  order.forEach((ci,k)=>{const b=document.createElement("button");b.type="button";b.className="dcard back";
    b.style.animationDelay=(animate?k*10:0)+"ms";if(!animate)b.style.animation="none";
    b.setAttribute("aria-label",U().closed(k+1));b.addEventListener("click",()=>pick(ci,b));deckEl.appendChild(b)});
}
function doShuffle(){if(locked())return;picks=[];renderSlots();
  deckEl.classList.add("shuffling");Sound.flip();setTimeout(()=>Sound.flip(),180);setTimeout(()=>Sound.flip(),360);
  setTimeout(()=>{deckEl.classList.remove("shuffling");shuffleOrder();renderDeck(true);setHost("idle")},520)}
function locked(){return deckEl.classList.contains("locked")}
function pick(ci,el){if(picks.length>=need()||locked())return;
  picks.push({ci,rev:Math.random()<.25});el.classList.add("taken");Sound.flip();renderSlots();
  setHost(picks.length<need()?"pick":"ready")}
function slotLabels(){return mode==="three"?[U().pos0,U().pos1,U().pos2]:[U().slotYN]}
function renderSlots(){
  const box=$("#slots");box.className="slots"+(mode==="yn"?" one":"");
  const labels=slotLabels();
  if(box.children.length!==labels.length){box.innerHTML=labels.map(()=>`<div class="slot"><div class="frame">✦</div><span class="label"></span></div>`).join("")}
  $$("#slots .slot").forEach((s,i)=>{s.querySelector(".label").textContent=labels[i];const f=s.querySelector(".frame"),p=picks[i];
    if(p){s.classList.add("filled");if(!f.querySelector(".flip")){const c=DECK[p.ci];
      f.innerHTML=`<div class="flip"><div class="face back"></div><div class="face front ${p.rev?"rev":""}"><img alt="" src="${c.img}"></div></div>`}
      const im=f.querySelector("img");if(im)im.alt=cardName(p)}
    else{s.classList.remove("filled");f.innerHTML="✦"}});
  $("#count").textContent=picks.length;$("#need").textContent=need();
  revealBtn.disabled=picks.length<need()||locked();
  revealBtn.textContent=picks.length<need()?U().more(need()-picks.length):(mode==="yn"?U().revealYN:U().reveal);
}
function setMode(m){mode=m;$$(".mode[data-mode]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.mode===m)));
  deckEl.classList.remove("locked");revealBtn.classList.remove("hidden");$("#shuffle").classList.remove("hidden");$("#limitBox").classList.add("hidden");
  picks=[];$("#slots").innerHTML="";shuffleOrder();renderDeck(true);renderSlots();updateModeText();setHost("idle");stopCountdown();applyLimit()}
function updateModeText(){$("#stepTitle").textContent=mode==="three"?U().step2:U().modeYN;$("#deckNote").textContent=mode==="three"?U().deckNote:U().deckNoteYN}

/* ---------- açılım ---------- */
function reveal(){
  deckEl.classList.add("locked");revealBtn.disabled=true;setHost("reveal");Sound.chime();
  $("#host").scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>setHost("done"),2400);
  $$("#slots .flip").forEach((f,i)=>setTimeout(()=>{f.classList.add("open");Sound.flip()},i*450));
  const r={mode,topic,q:$("#question").value.trim(),picks:[...picks],code:String(1000+Math.floor(Math.random()*9000)),day:todayKey(),ts:Date.now()};
  store("vt_lim_"+mode,r);
  const h=load("vt_hist")||[];h.unshift(r);store("vt_hist",h.slice(0,12));
  setTimeout(()=>{showReading(r,true);renderHistory();startCountdown()},2900);
}
function ynAnswer(p){const c=DECK[p.ci],k=c.g+c.n;
  if(NEU.has(k))return "maybe";
  if(NEG.has(k))return p.rev?"maybe":"no";
  return p.rev?"no":"yes"}
function cardStory(c,p,i,t){const Lx=L(),C=c[lang];
  const a=c.g==="m"?Lx.major(Lx.POS[i],C.name,C.lesson):Lx.minor(Lx.POS[i],C.name,Lx.ELEM[c.g],Lx.NUM[c.n]);
  const m=p.rev?C.rv:C.up;
  let b=`${Lx.LEAD[i]}: ${lc(m.charAt(0))+m.slice(1)} ${Lx.ADV[c.g][t]}`;if(p.rev)b+=" "+Lx.REV;
  return `<p>${a}</p><p>${b}</p>`}
function summary(t,ps){const Lx=L(),cnt={};ps.forEach(p=>{const g=DECK[p.ci].g;cnt[g]=(cnt[g]||0)+1});
  const dom=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0],revs=ps.filter(p=>p.rev).length,f=ps[2],fn=DECK[f.ci][lang].name;
  return [cnt[dom]>=2?Lx.domS(Lx.ELEM[dom],Lx.ELEM_MEAN[dom]):Lx.mixS,revs===0?Lx.rev0:revs===1?Lx.rev1:Lx.revN,f.rev?Lx.futRev(fn):Lx.futUp(fn,Lx.TOPIC_LINE[t])].join(" ")}
function rcard(p,i,t,label,color){const c=DECK[p.ci],C=c[lang];
  return `<div class="rcard" style="--c:${color}"><img src="${c.img}" alt="" class="${p.rev?"rev":""}"><div><div class="pos">${label}</div><h3>${C.name}<span class="pill ${p.rev?"rv":"up"}">${p.rev?U().rv:U().up}</span></h3><p><strong>${p.rev?C.rv:C.up}</strong></p>${cardStory(c,p,i,t)}</div></div>`}
function showReading(r,scroll){
  shown=r;const u=U(),Lx=L(),t=r.topic,box=$("#reading");let html="";let ans="";
  $("#codeVal").textContent="#"+r.code;
  if(r.mode==="yn"){const p=r.picks[0],a=ynAnswer(p);ans=u[a];
    html+=`<div class="yn ${a}"><span>${u.ynH}</span><strong>${u[a]}</strong><p>${u.ynText[a]}</p></div>`;
    html+=rcard(p,1,t,u.slotYN,a==="yes"?"var(--emerald)":a==="no"?"var(--rose)":"var(--saffron)");
    html+=`<div class="summary"><h3>${u.adviceH}</h3><p>${Lx.BASE[DECK[p.ci].g]}${p.rev?Lx.advRev:""}</p></div>`;
  }else{
    html+=`<div class="summary"><h3>${u.introH}</h3><p>${r.q?u.introQ(esc(r.q)):u.introT(u["t_"+t])}</p></div>`;
    r.picks.forEach((p,i)=>{html+=rcard(p,i,t,u["pos"+i],POSC[i])});
    const nm=c=>(lang==="en"&&c.g!=="m"?"the ":"")+c[lang].name;
    const [A,B,C]=r.picks.map(p=>({c:DECK[p.ci],r:p.rev})),f=r.picks[2];
    html+=`<div class="summary"><h3>${u.bridgeH}</h3><p>${Lx.bridge(nm(A.c),kw(A.c,A.r),nm(B.c),kw(B.c,B.r),nm(C.c),kw(C.c,C.r))}</p><p>${summary(t,r.picks)}</p><h3 style="margin-top:12px">${u.adviceH}</h3><p>${Lx.BASE[DECK[f.ci].g]}${f.rev?Lx.advRev:""}</p></div>`;
  }
  box.innerHTML=html;
  const cards=r.mode==="yn"?cardName(r.picks[0]):r.picks.map((p,i)=>`${u["pos"+i]}: ${cardName(p)}`).join(", ");
  const url=wa(u.waFull({src:src?u.src[src]:"",code:r.code,mode:u.modeName[r.mode],topic:u["t_"+t],q:r.q,cards,ans}));
  $("#waBig").href=url;$("#waTop").href=url;
  $("#friendBtn").href="https://wa.me/?text="+encodeURIComponent(u.friendMsg);
  $("#result").classList.remove("hidden");
  if(scroll)$("#result").scrollIntoView({behavior:"smooth",block:"start"});
}

/* ---------- günlük sınır ve geri sayım ---------- */
function applyLimit(){const last=load("vt_lim_"+mode);
  if(last&&last.day===todayKey()){deckEl.classList.add("locked");picks=last.picks;topic=last.topic;renderSlots();
    $$(".chip[data-topic]").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.topic===topic)));
    $$("#slots .flip").forEach(f=>f.classList.add("open"));$$(".dcard").forEach(d=>d.classList.add("taken"));
    revealBtn.classList.add("hidden");$("#shuffle").classList.add("hidden");$("#limitBox").classList.remove("hidden");
    showReading(last,false);setHost("done");startCountdown();return true}
  return false}
function startCountdown(){stopCountdown();const tick=()=>{const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);let s=Math.max(0,Math.floor((m-n)/1000));
  if(s===0){stopCountdown();setMode(mode);return}
  const h=String(Math.floor(s/3600)).padStart(2,"0"),mi=String(Math.floor(s%3600/60)).padStart(2,"0"),se=String(s%60).padStart(2,"0");$("#cd").textContent=`${h}:${mi}:${se}`};
  tick();cdTimer=setInterval(tick,1000)}
function stopCountdown(){if(cdTimer){clearInterval(cdTimer);cdTimer=null}}

/* ---------- paylaşım görseli ---------- */
function loadImg(s){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=s})}
function wrapText(ctx,text,x,y,maxW,lh){const words=text.split(" ");let line="",yy=y;
  for(const w of words){const test=line?line+" "+w:w;if(ctx.measureText(test).width>maxW&&line){ctx.fillText(line,x,yy);line=w;yy+=lh}else line=test}
  if(line)ctx.fillText(line,x,yy);return yy}
async function makeShare(){
  if(!shown)return;const r=shown,u=U(),W=1080,H=1920,cv=document.createElement("canvas");cv.width=W;cv.height=H;const ctx=cv.getContext("2d");
  try{await document.fonts.ready}catch(e){}
  const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,"#1b1440");g.addColorStop(.55,"#0d0a1a");g.addColorStop(1,"#3d1534");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const rg=ctx.createRadialGradient(W/2,880,50,W/2,880,700);rg.addColorStop(0,"rgba(244,178,62,.28)");rg.addColorStop(1,"rgba(244,178,62,0)");ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
  for(let i=0;i<160;i++){ctx.globalAlpha=.3+Math.random()*.7;ctx.fillStyle=Math.random()<.2?"#f4b23e":"#fbf1dc";ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*2.4+.4,0,6.28);ctx.fill()}
  ctx.globalAlpha=1;ctx.textAlign="center";ctx.direction=lang==="ar"?"rtl":"ltr";
  const disp=lang==="ar"?"Amiri, serif":"Cinzel, serif", body=lang==="ar"?"Cairo, sans-serif":"Figtree, sans-serif", ser=lang==="ar"?"Amiri, serif":"Lora, serif";
  ctx.fillStyle="#f4b23e";ctx.font=`700 88px Cinzel, serif`;ctx.fillText("Volkan Tarot",W/2,190);
  ctx.fillStyle="#fbf1dc";ctx.font=`italic 600 66px ${ser}`;ctx.fillText(u.shareTitle,W/2,300);
  ctx.fillStyle="#b9adc9";ctx.font=`500 40px ${body}`;ctx.fillText(`${u.modeName[r.mode]} · ${u["t_"+r.topic]}`,W/2,380);
  const imgs=await Promise.all(r.picks.map(p=>loadImg(DECK[p.ci].img)));
  const drawCard=(im,x,y,w,rev)=>{const h=w*im.height/im.width;ctx.save();ctx.shadowColor="rgba(244,178,62,.55)";ctx.shadowBlur=40;
    ctx.translate(x+w/2,y+h/2);if(rev)ctx.rotate(Math.PI);ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore();
    ctx.strokeStyle="#f4b23e";ctx.lineWidth=4;ctx.strokeRect(x,y,w,h);return h};
  if(r.mode==="three"){const w=320,gap=30,x0=(W-3*w-2*gap)/2,y0=560;let hh=0;
    r.picks.forEach((p,i)=>{const x=x0+i*(w+gap);const h=drawCard(imgs[i],x,y0,w,p.rev);hh=h;
      ctx.fillStyle=["#ef5a7a","#f4b23e","#2fc39a"][i];ctx.font=`700 34px ${body}`;ctx.fillText(u["pos"+i].toLocaleUpperCase(lang==="tr"?"tr":undefined),x+w/2,y0+h+70);
      ctx.fillStyle="#fbf1dc";ctx.font=`600 44px ${ser}`;wrapText(ctx,DECK[p.ci][lang].name+(p.rev?` (${u.revWord})`:""),x+w/2,y0+h+128,w+10,50)});
    ctx.fillStyle="#eadfca";ctx.font=`italic 500 54px ${ser}`;
    const [A,B,C]=r.picks.map(p=>({c:DECK[p.ci],r:p.rev}));
    wrapText(ctx,`“${kw(A.c,A.r)} → ${kw(B.c,B.r)} → ${kw(C.c,C.r)}”`,W/2,y0+hh+320,940,68);
  }else{const p=r.picks[0],w=540,x=(W-w)/2,y0=460;const h=drawCard(imgs[0],x,y0,w,p.rev);const a=ynAnswer(p);
    ctx.fillStyle=a==="yes"?"#2fc39a":a==="no"?"#ef5a7a":"#f4b23e";ctx.font=`700 120px ${disp}`;ctx.fillText(u[a],W/2,y0+h+150);
    ctx.fillStyle="#fbf1dc";ctx.font=`600 46px ${ser}`;ctx.fillText(DECK[p.ci][lang].name+(p.rev?` (${u.revWord})`:""),W/2,y0+h+230)}
  ctx.fillStyle="#f4b23e";ctx.font=`600 44px ${body}`;ctx.fillText(u.shareFoot,W/2,H-220);
  ctx.fillStyle="#2fc39a";ctx.font=`700 46px ${body}`;ctx.direction="ltr";ctx.fillText("WhatsApp  0535 041 67 78",W/2,H-140);
  $("#shareImg").src=cv.toDataURL("image/jpeg",.9);$("#shareImg").alt=u.shareTitle;
  $("#shareModal").classList.remove("hidden");$("#closeShare").focus();
}
$("#shareBtn").addEventListener("click",()=>{makeShare().catch(()=>{})});
$("#closeShare").addEventListener("click",()=>$("#shareModal").classList.add("hidden"));
$("#shareModal").addEventListener("click",e=>{if(e.target.id==="shareModal")$("#shareModal").classList.add("hidden")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#shareModal").classList.add("hidden")});
$("#copyLink").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(LINK);$("#copyLink").textContent=U().copied;setTimeout(()=>$("#copyLink").textContent=U().copyLink,1800)}catch(e){$("#copyLink").textContent=LINK}});

/* ---------- günün kartı ---------- */
function dailyPick(){const s=todayKey();let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}h>>>=0;return{ci:h%78,rev:((h>>>8)%5)===0}}
let dailyOpen=false;
function renderDaily(){const p=dailyPick(),c=DECK[p.ci],C=c[lang];$("#dailyImg").src=c.img;$("#dailyImg").className=p.rev?"rev":"";$("#dailyImg").alt=C.name;
  $("#dailyName").innerHTML=`${C.name}<span class="pill ${p.rev?"rv":"up"}">${p.rev?U().rv:U().up}</span>`;
  $("#dailyMean").textContent=`${p.rev?C.rv:C.up} ${L().BASE[c.g]}`;
  $("#dailyWa").href=wa(U().waDaily(cardName(p)));
  $("#dailyBody").classList.toggle("hidden",!dailyOpen);$("#dailyTap").classList.toggle("hidden",dailyOpen);$("#dailyFlip").classList.toggle("open",dailyOpen)}
function openDaily(){if(dailyOpen)return;dailyOpen=true;Sound.flip();Sound.chime();renderDaily();store("vt_daily",todayKey())}
$("#dailyCard").addEventListener("click",openDaily);$("#dailyCard").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openDaily()}});

/* ---------- geçmiş ---------- */
function renderHistory(){const h=load("vt_hist")||[];const sec=$("#history");if(!h.length){sec.classList.add("hidden");return}
  sec.classList.remove("hidden");const u=U();
  $("#histList").innerHTML=h.map((r,i)=>`<li><div class="hthumbs">${r.picks.map(p=>`<img src="${DECK[p.ci].img}" alt="" class="${p.rev?"rev":""}" loading="lazy">`).join("")}</div>
    <div class="hmeta"><strong>${u.modeName[r.mode]||""} · ${u["t_"+r.topic]||""}</strong><span>${new Date(r.ts||Date.now()).toLocaleDateString(lang==="ar"?"ar":lang)} · #${r.code}</span>
    <span class="hnames">${r.picks.map(p=>esc(DECK[p.ci][lang].name)).join(" · ")}</span></div>
    <button type="button" class="btn-ghost sm" data-h="${i}">${u.historyOpen}</button></li>`).join("");
  $$("#histList button").forEach(b=>b.addEventListener("click",()=>{const r=(load("vt_hist")||[])[+b.dataset.h];if(r)showReading(r,true)}))}

/* ---------- paketler, sözlük, SSS ---------- */
function renderPackages(){if(!$("#pkGrid"))return;const u=U();$("#pkGrid").innerHTML=u.pk.map(([n,d],i)=>`<div class="pk"><span class="pk-ic">${["☎","◉","♥","✚","✦"][i]}</span><h4>${n}</h4><p>${d}</p><a class="btn-wa-sm" target="_blank" rel="noopener" href="${wa(u.pkMsg(n))}">${u.pkCta}</a></div>`).join("");
  $("#lockLove").href=wa(u.pkMsg(u.pk[2][0]));$("#lockCeltic").href=wa(u.pkMsg(u.pk[3][0]))}
let dictGrp="all";
function renderDictFilter(){if(!$("#dictFilter"))return;const u=U();$("#dictFilter").innerHTML=Object.entries(u.grp).map(([k,v])=>`<button type="button" class="chip" data-g="${k}" aria-pressed="${k===dictGrp}">${v}</button>`).join("");
  $$("#dictFilter .chip").forEach(b=>b.addEventListener("click",()=>{dictGrp=b.dataset.g;renderDictFilter();renderDict()}))}
function renderDict(){if(!$("#dictGrid"))return;const u=U(),q=lc($("#dictSearch").value.trim());
  const items=DECK.filter(c=>(dictGrp==="all"||c.g===dictGrp)&&(!q||lc(c[lang].name).includes(q)||lc(c.tr.name).includes(q)||c.en.name.toLowerCase().includes(q)));
  $("#dictGrid").innerHTML=items.map(c=>`<details class="dcard-i"><summary><img src="${c.img}" alt="" loading="lazy"><span>${c[lang].name}</span></summary>
    <p><span class="pill up">${u.up}</span> ${c[lang].up}</p><p><span class="pill rv">${u.rv}</span> ${c[lang].rv}</p>${c[lang].lesson?`<p class="muted">${c[lang].lesson}</p>`:""}</details>`).join("")}
if($("#dictSearch"))$("#dictSearch").addEventListener("input",renderDict);
function renderFaq(){$("#faqList").innerHTML=U().faq.map(([q,a])=>`<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join("")}

/* ---------- dil ---------- */
function applyLang(){const u=U();document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  $$("[data-i]").forEach(el=>{const v=u[el.dataset.i];if(typeof v==="string")el.textContent=v});
  $("#question").placeholder=u.qPh;if($("#dictSearch"))$("#dictSearch").placeholder=u.dictSearch;
  $$(".lang button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.lang===lang)));
  $$(".dcard").forEach((d,k)=>d.setAttribute("aria-label",u.closed(k+1)));
  $("#soundBtn").setAttribute("aria-label",Sound.on?u.soundOff:u.soundOn);
  updateModeText();renderSlots();renderPackages();renderDictFilter();renderDict();renderFaq();renderDaily();renderHistory();
  const [grp,k]=bubbleKey();$("#bubble").textContent=grp==="yn"?u.sayYN[k]:u.say[k];
  if(shown)showReading(shown,false)}

/* ---------- olaylar ---------- */
$$(".chip[data-topic]").forEach(ch=>ch.addEventListener("click",()=>{if(locked())return;
  $$(".chip[data-topic]").forEach(c=>c.setAttribute("aria-pressed","false"));ch.setAttribute("aria-pressed","true");topic=ch.dataset.topic}));
$$(".lang button").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.lang;store("vt_lang",lang);applyLang()}));
$$(".mode[data-mode]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.mode!==mode){shown=null;$("#result").classList.add("hidden");setMode(b.dataset.mode)}}));
$("#shuffle").addEventListener("click",doShuffle);
revealBtn.addEventListener("click",reveal);

/* ---------- yıldızlar ---------- */
(function(){const cv=$("#stars"),ctx=cv.getContext("2d");let W,H,st=[];const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function size(){W=cv.width=innerWidth*devicePixelRatio;H=cv.height=innerHeight*devicePixelRatio;
    st=Array.from({length:110},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.3+.3)*devicePixelRatio,p:Math.random()*6.28,s:.6+Math.random()*1.6}))}
  function draw(t){ctx.clearRect(0,0,W,H);st.forEach(s=>{ctx.globalAlpha=reduce?.6:.35+.65*Math.abs(Math.sin(s.p+t/1000*s.s*.6));ctx.fillStyle=s.r>1.4*devicePixelRatio?"#f4b23e":"#fbf1dc";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.28);ctx.fill()});if(!reduce)requestAnimationFrame(draw)}
  size();addEventListener("resize",size);requestAnimationFrame(draw)})();

/* ---------- başlat ---------- */
lang=load("vt_lang")||(()=>{const n=(navigator.language||"tr").toLowerCase();return n.startsWith("tr")?"tr":n.startsWith("ar")?"ar":"en"})();
dailyOpen=load("vt_daily")===todayKey();
shuffleOrder();renderDeck(true);applyLang();setMode("three");
