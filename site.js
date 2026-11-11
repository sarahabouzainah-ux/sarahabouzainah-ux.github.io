/* Sarah Abouzainah portfolio: shapes, reveal, counters, nav */
(function(){
  document.documentElement.classList.add('js');

  /* ---------- generative shapes (inline SVG, colour = currentColor) ---------- */
  var BG='#0B0908';
  function flower(n,style,ring){
    var s='<svg viewBox="-100 -100 200 200" aria-hidden="true">',i,a;
    var solid=style==='solid';
    if(ring) s+='<circle r="97" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0.1 7.2" opacity=".8"/>';
    for(i=0;i<n;i++){
      a=i*360/n;
      s+= solid
        ? '<ellipse cx="0" cy="-52" rx="25" ry="44" transform="rotate('+a+')" fill="currentColor" fill-opacity=".95" style="stroke:var(--bg)" stroke-width="1.8"/>'
        : '<ellipse cx="0" cy="-52" rx="25" ry="44" transform="rotate('+a+')" fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-opacity=".85" stroke-width="1.1"/>';
    }
    for(i=0;i<n;i++){
      a=(i+.5)*360/n;
      s+= solid
        ? '<ellipse cx="0" cy="-30" rx="12" ry="24" transform="rotate('+a+')" style="fill:var(--bg)" fill-opacity=".3"/>'
        : '<ellipse cx="0" cy="-32" rx="13" ry="25" transform="rotate('+a+')" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1"/>';
    }
    s+='<circle r="12" '+(solid?'style="fill:var(--bg)"':'fill="none"')+' stroke="currentColor" stroke-width="1.2" stroke-opacity="'+(solid?0:.8)+'"/><circle r="5.5" fill="currentColor"/></svg>';
    return s;
  }
  function sparkPath(r){var k=r*.2;return 'M0 '+(-r)+' Q'+k+' '+(-k)+' '+r+' 0 Q'+k+' '+k+' 0 '+r+' Q'+(-k)+' '+k+' '+(-r)+' 0 Q'+(-k)+' '+(-k)+' 0 '+(-r)+'Z';}
  function spark(){
    return '<svg viewBox="-100 -100 200 200" aria-hidden="true"><path d="'+sparkPath(92)+'" fill="currentColor"/></svg>';
  }
  function core(){
    return '<svg viewBox="-100 -100 200 200" aria-hidden="true">'
      +'<ellipse rx="94" ry="40" transform="rotate(-28)" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="9"/>'
      +'<circle r="58" fill="currentColor"/><path d="'+sparkPath(38)+'" style="fill:var(--bg)"/>'
      +'<circle cx="83" cy="-44" r="15" style="fill:var(--red);stroke:var(--bg)" stroke-width="5"/></svg>';
  }
  function orbitArt(){
    var P='M-92 0 a92 34 0 1 0 184 0 a92 34 0 1 0 -184 0',s='<svg viewBox="-100 -100 200 200" aria-hidden="true">',i,cfg=[[0,'var(--red)',14,'r'],[60,'currentColor',18,'c'],[-60,'var(--sage)',22,'r']];
    s+='<circle r="64" fill="currentColor" opacity=".10"/><circle r="97" fill="none" stroke="var(--sage)" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0.1 7.2" opacity=".7"/>';
    for(i=0;i<cfg.length;i++){
      var c=cfg[i],node=c[3]==='c'?'<circle r="6" fill="'+c[1]+'"/>':'<rect x="-6" y="-6" width="12" height="12" rx="3" fill="'+c[1]+'"/>';
      s+='<g transform="rotate('+c[0]+')"><ellipse rx="92" ry="34" fill="none" style="stroke:rgba(var(--ink-rgb),.22)" stroke-width="1.3"/><g>'+node+'<animateMotion dur="'+c[2]+'s" begin="-'+(i*5)+'s" repeatCount="indefinite" path="'+P+'"/></g></g>';
    }
    s+='<circle r="38" fill="none" stroke="var(--red)" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="0.1 6.6"/><circle r="27" fill="currentColor"/><path d="'+sparkPath(17)+'" style="fill:var(--bg)"/></svg>';
    return s;
  }
  var mqN=0;
  function toggleIcon(){return '<svg viewBox="-100 -100 200 200" aria-hidden="true"><rect x="-90" y="-46" width="180" height="92" rx="46" fill="currentColor"/><circle cx="44" cy="0" r="32" style="fill:var(--bg)"/></svg>';}
  function pillIcon(){return '<svg viewBox="-100 -100 200 200" aria-hidden="true"><rect x="-92" y="-44" width="184" height="88" rx="44" fill="currentColor"/><rect x="-44" y="-9" width="88" height="18" rx="9" style="fill:var(--bg)"/></svg>';}
  function cardMark(){
    return '<svg viewBox="-100 -100 200 200" aria-hidden="true"><g transform="rotate(-10)"><rect x="-92" y="-62" width="184" height="124" rx="34" style="fill:var(--bg2);stroke:currentColor" stroke-width="9"/>'
      +'<rect x="-66" y="-24" width="64" height="48" rx="24" fill="currentColor"/><circle cx="-26" cy="0" r="15" style="fill:var(--bg)"/>'
      +'<path d="'+sparkPath(26)+'" transform="translate(48,0)" style="fill:var(--red)"/></g></svg>';
  }
  function stackArt(){
    var G='var(--gold)',Y='var(--red)',S='var(--sage)',B='var(--bg)',I='rgba(var(--ink-rgb),';
    function bar(x,y,w,o){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="5" rx="2.5" style="fill:'+I+o+')"/>';}
    function card(y,inner,d){return '<g transform="translate(14,'+y+')"><g class="fl" style="animation-delay:'+d+'s"><rect width="172" height="46" rx="11" style="fill:var(--bg2);stroke:'+I+'.2)" stroke-width="1.2"/>'+inner+'</g></g>';}
    var c1='<rect x="12" y="13" width="30" height="16" rx="8" fill="'+G+'"/><circle cx="34" cy="21" r="6" style="fill:'+B+'"/>'+bar(52,15,44,.28)+bar(52,25,30,.16)+'<rect x="104" y="20" width="44" height="3" rx="1.5" style="fill:'+I+'.2)"/><rect x="104" y="20" width="26" height="3" rx="1.5" fill="'+Y+'"/><circle cx="130" cy="21.5" r="5.5" fill="'+Y+'"/>';
    var c2='<rect x="12" y="12" width="62" height="20" rx="10" fill="'+G+'"/><rect x="28" y="20" width="30" height="5" rx="2.5" style="fill:'+B+'"/><rect x="84" y="12" width="40" height="20" rx="10" fill="none" stroke="'+S+'" stroke-width="2"/><circle cx="96" cy="22" r="4" fill="'+S+'"/><circle cx="146" cy="22" r="11" fill="'+Y+'"/>';
    var c3='<path d="'+sparkPath(8)+'" transform="translate(24,23)" fill="'+G+'"/>'+bar(40,15,58,.4)+bar(40,25,36,.2)+'<rect x="102" y="12" width="3" height="22" rx="1.5" fill="'+Y+'"><animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/></rect><circle cx="146" cy="23" r="12" fill="'+G+'"/><path d="M141 23 H151 M147 18 L152 23 L147 28" fill="none" style="stroke:'+B+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    return '<svg viewBox="0 0 200 200" aria-hidden="true"><g transform="rotate(-8 100 100)">'+card(22,c1,0)+card(80,c2,-1.6)+card(138,c3,-3.2)
      +'<path d="'+sparkPath(14)+'" transform="translate(176,16)" fill="'+Y+'"/><path d="'+sparkPath(7)+'" transform="translate(10,128)" fill="'+S+'"/></g></svg>';
  }
  function pickFlower(el){
    if(el.closest&&el.closest('.brand')) return cardMark();
    if(el.classList.contains('art')||el.classList.contains('page-art')||(el.closest&&el.closest('.cover'))) return stackArt();
    var k=(mqN++)%3; return k===0?toggleIcon():k===1?pillIcon():spark();
  }
  function burst(n){
    var s='<svg viewBox="-100 -100 200 200" aria-hidden="true">',i;
    n=n||36;
    for(i=0;i<n;i++){
      var a=i*2*Math.PI/n,r1=i%2?34:26,r2=i%2?78:96;
      s+='<line x1="'+(Math.cos(a)*r1).toFixed(1)+'" y1="'+(Math.sin(a)*r1).toFixed(1)+'" x2="'+(Math.cos(a)*r2).toFixed(1)+'" y2="'+(Math.sin(a)*r2).toFixed(1)+'" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>';
    }
    return s+'<circle r="12" fill="currentColor"/></svg>';
  }
  function rings(){
    var s='<svg viewBox="-100 -100 200 200" aria-hidden="true">',i;
    for(i=1;i<=6;i++){
      s+= i%2
        ? '<circle r="'+(i*15.5)+'" fill="none" stroke="currentColor" stroke-width="2.4"/>'
        : '<circle r="'+(i*15.5)+'" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round" stroke-dasharray="0.1 9.4"/>';
    }
    return s+'<circle r="7" fill="currentColor"/></svg>';
  }
  function waves(){
    var s='<svg viewBox="0 0 200 200" aria-hidden="true">',r,x,d;
    for(r=0;r<8;r++){
      d='M0 '+(24+r*22);
      for(x=10;x<=200;x+=10) d+=' L'+x+' '+(24+r*22+Math.sin(x/22+r*.7)*9).toFixed(1);
      s+='<path d="'+d+'" fill="none" stroke="currentColor" stroke-width="'+(r%2?3.2:2.2)+'" stroke-linecap="round" '+(r%2?'stroke-dasharray="0.1 8.6"':'')+'/>';
    }
    return s+'</svg>';
  }
  function dotgrid(){
    var s='<svg viewBox="0 0 200 200" aria-hidden="true">',x,y;
    for(y=0;y<9;y++)for(x=0;x<9;x++) s+='<circle cx="'+(14+x*21)+'" cy="'+(14+y*21)+'" r="'+((x+y)%3===0?5.5:3.2)+'" fill="currentColor"/>';
    return s+'</svg>';
  }
  function build(el){
    var t=el.getAttribute('data-shape'),n=+(el.getAttribute('data-n')||8),st=el.getAttribute('data-style')||'solid',ring=el.hasAttribute('data-ring');
    el.innerHTML = t==='flower'?pickFlower(el):t==='burst'?burst(n):t==='rings'?rings():t==='waves'?waves():t==='dots'?dotgrid():'';
    el.setAttribute('aria-hidden','true');
  }
  [].forEach.call(document.querySelectorAll('[data-shape]'),build);

  /* ---------- theme switch ---------- */
  var root=document.documentElement, tb=document.querySelector('.theme-btn');
  function applyTheme(t){
    root.setAttribute('data-theme',t);
    var m=document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute('content',t==='light'?'#FBF6EE':'#0B0908');
    if(tb) tb.setAttribute('aria-label',t==='light'?'Switch to dark theme':'Switch to light theme');
  }
  applyTheme(root.getAttribute('data-theme')==='light'?'light':'dark');
  if(tb) tb.addEventListener('click',function(){
    var t=root.getAttribute('data-theme')==='light'?'dark':'light';
    applyTheme(t); try{localStorage.setItem('theme-v2',t);}catch(e){}
  });

  /* ---------- nav state ---------- */
  var nav=document.querySelector('.nav');
  function onScroll(){ if(nav) nav.classList.toggle('solid',window.scrollY>24); }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  /* ---------- reveal + counters ---------- */
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function count(el){
    var end=+el.getAttribute('data-n'); if(!end||reduce) return;
    var t0=null,dur=1400;
    function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3); el.textContent=Math.round(end*e); if(p<1) requestAnimationFrame(step); }
    el.textContent='0'; requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        e.target.classList.add('vis');
        [].forEach.call(e.target.querySelectorAll('[data-count]'),count);
        io.unobserve(e.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    [].forEach.call(document.querySelectorAll('.rv'),function(el){io.observe(el);});
  } else {
    [].forEach.call(document.querySelectorAll('.rv'),function(el){el.classList.add('vis');});
  }

  /* ---------- case study: contents highlight, progress, lightbox ---------- */
  var toc=document.querySelector('.cs-toc'), main=document.querySelector('.cs-main');
  if(toc&&main){
    var links=[].slice.call(toc.querySelectorAll('a')), secs=links.map(function(a){return document.querySelector(a.getAttribute('href'));});
    var pct=toc.querySelector('.toc-pct'), bar=toc.querySelector('.toc-bar'), rb=document.querySelector('.read-bar');
    var ticking=false;
    function upd(){
      ticking=false;
      var r=main.getBoundingClientRect(), total=r.height-window.innerHeight*0.6;
      var p=Math.max(0,Math.min(1,(-r.top+window.innerHeight*0.2)/Math.max(total,1)));
      var v=Math.round(p*100)+'%';
      if(pct) pct.textContent=v;
      if(bar) bar.style.setProperty('--p',v);
      if(rb) rb.style.setProperty('--p',v);
      var cur=0,i;
      for(i=0;i<secs.length;i++){ if(secs[i]&&secs[i].getBoundingClientRect().top<=window.innerHeight*0.32) cur=i; }
      links.forEach(function(a,k){
        var on=k===cur;
        if(on&&!a.classList.contains('on')&&window.innerWidth<=1000){ var ol=a.parentNode.parentNode; ol.scrollLeft=a.offsetLeft-24; }
        a.classList.toggle('on',on);
      });
    }
    window.addEventListener('scroll',function(){ if(!ticking){ ticking=true; requestAnimationFrame(upd);} },{passive:true});
    window.addEventListener('resize',upd); upd();
  }
  document.addEventListener('click',function(e){
    var im=e.target.closest&&e.target.closest('.cs-main img');
    if(im){
      var lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-label','Image preview');
      var big=document.createElement('img'); big.src=im.currentSrc||im.src; big.alt=im.alt||''; lb.appendChild(big);
      function close(){ lb.remove(); document.removeEventListener('keydown',key); }
      function key(ev){ if(ev.key==='Escape') close(); }
      lb.addEventListener('click',close); document.addEventListener('keydown',key); document.body.appendChild(lb);
    }
  });
})();
