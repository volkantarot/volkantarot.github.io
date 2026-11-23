/* ---------- Tek Soru · 400 TL (ücretli bakım) ---------- */
const PQ_IBAN="TR380001500158007303597477", PQ_IBAN_FMT="TR38 0001 5001 5800 7303 5974 77", PQ_NAME="Volkan Şahin Kaplan";
Object.assign(UI.tr,{
 navPaid:"Tek Soru · 400 TL",pqH:"Tek soru, Volkan'dan kişisel cevap",pqPrice:"400 TL",
 pqP:"Sorunu yaz, kartlarını kendin seç. Ödemeden sonra kartların ve sorun WhatsApp'tan Volkan'a ulaşır, yorumun sana kişisel olarak gönderilir.",
 pqS1:"Bilgilerin",pqName:"Adın",pqBirth:"Doğum tarihin",pqQ:"Sorun",pqQPh:"Örneğin: Bu ilişki önümüzdeki aylarda nasıl ilerleyecek?",pqNamePh:"Örneğin: Ayşe",
 pqErr:"Lütfen adını, doğum tarihini ve sorunu yaz.",pqNext:"Kartlarımı seçmeye geç",
 pqS2:"Sorunu düşünerek 3 kart seç",pqMore:n=>`${n} kart daha seç`,pqToPay:"Ödemeye geç",pqSlot:i=>`${i}. kart`,pqEdit:"Bilgilerimi düzenle",pqReshuffle:"Yeniden karıştır",
 pqS3:"Ödeme ve gönderim",pqTo:"Alıcı",pqAmt:"Tutar",pqCodeL:"Havale açıklamasına yaz",pqCopyI:"IBAN'ı kopyala",pqCopyC:"Kodu kopyala",pqCopied:"Kopyalandı",pqCopyFail:"Elle kopyala",
 pqHow1:"Bankandan 400 TL havale ya da EFT yap, açıklamaya sipariş kodunu yaz.",pqHow2:"Aşağıdaki yeşil butona bas. WhatsApp'ta sorun ve kartların hazır mesaj olarak açılır.",pqHow3:"Mesaja dekontu ekleyip gönder. Ödeme onaylanınca yorumun sana gelir.",
 pqWa:"Ödemeyi yaptım, WhatsApp'a gönder",pqWaNote:"WhatsApp açılmazsa mesajını şu numaraya gönder:",pqBack:"Kartlara geri dön",
 pqPromo:"Tek sorunu Volkan cevaplasın · 400 TL",
 pqMsg:o=>`🔮 Yeni Tek Soru Siparişi – ${o.code}\nAd: ${o.name}\nDoğum tarihi: ${o.birth}\nSoru: ${o.q}\nSeçilen kartlar:\n${o.cards}\nTutar: 400 TL – havaleyi yaptım, dekontu ekliyorum.`});
Object.assign(UI.en,{
 navPaid:"One Question · 400 TL",pqH:"One question, a personal answer from Volkan",pqPrice:"400 TL",
 pqP:"Write your question and choose your own cards. After payment, your cards and question reach Volkan on WhatsApp and your reading is sent to you personally.",
 pqS1:"Your details",pqName:"Your name",pqBirth:"Date of birth",pqQ:"Your question",pqQPh:"For example: How will this relationship develop in the coming months?",pqNamePh:"For example: Sarah",
 pqErr:"Please enter your name, date of birth and question.",pqNext:"Continue to choose my cards",
 pqS2:"Hold your question in mind and choose 3 cards",pqMore:n=>n===1?"Choose 1 more card":`Choose ${n} more cards`,pqToPay:"Continue to payment",pqSlot:i=>`Card ${i}`,pqEdit:"Edit my details",pqReshuffle:"Shuffle again",
 pqS3:"Payment and sending",pqTo:"Recipient",pqAmt:"Amount",pqCodeL:"Write this in the transfer description",pqCopyI:"Copy IBAN",pqCopyC:"Copy code",pqCopied:"Copied",pqCopyFail:"Copy by hand",
 pqHow1:"Send 400 TL by bank transfer and write the order code in the description.",pqHow2:"Tap the green button below. WhatsApp opens with your question and cards ready.",pqHow3:"Attach the receipt and send. Once payment is confirmed, your reading is sent to you.",
 pqWa:"I've paid, send on WhatsApp",pqWaNote:"If WhatsApp doesn't open, send your message to:",pqBack:"Back to cards",
 pqPromo:"Let Volkan answer your question · 400 TL",
 pqMsg:o=>`🔮 New One Question Order – ${o.code}\nName: ${o.name}\nDate of birth: ${o.birth}\nQuestion: ${o.q}\nChosen cards:\n${o.cards}\nAmount: 400 TL – I've made the transfer, attaching the receipt.`});
Object.assign(UI.ar,{
 navPaid:"سؤال واحد · 400 ليرة",pqH:"سؤال واحد، وجواب شخصي من فولكان",pqPrice:"400 ليرة تركية",
 pqP:"اكتب سؤالك واختر بطاقاتك بنفسك. بعد الدفع تصل بطاقاتك وسؤالك إلى فولكان عبر واتساب، ويُرسل إليك التفسير بشكل شخصي.",
 pqS1:"بياناتك",pqName:"اسمك",pqBirth:"تاريخ ميلادك",pqQ:"سؤالك",pqQPh:"مثلاً: كيف ستتطور هذه العلاقة في الأشهر القادمة؟",pqNamePh:"مثلاً: سارة",
 pqErr:"يرجى كتابة اسمك وتاريخ ميلادك وسؤالك.",pqNext:"تابع لاختيار بطاقاتي",
 pqS2:"فكّر في سؤالك واختر 3 بطاقات",pqMore:n=>n===1?"اختر بطاقة واحدة أخرى":`اختر ${n} بطاقات أخرى`,pqToPay:"تابع إلى الدفع",pqSlot:i=>`البطاقة ${i}`,pqEdit:"تعديل بياناتي",pqReshuffle:"اخلط من جديد",
 pqS3:"الدفع والإرسال",pqTo:"المستفيد",pqAmt:"المبلغ",pqCodeL:"اكتب هذا في وصف التحويل",pqCopyI:"نسخ رقم الآيبان",pqCopyC:"نسخ الرمز",pqCopied:"تم النسخ",pqCopyFail:"انسخ يدوياً",
 pqHow1:"حوّل 400 ليرة تركية عبر البنك واكتب رمز الطلب في الوصف.",pqHow2:"اضغط الزر الأخضر بالأسفل. سيفتح واتساب ومعه سؤالك وبطاقاتك جاهزة.",pqHow3:"أرفق إيصال التحويل وأرسل. بعد تأكيد الدفع يُرسل إليك التفسير.",
 pqWa:"دفعت، أرسل عبر واتساب",pqWaNote:"إذا لم يفتح واتساب أرسل رسالتك إلى:",pqBack:"العودة إلى البطاقات",
 pqPromo:"دع فولكان يجيب عن سؤالك · 400 ليرة",
 pqMsg:o=>`🔮 طلب سؤال واحد جديد – ${o.code}\nالاسم: ${o.name}\nتاريخ الميلاد: ${o.birth}\nالسؤال: ${o.q}\nالبطاقات المختارة:\n${o.cards}\nالمبلغ: 400 ليرة – قمت بالتحويل وأرفقت الإيصال.`});

document.addEventListener("DOMContentLoaded",()=>{
  const q=s=>document.querySelector(s), U2=()=>UI[lang];
  if(!q("#paid"))return;
  let pqData=null,pqPicks=[],pqOrder=[],pqCode="";
  const show=n=>{[1,2,3].forEach(i=>q("#pq"+i).classList.toggle("hidden",i!==n));q("#paid").scrollIntoView({behavior:"smooth",block:"start"})};
  const fmtD=v=>{if(!v)return"";const[y,m,d]=v.split("-");return`${d}.${m}.${y}`};
  const pname=p=>DECK[p.ci][lang].name+(p.rev?` (${U2().revWord})`:"");
  const pnameTR=p=>DECK[p.ci].tr.name+(p.rev?" (ters)":"");

  function deal(){pqPicks=[];pqOrder=[...DECK.keys()].sort(()=>Math.random()-.5).slice(0,21);
    const d=q("#pqDeck");d.innerHTML="";d.classList.remove("locked");
    pqOrder.forEach((ci,k)=>{const b=document.createElement("button");b.type="button";b.className="dcard back";b.style.animationDelay=k*15+"ms";
      b.setAttribute("aria-label",U2().closed(k+1));
      b.addEventListener("click",()=>{if(pqPicks.length>=3)return;pqPicks.push({ci,rev:Math.random()<.25});b.classList.add("taken");
        try{Sound.flip()}catch(e){}if(pqPicks.length>=3)d.classList.add("locked");slots()});d.appendChild(b)});
    slots()}
  function slots(){const u=U2(),box=q("#pqSlots");
    if(!box.children.length)box.innerHTML=[0,1,2].map(()=>`<div class="slot"><div class="frame">✦</div><span class="label"></span></div>`).join("");
    [...box.children].forEach((s,i)=>{s.querySelector(".label").textContent=u.pqSlot(i+1);const f=s.querySelector(".frame"),p=pqPicks[i];
      if(p){s.classList.add("filled");if(!f.querySelector(".flip")){f.innerHTML=`<div class="flip"><div class="face back"></div><div class="face front ${p.rev?"rev":""}"><img alt="" src="${DECK[p.ci].img}"></div></div>`;
        const fl=f.querySelector(".flip");requestAnimationFrame(()=>requestAnimationFrame(()=>fl.classList.add("open")))}
        f.querySelector("img").alt=pname(p)}
      else{s.classList.remove("filled");f.innerHTML="✦"}});
    const b=q("#pqToPay");b.disabled=pqPicks.length<3;b.textContent=pqPicks.length<3?u.pqMore(3-pqPicks.length):u.pqToPay}
  function pay(){const u=U2();q("#pqCode").textContent=pqCode;
    q("#pqSum").innerHTML=`<strong>${esc(pqData.name)}</strong> · ${pqData.birth}<br>“${esc(pqData.q)}”<br>${pqPicks.map((p,i)=>`${i+1}. ${esc(pname(p))}`).join(" · ")}`;
    q("#pqThumbs").innerHTML=pqPicks.map(p=>`<img src="${DECK[p.ci].img}" alt="${esc(pname(p))}" class="${p.rev?"rev":""}">`).join("");
    const cards=pqPicks.map((p,i)=>`${i+1}) ${lang==="tr"?pnameTR(p):pname(p)+" / "+pnameTR(p)}`).join("\n");
    q("#pqWa").href=wa(u.pqMsg({code:pqCode,name:pqData.name,birth:pqData.birth,q:pqData.q,cards}))}
  function texts(){const u=U2();q("#pqNameIn").placeholder=u.pqNamePh;q("#pqQIn").placeholder=u.pqQPh;
    q("#pqDeck").querySelectorAll(".dcard").forEach((d,k)=>d.setAttribute("aria-label",u.closed(k+1)));
    slots();if(pqCode&&pqData)pay()}

  q("#pqForm").addEventListener("submit",e=>{e.preventDefault();
    const name=q("#pqNameIn").value.trim(),bd=q("#pqBirthIn").value,qq=q("#pqQIn").value.trim();
    if(!name||!bd||qq.length<5){q("#pqErr").textContent=U2().pqErr;return}
    q("#pqErr").textContent="";pqData={name,birth:fmtD(bd),q:qq};if(pqPicks.length<3)deal();show(2)});
  q("#pqEditBtn").addEventListener("click",()=>show(1));
  q("#pqShuffle").addEventListener("click",deal);
  q("#pqToPay").addEventListener("click",()=>{if(pqPicks.length<3)return;pqCode="VT-"+(1000+Math.floor(Math.random()*9000));pay();show(3)});
  q("#pqBackBtn").addEventListener("click",()=>show(2));
  function copy(btn,text,key){const u=U2();const done=()=>{btn.textContent=u.pqCopied;setTimeout(()=>btn.textContent=U2()[key],1800)};
    try{navigator.clipboard.writeText(text).then(done,()=>{btn.textContent=u.pqCopyFail})}catch(e){btn.textContent=u.pqCopyFail}}
  q("#pqCopyI").addEventListener("click",e=>copy(e.currentTarget,PQ_IBAN,"pqCopyI"));
  q("#pqCopyC").addEventListener("click",e=>copy(e.currentTarget,pqCode,"pqCopyC"));
  document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",texts));
  q("#pqIban").textContent=PQ_IBAN_FMT;q("#pqTo").textContent=PQ_NAME;
  texts();
});
