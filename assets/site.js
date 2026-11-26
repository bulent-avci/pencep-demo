// PenCep – ortak davranışlar
(function(){
  const hdr=document.querySelector('header');
  if(hdr) addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>8),{passive:true});
  const bg=document.querySelector('.burger'),mm=document.getElementById('mmenu');
  if(bg&&mm){
    bg.addEventListener('click',()=>{const o=mm.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
    mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));
  }
  const els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    els.forEach(el=>io.observe(el));
  } else els.forEach(el=>el.classList.add('in'));
  // ===== 21 gün ücretsiz dene: indirme penceresi =====
  // "#indir" ile biten tüm bağlantılar (her sayfada) bu pencereyi açar.
  const PLAY='https://play.google.com/store/apps/details?id=com.technosoft.pencep';
  const WA='https://wa.me/905305407587?text=';
  const dl=document.createElement('div');
  dl.className='dl-overlay';dl.setAttribute('role','dialog');dl.setAttribute('aria-modal','true');dl.setAttribute('aria-labelledby','dlTitle');
  dl.innerHTML=`<div class="dl-card">
    <div class="dl-top">
      <button class="dl-close" aria-label="Kapat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <img class="dl-icon" src="img/pencep-ikon.png" alt="">
      <span class="dl-badge">🎁 21 GÜN ÜCRETSİZ</span>
      <h2 id="dlTitle">PenCep'i hemen indirin</h2>
      <p>Uygulamayı kurun, markanızı seçin; ilk teklifinizi birkaç dakika içinde hazırlayın.</p>
    </div>
    <div class="dl-body">
      <div class="dl-stores">
        <a class="dl-store" href="${PLAY}" target="_blank" rel="noopener">
          <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#34A853" d="M3.6 2.2 13.8 12 3.6 21.8c-.4-.2-.6-.7-.6-1.2V3.4c0-.5.2-1 .6-1.2z"/><path fill="#FBBC04" d="m17.1 15.3-3.3-3.3 3.3-3.3 3.8 2.2c1.1.6 1.1 1.6 0 2.2z"/><path fill="#EA4335" d="M13.8 12 3.6 21.8c.3.2.8.2 1.3-.1l12.2-6.4z"/><path fill="#4285F4" d="M13.8 12 17.1 8.7 4.9 2.3c-.5-.3-1-.3-1.3-.1z"/></svg>
          <span><small>HEMEN İNDİRİN</small><b>Google Play</b></span></a>
        <button class="dl-store ios" type="button">
          <span class="soon">YAKINDA</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1.1-2.8-4.3zM14 5.2c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>
          <span><small>iPHONE & iPAD</small><b>App Store</b></span></button>
      </div>
      <div class="dl-ios-msg" id="dlIos">📱 iOS sürümü çok yakında App Store'da. <a href="${WA}${encodeURIComponent('Merhaba, PenCep iOS sürümü çıkınca haber almak istiyorum.')}" target="_blank" rel="noopener">Çıkınca haber verelim →</a></div>
      <ul class="dl-list"><li>21 gün sınırsız</li><li>Kurulum dakikalar</li><li>İstediğiniz an iptal</li></ul>
      <div class="dl-help"><span>Kurulumda yardım ister misiniz?</span>
        <a href="${WA}${encodeURIComponent('Merhaba, PenCep kurulumu için destek istiyorum.')}" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>WhatsApp'tan yazın</a></div>
    </div>
  </div>`;
  document.body.appendChild(dl);
  let lastFocus=null;
  const openDl=()=>{lastFocus=document.activeElement;dl.classList.add('open');document.body.classList.add('dl-lock');setTimeout(()=>dl.querySelector('.dl-store').focus(),50)};
  const closeDl=()=>{dl.classList.remove('open');document.body.classList.remove('dl-lock');dl.querySelector('#dlIos').classList.remove('show');if(lastFocus)lastFocus.focus()};
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href$="#indir"]');
    if(a){e.preventDefault();if(mm)mm.classList.remove('open');openDl()}
  });
  dl.addEventListener('click',e=>{if(e.target===dl)closeDl()});
  dl.querySelector('.dl-close').addEventListener('click',closeDl);
  dl.querySelector('.dl-store.ios').addEventListener('click',()=>dl.querySelector('#dlIos').classList.add('show'));
  document.addEventListener('keydown',e=>{
    if(!dl.classList.contains('open'))return;
    if(e.key==='Escape')closeDl();
    if(e.key==='Tab'){const f=[...dl.querySelectorAll('a,button')].filter(x=>x.offsetParent);const i=f.indexOf(document.activeElement);
      if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}
  });

  // ===== Mobil alt çubuk (tüm sayfalar) =====
  const qbar=document.createElement('nav');
  qbar.className='quickbar';qbar.setAttribute('aria-label','Hızlı erişim');
  qbar.innerHTML=`<a class="qb-wa" href="${WA}${encodeURIComponent('Merhaba, PenCep hakkında bilgi almak istiyorum.')}" aria-label="WhatsApp'tan yazın"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg></a>
    <a class="qb-demo" href="demo.html"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>Demo İste</a>
    <a class="qb-try" href="#indir">21 Gün Ücretsiz</a>`;
  document.body.appendChild(qbar);
  // Biraz aşağı kaydırınca belirir (QB_SHOW_AT piksel)
  const QB_SHOW_AT=250;
  const qbShow=()=>qbar.classList.toggle('show',scrollY>QB_SHOW_AT);
  addEventListener('scroll',qbShow,{passive:true});qbShow();

  // ===== WhatsApp çevrim içi mesajı =====
  // Sadece hafta içi 09:00–18:00 (Türkiye saati) görünür. İsim ve saatleri buradan değiştirin.
  const ONLINE_NAME='Batuhan A.', ONLINE_START=9, ONLINE_END=18;
  function isOnline(){
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Istanbul',weekday:'short',hour:'2-digit',hour12:false}).formatToParts(new Date()).map(x=>[x.type,x.value]));
    const h=+p.hour%24;return !['Sat','Sun'].includes(p.weekday)&&h>=ONLINE_START&&h<ONLINE_END;
  }
  const msg=`Şu an <b>${ONLINE_NAME}</b> online ve sorularınızı bekliyor`;
  let bubble=null,closed=false;
  const fab=document.querySelector('.wa-fab'),qb=document.querySelector('.quickbar'),help=dl.querySelector('.dl-help span');
  let qbLine=null;
  if(qb){qbLine=document.createElement('div');qbLine.className='qb-online';qbLine.innerHTML=`<span><i></i>${msg}</span>`;qb.prepend(qbLine)}
  const helpDefault=help?help.innerHTML:'';
  function syncOnline(){
    const on=isOnline();
    if(fab&&!closed){
      if(on&&!bubble){bubble=document.createElement('div');bubble.className='wa-bubble';bubble.innerHTML=`<span class="on"></span>${msg}<button aria-label="Kapat">×</button>`;
        bubble.querySelector('button').addEventListener('click',()=>{closed=true;bubble.remove();bubble=null});document.body.appendChild(bubble)}
      if(!on&&bubble){bubble.remove();bubble=null}
    }
    if(qbLine)qbLine.style.visibility=on?'':'hidden';
    if(help)help.innerHTML=on?`Kurulumda yardım ister misiniz?<span class="dl-online">● ${ONLINE_NAME} şu an online</span>`:helpDefault;
  }
  syncOnline();setInterval(syncOnline,60000);

  // Logo dosyası yoksa marka adını yazı olarak göster
  document.querySelectorAll('.brand-logo img').forEach(img=>{
    const fail=()=>img.parentElement.classList.add('no-img');
    if(img.complete&&!img.naturalWidth) fail(); else img.addEventListener('error',fail);
  });
})();
