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
    el.innerHTML = t==='flower'?flower(n,st,ring):t==='burst'?burst(n):t==='rings'?rings():t==='waves'?waves():t==='dots'?dotgrid():'';
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
    applyTheme(t); try{localStorage.setItem('theme',t);}catch(e){}
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
